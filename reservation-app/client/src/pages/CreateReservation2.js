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

  function checkBusyDate() {
      
      var dateCheck = newDatetime.toString();
      var dateCheck2 = dateCheck.slice(5,10);
      
      if (dateCheck2 == '12-25'){
        alert("Christmas is a busy day, hold fee required. $10 cancellation fee");
      }
      else if (dateCheck2 == '07-04'){
          alert("Fourth of July is a busy, hold fee required. $10 cancellation fee");
      }
      else return 0;
  };

  function tableCheck(){
    var x = newGuestCount;
    if(x==1)
      alert(" 1 Table of 2 has been reserved!");
    if(x==2)
      alert(" 1 Table of 2 has been reserved!");
    if(x==3)
      alert(" 1 Table of 4 has been reserved!");
    if(x==4)
      alert(" 1 Table of 4 has been reserved!");
    if(x==5)
      alert(" 1 Table of 6 has been reserved!");
    if(x==6)
      alert(" 1 Table of 6 has been reserved!!");
    if(x==7)
      alert(" 1 Table of 8 has been reserved!!");
    if(x==8)
      alert(" 1 Table of 8 has been reserved!!");
    if(x==9)
      alert(" 1 Table of 6 and 1 Table of 4 has been reserved!!");
    if(x==10)
      alert(" 1 Table of 6 and 1 Table of 4 has been reserved!!");
    if(x==11)
      alert(" 1 Table of 8 and 1 Table of 4 has been reserved!!");
    if(x==12)
      alert(" 1 Table of 8 and 1 Table of 4 has been reserved!!");
    if(x==13)
      alert(" 1 Table of 8 and 1 Table of 6 has been reserved!!");
    if(x==14)
      alert(" 1 Table of 8 and 1 Table of 6 has been reserved!!");
    if(x==15)
      alert(" 2 Tables of 8 have been reserved!!");
    if(x==16)
      alert(" 2 Tables of 8 have been reserved!!");
    };
    

  return (
    <div>
    {employeeList.map((value, key) => {
    return (
      <div key={key} className="post">
        <body styles="background-color:powderblue;">
        <h1>Make Reservation</h1>
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
            checkBusyDate();
            tableCheck();
          }}>
          SUBMIT
        </button>
      </div>
    );
  })}
      </div>
  );
};

export default Reservation2;
