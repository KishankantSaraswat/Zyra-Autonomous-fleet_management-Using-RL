import pygame
import heapq
import sys
import os
from pygame.locals import *

# Constants
ROWS, COLS = 10, 18
CELL_SIZE = 60
WINDOW_SIZE = (COLS * CELL_SIZE, ROWS * CELL_SIZE)
SIDEBAR_WIDTH = 300
FULL_WINDOW = (WINDOW_SIZE[0] + SIDEBAR_WIDTH, WINDOW_SIZE[1])

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)
LIGHT_BLUE = (100, 150, 255)
ORANGE = (255, 165, 0)
RED = (255, 0, 0)
GRAY = (200, 200, 200)
DARK_GRAY = (100, 100, 100)
BROWN = (139, 69, 19)
YELLOW = (255, 255, 0)

class WarehouseSimulation:
    def __init__(self):
        pygame.init()
        self.screen = pygame.display.set_mode(FULL_WINDOW)
        pygame.display.set_caption("Warehouse Robot Simulation")
        self.clock = pygame.time.Clock()
        self.font = pygame.font.SysFont('Arial', 16)
        self.big_font = pygame.font.SysFont('Arial', 24, bold=True)
        
        # Warehouse layout
        self.shelves = set()
        self.products = {}
        self.obstacles = set()
        self.create_warehouse_layout()
        
        # Robot properties
        self.robot_pos = (0, 0)
        self.target_pos = None
        self.current_path = []
        self.path_index = 0
        self.carrying_product = None
        self.animation_progress = 0
        self.animation_speed = 0.1
        
        # Logs for actions
        self.logs = ["Robot initialized and ready for commands."]
        self.command_history = []
        
        # Command input
        self.command_input = ""
        self.input_active = False
        
        # Simulation status
        self.running = True
        self.paused = False
        self.task_complete = False
        
    def create_warehouse_layout(self):
        # Create shelves in an organized warehouse layout
        # Main aisles
        for r in range(ROWS):
            for c in range(COLS):
                # Create vertical shelves with aisles between them
                if c % 3 == 1 and r not in [0, ROWS-1]:
                    self.shelves.add((r, c))
                    
                # Add some random obstacles
                if (r, c) not in self.shelves and random_chance(5) and r > 1 and c > 1:
                    self.obstacles.add((r, c))
        
        # Add random products to shelves
        product_types = ["Box", "Package", "Container", "Item", "Part"]
        product_id = 1
        
        for shelf in self.shelves:
            if random_chance(70):  # 70% chance for a shelf to have a product
                product_name = f"{product_types[product_id % len(product_types)]} #{product_id}"
                self.products[shelf] = product_name
                product_id += 1
    
    def is_blocked(self, pos):
        r, c = pos
        return (pos in self.shelves or 
                pos in self.obstacles or 
                not (0 <= r < ROWS and 0 <= c < COLS))
    
    def get_nearest_valid_spot(self, target_pos):
        """Find the nearest accessible position to the target"""
        r, c = target_pos
        if not self.is_blocked(target_pos):
            return target_pos
            
        # Check adjacent cells in expanding squares
        for dist in range(1, max(ROWS, COLS)):
            for dr in range(-dist, dist+1):
                for dc in range(-dist, dist+1):
                    # Only check positions on the boundary of the square
                    if abs(dr) == dist or abs(dc) == dist:
                        new_pos = (r + dr, c + dc)
                        if (0 <= new_pos[0] < ROWS and 
                            0 <= new_pos[1] < COLS and 
                            not self.is_blocked(new_pos)):
                            return new_pos
        return None  # No valid position found
    
    def a_star_pathfinding(self, start, goal):
        if start == goal:
            return []
            
        open_set = [(0, start)]
        came_from = {}
        g_score = {start: 0}
        f_score = {start: heuristic(start, goal)}
        
        while open_set:
            _, current = heapq.heappop(open_set)
            
            if current == goal:
                return reconstruct_path(came_from, current)
                
            for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                neighbor = (current[0] + dr, current[1] + dc)
                
                if self.is_blocked(neighbor):
                    continue
                    
                tentative_g_score = g_score[current] + 1
                
                if tentative_g_score < g_score.get(neighbor, float('inf')):
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    f_score[neighbor] = tentative_g_score + heuristic(neighbor, goal)
                    
                    if neighbor not in [item[1] for item in open_set]:
                        heapq.heappush(open_set, (f_score[neighbor], neighbor))
        
        self.logs.append("No path found to the target!")
        return []
    
    def move_to_position(self, target_row, target_col):
        target_pos = (target_row, target_col)
        accessible_pos = self.get_nearest_valid_spot(target_pos)
        
        if not accessible_pos:
            self.logs.append(f"Cannot find an accessible position near ({target_row}, {target_col})")
            return False
            
        if target_pos != accessible_pos:
            self.logs.append(f"Target position is blocked. Moving to nearest accessible point ({accessible_pos[0]}, {accessible_pos[1]})")
            
        self.target_pos = accessible_pos
        self.current_path = self.a_star_pathfinding(self.robot_pos, self.target_pos)
        self.path_index = 0
        self.animation_progress = 0
        
        if not self.current_path:
            if self.robot_pos == self.target_pos:
                self.logs.append("Already at the target position.")
                return True
            else:
                self.logs.append("Failed to find a path!")
                return False
                
        self.logs.append(f"Moving to ({accessible_pos[0]}, {accessible_pos[1]}). Path length: {len(self.current_path)}")
        return True
    
    def pick_product(self, row, col):
        pos = (row, col)
        
        # Check if there's a product at an adjacent position
        adjacent_positions = [
            (pos[0]+1, pos[1]), (pos[0]-1, pos[1]), 
            (pos[0], pos[1]+1), (pos[0], pos[1]-1)
        ]
        
        target_shelf = None
        for adj_pos in adjacent_positions:
            if adj_pos in self.products:
                target_shelf = adj_pos
                break
                
        if not target_shelf:
            # Check if the position itself contains a product
            if pos in self.products:
                self.logs.append(f"Cannot pick from ({row}, {col}). Move to an adjacent cell.")
                return False
            else:
                self.logs.append(f"No product found at or adjacent to ({row}, {col}).")
                return False
                
        # First move to the picking position if not already there
        if self.robot_pos != pos:
            success = self.move_to_position(row, col)
            if not success:
                return False
            else:
                self.task_complete = False
                return True
                
        # If already at picking position, pick the product
        if not self.carrying_product:
            self.carrying_product = self.products[target_shelf]
            self.logs.append(f"Picked up {self.carrying_product} from shelf at ({target_shelf[0]}, {target_shelf[1]})")
            # Remove product from shelf
            del self.products[target_shelf]
            return True
        else:
            self.logs.append(f"Already carrying {self.carrying_product}. Deliver it first.")
            return False
    
    def deliver_product(self, row, col):
        if not self.carrying_product:
            self.logs.append("No product to deliver. Pick a product first.")
            return False
            
        # Move to delivery location
        if self.robot_pos != (row, col):
            success = self.move_to_position(row, col)
            if not success:
                return False
            else:
                self.task_complete = False
                return True
                
        # If at delivery location, deliver product
        self.logs.append(f"Delivered {self.carrying_product} to ({row}, {col})")
        self.carrying_product = None
        return True
    
    def process_command(self, command):
        parts = command.lower().split()
        if not parts:
            return
            
        self.command_history.append(command)
        
        if parts[0] == "move":
            if len(parts) >= 3:
                try:
                    row, col = int(parts[1]), int(parts[2])
                    if 0 <= row < ROWS and 0 <= col < COLS:
                        self.move_to_position(row, col)
                    else:
                        self.logs.append(f"Invalid position: ({row}, {col}). Must be within grid bounds.")
                except ValueError:
                    self.logs.append("Invalid coordinates. Use 'move ROW COL'.")
            else:
                self.logs.append("Invalid command. Format: move ROW COL")
                
        elif parts[0] == "pick":
            if len(parts) >= 3:
                try:
                    row, col = int(parts[1]), int(parts[2])
                    if 0 <= row < ROWS and 0 <= col < COLS:
                        self.pick_product(row, col)
                    else:
                        self.logs.append(f"Invalid position: ({row}, {col}). Must be within grid bounds.")
                except ValueError:
                    self.logs.append("Invalid coordinates. Use 'pick ROW COL'.")
            else:
                self.logs.append("Invalid command. Format: pick ROW COL")
                
        elif parts[0] == "deliver":
            if len(parts) >= 3:
                try:
                    row, col = int(parts[1]), int(parts[2])
                    if 0 <= row < ROWS and 0 <= col < COLS:
                        self.deliver_product(row, col)
                    else:
                        self.logs.append(f"Invalid position: ({row}, {col}). Must be within grid bounds.")
                except ValueError:
                    self.logs.append("Invalid coordinates. Use 'deliver ROW COL'.")
            else:
                self.logs.append("Invalid command. Format: deliver ROW COL")
                
        elif parts[0] == "help":
            self.logs.append("Commands: move ROW COL, pick ROW COL, deliver ROW COL, help")
        else:
            self.logs.append(f"Unknown command: {parts[0]}. Try 'help' for available commands.")
    
    def update(self):
        # Update robot animation and movement
        if self.current_path and self.path_index < len(self.current_path):
            # If we're animating between grid positions
            if self.animation_progress < 1.0:
                self.animation_progress += self.animation_speed
            else:
                # Move to next cell in the path
                self.robot_pos = self.current_path[self.path_index]
                self.path_index += 1
                
                # If we've reached the end of the path
                if self.path_index >= len(self.current_path):
                    self.logs.append(f"Reached position {self.robot_pos}")
                    if self.target_pos and self.robot_pos == self.target_pos:
                        self.task_complete = True
                        
                self.animation_progress = 0
    
    def draw(self):
        # Draw warehouse background
        self.screen.fill(WHITE)
        
        # Draw grid
        for r in range(ROWS):
            for c in range(COLS):
                rect = pygame.Rect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE)
                pygame.draw.rect(self.screen, BLACK, rect, 1)
                
                # Draw positions
                pos_text = self.font.render(f"{r},{c}", True, (100, 100, 100))
                self.screen.blit(pos_text, (c * CELL_SIZE + 5, r * CELL_SIZE + 5))
        
        # Draw shelves
        for shelf in self.shelves:
            r, c = shelf
            rect = pygame.Rect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            pygame.draw.rect(self.screen, BROWN, rect)
            pygame.draw.rect(self.screen, BLACK, rect, 2)
        
        # Draw products on shelves
        for pos, product_name in self.products.items():
            r, c = pos
            rect = pygame.Rect(c * CELL_SIZE + 10, r * CELL_SIZE + 10, CELL_SIZE - 20, CELL_SIZE - 20)
            pygame.draw.rect(self.screen, YELLOW, rect)
            product_text = self.font.render(product_name.split()[0][0] + product_name.split()[1][0], True, BLACK)
            self.screen.blit(product_text, (c * CELL_SIZE + 20, r * CELL_SIZE + 25))
        
        # Draw obstacles
        for obstacle in self.obstacles:
            r, c = obstacle
            rect = pygame.Rect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE)
            # pygame.draw.rect(self.screen, RED, rect)
            
        # Draw path
        if self.current_path:
            for i, pos in enumerate(self.current_path):
                r, c = pos
                if i >= self.path_index:  # Only draw remaining path
                    pygame.draw.circle(self.screen, LIGHT_BLUE, 
                                    (c * CELL_SIZE + CELL_SIZE//2, 
                                     r * CELL_SIZE + CELL_SIZE//2), 8)
        
        # Draw robot
        if self.current_path and self.path_index < len(self.current_path) and self.animation_progress < 1.0:
            # Animated movement
            current = self.robot_pos
            next_pos = self.current_path[self.path_index]
            
            # Interpolate position
            r = current[0] + (next_pos[0] - current[0]) * self.animation_progress
            c = current[1] + (next_pos[1] - current[1]) * self.animation_progress
            
            x = c * CELL_SIZE + CELL_SIZE // 4
            y = r * CELL_SIZE + CELL_SIZE // 4
        else:
            # Static position
            r, c = self.robot_pos
            x = c * CELL_SIZE + CELL_SIZE // 4
            y = r * CELL_SIZE + CELL_SIZE // 4
        
        # Draw robot body
        robot_rect = pygame.Rect(x, y, CELL_SIZE // 2, CELL_SIZE // 2)
        pygame.draw.rect(self.screen, BLUE, robot_rect)
        pygame.draw.rect(self.screen, BLACK, robot_rect, 2)
        
        # Draw robot carrying indicator
        if self.carrying_product:
            package_rect = pygame.Rect(x + 5, y - 10, CELL_SIZE // 2 - 10, 10)
            pygame.draw.rect(self.screen, YELLOW, package_rect)
            pygame.draw.rect(self.screen, BLACK, package_rect, 1)
        
        # Draw sidebar
        sidebar_rect = pygame.Rect(WINDOW_SIZE[0], 0, SIDEBAR_WIDTH, WINDOW_SIZE[1])
        pygame.draw.rect(self.screen, GRAY, sidebar_rect)
        
        # Sidebar title
        title_text = self.big_font.render("Warehouse Robot Control", True, BLACK)
        self.screen.blit(title_text, (WINDOW_SIZE[0] + 10, 10))
        
        # Draw robot status
        status_text = self.font.render(f"Position: {self.robot_pos}", True, BLACK)
        self.screen.blit(status_text, (WINDOW_SIZE[0] + 10, 50))
        
        if self.carrying_product:
            product_text = self.font.render(f"Carrying: {self.carrying_product}", True, BLACK)
        else:
            product_text = self.font.render("Carrying: Nothing", True, BLACK)
        self.screen.blit(product_text, (WINDOW_SIZE[0] + 10, 70))
        
        # Draw command input box
        input_rect = pygame.Rect(WINDOW_SIZE[0] + 10, WINDOW_SIZE[1] - 40, SIDEBAR_WIDTH - 20, 30)
        color = LIGHT_BLUE if self.input_active else WHITE
        pygame.draw.rect(self.screen, color, input_rect)
        pygame.draw.rect(self.screen, BLACK, input_rect, 2)
        
        input_text = self.font.render(self.command_input, True, BLACK)
        self.screen.blit(input_text, (input_rect.x + 5, input_rect.y + 5))
        
        # Draw command prompt
        prompt_text = self.font.render("Enter command:", True, BLACK)
        self.screen.blit(prompt_text, (WINDOW_SIZE[0] + 10, WINDOW_SIZE[1] - 60))
        
        # Draw logs
        log_rect = pygame.Rect(WINDOW_SIZE[0] + 10, 100, SIDEBAR_WIDTH - 20, WINDOW_SIZE[1] - 170)
        pygame.draw.rect(self.screen, WHITE, log_rect)
        pygame.draw.rect(self.screen, BLACK, log_rect, 1)
        
        log_title = self.font.render("Activity Log:", True, BLACK)
        self.screen.blit(log_title, (WINDOW_SIZE[0] + 10, 80))
        
        # Display recent logs (last 10)
        visible_logs = self.logs[-10:] if len(self.logs) > 10 else self.logs
        for i, log in enumerate(visible_logs):
            # Wrap long text
            words = log.split()
            lines = []
            current_line = ""
            for word in words:
                test_line = current_line + " " + word if current_line else word
                if self.font.size(test_line)[0] < SIDEBAR_WIDTH - 40:
                    current_line = test_line
                else:
                    lines.append(current_line)
                    current_line = word
            if current_line:
                lines.append(current_line)
                
            for j, line in enumerate(lines):
                log_text = self.font.render(line, True, BLACK)
                self.screen.blit(log_text, (log_rect.x + 5, log_rect.y + 5 + i*40 + j*20))
        
        # Task completion notification
        if self.task_complete:
            complete_text = self.font.render("✓ Task Complete", True, GREEN)
            self.screen.blit(complete_text, (WINDOW_SIZE[0] + SIDEBAR_WIDTH - 120, 50))
        
        pygame.display.flip()
    
    def handle_events(self):
        for event in pygame.event.get():
            if event.type == QUIT:
                self.running = False
                
            elif event.type == MOUSEBUTTONDOWN:
                # Check if click is in command input box
                input_rect = pygame.Rect(WINDOW_SIZE[0] + 10, WINDOW_SIZE[1] - 40, SIDEBAR_WIDTH - 20, 30)
                
                if input_rect.collidepoint(event.pos):
                    self.input_active = True
                else:
                    self.input_active = False
                    
                    # Check if click is on grid
                    if event.pos[0] < WINDOW_SIZE[0] and event.pos[1] < WINDOW_SIZE[1]:
                        col = event.pos[0] // CELL_SIZE
                        row = event.pos[1] // CELL_SIZE
                        
                        if (row, col) in self.products:
                            self.logs.append(f"Product at ({row}, {col}): {self.products[(row, col)]}")
                        elif (row, col) in self.shelves:
                            self.logs.append(f"Empty shelf at ({row}, {col})")
                        elif (row, col) in self.obstacles:
                            self.logs.append(f"Obstacle at ({row}, {col})")
                        else:
                            self.logs.append(f"Empty space at ({row}, {col})")
                
            elif event.type == KEYDOWN:
                if self.input_active:
                    if event.key == K_RETURN:
                        self.process_command(self.command_input)
                        self.command_input = ""
                    elif event.key == K_BACKSPACE:
                        self.command_input = self.command_input[:-1]
                    else:
                        self.command_input += event.unicode
    
    def run(self):
        self.logs.append("Enter 'help' for available commands.")
        
        while self.running:
            self.handle_events()
            
            if not self.paused:
                self.update()
                
            self.draw()
            self.clock.tick(60)
            
        pygame.quit()
        sys.exit()

def heuristic(a, b):
    """Manhattan distance heuristic for A* pathfinding"""
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def reconstruct_path(came_from, current):
    """Reconstruct path from A* search results"""
    path = [current]
    while current in came_from:
        current = came_from[current]
        path.append(current)
    return path[::-1]

def random_chance(percent):
    """Return True with a certain percentage chance"""
    return pygame.time.get_ticks() % 100 < percent

if __name__ == "__main__":
    # Check if image file exists, if not create placeholder
    if not os.path.exists("3d_ware.jpg"):
        print("Warning: '3d_ware.jpg' not found. Using plain background.")
        
    # Initialize and run simulation
    warehouse = WarehouseSimulation()
    warehouse.run()