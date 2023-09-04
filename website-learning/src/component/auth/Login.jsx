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
    <Link to={"/main"} onClick={() => onClickId(0)}>
        <svg
          baseProfile="tiny"
          height="24px"
          id="Layer_1"
          version="1.2"
          viewBox="0 0 24 24"
          width="24px"
          //   xml:space="preserve"
          //   xmlns="http://www.w3.org/2000/svg"
          //   xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path d="M19.164,19.547c-1.641-2.5-3.669-3.285-6.164-3.484v1.437c0,0.534-0.208,1.036-0.586,1.414   c-0.756,0.756-2.077,0.751-2.823,0.005l-6.293-6.207C3.107,12.523,3,12.268,3,11.999s0.107-0.524,0.298-0.712l6.288-6.203   c0.754-0.755,2.073-0.756,2.829,0.001C12.792,5.463,13,5.965,13,6.499v1.704c4.619,0.933,8,4.997,8,9.796v1   c0,0.442-0.29,0.832-0.714,0.958c-0.095,0.027-0.19,0.042-0.286,0.042C19.669,19.999,19.354,19.834,19.164,19.547z M12.023,14.011   c2.207,0.056,4.638,0.394,6.758,2.121c-0.768-3.216-3.477-5.702-6.893-6.08C11.384,9.996,11,10,11,10V6.503l-5.576,5.496l5.576,5.5   V14C11,14,11.738,14.01,12.023,14.011z" />
          </g>
        </svg>
      </Link>
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
