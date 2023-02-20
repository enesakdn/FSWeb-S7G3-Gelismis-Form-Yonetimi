import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Form from "./Components/Form";
import * as yup from "yup";
import axios from "axios";

function App() {
  const [usersData, setUsersData] = useState([]);
  const [formData, setFormData] = useState({
    isim: "",
    soyisim: "",
    email: "",
    password: "",
    kosul: false,
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response.data);
        setUsersData([...usersData, response.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSema = yup.object({
    isim: yup.string().required("Buraya İsim Giriniz!"),
    soyisim: yup.string().required("Buraya soyisim giriniz!"),
    email: yup
      .string()
      .email("Geçerli email giriniz.")
      .required("Email girmeniz gereklidir"),
    password: yup
      .string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum."),
    kosul: yup.boolean(),
  });

  const [formError, setFormError] = useState({
    isim: "",
    soyisim: "",
    email: "",
    password: "",
    kosul: false,
  });

  function hatalariKontrolEt(id, value) {
    yup
      .reach(formSema, id)
      .validate(value)
      .then(() => {
        setFormError({
          ...formError,
          [id]: "",
        });
      })
      .catch((error) => {
        setFormError({
          ...formError,
          [id]: error.errors[0],
        });
      });
  }

  function handleOnChange(event) {
    const { id, value, checked, type } = event.target;

    hatalariKontrolEt(id, value);

    if (id === "kosul") {
      setFormData({ ...formData, [id]: checked });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  function UsersDataTurner(data) {
    return (
      <div style={{ border: "1px solid blue" }}>
        <p>{data.isim}</p>
        <p>{data.soyisim}</p>
        <p>{data.email}</p>
      </div>
    );
  }

  return (
    <>
      <Form
        formData={formData}
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
        formError={formError}
      />

      {usersData.map((object) => UsersDataTurner(object))}
    </>
  );
}

export default App;
