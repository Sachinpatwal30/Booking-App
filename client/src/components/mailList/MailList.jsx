import React from 'react';
import "./mailList.css";

export default function MailList() {
  return (
    <div className='mail'>


        
        <h1 className='mailTitle'>Save Time, Save Money</h1>
        <span className="mailDesc">Sign up and we'll send you the best deals</span>
        <div className="mailInputContainer">

            <input type="email" placeholder='Your Email' />

            <button >Subscribe</button>



        </div>



    </div>
  )
}
