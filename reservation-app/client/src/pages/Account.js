import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Account() {

  let { id } = useParams();

  let history = useHistory();
  const [username, setUsername] = useState("");

  const [userInfo, setUserInfo] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [employeeList, setEmployeeList] = useState([]);


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

  return (
    <div>
    {employeeList.map((value, key) => {
    return (
      <div key={key} className="post">
        <div>
                <h3>Name: <textarea placeholder class = "pholder"> John Doe</textarea>{value.name}  </h3>
                <h3>Address: <textarea placeholder class = "pholder"> 123 Doeing Lane</textarea>{value.address}</h3>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
                <label for="vehicle1"> Billing address is same as Mailing address</label>
                <h3>Billing Address: <textarea placeholder class = "pholder"> 123 Doeing Lane</textarea>{value.billingAddress}</h3>
                <h3>Preferred Dinner Number: {value.preferredDinnerNum}</h3>
                <h3>Points: <textarea placeholder class = "pholder"> 0</textarea>{value.points}</h3>
                <h3>Payment Method: <textarea placeholder class = "pholder"> Cash/Credit</textarea>{value.preferredPayMethod}</h3>
              </div>
      </div>
    );
  })}
      </div>
  );
}

export default Account;
