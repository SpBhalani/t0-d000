import React , {useState} from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/user.actions';

/**
* @author
* @function SignUp
**/

export const SignUp = (props) => {

  const [fName,setFName] = useState('');
  const [lName,setLName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState(''); 

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      fName,lName,email,password
    }
    dispatch(signup(user));
    console.log(user);
  }

  const showError = (statusCode) => {
    switch (statusCode) {
      case 200:
        return " "
      case 409 :
        return "User Already Exists"
      case 400:
        return "Enter Valid Input"  
      default:
        return "Something Went Wrong";
    }
  }

  if(user.statusCode === 200){
    return <Redirect to={'/signin'}/>
  }
  return (
    <div>
      <Container fluid='md' >
        <Form onSubmit={handleSubmit}>
          <Row >
            <Col className="border border-success rounded p-5 bg-light" >
              <Row className="justify-content-center">
                <Col md={3}>
                  <Form.Group className="mb-3 " controlId="formBasicFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                    placeholder="Enter First Name"
                    value={fName}
                    onChange={e => setFName(e.target.value)}
                     />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3 " controlId="formBasicLname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                    placeholder="Enter Last Name" 
                    value={lName}
                    onChange={e => setLName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row md={2} className="justify-content-center" >
                <Col md={6}>
                  <Form.Group className="mb-3 " controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                    type="email" 
                    placeholder="Enter email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    type="password" 
                    variant="success" 
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  {
                    user.statusCode ? 
                    <p style={{color:"red"}}>{showError(user.statusCode)}</p> :
                    <p></p>
                  }
                  <Button variant="success" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )

}