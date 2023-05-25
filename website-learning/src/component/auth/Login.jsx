import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { adminlogin, teacherlogin, studentlogin } from "../../slice/DataSlice";
import md5 from "md5";
import "../../assets/css/Login.css";

function Login() {
  /*const checkRole= ()=>{
    if(status === 0){
      navigate("/techer");
    }else{
      if( status === 1){
        navigate("/student");
      }
    }
  } */

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("teacher"); // Default role: teacher

  console.log("selectedRole", selectedRole);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput || !passwordInput) {
      console.log("Please try again!");
      return;
    }
    const hashedPassword = md5(passwordInput);
    // let body = { tch_user: usernameInput, tch_pass: passwordInput };
    //เราใช้ bodyตัวเดียวกัน ตัวในbodyมันจะเหมือนกัน

    console.log(selectedRole);
    if (selectedRole === "teacher") {
      let body = {
        tch_user: usernameInput,
        tch_pass: passwordInput,
      };
      dispatch(teacherlogin(body))
        .then((result) => {
          console.log(result);
          if (result.payload === "success") {
            // signin();
            navigate("/teacher");
          }
          if (result.payload === "Try Again") {
            console.log("Login fail");
            // notify();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (selectedRole === "admin") {
      let body = {
        adm_user: usernameInput,
        adm_pass: passwordInput,
      };
      dispatch(adminlogin(body))
        .then((result) => {
          console.log(result);
          if (result.payload === "success") {
            // signin();
            navigate("/admin");
          }
          if (result.payload === "Try Again") {
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
            if (result.payload === "success") {
              // signin();
              navigate("/student");
            }
            if (result.payload === "Try Again") {
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
  );
}

export default Login;
