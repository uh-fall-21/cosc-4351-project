import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import { AuthContext } from "../helpers/AuthContext";

function Account() {

  let { id } = useParams();

  let history = useHistory();
  const [username, setUsername] = useState("");

  const [userInfo, setUserInfo] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);


/*
  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
    });

    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, []); */

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3001/auth/accinfo", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setUserInfo(response.data.userInfo);
        });
    }
  }, []); 
///////////////////////////
const addEmployee = () => {
  axios.post("http://localhost:3001/create", {
    name: name,
    age: age,
    country: country,
    position: position,
    wage: wage,
  }).then(() => {
    setEmployeeList([
      ...employeeList,
      {
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage,
      },
    ]);
  });
};

const getEmployees = () => {
  axios.get("http://localhost:3001/employees").then((response) => {
    setEmployeeList(response.data);
  });
};

const updateEmployeeWage = (id) => {
  axios.put("http://localhost:3001/update", { wage: newWage, id: id }).then(
    (response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    }
  );
};

const deleteEmployee = (id) => {
  axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
    setEmployeeList(
      employeeList.filter((val) => {
        return val.id != id;
      })
    );
  });
};

///////////////////////////
  return (
    
    <div className="App">
      <h1>{authState.username} </h1>
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        
        <label>Address:</label>
        <input
          type="text"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label>Billing Address:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label>Preferred Dinner Number:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label>Points:</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <label>Payment Method:</label>
        <input
          type="text"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>




        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Address: {val.address}</h3>
                <h3>Billing Address: {val.billingAddress}</h3>
                <h3>Preferred Dinner Number: {val.preferredDinnerNum}</h3>
                <h3>Points: {val.points}</h3>
                <h3>Payment Method: {val.preferredPayMethod}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="2000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateEmployeeWage(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteEmployee(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Account;
