import React from 'react'
import Card from 'react-bootstrap/Card';

import Button from 'react-bootstrap/Button';
const Interview = (props) => {

    const candidate = props.info.candidate_id
    const interviewer = props.info.interviewer_id
    const start_time= props.info.start_time
    const end_time = props.info.end_time
    const interview_id = props.info.interview_id

    

  return (
    <div>
    <Card style={{ width: '50rem' }}>
    <div className='interview-card'> 
      <Card.Body>
        <Card.Title>{candidate}  - {interviewer}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{}</Card.Subtitle>
        <Card.Text>
         Start Time  - {start_time}
        </Card.Text>
        <Card.Text>
         End Time - {end_time}
        </Card.Text>
      </Card.Body>

      <div className='edit-del-grp'>
        <Button variant="primary" size="sm" onClick={()=>props.handleEdit(props.info)}>
          EDIT
        </Button>
        <Button variant="secondary" size="sm" onClick={()=>props.handleDelete(interview_id)}>
          DELETE
        </Button>
      </div>
      </div>

   

    </Card>
    </div>
  )
}

export default Interview