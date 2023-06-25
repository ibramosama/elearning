import React, { Component } from 'react'
import MyHeader from '../components/MyHeader';
import '../CSS/InstructorProfile.module.css'
import Verticaltab from '../components/Verticaltab';

export default class InstructorProfile extends Component {
  render() {
    return (
      <div>
        <MyHeader></MyHeader>
        
              <Verticaltab></Verticaltab>
           
      </div>
    )
  }
}

