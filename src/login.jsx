import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Nav, Tab } from 'react-bootstrap';
import { BsGoogle, BsFacebook, BsShieldLock, BsEyeSlash, BsEye } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);
  const [isHoveringSocial, setIsHoveringSocial] = useState({ google: false, facebook: false });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0f172a',
        backgroundImage: `
          radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 30% 70%, rgba(14, 165, 233, 0.08) 0%, transparent 40%),
          linear-gradient(135deg, rgba(15, 23, 42, 0.97) 0%, rgba(23, 36, 64, 0.97) 100%), 
          url("https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Container fluid className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="text-center mb-4">
          <div className="d-flex flex-column align-items-center">
            <div style={{ 
              width: '60px', 
              height: '60px', 
              background: 'linear-gradient(135deg, #0dcaf0 0%, #0d8af0 100%)', 
              borderRadius: '16px', 
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 25px rgba(13, 202, 240, 0.3), 0 0 50px rgba(13, 202, 240, 0.1)',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease',
              animation: 'float 4s ease-in-out infinite'
            }}>
              <BsShieldLock size={30} color="white" />
            </div>
            <h2 className="text-white fw-bold mb-1" 
              style={{ 
                letterSpacing: '-0.5px',
                fontSize: '2.2rem',
                background: 'linear-gradient(135deg, #ffffff 20%, #94a3b8 80%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              AutoFleet
            </h2>
            <p className="text-white-50 mb-5" style={{ fontSize: '1.1rem' }}>Warehouse Delivery Management</p>
          </div>
        </div>

        <div 
          className="rounded-4 w-100 overflow-hidden shadow-lg" 
          style={{ 
            maxWidth: '450px', 
            backgroundColor: 'rgba(30, 41, 59, 0.85)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(13, 138, 240, 0.06)',
            transform: 'translateY(0)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
        >
          <Tab.Container defaultActiveKey="signin">
            <Nav variant="tabs" className="border-0">
              <Nav.Item className="w-50">
                <Nav.Link 
                  eventKey="signin" 
                  className="text-center border-0 py-3" 
                  style={{ 
                    backgroundColor: 'rgba(30, 41, 59, 0.95)', 
                    color: 'white', 
                    borderRadius: '0',
                    transition: 'all 0.2s ease',
                    fontWeight: '500',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span className="position-relative z-1">Sign In</span>
                  <div className="position-absolute" style={{
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '3px',
                    background: 'linear-gradient(90deg, #0dcaf0, #0d8af0)',
                    transform: 'scaleX(1)',
                    transformOrigin: 'bottom left',
                    transition: 'transform 0.3s ease'
                  }}></div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="w-50">
                <Nav.Link 
                  eventKey="signup" 
                  className="text-center border-0 py-3" 
                  style={{ 
                    backgroundColor: 'rgba(26, 35, 50, 0.9)', 
                    color: '#94a3b8',
                    borderRadius: '0',
                    transition: 'all 0.2s ease',
                    fontWeight: '500',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span className="position-relative z-1">Sign Up</span>
                  <div className="position-absolute" style={{
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    height: '3px',
                    background: 'linear-gradient(90deg, #0dcaf0, #0d8af0)',
                    transform: 'scaleX(0)',
                    transformOrigin: 'bottom right',
                    transition: 'transform 0.3s ease'
                  }}></div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="signin" className="p-4 pt-5">
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Label className="text-white mb-2" style={{ fontWeight: '500', fontSize: '14px' }}>
                      Email Address
                    </Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="name@company.com" 
                      className="py-3 px-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                        color: 'white', 
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        transition: 'all 0.3s',
                        fontSize: '15px',
                        boxShadow: 'none',
                        backdropFilter: 'blur(5px)',
                      }}
                      onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <Form.Label className="text-white" style={{ fontWeight: '500', fontSize: '14px' }}>
                        Password
                      </Form.Label>
                      <a 
                        href="#" 
                        className="text-info" 
                        style={{ 
                          fontSize: '14px', 
                          textDecoration: 'none',
                          transition: 'all 0.2s'
                        }}
                      >
                        Forgot password?
                      </a>
                    </div>
                    <div className="position-relative">
                      <Form.Control 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="py-3 px-3"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                          color: 'white', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          transition: 'all 0.3s',
                          fontSize: '15px',
                          paddingRight: '3rem',
                          boxShadow: 'none',
                          backdropFilter: 'blur(5px)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                      <div 
                        className="position-absolute" 
                        style={{ 
                          top: '50%', 
                          right: '15px', 
                          transform: 'translateY(-50%)', 
                          cursor: 'pointer',
                          color: '#94a3b8'
                        }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
                      </div>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Check 
                      type="checkbox" 
                      id="remember-me"
                      label="Remember me" 
                      className="text-white"
                      style={{ fontSize: '14px' }}
                    />
                  </Form.Group>

                  <Button 
                    variant="info" 
                    className="w-100 text-white py-3 fw-bold position-relative overflow-hidden" 
                    style={{ 
                      background: isHoveringSignIn ? 
                        'linear-gradient(135deg, #0d8af0 0%, #0dcaf0 100%)' : 
                        'linear-gradient(135deg, #0dcaf0 0%, #0d8af0 100%)',
                      border: 'none',
                      borderRadius: '10px',
                      boxShadow: isHoveringSignIn ? 
                        '0 8px 20px rgba(13, 202, 240, 0.4)' : 
                        '0 6px 15px rgba(13, 202, 240, 0.2)',
                      transition: 'all 0.3s ease',
                      transform: isHoveringSignIn ? 'translateY(-2px)' : 'translateY(0)',
                      fontSize: '16px',
                    }}
                    onMouseEnter={() => setIsHoveringSignIn(true)}
                    onMouseLeave={() => setIsHoveringSignIn(false)}
                    type="submit"
                  >
                    Sign in to account
                  </Button>

                  <div className="position-relative my-4">
                    <hr style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <span 
                      className="position-absolute text-white-50 px-3" 
                      style={{ 
                        top: '50%', 
                        left: '50%', 
                        transform: 'translate(-50%, -50%)', 
                        backgroundColor: 'rgba(30, 41, 59, 0.9)',
                        fontSize: '14px'
                      }}
                    >
                      Or continue with
                    </span>
                  </div>

                  <Row className="g-3">
                    <Col xs={6}>
                      <Button 
                        variant="dark" 
                        className="w-100 py-3 d-flex align-items-center justify-content-center" 
                        style={{ 
                          backgroundColor: isHoveringSocial.google ? 'rgba(31, 41, 55, 0.9)' : 'rgba(31, 41, 55, 0.7)', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          transition: 'all 0.2s',
                          transform: isHoveringSocial.google ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: isHoveringSocial.google ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                        }}
                        onMouseEnter={() => setIsHoveringSocial({...isHoveringSocial, google: true})}
                        onMouseLeave={() => setIsHoveringSocial({...isHoveringSocial, google: false})}
                      >
                        <BsGoogle className="me-2" /> Google
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <Button 
                        variant="dark" 
                        className="w-100 py-3 d-flex align-items-center justify-content-center" 
                        style={{ 
                          backgroundColor: isHoveringSocial.facebook ? 'rgba(31, 41, 55, 0.9)' : 'rgba(31, 41, 55, 0.7)', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          transition: 'all 0.2s',
                          transform: isHoveringSocial.facebook ? 'translateY(-2px)' : 'translateY(0)',
                          boxShadow: isHoveringSocial.facebook ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none',
                        }}
                        onMouseEnter={() => setIsHoveringSocial({...isHoveringSocial, facebook: true})}
                        onMouseLeave={() => setIsHoveringSocial({...isHoveringSocial, facebook: false})}
                      >
                        <BsFacebook className="me-2" /> Facebook
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="signup">
                <div className="p-4 pt-5">
                  <Form>
                    <Row className="g-3 mb-3">
                      <Col>
                        <Form.Label className="text-white mb-2" style={{ fontWeight: '500', fontSize: '14px' }}>
                          First Name
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="John" 
                          className="py-3 px-3"
                          style={{ 
                            backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                            color: 'white', 
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'all 0.3s',
                            boxShadow: 'none',
                            backdropFilter: 'blur(5px)',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                      </Col>
                      <Col>
                        <Form.Label className="text-white mb-2" style={{ fontWeight: '500', fontSize: '14px' }}>
                          Last Name
                        </Form.Label>
                        <Form.Control 
                          type="text" 
                          placeholder="Doe" 
                          className="py-3 px-3"
                          style={{ 
                            backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                            color: 'white', 
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            fontSize: '15px',
                            transition: 'all 0.3s',
                            boxShadow: 'none',
                            backdropFilter: 'blur(5px)',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                      </Col>
                    </Row>
                    
                    <Form.Group className="mb-3">
                      <Form.Label className="text-white mb-2" style={{ fontWeight: '500', fontSize: '14px' }}>
                        Email Address
                      </Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="name@company.com" 
                        className="py-3 px-3"
                        style={{ 
                          backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                          color: 'white', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s',
                          boxShadow: 'none',
                          backdropFilter: 'blur(5px)',
                        }}
                        onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="text-white mb-2" style={{ fontWeight: '500', fontSize: '14px' }}>
                        Password
                      </Form.Label>
                      <div className="position-relative">
                        <Form.Control 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          className="py-3 px-3"
                          style={{ 
                            backgroundColor: 'rgba(31, 41, 55, 0.7)', 
                            color: 'white', 
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '10px',
                            fontSize: '15px',
                            paddingRight: '3rem',
                            transition: 'all 0.3s',
                            boxShadow: 'none',
                            backdropFilter: 'blur(5px)',
                          }}
                          onFocus={(e) => e.target.style.borderColor = 'rgba(13, 202, 240, 0.5)'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                        />
                        <div 
                          className="position-absolute" 
                          style={{ 
                            top: '50%', 
                            right: '15px', 
                            transform: 'translateY(-50%)', 
                            cursor: 'pointer',
                            color: '#94a3b8'
                          }}
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? <BsEyeSlash size={18} /> : <BsEye size={18} />}
                        </div>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Check 
                        type="checkbox" 
                        id="terms"
                        label={<span className="text-white" style={{ fontSize: '14px' }}>I agree to the <a href="#" className="text-info text-decoration-none">terms and conditions</a></span>}
                      />
                    </Form.Group>

                    <Button 
                      variant="info" 
                      className="w-100 text-white py-3 fw-bold" 
                      style={{ 
                        background: 'linear-gradient(135deg, #0dcaf0 0%, #0d8af0 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        boxShadow: '0 6px 15px rgba(13, 202, 240, 0.2)',
                        transition: 'all 0.3s ease',
                        fontSize: '16px',
                      }}
                      type="submit"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(13, 202, 240, 0.4)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0d8af0 0%, #0dcaf0 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 15px rgba(13, 202, 240, 0.2)';
                        e.currentTarget.style.background = 'linear-gradient(135deg, #0dcaf0 0%, #0d8af0 100%)';
                      }}
                    >
                      Create account
                    </Button>
                  </Form>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>

        <div className="text-center mt-4">
          <span className="text-white-50">Need help? </span>
          <a 
            href="#" 
            className="text-info" 
            style={{ 
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Contact support
          </a>
        </div>
      </Container>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default LoginPage;