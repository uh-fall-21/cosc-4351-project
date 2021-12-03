import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Reservations() {
  const [listOfReservations, setListOfReservations] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/reservations", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfReservations(response.data.listOfReservations);
        });
    }
  }, []);

  return (
    <div>
      {listOfReservations.map((value, key) => {
        return (
          <div key={key} className="post">
            <div className="title"> Reservation </div>
            <div id = "reservation_details">
              <p id = "res_name">
              Name on Reservation: {value.name}
              </p>
              <p className = "res_details">
              Phone number: {value.phone}
              </p>
              <br></br>
              <p className = "res_details">
              Email: {value.email}
              </p>
              <br></br>

              <p className = "res_details">
              Time signed up: {value.datetime}
              </p>
              <br></br>
              How many guests: {value.guestCount}
              <p></p>
              
            </div>
            <div className="footer">
              <div className="username">
                {/* {value.username} */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Reservations;
