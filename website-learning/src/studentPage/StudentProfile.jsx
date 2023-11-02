import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import { pyearterm, pkinder } from "../reducers/ReducerData";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function StudentProfile() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const auth = getFromLocalStorage("stu_auth");
  const [yearterm, setyearterm] = useState([]);
  const [kinder, setkinder] = useState([]);
  const stuid = auth?.stu_id;

  const loadyearterm = () => {
    if (stuid != null) {
      dispatch(pyearterm({ stuid }))
        .then((result) => {
          setyearterm(result.payload);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const loadkinder = () => {
    if (stuid != null) {
      dispatch(pkinder({ stuid }))
        .then((result) => {
          setkinder(result.payload);
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    setshowdata(auth);
    loadyearterm();
    loadkinder();
  }, []);

  return (
    <>
     <div id="clouds">
        <div className="cloud x1"></div>
        <div className="cloud x2"></div>
        <div className="cloud x3"></div>
        <div className="cloud x4"></div>
        <div className="cloud x5"></div>
        <div className="cloud x6"></div>
        <div className="cloud x7"></div>
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
            width: "500px", // Updated to a wider value
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h2 className="font-mail">Profile</h2>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <p>
                  ชื่อ-นามสกุล: {showdata?.prefix} {showdata?.stu_Fname}{" "}
                  {showdata?.stu_Lname}
                </p>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <p>เลขประจำตัว: {showdata?.stu_user}</p>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <p>
                  ระดับชั้น/ห้อง: {kinder[0]?.kinde_level}/
                  {kinder[0]?.Kinder_room}
                </p>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <p>
                  ปีการศึกษา/เทอม: {yearterm[0]?.year}/{yearterm[0]?.term}
                </p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </>
  );
}

export default StudentProfile;
