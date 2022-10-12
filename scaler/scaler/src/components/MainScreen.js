import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../styles/style.css'
import TabGroup from './TabGroup';

export const MainScreen = () => {

  return (
    <div>
         <Navbar bg="dark" variant="dark">
         {/* <div className = 'navbar'> */}
        <Container> 
          <Navbar.Brand href="#home">InterviewFix</Navbar.Brand>
        </Container>
        {/* </div> */}
      </Navbar>

      <TabGroup/>
    </div>
  )
}
