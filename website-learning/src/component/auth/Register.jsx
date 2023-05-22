import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Register.css";
import { Link } from "react-router-dom";
import md5 from "md5";
import { register } from "../../slice/dataTableSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const notify = () =>
    toast.error("Please try agin!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [inputregis, setinputregis] = useState({
    name: "",
    lastName: "",
    sex: "",
    username: "",
    password: "",
  });

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setinputregis({
      ...inputregis,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    console.log("Hello!");
    e.preventDefault();
    if (
      !inputregis.name ||
      !inputregis.lastName ||
      !inputregis.sex ||
      !inputregis.username ||
      !inputregis.password
    ) {
      notify();
      console.log("Please try again!");
      return;
    }
    const hashedPassword = md5(inputregis.password);
    let body = {
      name: inputregis.name,
      lastName: inputregis.lastName,
      sex: inputregis.sex,
      username: inputregis.username,
      password: hashedPassword,
    };

    // const hashedPassword = md5(
    //   inputregis.password !== "" && inputregis.password
    // );
    // let body = {
    //   name: inputregis.name !== "" && inputregis.name,
    //   lastName: inputregis.lastName !== "" && inputregis.lastName,
    //   sex: inputregis.sex !== "" && inputregis.sex,
    //   username: inputregis.username !== "" && inputregis.username,
    //   password: hashedPassword,
    // };

    dispatch(register(body))
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border">
      <h2>REGISTER</h2>
      <div className="inputBorder">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="input-line"
              type="text"
              name="name"
              onChange={(e) => handleInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              className="input-line"
              type="text"
              name="lastName"
              onChange={(e) => handleInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sex</Form.Label>
            <Form.Control
              className="input-line"
              type="text"
              name="sex"
              onChange={(e) => handleInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="input-line"
              type="text"
              name="username"
              onChange={(e) => handleInput(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="input-line"
              type="password"
              name="password"
              onChange={(e) => handleInput(e)}
            />
          </Form.Group>
          <button className="button-30" role="button" onClick={onSubmit}>
            Submit
          </button>
          <Link
            style={{
              marginLeft: "90%",
              marginBottom: "30%",
              textDecoration: "none",
              color: "#fff",
              fontSize: "13px",
            }}
            to="/login"
          >
            Login
          </Link>
        </Form>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}

export default Register;
