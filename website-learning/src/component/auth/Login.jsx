import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin, teacherlogin, studentlogin } from "../../slice/DataSlice";
import md5 from "md5";
import "../../assets/css/Login.css";
import { saveToLocalStorage } from "../../LocalStorage/localstorage";

function Login({ signin }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default role: teacher
  // console.log("selectedRole", selectedRole);
  saveToLocalStorage("auth", null);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      console.log("Please try again!");
      return;
    }

    const hashedPassword = md5(passwordInput);

    if (selectedRole === "teacher") {
      let body = {
        tch_user: usernameInput,
        tch_pass: passwordInput,
      };
      dispatch(teacherlogin(body))
        .then((result) => {
          console.log(result.payload.data[0]);
          if (result.payload.message === "success") {
            // Store tch_user in localStorage
            // localStorage.setItem("tch_user", usernameInput);
            // saveToLocalStorage('auth', )
            // console.log(result.payload);

            // Update state to reflect logged in status
            saveToLocalStorage("auth", result.payload.data[0]);
            signin();
            navigate("/teacher");
          }
          if (result.payload.message === "Try Again") {
            console.log("Login fail");
            // notify();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (selectedRole === "student") {
      let body = {
        stu_user: usernameInput,
        stu_pass: passwordInput,
      };
      dispatch(studentlogin(body))
        .then((result) => {
          console.log(result);
          if (result.payload.message === "success") {
            saveToLocalStorage("auth", result.payload.data[0]);
            signin();
            console.log("123");
            navigate("/student");
          }
          if (result.payload.message === "Try Again") {
            console.log("Login fail");
            // notify();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
     <button className="btn-back" role="button">
        <Link to={"/main"} className="back-font">
          <svg
            viewBox="0 0 96 96"
            height="24px"
            id="Layer_1"
            version="1.2"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z"
              fill="#ffffff"
            />
          </svg>
          ย้อนกลับ
        </Link>
      </button>
      <div className="border">
        <h2>LOGIN</h2>
        <div className="inputBorder">
          <Form>
            <Form.Group className="mb-3" controlId="usernameInput">
              <Form.Label>Username</Form.Label>
              <Form.Control
                className="input-line form-control"
                type="text"
                placeholder="Enter username"
                autoComplete="username"
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordInput">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="input-line form-control"
                type="password"
                placeholder="Enter password"
                autoComplete="current-password"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </Form.Group>
            <div>
              <Form.Group className="mb-3">
                <Form.Label className="label">Option: </Form.Label>
                <Form.Select
                  className="details summary"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option className="" value="admin">
                    Admin
                  </option>
                  <option className="" value="teacher">
                    Teacher
                  </option>
                  <option className="" value="student">
                    Student
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
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
        </div>
      </div>
    </>
  );
}

export default Login;
