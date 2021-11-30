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
                <h3>Name: {value.name}</h3>
                <h3>Address: {value.address}</h3>
                <h3>Billing Address: {value.billingAddress}</h3>
                <h3>Preferred Dinner Number: {value.preferredDinnerNum}</h3>
                <h3>Points: {value.points}</h3>
                <h3>Payment Method: {value.preferredPayMethod}</h3>
              </div>
      </div>
    );
  })}
      </div>
  );
}

export default Account;
