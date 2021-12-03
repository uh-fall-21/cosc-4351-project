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
            <div>
              {value.name}
              {value.phone}
              {value.email}
              {value.datetime}
              {value.guestCount}
            </div>
            <div className="footer">
              <div className="username">
                {value.username}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Reservations;
