import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { showadmin } from "../slice/DataSlice";
import "../assets/css/blurredAnimatedGradients.css";

function AdminProfile() {
  // const [showad, setshowad] = useState([]);
  const auth = getFromLocalStorage("adm_auth");

  useEffect(() => {
    // setshowad(auth);
  }, []);

  return (
    <div>
      <div className="blurred-bg">
        <div className="blurred gradient-ani"></div>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center", // Align cards to the center
        }}
      >
        <Card
          sx={{
            width: "400px", // Updated to a wider value
            display: "flex",
            // marginTop: "50px",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center", // Center align card content
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)", // Zoom in a bit on hover
            },
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="310"
              alt="Admin Image"
              // Use the full URL of the image
              src={"/images/admin.jpg"}
            />
            <CardContent>
              <Typography gutterBottom component="div">
                <h2 className="font-mail">Profile</h2>
              </Typography>
              <Typography gutterBottom component="div">
                <h5>
                  ชื่อ-นามสกุล: {auth?.prefix} {auth?.adm_name}{" "}
                  {auth?.adm_Lname}
                </h5>
              </Typography>
              <Typography gutterBottom component="div">
                <h5 className="font-mail">Username: {auth?.adm_user}</h5>
              </Typography>
              {/* color="text.secondary" */}
              <Typography>
                <h5>แผนก: {auth?.adm_sect}</h5>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default AdminProfile;
