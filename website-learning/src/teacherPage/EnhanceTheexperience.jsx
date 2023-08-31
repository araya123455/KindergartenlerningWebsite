import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { learningvideo } from "../slice/DataSlice";
import "../assets/css/movement.css"
import "../assets/css/clouds.css";

const EnhanceTheexperience = () => {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null);

  const loadData = () => {
    console.log("123");
    dispatch(learningvideo())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      }); 
      console.log("show:",showdata);
  };
  // const loadFile = () => {
  //   dispatch(learningfilepdf())
  //     .then((result) => {
  //       setshowdata(result.payload);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  useEffect(() => {
    loadData();
    console.log("show: ",loadData());
    // loadFile();
  }, []);

  const handleVideoClick = (videoLink) => {
    // Extract the video ID from the YouTube link
    const videoId = getVideoIdFromLink(videoLink);
    setSelectedVideo(videoId);
  };

  // Function to extract video ID from the YouTube link
  const getVideoIdFromLink = (videoLink) => {
    // Example video link format: https://www.youtube.com/watch?v=VG9RqbNGNjQ&pp=ygVU4Liq4Li34LmI4Lit4LiB4Liy4Lij4LmA4Lij4Li14Lii4LiZ4LiB4Liy4Lij4Liq4Lit4LiZ4LmA4LiU4LmH4LiB4Lit4LiZ4Li44Lia4Liy4Lil
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    const match = videoLink.match(videoIdRegex);
    if (match && match[1]) {
      return match[1];
    } else {
      // If the video ID cannot be extracted, return the original link
      return videoLink;
    }
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
   
    
    <div className="video-container">
       <div id="clouds">
             <div className="cloud x1"></div>
             <div className="cloud x2"></div>
             <div className="cloud x3"></div>
             <div className="cloud x4"></div>
             <div className="cloud x5"></div>
             <div className="cloud x6"></div>
             <div className="cloud x7"></div>
           </div>
      <h1>การเคลื่อนไหว - EnhanceTheexperience</h1><br></br>
     
      {showdata
        .filter((data) => data.cont_id === 2) // Filter the data based on contV_id
        .map((data) => {
          const { video_detail, video_link, cont_id } = data;
        return (
          <div key={cont_id} className="video-card">
            <div
              className="video-thumbnail"
              onClick={() => handleVideoClick(video_link)}
            >
              <img
                src={`https://img.youtube.com/vi/${getVideoIdFromLink(video_link)}/0.jpg`} // Use getVideoIdFromLink to extract the video ID
                alt="Video Thumbnail"
                style={{ cursor: "pointer" }}
              />
            </div>
            <h3>{video_detail}</h3>
          </div>
        );
      })}

      {/* Modal to show and play the video */}
      {selectedVideo && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Video Preview</Modal.Title>
            {/* <Modal.Title>เสริมประสบการ</Modal.Title> */}
          </Modal.Header>
          <Modal.Body>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}`}
              title="Video Player"
              width="100%"
              height="400"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </Modal.Body>
        </Modal>
      )}
    </div>
  
  );
};

export default EnhanceTheexperience;