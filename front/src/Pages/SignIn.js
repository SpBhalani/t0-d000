import React, { useState} from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../actions/auth.actions';

/**
* @author
* @function SignIn
**/


export const SignIn = (props) => {
  
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const dispatch = useDispatch()
const auth = useSelector(state => state.auth)


const loginUser = (e)=>{
  e.preventDefault()
  const user= {
    email,password
  }
dispatch(login(user))
} 

const showError = (statusCode) => {
    switch (statusCode) {
      case 401:
        return "Invalid Password"
      case 404 :
        return "User Not Found"
      case 400:
        return "Enter Valid Input"  
      default:
        return "Something Went Wrong";
    }
}

if(auth.authenticate){
 return <Redirect to={'/'}/>
}

  return (
    <div>
      <Container fluid='md'  >
        <Form onSubmit={loginUser} >
          <Row md={2} className="justify-content-center border border-success rounded p-5 bg-light" >
            <Col md={6} >
              <Form.Group className="mb-3 " controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                variant="success" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {
                auth.statusCode ? 
                <p style={{color:'red'}}>{showError(auth.statusCode)}</p> : 
                <p></p>
              }
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )

}