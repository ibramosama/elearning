import React, { Component } from 'react'
import MyHeader from './MyHeader';
import './InstructorProfile.module.css'
import Verticaltab from './Verticaltab';
import Sidebar from './Sidebar';

export default class InstructorProfile extends Component {
  render() {
    return (
      <div>

      
        <MyHeader> </MyHeader>
             <Sidebar />
        <Verticaltab></Verticaltab>
        
      </div>
    )
  }
}

