import React, { useEffect, useState } from 'react'
import './home.css'
import { Container, Form, Button, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addTodo, getTodo , removeTodo } from '../actions/todo.actions';
/**
* @author
* @function Home
**/

export const Home = (props) => {
  const [addNew,setAddNew] = useState('');
  const auth = useSelector(state => state.auth)
  const list = useSelector(state => state.todo)
 
  const dispatch = useDispatch() 

  useEffect(() => {
      dispatch(getTodo())
  }, [dispatch])

  const handleAdd = () =>{
    if(addNew){
      dispatch(addTodo(addNew))
    }
    setAddNew('')
  }

  const handleRemove = (id) => {
    if(id){
      dispatch(removeTodo(id))
    }
  }
  const handleUpdate = (temp) => {
    dispatch(removeTodo(temp._id))
    setAddNew(temp.task);
  }
  

  if(!auth.authenticate){
    return <Redirect to={'/signin'}/>
  }
  if(list.loading){
    return (<p style={{textAlign:"center"}}>Loading...</p>)
  }
  return (
    <div className="border border-success rounded bg-light" style={{  width: "83vw", margin: "auto" }}>
      <Container fluid="md"  >
        <Row className=" justify-content-center">
          <Form className="d-flex justify-content-center" >

            <Form.Control 
            placeholder="Add Your Task" 
            className="w-50 m-3"
            value={addNew}
            onChange={e => setAddNew(e.target.value)}
            />

            <Button className="m-3 " onClick={handleAdd}>
              Add
            </Button>
          </Form>
        </Row>

        <Row >
          <div className="d-flex justify-content-center row ">
            {list.todo.map((todo) => {
              
              return (
                <div
                  key={todo._id}
                  className=' border border-success m-1 p-0 rounded d-flex row justify-content task'
                  style={{  backgroundColor: "white", textAlign: "center" }}
                >
                  <div className='d-flex justify-content-end'>
                    <span className="material-icons icon edit_icon"
                    onClick={() => handleUpdate(todo)}
                    >
                      edit
                    </span>
                    <span className="material-icons icon" 
                    onClick={() =>handleRemove(todo._id)}
                    >
                      delete
                    </span>
                  </div>
                  <div className=' mr-auto p-1'>
                    {todo.task}
                  </div>
                </div>
              )
            })}
          </div>
        </Row>
      </Container>
    </div>

  )

}