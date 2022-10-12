import React, { useEffect, useState } from 'react'

import '../styles/style.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Interview from './Interview';
import Badge from 'react-bootstrap/Badge';
import CreateTab from './CreateTab';
import Contact from './Contact';


function TabGroup() {

  const [selectedtab, setSelectedTab] = useState('home')
  const [inteviewData, setInterviewData] = useState([]);
  const [flag,setFlag] = useState(1) //1 - create, 2 - edit
  const [editInterview, setEditInterview] = useState(null)

  const handleChange = (newValue) => {
    console.log(">>>>>>>>>>>>>>>>>.",newValue);
    setInterviewData(newValue);
 };

  React.useEffect(() => {

    try {
       fetch('http://localhost:8000/view_interview/', {
        method: 'GET',
        crossDomain:true,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      .then(results=>results.json())
      .then(data=>{
        setInterviewData(data)
      })
    } catch (err) {
      // setErr(err.message);
    } finally {
      // setIsLoading(false);
    }

  }, []);

  const interviewsList = inteviewData.map((interview) => <Interview info = {interview} handleDelete = {handleDelete} handleEdit = {handleEdit}/>)
  console.log(interviewsList)

  
  function handleDelete(interview_id){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interview_id : interview_id})
    };
    console.log("DELETE PRESSED!!!")
    console.log("======", interview_id)

    const updatedList = inteviewData.filter((interview)=> interview_id!=interview.interview_id)
    setInterviewData(updatedList)
    fetch('http://localhost:8000/delete_interview/', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(">>>>",data);
        }).catch(err=>
            console.log("//////",err)
        );
}

function handleEdit(interview){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ interview_id : interview.interview_id,
    candidate : interview.candidate_id,
    interviewer : interview.interviewer_id,
    start_time:interview.start_time,
    end_time:interview.end_time})
    };
    setSelectedTab("create")
    setFlag(2)
    setEditInterview(interview)
}


  return (
    <div>
    <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="mb-3"
      onSelect={(k) => {setSelectedTab(k); 
      if(k==='create') setFlag(1)}}
      fill
    >
      <Tab eventKey="home" title="Home">
      </Tab>
      <Tab eventKey="create" title="Create / Edit">
      </Tab>
      <Tab eventKey="contact" title="Contact">
      </Tab>
    </Tabs>
    
   {selectedtab==='home' ? 
    <div>
    <h3>
        All upcoming interviews <Badge bg="secondary">:</Badge>
      </h3>
    <div className='interviews-lists'>
    {inteviewData.length>0 ? interviewsList : 'NULL'}
    </div>
    </div>   :

    selectedtab==='create' ?  <CreateTab interviewData = {inteviewData} 
                                handleChange = {handleChange} 
                                flag = {flag} 
                                editInterview = {editInterview}/>  : <Contact/>
}
</div>
)}

export default TabGroup