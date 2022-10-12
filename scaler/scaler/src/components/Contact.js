import React from 'react'
import Card from 'react-bootstrap/Card';
import '../styles/style.css'

const Contact = () => {
  return (
    <div className='contact'>
    <Card style={{ width: '40rem' }}>
      <Card.Body>
        <Card.Title>AKSHAT DWIVEDI</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">2019014 </Card.Subtitle>
        <Card.Text>
         PDPM IIIT JABALPUR
        </Card.Text>
        <Card.Link href="https://github.com/akshat-9825/InterviewFix" target="_blank" >Github</Card.Link>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Contact