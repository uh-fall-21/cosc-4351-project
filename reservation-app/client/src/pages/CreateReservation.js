import React, { useContext, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function CreateReservation() {
  const { authState } = useContext(AuthContext);

  let history = useHistory();
  const initialValues = {
    name: "martin2",
    phone: "666777888",
    email: "code.mlopez",
    datetime: "07141994", //might need fix
    guestCount: 55, //might need int

  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("You must input a Title!"),
    phone: Yup.string().required(),
    email: Yup.string().required(),
    datetime: Yup.date().required(),
    guestCount: Yup.number().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/reservations", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        history.push("/");
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="name"
          />
          <label>Phone: </label>
          <ErrorMessage name="phone" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="phone"
          />
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="email"
          />
          <label>Date and Time: </label>
          <ErrorMessage name="datetime" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="datetime"
          />
          <label>Total Guests: </label>
          <ErrorMessage name="guestCount" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="guestCount"
          />

          <button type="submit" id = "createPost"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateReservation;
