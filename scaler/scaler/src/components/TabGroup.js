import React, { useEffect, useState } from 'react'

import '../styles/style.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Interview from './Interview';
import Badge from 'react-bootstrap/Badge';


function TabGroup() {

  const [selectedtab, setSelectedTab] = useState('home')
  const [inteviewData, setInterviewData] = useState([])

  React.useEffect(() => {
    // fetch('https://randomuser.me/api/')
    //   .then(results => results.json())
    //   .then(data => {
    //     const {name} = data.results[0];
    //     setFirstName(name.first);
    //     setLastName(name.last);
    //   });

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

  const interviewsList = inteviewData.map((interview) => <Interview info = {interview}/>)
  console.log(interviewsList)


  return (
    <div>
    <Tabs
      defaultActiveKey="home"
      id="fill-tab-example"
      className="mb-3"
      onSelect={(k) => setSelectedTab(k)}
      fill
    >
      <Tab eventKey="home" title="Home">
      </Tab>
      <Tab eventKey="create" title="Create">
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

    selectedtab==='create' ?  'CREATE'  : 'CONTACT'
}
</div>
)}

export default TabGroup