import { Cancel } from "@mui/icons-material";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import "./reserve.css";
import { SearchContext } from "../../context/SearchContext/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Reserve({ setOpen, hotelId }) {

  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  console.log("data received", data);


  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((room) => (room !== value)));
  }


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
    console.log("isFound: " + isFound);
    return isFound;
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  console.log("selected", selectedRooms);
  console.log("ALl dates",allDates);

  return (
    <div className="reserve">
      <div className="rContainer">
        <Cancel className="rClose" onClick={() => { setOpen(false) }} />

        <span>Select Your Rooms: </span>
        {
          data.map((item,i) => {
            return <div className="rItem" key={i}>
              <div className="rInfoItem">
                <div className="rTitle">{item.title}</div>
                <div className="rDesc">{item.desc}</div>
                <div className="rMax"> Maximum People <b>{item.maxPeople}</b></div>
                <div className="rPrice">Price: <b> Rs {item.price}</b> </div>
              </div>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber) => (
                  <div className="room" key={roomNumber._id}>
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          })}
        <button onClick={handleClick} className="rButton">Reserve Now !</button>
      </div>
    </div>
  )
}


