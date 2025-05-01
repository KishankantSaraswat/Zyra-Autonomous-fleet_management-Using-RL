import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Container, Row, Col, InputGroup, Badge, ProgressBar } from 'react-bootstrap';
import { Upload, Clock, Check, ChevronRight, Clipboard, Box, Search, Battery, AlertTriangle } from 'lucide-react';

const TaskManager = () => {
  const [selectedTask, setSelectedTask] = useState('product');
  const [autoAssign, setAutoAssign] = useState(true);
  const [selectedRobot, setSelectedRobot] = useState('robot-01');
  const [activeStep, setActiveStep] = useState(1);

  // Sample data for visualization
  const robotData = [
    { id: 'robot-01', code: 'R01', name: 'Robot-01', battery: 87, status: 'Available', lastActive: '2h ago' },
    { id: 'robot-18', code: 'R13', name: 'Robot-18', battery: 65, status: 'Available', lastActive: '4h ago' },
    { id: 'robot-24', code: 'R24', name: 'Robot-24', battery: 76, status: 'Available', lastActive: '1h ago' },
    { id: 'robot-37', code: 'R37', name: 'Robot-37', battery: 92, status: 'Available', lastActive: '30m ago' },
  ];

  const getBatteryColor = (level) => {
    if (level > 70) return 'success';
    if (level > 30) return 'warning';
    return 'danger';
  };

  const handleContinue = () => {
    setActiveStep(2);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: 'calc(100% - 280px)',
      position: 'fixed',
      top: 0,
      left: '280px',
      right: 0,
      bottom: 0,
      overflow: 'auto',
      backgroundColor: '#1a1e2a'
    }}>
      <Container fluid className="p-0">
        {/* Header */}
        <div className="bg-primary text-white py-3 px-4 mb-0">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="m-0">Warehouse Task Manager</h4>
            <div>
              <span className="me-3">Admin Dashboard</span>
              <Button variant="outline-light" size="sm">Sign Out</Button>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-dark text-white py-3 px-4">
          <Row className="justify-content-center">
            <Col xs={12} md={10}>
              <div className="d-flex justify-content-between align-items-center position-relative">
                {/* Progress line */}
                <div 
                  className="position-absolute" 
                  style={{
                    height: '4px',
                    background: '#6c757d',
                    width: '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1
                  }}
                />
                <div 
                  className="position-absolute" 
                  style={{
                    height: '4px',
                    background: '#0d6efd',
                    width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 1,
                    transition: 'width 0.5s ease'
                  }}
                />

                {/* Step 1 */}
                <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 2 }}>
                  <div className={`d-flex align-items-center justify-content-center rounded-circle ${activeStep >= 1 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '40px', height: '40px', transition: 'background-color 0.3s ease' }}>
                    {activeStep > 1 ? <Check size={20} /> : <span>1</span>}
                  </div>
                  <span className="mt-2 text-center">Select Warehouse</span>
                </div>

                {/* Step 2 */}
                <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 2 }}>
                  <div className={`d-flex align-items-center justify-content-center rounded-circle ${activeStep >= 2 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '40px', height: '40px', transition: 'background-color 0.3s ease' }}>
                    {activeStep > 2 ? <Check size={20} /> : <span>2</span>}
                  </div>
                  <span className="mt-2 text-center">Update Tasks</span>
                </div>

                {/* Step 3 */}
                <div className="d-flex flex-column align-items-center position-relative" style={{ zIndex: 2 }}>
                  <div className={`d-flex align-items-center justify-content-center rounded-circle ${activeStep >= 3 ? 'bg-primary' : 'bg-secondary'}`} style={{ width: '40px', height: '40px', transition: 'background-color 0.3s ease' }}>
                    <span>3</span>
                  </div>
                  <span className="mt-2 text-center">Confirm</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="bg-dark text-white p-4">
          <Row className="justify-content-center">
            <Col xs={12} md={10}>
              {/* Warehouse Selection */}
              <Card className="bg-dark border-0 mb-4 shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary p-2 rounded me-3">
                      <Box size={24} />
                    </div>
                    <h5 className="m-0">Select Destination Warehouse</h5>
                  </div>
                  <Form.Select className="mt-2 bg-dark text-white border-secondary">
                    <option>Choose a warehouse</option>
                    <option>Northeast Distribution Center</option>
                    <option>Central Fulfillment Hub</option>
                    <option>West Coast Storage Facility</option>
                  </Form.Select>
                </Card.Body>
              </Card>

              {/* Task Type Selection */}
              <Card className="bg-dark border-0 mb-4 shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-info p-2 rounded me-3">
                      <Clipboard size={24} />
                    </div>
                    <h5 className="m-0">Select Task Type</h5>
                  </div>
                  <Row className="g-3 mt-1">
                    <Col xs={12} md={4}>
                      <Card 
                        className={`text-white border h-100 ${selectedTask === 'product' ? 'border-primary bg-dark' : 'bg-dark border-secondary'}`} 
                        onClick={() => setSelectedTask('product')}
                        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        <Card.Body>
                          <div className="d-flex align-items-start mb-2">
                            <div className={`rounded-circle p-1 me-2 ${selectedTask === 'product' ? 'bg-primary' : 'bg-secondary'}`}>
                              {selectedTask === 'product' && <Check size={16} />}
                            </div>
                            <h6 className="mb-0">Product Delivery</h6>
                          </div>
                          <p className="small text-secondary mb-1">Transport items from storage to loading zones</p>
                          <Badge bg="success" className="text-white" style={{ fontSize: '0.7rem' }}>Most Common</Badge>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={12} md={4}>
                      <Card 
                        className={`text-white border h-100 ${selectedTask === 'inventory' ? 'border-primary bg-dark' : 'bg-dark border-secondary'}`} 
                        onClick={() => setSelectedTask('inventory')}
                        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        <Card.Body>
                          <div className="d-flex align-items-start mb-2">
                            <div className={`rounded-circle p-1 me-2 ${selectedTask === 'inventory' ? 'bg-primary' : 'bg-secondary'}`}>
                              {selectedTask === 'inventory' && <Check size={16} />}
                            </div>
                            <h6 className="mb-0">Inventory Scan</h6>
                          </div>
                          <p className="small text-secondary mb-0">Scan and verify inventory in designated areas</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col xs={12} md={4}>
                      <Card 
                        className={`text-white border h-100 ${selectedTask === 'custom' ? 'border-primary bg-dark' : 'bg-dark border-secondary'}`} 
                        onClick={() => setSelectedTask('custom')}
                        style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                      >
                        <Card.Body>
                          <div className="d-flex align-items-start mb-2">
                            <div className={`rounded-circle p-1 me-2 ${selectedTask === 'custom' ? 'bg-primary' : 'bg-secondary'}`}>
                              {selectedTask === 'custom' && <Check size={16} />}
                            </div>
                            <h6 className="mb-0">Custom Task</h6>
                          </div>
                          <p className="small text-secondary mb-0">Define custom task parameters and routes</p>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Upload Task Data */}
              <Card className="bg-dark border-0 mb-4 shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-success p-2 rounded me-3">
                      <Upload size={24} />
                    </div>
                    <h5 className="m-0">Upload Task Data</h5>
                  </div>
                  <Row className="mt-2">
                    <Col md={5}>
                      <Card className="bg-dark border border-secondary text-center p-4" style={{ borderStyle: 'dashed' }}>
                        <Card.Body>
                          <div className="rounded-circle bg-info bg-opacity-10 p-3 d-inline-flex mb-3">
                            <Upload className="text-info" size={36} />
                          </div>
                          <p className="text-info mb-1 fw-bold">Click to upload or drag and drop</p>
                          <p className="small text-secondary">CSV, JSON or Excel files</p>
                          <a href="#" className="btn btn-outline-info btn-sm mt-2">Download sample template</a>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={7}>
                      <Card className="bg-dark border border-secondary h-100">
                        <Card.Body>
                          <h6 className="d-flex align-items-center">
                            <Search size={16} className="me-2" />
                            Manual Entry
                          </h6>
                          <Form>
                            <Form.Group className="mb-3">
                              <Form.Label className="small">Product SKU</Form.Label>
                              <Form.Control type="text" placeholder="Enter SKU" className="bg-dark text-white border-secondary" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="small">Quantity</Form.Label>
                              <Form.Control type="number" placeholder="Enter quantity" className="bg-dark text-white border-secondary" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label className="small">Destination</Form.Label>
                              <Form.Control type="text" placeholder="Enter location code" className="bg-dark text-white border-secondary" />
                            </Form.Group>
                            <Button variant="primary" className="w-100">
                              <Check size={16} className="me-2" />
                              Add Item
                            </Button>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Schedule */}
              <Card className="bg-dark border-0 mb-4 shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-warning p-2 rounded me-3">
                      <Clock size={24} />
                    </div>
                    <h5 className="m-0">Schedule</h5>
                  </div>
                  <Row className="mt-2">
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">Priority Level</Form.Label>
                        <div className="d-flex">
                          <Button 
                            variant={`outline-${selectedTask === 'high-priority' ? 'danger' : 'secondary'}`} 
                            className="flex-grow-1 me-2"
                            onClick={() => setSelectedTask('high-priority')}
                          >
                            <AlertTriangle size={16} className="me-1" />
                            High
                          </Button>
                          <Button 
                            variant={`outline-${selectedTask === 'normal-priority' ? 'primary' : 'secondary'}`} 
                            className="flex-grow-1 me-2"
                            onClick={() => setSelectedTask('normal-priority')}
                          >
                            Normal
                          </Button>
                          <Button 
                            variant={`outline-${selectedTask === 'low-priority' ? 'success' : 'secondary'}`} 
                            className="flex-grow-1"
                            onClick={() => setSelectedTask('low-priority')}
                          >
                            Low
                          </Button>
                        </div>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="small">Execution Time</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" placeholder="mm/dd/yyyy --:--" className="bg-dark text-white border-secondary" />
                          <Button variant="outline-secondary">
                            <Clock size={16} />
                          </Button>
                        </InputGroup>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Robot Assignment */}
              <Card className="bg-dark border-0 mb-4 shadow">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-danger p-2 rounded me-3">
                      <Battery size={24} />
                    </div>
                    <h5 className="m-0">Robot Assignment</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2 mb-3">
                    <div>
                      <Badge bg="info" className="me-2">Available Robots: 32</Badge>
                      <Badge bg="warning">In Use: 18</Badge>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="me-2">Auto-assign</span>
                      <Form.Check 
                        type="switch"
                        id="auto-assign-switch"
                        checked={autoAssign}
                        onChange={() => setAutoAssign(!autoAssign)}
                      />
                    </div>
                  </div>
                  <Row className="g-3">
                    {robotData.map(robot => (
                      <Col xs={6} md={3} key={robot.id}>
                        <Card 
                          className={`text-white border ${selectedRobot === robot.id ? 'border-primary' : 'border-secondary'}`}
                          onClick={() => setSelectedRobot(robot.id)}
                          style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                        >
                          <Card.Body className="p-3">
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <div className="bg-info text-white rounded px-2 py-1 mb-2" style={{width: 'fit-content'}}>
                                  {robot.code}
                                </div>
                                <div className="fw-bold">{robot.name}</div>
                                <div className="d-flex align-items-center mt-2">
                                  <Battery size={14} className={`text-${getBatteryColor(robot.battery)} me-1`} />
                                  <div className="w-100">
                                    <ProgressBar 
                                      variant={getBatteryColor(robot.battery)} 
                                      now={robot.battery} 
                                      style={{ height: '6px' }} 
                                    />
                                  </div>
                                  <span className="ms-1 small">{robot.battery}%</span>
                                </div>
                                <div className="small text-secondary mt-1">Last active: {robot.lastActive}</div>
                              </div>
                              <Form.Check 
                                type="checkbox"
                                className="ms-2"
                                checked={selectedRobot === robot.id}
                                onChange={() => setSelectedRobot(robot.id)}
                              />
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <div className="text-center mt-3">
                    <Button variant="outline-info" size="sm">
                      View all robots
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </Card.Body>
              </Card>

              {/* Action Buttons */}
              <div className="d-flex justify-content-between mt-4">
                <Button variant="outline-light">
                  Cancel
                </Button>
                <div>
                  <Button variant="outline-light" className="me-2">
                    Save Draft
                  </Button>
                  <Button variant="primary" onClick={handleContinue}>
                    Continue
                    <ChevronRight size={16} className="ms-1" />
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default TaskManager;