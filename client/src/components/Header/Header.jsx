import React, { useState } from 'react';
import "./header.css";
import { Attractions, CalendarMonth, DirectionsCar, Flight, Hotel, LocalTaxi, PeopleOutline } from '@mui/icons-material';
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function Header({ type }) {

   const [destination, setDestination] = useState("");
   const [openDate, setOpenDate] = useState(false);
   const [date, setDate] = useState([
      {
         startDate: new Date(),
         endDate: new Date(),
         key: 'selection'
      }
   ]);

   const [openOptions, setOpenOptions] = useState(false)
   const [persons, setPersons] = useState({

      adult: 1,
      children: 0,
      room: 1
   });


   const handleClick = (e) => {

      const name = e.target.name;
      const value = e.target.value;

      setPersons((prev) => {


         return { ...prev, [name]: (value === "inc") ? prev[name] + 1 : prev[name] - 1 }

      })
   }

   const navigate = useNavigate();
   const handleSubmit = () => {

      navigate("/hotels", { state: { date, persons, destination } });

   }




   return (
      <div className='header'>


         <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>

            <div className="headerList" >

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

            {!(type === "list") && <>   <h1 className="headerTitle">A lifetime of discount. It's a Genius</h1>
               <p className="headerDesc"> Get rewarded for your travels – unlock instant savings of 10% or
              more with a free Lamabooking account.</p>

               <button className="headerBtn">Sign In / Register</button>


               <div className="headerSearch">

                  <div className="headerSearchItem">
                     <Hotel className='headerIcon' />
                     <input type="text" className="headerSearchInput" onChange={(e) => { setDestination(e.target.value) }} placeholder='Where are you going ?' />
                  </div>

                  <div className="headerSearchItem" onClick={() => { setOpenDate(!openDate); setOpenOptions(false); }}>
                     <CalendarMonth className='headerIcon' />
                     <span className="headerSearchText"  >{`${format(date[0].startDate, 'dd-MM-yyyy')} to ${format(date[0].endDate, 'dd-MM-yyyy')}`}</span>
                     {openDate && <DateRange editableDateInputs={true} onChange={item => setDate([item.selection])}
                        moveRangeOnFirstSelection={false} ranges={date} className="date"   minDate={new Date()} />}
                  </div>
                  <div className="headerSearchItem" >
                     <PeopleOutline className='headerIcon' />
                     <span onClick={() => { setOpenOptions(!openOptions); setOpenDate(false); }} className="headerSearchText">{`${persons.adult} Adults · ${persons.children} Children · ${persons.room} Room`} </span>
                     {openOptions && <div className="options">

                        <div className="optionItem">
                           <span className="optionText">Adults</span>
                           <div className="optionCounter">
                              <button className='optionCounterBtn' disabled={persons.adult <= 1} name='adult' value="dec" onClick={handleClick}  >-</button>
                              <span className="optionCounterNumber">{persons.adult}</span>
                              <button className='optionCounterBtn' name='adult' value="inc" onClick={handleClick} >+</button>
                           </div>
                        </div>


                        <div className="optionItem">
                           <span className="optionText">Children </span>
                           <div className="optionCounter children">
                              <button className='optionCounterBtn' disabled={persons.children <= 0} name='children' value="dec" onClick={handleClick}  >-</button>
                              <span className="optionCounterNumber">{persons.children}</span>
                              <button className='optionCounterBtn' name='children' value="inc" onClick={handleClick} >+</button>
                           </div>
                        </div>

                        <div className="optionItem">
                           <span className="optionText">Rooms</span>
                           <div className="optionCounter">
                              <button className='optionCounterBtn' disabled={persons.room <= 1} name='room' value="dec" onClick={handleClick}  >-</button>
                              <span className="optionCounterNumber">{persons.room}</span>
                              <button className='optionCounterBtn' name='room' value="inc" onClick={handleClick} >+</button>
                           </div>
                        </div>




                     </div>}

                  </div>
                  <div className="headerSearchItem">
                     <button className='headerBtn' onClick={handleSubmit}>Search</button>
                  </div>


               </div> </>}



         </div>
      </div>
   )
}
