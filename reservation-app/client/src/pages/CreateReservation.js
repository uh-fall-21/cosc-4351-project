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
    name: "",
    phone: "",
    email: "",
    datetime: "", //might need fix
    guestCount: 0, //might need int

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
    datetime: Yup.datetime().required(),
    guestCount: Yup.integer().required(),
  });

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3001/posts", data, {
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
          <label>Number of Guests: </label>
          <ErrorMessage name="title" component="span" />
          <Field
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

          <button type="submit" id = "createPost"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateReservation;
