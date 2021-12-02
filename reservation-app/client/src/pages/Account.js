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
  
  const [newName, setName] = useState("");
  const [newAddress, setAddress] = useState("");
  const [newBillingAddress, setBillingAddress] = useState("");
  const [newPoints, setPoints] = useState(0);
  const [newPreferredPayMethod, setPreferredPayMethod] = useState("");


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

  const updateAccount = () => {
    axios.put("http://localhost:3001/auth/updateaccount",
    {
      name: newName,
      address: newAddress,
      billingAddress: newBillingAddress,
      preferredPayMethod: newPreferredPayMethod,
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
          <h3>NAME: {value.name}</h3>
          <h3>ADDRESS: {value.address}</h3>
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
          <label for="vehicle1"> Billing address is same as Mailing address</label>
          <h3>BILLING ADDRESS: {value.billingAddress}</h3>
          <h3>PREFERRED DINNER NUMBER: {value.preferredDinnerNum}</h3>
          <h3>POINTS: {value.points}</h3>
          <h3>PAYMENT METHOD: {value.preferredPayMethod}</h3>
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
                  placeholder="address"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="text"
                  placeholder="billing address"
                  onChange={(event) => {
                    setBillingAddress(event.target.value);
                  }}/>
        </div>
        <div>
        <input
                  type="text"
                  placeholder="cash / credit / check"
                  onChange={(event) => {
                    setPreferredPayMethod(event.target.value);
                  }}/>
        </div>
        <button
          onClick={() => {
            updateAccount();
          }}>
          Update
        </button>
      </div>
    );
  })}
      </div>
  );
}

export default Account;
