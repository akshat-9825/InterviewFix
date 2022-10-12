import React, { useState } from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select'
// import { IonDatetime } from '@ionic/react';
import DateTimePicker from 'react-datetime-picker';
import '../styles/style.css'

const CreateTab = (props) => {
    console.log("props" ,props)

    const flag = props?.flag
    const editInterview = props?.editInterview;

    const [candidates,setCandidates] = useState([])
    const [interviewers,setInterviewers] = useState([])
    const [selectedCandidate, setSelectedCandidate] = useState(null)
    const [selectedInterviewer, setSelectedInterviewer] = useState(null)
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date())
    const [showAlert, setShowAlert] = useState(false);
    const [interviewScheduleStatus,setInterviewScheduleStatus] = useState('NA')

    const candidateOptions = []
    candidates.forEach((candidate)=>candidateOptions.push({
        value: candidate?.id,
        label: candidate?.first_name +" "+ candidate?.last_name
    }))

    const interviewerOptions = []
    interviewers.forEach((interviewer)=>interviewerOptions.push({
        value: interviewer?.id,
        label: interviewer?.first_name +" "+ interviewer?.last_name
    }))


    React.useEffect(() => {
        try {
           fetch('http://localhost:8000/view_candidates/', {
            method: 'GET',
            crossDomain:true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then(results=>results?.json())
          .then(data=>{
            setCandidates(data)
          })
        } catch (err) {
          // setErr(err.message);
        } finally {
          // setIsLoading(false);
        }
      }, []);
      
    React.useEffect(() => {
        try {
           fetch('http://localhost:8000/view_interviewers/', {
            method: 'GET',
            crossDomain:true,
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          })
          .then(results=>results?.json())
          .then(data=>{
            setInterviewers(data)
          })
        } catch (err) {
          // setErr(err.message);
        } finally {
          // setIsLoading(false);
        }
      }, []);

      function handleCandidateChange(candidate){
        setSelectedCandidate(candidate)
        console.log("candidate_id ",candidate)
      }
      function handleInterviewerChange(interviewer){
        setSelectedInterviewer(interviewer)
        console.log("interviewer ",interviewer)
      }
      function handleFormSubmit(){
        if(selectedCandidate!=null && selectedInterviewer!=null){
            setShowAlert(false)

            if(flag===1){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ start_time: startTime, 
                    end_time:endTime, 
                    candidate:selectedCandidate?.value,
                     interviewer:selectedInterviewer?.value})
            };
            fetch('http://localhost:8000/create_interview/', requestOptions)
                .then(response => {response?.json(); console.log("response",response);
                setInterviewScheduleStatus(response.status===200 ? "Successful": "Unsuccessful");})
                .then(data => {
                    // console.log(data.status)
                    // setInterviewScheduleStatus();
                    // console.log("datatdtaatdatd", data)
                    // console.log(">>>>??????????????????????????",data?.Status);
                    props?.handleChange([...props?.interviewData,{
                        "candidate_id" : selectedCandidate?.value,
                        "interviewer_id" : selectedInterviewer?.value,
                        "start_time" : startTime.toString(),
                        "end_time" : endTime.toString()
                    }]);

                }).catch(err=>
                    console.log("//////",err)
                );
            }else{
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ start_time: startTime,
                         end_time:endTime,
                         interview_id : editInterview?.interview_id,
                          candidate:selectedCandidate?.value, 
                          interviewer:selectedInterviewer?.value})
                };
                // console.log("***", requestOptions)
                fetch('http://localhost:8000/edit_interview/', requestOptions)
                    .then(response =>{ response.json();console.log("response",response);
                    setInterviewScheduleStatus(response.status===200 ? "Successful": "Unsuccessful");})
                    .then(data => {
                        // console.log("***", data)
                        // setInterviewScheduleStatus(data?.Status);
                        // console.log(">>>>",data);
                        props?.handleChange([...props?.interviewData,{
                            "candidate_id" : selectedCandidate?.value,
                            "interviewer_id" : selectedInterviewer?.value,
                            "start_time" : startTime.toString(),
                            "end_time" : endTime.toString()
                        }]);
    
                    }).catch(err=>
                        console.log("//////",err)
                    );
            }

        }else{
            setShowAlert(true)
        }
      }

      function resetAll(){
        window.location.reload();
        setSelectedCandidate(null)
        setSelectedInterviewer(null)
        setEndTime(new Date())
        setShowAlert(false)
        setStartTime(new Date())
        handleCandidateChange(null)
        handleInterviewerChange(null)
        setInterviewScheduleStatus('not-defined')
      }

  return (
    <div>
        
        {showAlert && <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          All the required fields are not selected.
        </p>
      </Alert>}

      {interviewScheduleStatus==='Successful' && <Alert variant="success" onClose = {resetAll} dismissible>
        <Alert.Heading>Interview {flag===1? "Scheduled":"Edited"} Successfully!</Alert.Heading>
      </Alert>}
      
      {interviewScheduleStatus==='Unsuccessful' && <Alert variant="danger" onClose = {resetAll} dismissible>
        <Alert.Heading>Interview cannot be {flag===1? "Scheduled":"Edited"}</Alert.Heading>
      </Alert>}

        <h3>
        {flag===1 ? 'CREATE' : 'EDIT'} An Interview
      </h3><br></br><br></br>

<div className='form'>
    <div className='dropdowns'>
        <div className='drop'>
    <Select options={candidateOptions} onChange = {handleCandidateChange} placeholder="Select Candidate..." defaultInputValue={editInterview?.candidate_id}/></div>
    <br></br>
    <div className='drop'>
    <Select options={interviewerOptions} onChange = {handleInterviewerChange} placeholder="Select Interviewer..." defaultInputValue={editInterview?.interviewer_id}/></div>
    </div>
    
    <div className='date-time-box'>
        <div className='date-time'>
        <label>Start Time  </label><br/>
        <DateTimePicker onChange={setStartTime} value={ startTime} /></div>
        <div className='date-time'>
        <label>End Time  </label><br/>
        <DateTimePicker onChange={setEndTime} value={ endTime} /></div>
    </div>

    <div className="mb-2">
        <Button variant="primary" size="lg" onClick={handleFormSubmit}>
          {flag===1 ? 'SCHEDULE' : 'EDIT'}
        </Button>
      </div>

    </div>
    </div>
  )
}

export default CreateTab