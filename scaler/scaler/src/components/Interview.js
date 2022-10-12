import React from 'react'
import Card from 'react-bootstrap/Card';

const Interview = (props) => {

    console.log("222222",props)

    const candidate = props.info.candidate_id
    const interviewer = props.info.interviewer_id
    const start_time= props.info.start_time
    const end_time = props.info.end_time
    const interview_id = props.info.interview_id

  return (
    <div>
    <Card style={{ width: '50rem' }}>
      <Card.Body>
        <Card.Title>{candidate}  - {interviewer}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{interview_id}</Card.Subtitle>
        <Card.Text>
         Start Time  - {start_time}
         End Time - {end_time}
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Interview