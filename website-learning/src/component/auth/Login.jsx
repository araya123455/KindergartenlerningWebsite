import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin, teacherlogin, studentlogin } from "../../slice/DataSlice";
import md5 from "md5";
import "../../assets/css/Login.css";
import { saveToLocalStorage } from "../../LocalStorage/localstorage";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default role: teacher
  // console.log("selectedRole", selectedRole);

  saveToLocalStorage("adm_auth", null);
  saveToLocalStorage("tch_auth", null);
  saveToLocalStorage("stu_auth", null);
  // console.log("login page");
  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      alert("กรุณาลองใหม่อีกครั้ง!!");
      console.log("Please try again!");
      return;
    }

    if (selectedRole === "admin") {
      let body = {
        adm_user: usernameInput,
        adm_pass: passwordInput,
      };
      dispatch(adminlogin(body))
        .then((result) => {
          // console.log(result.payload.data[0]);
          if (result.payload.message === "success") {
            saveToLocalStorage("adm_auth", result.payload.data[0]);
            saveToLocalStorage("login", true);
            // signin();
            navigate("/admin");
          } else {
            alert("กรุณาลองใหม่อีกครั้ง!!");
          }
          if (result.payload.message === "Try Again") {
            console.log("Login fail");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (selectedRole === "teacher") {
      let body = {
        tch_user: usernameInput,
        tch_pass: passwordInput,
      };
      dispatch(teacherlogin(body))
        .then((result) => {
          // console.log(result.payload.data[0]);
          if (result.payload.message === "success") {
            // Store tch_user in localStorage
            // localStorage.setItem("tch_user", usernameInput);
            // console.log(result.payload);

            // Update state to reflect logged in status
            saveToLocalStorage("tch_auth", result.payload.data[0]);
            saveToLocalStorage("login", true);
            // signin();
            navigate("/teacher");
          } else {
            alert("กรุณาลองใหม่อีกครั้ง!!");
          }
          if (result.payload.message === "Try Again") {
            console.log("Login fail");
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
          // console.log(result);
          if (result.payload.message === "success") {
            saveToLocalStorage("stu_auth", result.payload.data[0]);
            saveToLocalStorage("login", true);
            // signin();
            navigate("/student");
          } else {
            alert("กรุณาลองใหม่อีกครั้ง!!");
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
      <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
        <div className="cloud x6"></div>
        <div className="cloud x7"></div>
      </div>
      <div className="border">
        <h2 className="l-h2">LOGIN</h2>
        <div className="inputBorder">
          <Form>
            <Form.Group className="mb-3" controlId="usernameInput">
              <div className="l-center">
                <Link className="l-s">
                  <svg
                    height="23"
                    viewBox="0 0 1792 1792"
                    width="23"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1600 1405q0 120-73 189.5t-194 69.5h-874q-121 0-194-69.5t-73-189.5q0-53 3.5-103.5t14-109 26.5-108.5 43-97.5 62-81 85.5-53.5 111.5-20q9 0 42 21.5t74.5 48 108 48 133.5 21.5 133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5t-271.5 112.5-271.5-112.5-112.5-271.5 112.5-271.5 271.5-112.5 271.5 112.5 112.5 271.5z" />
                  </svg>
                </Link>
                <Form.Label className="label-l">Username</Form.Label>
              </div>
              <Form.Control
                className="input-line form-control input-user"
                type="text"
                placeholder="User name / Email"
                autoComplete="username"
                onChange={(e) => setUsernameInput(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="passwordInput">
              <div className="l-center">
                <Link className="l-s">
                  <svg
                    enable-background="new 0 0 24 24"
                    height="20px"
                    id="Layer_1"
                    version="1.1"
                    viewBox="0 0 22 22"
                    width="20px"
                    xml:space="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M20.002,24.001H4.014c-1.104,0-1.998-0.896-1.998-2.001V11.994  c0-1.105,0.895-2.002,1.998-2.002h0.999V6.991c0-3.868,3.132-7.004,6.995-7.004s6.995,3.136,6.995,7.004v3.001h0.999  c1.104,0,1.998,0.896,1.998,2.002V22C22,23.104,21.105,24.001,20.002,24.001z M16.005,6.991c0-2.21-1.79-4.002-3.997-4.002  S8.011,4.781,8.011,6.991v3.001h7.994V6.991z"
                      fill-rule="evenodd"
                    />
                  </svg>
                </Link>
                <Form.Label className="label-l">Password</Form.Label>
              </div>
              <Form.Control
                className="input-line form-control"
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={(e) => setPasswordInput(e.target.value)}
              />
            </Form.Group>
            <div>
              <Form.Group className="mb-3">
                <Form.Label className=" label-l">ผู้ใช้งาน: </Form.Label>
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
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
