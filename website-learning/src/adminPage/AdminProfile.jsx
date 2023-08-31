import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { showadmin } from "../slice/DataSlice";

function AdminProfile() {
  const dispatch = useDispatch();
  const [showad, setshowad] = useState([]);

  // load admin
  const loadAdmin = () => {
    dispatch(showadmin())
      .then((result) => {
        setshowad(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // const loadAdmin = () => {
  //   const saveAdmin = localStorage.getItem("admin");
  //   if (saveAdmin) {
  //     setshowad(JSON.parse(saveAdmin));
  //   } else {
  //     dispatch(showadmin())
  //       .then((result) => {
  //         const adminData = result.payload;
  //         setshowad(adminData);
  //         saveAdminToLocalStorage(adminData);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // };

  // const saveAdminToLocalStorage = (data) => {
  //   localStorage.setItem("admin", JSON.stringify(data));
  // };

  useEffect(() => {
    loadAdmin();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center", // Align cards to the center
      }}
    >
      {showad.map((admin) => {
        const {
          adm_id,
          prefix,
          adm_name,
          adm_Lname,
          adm_sn,
          adm_user,
          status,
        } = admin;
        return (
          <Card
            key={adm_id}
            sx={{
              width: "400px", // Updated to a wider value
              display: "flex",
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
                height="350"
                alt="Admin Image"
                // Use the full URL of the image
                src={"/images/admin.jpg"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {prefix} {adm_name} {adm_Lname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {adm_sn}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
}

export default AdminProfile;
