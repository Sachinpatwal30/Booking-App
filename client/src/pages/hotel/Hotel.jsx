import { ArrowCircleLeft, ArrowCircleRight, Cancel, LocationOn } from '@mui/icons-material';
import React, { useState } from 'react';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/Header/Header';
import MailList from '../../components/mailList/MailList';
import Navbar from '../../components/navbar/Navbar';
import { SearchContext } from '../../context/SearchContext/SearchContext';
import useFetch from "../../hooks/useFetch";
import "./hotel.css";


export default function Hotel() {

  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);

  const location = useLocation()
  const hotelId= location.pathname.split("/")[2];
  console.log(hotelId);


  const { data, loading, error } = useFetch(`/hotels/find/${hotelId}`);
  const {dates,persons}= useContext(SearchContext);

  console.log("persons are",persons)
  console.log("dates are ",dates);
  const days= (dates[0].endDate.getDate()=== dates[0].startDate.getDate()) ? 1 : dates[0].endDate.getDate()-dates[0].startDate.getDate();

  console.log("No of days ",days );
  







 
  const handleClick = (index) => {
    setOpenSlider(true);
    setSlideNumber(index);
  };

  const moveSlide = (direction) => {
    
    if(direction==="left") setSlideNumber( (slideNumber ===0) ? 5: slideNumber - 1  );
    else
    setSlideNumber( (slideNumber ===5) ? 0: slideNumber + 1  );

  };

  return (
    <div className='hotel'>

      <Navbar />
      <Header type="list" />


      {openSlider && <div className="slider">

        <Cancel className='close' onClick={()=>{setOpenSlider(false)}} />
        <ArrowCircleLeft className='arrow left' onClick={()=>{moveSlide("left")}}  />


        <div className="sliderWrapper">
          <img src="" alt="slider img" className='sliderImg' />
        </div>

        <ArrowCircleRight className='arrow right' onClick={()=>{moveSlide("right")}} />

      </div>
      }




      <div className="hotelContainer">

        <div className="hotelWrapper">

          <button className='bookNow'>Reserve or Book Now!</button>
          <h1 className="hotelTitle"> {data.name}</h1>
          <div className="hotelAddress">   <LocationOn />  <span>{data.address}</span> </div>

          <span className="hotelDistance">  Excellent location – {data.distance}m from center    </span>
          <span className="hotelPriceHighlight"> Book a stay over $114 at this property and get a free airport taxi  </span>

          <div className="hotelImages">

          {data.photos?.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))}

          </div>

          <div className="hotelDetails">

            <div className="hotelDetailsText">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">{data.desc}</p>

            </div>

            <div className="hotelDetailsPrice">

              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span> 
              <h2>
                <b>Rs {days* data.cheapestPrice * persons.room}</b> ({days} nights)
              </h2>
              <button>Reserve or Book Now!</button>

            </div>
          </div>
        </div>

        <MailList />
        <Footer />

      </div>

    </div>
  )
}
