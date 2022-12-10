import React, { useState } from 'react';
import "./list.css";
import Header from '../../components/Header/Header'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom';
import { format } from "date-fns";
import { DateRange } from 'react-date-range';
import SearchItem from '../../components/searchItem/SearchItem';

export default function List() {


  const location = useLocation();

  const [destination, setDestination] = useState(location.state.destination);
  const [persons, setPersons] = useState(location.state.persons);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);

  console.log(location);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);





  return (
    <div>

      <Navbar />
      <Header type="list" />

      <div className="listContainer">

        <div className="listWrapper">

          <div className="listSearch">

            <h1 className='lsTitle'>Search</h1>

            <div className="lsItem">
              <label >Destination</label>
              <input type="text" placeholder={destination} />
            </div>

            <div className="lsItem" onClick={() => { setOpenDate(!openDate) }}>
              <label >Check In Dates</label>
              <span>{`${format(date[0].startDate, 'dd-MM-yyyy')} to ${format(date[0].endDate, 'dd-MM-yyyy')}`}</span>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
                className="date"
              />}

            </div>

            <div className="lsItem">

              <label >Options</label>

              <div className="lsOptions">

                <div className="lsOptionItem">
                  <span className='isOptionText'>Min Price <small>(per night)</small> </span>
                  <input type="text" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className='isOptionText'>Max Price <small>(per night)</small> </span>
                  <input type="text" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className='isOptionText'>Adult <small>(per night)</small> </span>
                  <input type="text" min={1} className="lsOptionInput" placeholder={persons.adult} />
                </div>

                <div className="lsOptionItem">
                  <span className='isOptionText'>Children <small>(per night)</small> </span>
                  <input type="text" min={0} className="lsOptionInput" placeholder={persons.children} />
                </div>

                <div className="lsOptionItem">
                  <span className='isOptionText'>Room<small>(per night)</small> </span>
                  <input type="text" min={1} className="lsOptionInput" placeholder={persons.room} />
                </div>

              </div>

            </div>


    <button >Search</button>

          </div>
          <div className="listResults">


            <SearchItem />
            <SearchItem />
            <SearchItem />
            <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />
   <SearchItem />








          </div>













        </div>




      </div>




    </div>
  )
}
