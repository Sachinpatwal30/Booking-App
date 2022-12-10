import React, { useState } from 'react';
import "./header.scss";
import { Attractions, CalendarMonth, DirectionsCar, Flight, Hotel, LocalTaxi, PeopleOutline } from '@mui/icons-material';
import { DateRange } from "react-date-range";
import {format} from "date-fns";

export default function Header() {

   const [openDate,setOpenDate]= useState(false);
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection'
      }
   ]);
 
   const [openOptions,setOpenOptions]= useState(false)
   const [persons,setPersons]=useState({

      adult:1,
      children:0,
      room:1
   });

   const handleClick=(e)=>{

      const name= e.target.name;
      const value= e.target.value;

      setPersons((prev)=>{


         return {...prev, [name]: (value==="inc")? prev[name]+1 : prev[name]-1 }

      })

   }




   return (
      <div className='header'>


         <div className="headerContainer">

            <div className="headerList">

               <div className="headerListItem active">
                  <Hotel />
                  <span>Stay</span>
               </div>

               <div className="headerListItem ">
                  <Flight />
                  <span>Flight</span>
               </div>

               <div className="headerListItem">
                  <DirectionsCar />
                  <span>Car Rentals</span>
               </div>

               <div className="headerListItem">
                  <Attractions />
                  <span>Attraction</span>
               </div>

               <div className="headerListItem">
                  <LocalTaxi />
                  <span>Airport Taxi</span>
               </div>

            </div>

            <h1 className="headerTitle">A lifetime of discount. It's a Genius</h1>
            <p className="headerDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint esse numquam repellendus illum, aliquid in ea harum, illo odio quo quae unde. Eaque iure, modi beatae vero aperiam nemo ullam.</p>

            <button className="headerBtn">Sign In / Register</button>


            <div className="headerSearch">

               <div className="headerSearchItem">
                  <Hotel className='headerIcon' />
                  <input type="text" className="headerSearchInput" placeholder='Where are you going ?' />
               </div>
               <div className="headerSearchItem" onClick={()=>{setOpenDate(!openDate)}}>
                  <CalendarMonth className='headerIcon' />   
                  <span className="headerSearchText"  >{`${format(date[0].startDate,'dd-MM-yyyy')} to ${format(date[0].endDate, 'dd-MM-yyyy')}`}</span>
                 {openDate && <DateRange editableDateInputs={true} onChange={item => setDate([item.selection])}
                      moveRangeOnFirstSelection={false} ranges={date} className="date" />}
               </div>
               <div className="headerSearchItem" >
                  <PeopleOutline className='headerIcon' />
                  <span onClick={()=>{setOpenOptions(!openOptions)}} className="headerSearchText">{`${persons.adult} Adults · ${persons.children} Children · ${persons.room} Room`} </span>
                { openOptions &&  <div className="options">

                     <div className="optionItem">
                        <span className="optionText">Adults</span>
                        <div className="optionCounter">
                           <button className='optionCounterBtn' disabled={persons.adult<=1} name='adult' value="dec" onClick={handleClick}  >-</button>
                           <span className="optionCounterNumber">{persons.adult}</span>
                           <button className='optionCounterBtn' name='adult' value="inc" onClick={handleClick} >+</button>
                        </div>
                     </div>


                     <div className="optionItem">
                        <span className="optionText">Children </span>
                        <div className="optionCounter children">
                           <button className='optionCounterBtn' disabled={persons.children<=0} name='children' value="dec" onClick={handleClick}  >-</button>
                           <span className="optionCounterNumber">{persons.children}</span>
                           <button className='optionCounterBtn' name='children' value="inc" onClick={handleClick} >+</button>
                        </div>
                     </div>

                     <div className="optionItem">
                        <span className="optionText">Rooms</span>
                        <div className="optionCounter">
                           <button className='optionCounterBtn'  disabled={persons.room<=1} name='room' value="dec" onClick={handleClick}  >-</button>
                           <span className="optionCounterNumber">{persons.room}</span>
                           <button className='optionCounterBtn' name='room' value="inc" onClick={handleClick} >+</button>
                        </div>
                     </div>




                  </div>}
                 
               </div>
               <div className="headerSearchItem">
                  <button className='headerBtn'>Search</button>
               </div>


            </div>



         </div>
      </div>
   )
}
