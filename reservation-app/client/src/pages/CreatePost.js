import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useState } from 'react';

function CreatePost() {
  const { authState } = useContext(AuthContext);
  const[data, setData] = useState(null);
  const[print, setPrint] = useState(false);


  function getData(val){
    setData(val.target.value);
    console.warn(val.target.value);
    console.log(val.target.value);
  }


  let history = useHistory();
  const initialValues = {
    title: "",
    postText: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }

  }, []);
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
        
      })
      .then((response) => {
        history.push("/");
        //alert();
      });
  };
  function ret(x){
    if(x<9)
      return x + " number of people have been reserved!";
    if(x==9 || x == 10 ){
      return x + " number of people have been reserved! We pushed two tables of five people together.";
    }
    if(x==11 || x == 12 ){
      return x + " number of people have been reserved! We pushed three tables of four people together.";
    }
    if(x==13){
      return x + " number of people have been reserved! We pushed three tables of five people together.";
    }
    if(x==14 || x == 15 || x == 16){
      return x + " number of people have been reserved! We pushed two tables of eight people together.";
    }
    if(x>16){
      alert("This reservation is too big.");
      return;
    }
    
  }

  return (
   
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
       
        <Form className="formContainer">

          <label>Number of Guests: </label>
          <input type = "text" id = "inputCreatePost" autocomplete = "off" name = "title" onChange = {getData}/>
          
          <label> Name of Reservation </label>
          <ErrorMessage name="title" component="span" />
          
          <Field
            type = "text"
            autocomplete="off"
            id="inputCreatePost"
            name="title"
          />




          <label>Reservation Info: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
          />

          <button type="submit" id = "createPost" onClick={()=>alert(ret(document.getElementById('inputCreatePost').value))}> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
