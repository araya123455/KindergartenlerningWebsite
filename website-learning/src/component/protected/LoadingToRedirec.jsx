import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function LoadingToRedirec() {
  const navigate = useNavigate();
  const [count, setCount] = useState(3);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect
    count === 0 && navigate("/login");

    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="warning" />
    </div>
  );
}

export default LoadingToRedirec;
