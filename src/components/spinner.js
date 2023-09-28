import React, { Component } from 'react'
import loading from './loding.gif'
const spinner=()=>
   {
    return (
      <div className="text-center">
        <img src={loading} alt="loading" />
      </div>
    )
  }


export default spinner



