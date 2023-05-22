import React, { useState } from "react";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import RouteNavbar from "./component/navbar/RouteNavbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
        <Route path="main" element={<RouteNavbar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
