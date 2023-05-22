import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../../assets/css/Login.css";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginstudent } from "../../slice/dataTableSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import md5 from "md5";

function Login({ signin }) {
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
  // const username = "araya";
  // const password = "123456";
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      console.log("Please try again!");
      notify();
      return;
    }
    const hashedPassword = md5(passwordInput);
    let body = { username: usernameInput, password: hashedPassword };
    dispatch(loginstudent(body))
      .then((result) => {
        console.log(result);
        if (result.payload === "success") {
          signin();
          navigate("/main");
        }
        if (result.payload === "Try Again") {
          console.log("Login fail");
          notify();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="border">
      <h2>LOGIN</h2>
      <div className="inputBorder">
        <Form>
          <Form.Group className="mb-3" controlId="usernameInput">
            <Form.Label>Username</Form.Label>
            <Form.Control
              className="input-line"
              type="text"
              placeholder="Enter username"
              onChange={(e) => setUsernameInput(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordInput">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="input-line"
              type="password"
              placeholder="Enter password"
              onChange={(e) => setPasswordInput(e.target.value)}
            />
          </Form.Group>
          {/* <Button variant="primary" type="submit" onClick={onSubmit}>
            Submit
          </Button> */}
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
            to="/register"
          >
            Register
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

export default Login;
