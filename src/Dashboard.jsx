import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { 
  Container, Row, Col, Card, Badge, 
  ProgressBar, ListGroup, Button 
} from 'react-bootstrap';
import { 
  ArrowUp, ArrowDown, ArrowRight, 
  ZoomIn, Gear, Lightning, 
  ExclamationTriangle, Check,
  ArrowsFullscreen, PlusCircle, List
} from 'react-bootstrap-icons';

const WarehouseDashboard = () => {
  return (
    <div className="bg-dark text-light" style={{ 
      minHeight: '100vh', 
      width: 'calc(100% - 280px)',
      position: 'fixed',
      top: 0,
      left: '280px',
      right: 0,
      bottom: 0,
      overflow: 'auto',
      backgroundImage: 'radial-gradient(circle at 50% 50%, #273244 0%, #1a1e2a 100%)',
    }}>
      <Container fluid className="py-3">
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h3 className="text-light fw-bold mb-0 ms-2">
              <span className="text-primary">ROBO</span>WAREHOUSE 
              <span className="ms-2 fs-6 text-secondary">LIVE MONITORING</span>
            </h3>
          </Col>
          <Col xs="auto">
            <div className="d-flex">
              <Button variant="outline-primary" size="sm" className="rounded-pill me-2">
                <List className="me-1" /> Dashboard
              </Button>
              <Button variant="outline-secondary" size="sm" className="rounded-pill me-2">
                <Gear className="me-1" /> Settings
              </Button>
            </div>
          </Col>
        </Row>

        {/* Status Cards Row */}
        <Row className="mb-4 g-3">
          <Col sm={6} lg={3}>
            <Card bg="dark" text="light" className="h-100 border-0 shadow" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="text-secondary mb-0 small">ACTIVE ROBOTS</Card.Title>
                    <h2 className="my-2 fw-bold">24</h2>
                    <small className="text-success d-flex align-items-center">
                      <ArrowUp /> <span className="ms-1">3% from yesterday</span>
                    </small>
                  </div>
                  <div className="bg-success bg-opacity-10 p-2 rounded-circle">
                    <Check size={24} className="text-success" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card bg="dark" text="light" className="h-100 border-0 shadow" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="text-secondary mb-0 small">IDLE ROBOTS</Card.Title>
                    <h2 className="my-2 fw-bold">8</h2>
                    <small className="text-secondary d-flex align-items-center">
                      <ArrowRight /> <span className="ms-1">Unchanged</span>
                    </small>
                  </div>
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
                    <div className="text-primary" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '3px solid', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card bg="dark" text="light" className="h-100 border-0 shadow" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="text-secondary mb-0 small">CHARGING</Card.Title>
                    <h2 className="my-2 fw-bold">12</h2>
                    <small className="text-warning d-flex align-items-center">
                      <ArrowUp /> <span className="ms-1">2 more than usual</span>
                    </small>
                  </div>
                  <div className="bg-warning bg-opacity-10 p-2 rounded-circle">
                    <Lightning size={24} className="text-warning" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col sm={6} lg={3}>
            <Card bg="dark" text="light" className="h-100 border-0 shadow" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="text-secondary mb-0 small">ISSUES</Card.Title>
                    <h2 className="my-2 fw-bold">3</h2>
                    <small className="text-danger d-flex align-items-center">
                      <ArrowDown /> <span className="ms-1">1 needs immediate attention</span>
                    </small>
                  </div>
                  <div className="bg-danger bg-opacity-10 p-2 rounded-circle">
                    <ExclamationTriangle size={24} className="text-danger" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Main Content Row */}
        <Row className="g-4">
          {/* Map Section */}
          <Col lg={8}>
            <Card bg="dark" text="light" className="border-0 shadow h-100" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                <h5 className="mb-0 text-primary fw-bold">WAREHOUSE MAP VIEW</h5>
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2 rounded-pill">
                    <ZoomIn size={14} className="me-1" /> Zoom
                  </Button>
                  <Button variant="outline-primary" size="sm" className="rounded-pill">
                    <ArrowsFullscreen size={14} className="me-1" /> Fullscreen
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="position-relative" style={{ height: '500px' }}>
                {/* Map Grid Background */}
                <div className="position-absolute top-0 start-0 w-100 h-100" 
                     style={{ 
                       backgroundImage: 'linear-gradient(rgba(42, 46, 58, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(42, 46, 58, 0.3) 1px, transparent 1px)', 
                       backgroundSize: '30px 30px',
                       backgroundColor: '#1e2130',
                       borderRadius: '0 0 12px 12px',
                       boxShadow: 'inset 0 0 40px rgba(0,0,0,0.2)',
                       zIndex: 0
                     }}>
                </div>
                
                {/* Map Legend */}
                <div className="position-absolute top-0 end-0 m-3 p-2 rounded" style={{ 
                  zIndex: 1,
                  backgroundColor: 'rgba(23, 25, 36, 0.7)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <h6 className="text-primary mb-2 small">MAP LEGEND</h6>
                  <div className="d-flex align-items-center mb-1">
                    <div className="me-2" style={{ width: '12px', height: '12px', backgroundColor: '#6c757d', border: '1px solid #adb5bd', borderRadius: '2px' }}></div>
                    <small className="text-light">Loading Zone</small>
                  </div>
                  <div className="d-flex align-items-center mb-1">
                    <div className="me-2" style={{ width: '12px', height: '12px', backgroundColor: '#6f42c1', border: '1px solid #adb5bd', borderRadius: '2px' }}></div>
                    <small className="text-light">Storage Area</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="me-2" style={{ width: '12px', height: '12px', backgroundColor: '#fd7e14', border: '1px solid #adb5bd', borderRadius: '2px' }}></div>
                    <small className="text-light">Charging Station</small>
                  </div>
                </div>
                
                {/* Zones (improved) */}
                <div className="position-absolute" style={{ 
                  top: '20%', 
                  left: '8%', 
                  width: '150px', 
                  height: '150px', 
                  border: '1px solid rgba(111, 66, 193, 0.5)', 
                  backgroundColor: 'rgba(111, 66, 193, 0.15)', 
                  borderRadius: '8px',
                  boxShadow: '0 0 15px rgba(111, 66, 193, 0.2)',
                  zIndex: 1 
                }}>
                  <div className="p-2 text-center">
                    <small className="text-light">Storage Area</small>
                  </div>
                </div>
                
                <div className="position-absolute" style={{ 
                  top: '5%', 
                  left: '25%', 
                  width: '100px', 
                  height: '80px', 
                  border: '1px solid rgba(108, 117, 125, 0.5)', 
                  backgroundColor: 'rgba(108, 117, 125, 0.15)', 
                  borderRadius: '8px',
                  boxShadow: '0 0 15px rgba(108, 117, 125, 0.2)',
                  zIndex: 1 
                }}>
                  <div className="p-2 text-center">
                    <small className="text-light">Loading Zone</small>
                  </div>
                </div>
                
                <div className="position-absolute" style={{ 
                  bottom: '15%', 
                  right: '15%', 
                  width: '100px', 
                  height: '80px', 
                  border: '1px solid rgba(253, 126, 20, 0.5)', 
                  backgroundColor: 'rgba(253, 126, 20, 0.15)', 
                  borderRadius: '8px',
                  boxShadow: '0 0 15px rgba(253, 126, 20, 0.2)',
                  zIndex: 1 
                }}>
                  <div className="p-2 text-center">
                    <small className="text-light">Charging Station</small>
                  </div>
                </div>
                
                {/* Robots (improved) */}
                <div className="position-absolute" style={{ top: '30%', left: '30%', zIndex: 2 }}>
                  <div className="bg-success rounded-circle d-flex justify-content-center align-items-center" 
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      boxShadow: '0 0 10px rgba(32, 201, 151, 0.7)',
                      animation: 'pulse 2s infinite'
                    }}>
                  </div>
                  <div className="mt-1 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontSize: '10px' }}>
                    R-012
                  </div>
                </div>
                
                <div className="position-absolute" style={{ top: '40%', left: '60%', zIndex: 2 }}>
                  <div className="bg-danger rounded-circle d-flex justify-content-center align-items-center" 
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      boxShadow: '0 0 10px rgba(220, 53, 69, 0.7)',
                      animation: 'pulse 1s infinite'
                    }}>
                  </div>
                  <div className="mt-1 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontSize: '10px' }}>
                    R-024
                  </div>
                </div>
                
                <div className="position-absolute" style={{ top: '60%', left: '62%', zIndex: 2 }}>
                  <div className="bg-success rounded-circle d-flex justify-content-center align-items-center" 
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      boxShadow: '0 0 10px rgba(32, 201, 151, 0.7)',
                      animation: 'pulse 2s infinite'
                    }}>
                  </div>
                  <div className="mt-1 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontSize: '10px' }}>
                    R-018
                  </div>
                </div>
                
                <div className="position-absolute" style={{ top: '60%', left: '68%', zIndex: 2 }}>
                  <div className="bg-warning rounded-circle d-flex justify-content-center align-items-center" 
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      boxShadow: '0 0 10px rgba(255, 193, 7, 0.7)',
                      animation: 'pulse 2s infinite'
                    }}>
                  </div>
                  <div className="mt-1 px-2 py-1 rounded" style={{ backgroundColor: 'rgba(0,0,0,0.5)', fontSize: '10px' }}>
                    R-005
                  </div>
                </div>
                
                {/* Path Lines (improved) */}
                <svg className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <path d="M 80,100 L 300,300" stroke="#20c997" strokeWidth="2" strokeDasharray="5,5" fill="none" filter="url(#glow)" />
                  <path d="M 180,300 L 300,400" stroke="#fd7e14" strokeWidth="2" strokeDasharray="5,5" fill="none" filter="url(#glow)" />
                  <path d="M 300,400 L 400,250" stroke="#0d6efd" strokeWidth="2" strokeDasharray="5,5" fill="none" filter="url(#glow)" />
                </svg>

                {/* Add a subtle grid overlay */}
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(30, 33, 48, 0) 0%, rgba(30, 33, 48, 0.8) 100%)',
                  zIndex: 1
                }}></div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Right Column */}
          <Col lg={4}>
            {/* Current Tasks Panel */}
            <Card bg="dark" text="light" className="border-0 shadow mb-4" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Header className="d-flex justify-content-between align-items-center border-0 bg-transparent">
                <h5 className="mb-0 text-primary fw-bold">CURRENT TASKS</h5>
                <Button variant="outline-primary" size="sm" className="rounded-pill">
                  <PlusCircle size={14} className="me-1" /> New Task
                </Button>
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item className="bg-transparent text-light border-0 border-top border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0 fw-bold">Product Delivery</h6>
                    <Badge bg="primary" className="rounded-pill">In Progress</Badge>
                  </div>
                  <p className="mb-1 small">Robot: R-012 • Est: 5 min</p>
                  <p className="mb-2 small">From: Storage A • To: Loading Bay 2</p>
                  <ProgressBar variant="success" now={60} className="bg-dark" style={{ height: '6px', borderRadius: '3px' }} />
                </ListGroup.Item>
                
                <ListGroup.Item className="bg-transparent text-light border-0 border-top border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0 fw-bold">Component Transfer</h6>
                    <Badge bg="warning" text="dark" className="rounded-pill">Queued</Badge>
                  </div>
                  <p className="mb-1 small">Robot: R-018 • Est: 8 min</p>
                  <p className="mb-2 small">From: Storage C • To: Assembly Line</p>
                  <ProgressBar variant="warning" now={25} className="bg-dark" style={{ height: '6px', borderRadius: '3px' }} />
                </ListGroup.Item>
                
                <ListGroup.Item className="bg-transparent text-light border-0 border-top border-secondary border-opacity-25">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h6 className="mb-0 fw-bold">Inventory Count</h6>
                    <Badge bg="secondary" className="rounded-pill">Scheduled</Badge>
                  </div>
                  <p className="mb-1 small">Robot: R-007 • Est: 12 min</p>
                  <p className="mb-2 small">Location: Storage Area B</p>
                  <ProgressBar variant="secondary" now={15} className="bg-dark" style={{ height: '6px', borderRadius: '3px' }} />
                </ListGroup.Item>
              </ListGroup>
            </Card>
            
            {/* Fleet Health Panel */}
            <Card bg="dark" text="light" className="border-0 shadow" style={{ 
              borderRadius: '12px',
              backgroundColor: 'rgba(23, 25, 36, 0.6)',
              backdropFilter: 'blur(10px)',
            }}>
              <Card.Header className="border-0 bg-transparent">
                <h5 className="mb-0 text-primary fw-bold">FLEET HEALTH</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Average Battery Level</span>
                    <span className="fw-bold text-info">72%</span>
                  </div>
                  <ProgressBar variant="info" now={72} className="bg-dark" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Maintenance Status</span>
                    <span className="fw-bold text-warning">5 Due Soon</span>
                  </div>
                  <ProgressBar variant="warning" now={60} className="bg-dark" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
                
                <div className="mb-4">
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-light">Operational Efficiency</span>
                    <span className="fw-bold text-success">94%</span>
                  </div>
                  <ProgressBar variant="success" now={94} className="bg-dark" style={{ height: '8px', borderRadius: '4px' }} />
                </div>
                
                <Row className="text-center g-3 mt-4">
                  <Col xs={6}>
                    <Card bg="dark" style={{ 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(30, 33, 48, 0.4)',
                    }}>
                      <Card.Body className="py-3">
                        <div className="small text-secondary">Total Distance</div>
                        <h4 className="mb-0 fw-bold text-primary">842 km</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col xs={6}>
                    <Card bg="dark" style={{ 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(30, 33, 48, 0.4)',
                    }}>
                      <Card.Body className="py-3">
                        <div className="small text-secondary">Deliveries Today</div>
                        <h4 className="mb-0 fw-bold text-primary">187</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col xs={6}>
                    <Card bg="dark" style={{ 
                      border: '1px solid rgba(255, 255, 255, 0.1)', 
                      borderRadius: '8px',
                      backgroundColor: 'rgba(30, 33, 48, 0.4)',
                    }}>
                      <Card.Body className="py-3">
                        <div className="small text-secondary">Avg. Speed</div>
                        <h4 className="mb-0 fw-bold text-primary">4.2 m/s</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                  
                  <Col xs={6}>
                    <Card bg="dark" style={{ 
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(30, 33, 48, 0.4)',
                    }}>
                      <Card.Body className="py-3">
                        <div className="small text-secondary">Total Robots</div>
                        <h4 className="mb-0 fw-bold text-primary">47</h4>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      {/* CSS for animations */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default WarehouseDashboard;