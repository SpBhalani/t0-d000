import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Navbar, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/auth.actions'
/**
* @author
* @function Header
**/

export const Header = (props) => {

  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(logout())
  }

  const loggedIn = () => {
    return (
      <Nav>
        <Nav.Item>
                <Nav.Link onClick={logOut} >Sign out</Nav.Link>
              </Nav.Item>
      </Nav>
    )
  }
  const loggedOut = () => {
    return (<Nav>
      <Nav.Item>
        <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
      </Nav.Item>
    </Nav>
    )
  }

  return (
    <div className='header' >
      <Navbar expand="md" >
        <Container fluid="md" className="border border-success rounded bg-light ">
          <Navbar.Brand as={Link} to="/">To-Do</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav " className="justify-content-end">
              {auth.authenticate ? 
                loggedIn() :loggedOut()
                }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )

}