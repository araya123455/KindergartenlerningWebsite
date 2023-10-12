import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFromLocalStorage } from "../LocalStorage/localstorage";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { showteacherposi } from "../slice/DataSlice";

function TeacherProfile() {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [showposition, setshowposition] = useState([]);
  const auth = getFromLocalStorage("tch_auth");
  // console.log(auth);

  const loadteacherposition = () => {
    dispatch(showteacherposi())
      .then((result) => {
        setshowposition(result.payload);
        // console.log(showposition);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadteacherposition();
    setshowdata(auth);
    // console.log(auth);
  }, []);

  // const posi = showposition?.find(
  //   (p) => p.position_id === showdata?.position_id
  // );

  return (
    <div>
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <h2 className="font-mail">Profile</h2>
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                <p>
                  ชื่อ-นามสกุล {showdata?.prefix} {showdata?.tch_Fname}{" "}
                  {showdata?.tch_Lname}
                </p>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <p>เลขประจำตัว {showdata?.tch_sn}</p>
              </Typography>
              <Typography variant="h6" color="text.secondary">
                <p>แผนก {showdata?.tch_sect} ตำแหน่ง</p>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}

export default TeacherProfile;
