import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { Form, Button, FormLabel } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";
import { 
    showclass,
    showkinroom,
    getDataAll,
    searchclasstime,
  } from "../slice/DataSlice";

function MgtAssessment() {
  return (
    <div>MgtAssessment</div>
  )
}

export default MgtAssessment