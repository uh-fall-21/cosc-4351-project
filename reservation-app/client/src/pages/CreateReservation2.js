import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Reservation2() {

  let { id } = useParams();

  let history = useHistory();
  const [username, setUsername] = useState("");

  const [userInfo, setUserInfo] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [employeeList, setEmployeeList] = useState([]);
  
  const [newName, setName] = useState("")
  const [newPhone, setPhone] = useState("");
  const [newEmail, setEmail] = useState("");
  const [newDatetime, setDatetime] = useState(new Date());
  const [newGuestCount, setGuestCount] = useState(0);


  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/auth/accinfo", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setEmployeeList(response.data);
        });
    } 
  }, []);

  const createNewReservation = () => {
    axios.put("http://localhost:3001/reservations/reservation2",
    {
      newName: newName,
      newPhone: newPhone,
      newEmail: newEmail,
      newDatetime: newDatetime,
      newGuestCount: newGuestCount,
    },
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    }
    )
    .then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      }
    });
  };

  return (
    <div>
    {employeeList.map((value, key) => {
    return (
      <div key={key} className="post">
        <div>
          <h3>NAME: </h3>
          <h3>PHONE: </h3>
          <h3>EMAIL: </h3>
          <h3>DATETIME: </h3>
          <h3>GUESTS: </h3>
        </div>
        <body styles="background-color:powderblue;">
        <h1>UPDATE BELOW</h1>
        </body>
        <div>
        <input
                  type="text"
                  placeholder="name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="text"
                  placeholder="phone"
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="text"
                  placeholder="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="datetime-local"
                  placeholder="date"
                  onChange={(event) => {
                    setDatetime(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="number"
                  placeholder="guests"
                  onChange={(event) => {
                    setGuestCount(event.target.value);
                  }}/>
        </div>
        <button
          onClick={() => {
            createNewReservation();
          }}>
          SUBMIT
        </button>
      </div>
    );
  })}
      </div>
  );
}

export default Reservation2;
