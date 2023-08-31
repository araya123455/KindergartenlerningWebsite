import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { learningvideo } from "../slice/DataSlice";
import "../assets/css/movement.css";
import "../assets/css/clouds.css";

const Freeactivities = () => {
  const dispatch = useDispatch();
  const [showdata, setshowdata] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const loadData = () => {
    dispatch(learningvideo())
      .then((result) => {
        setshowdata(result.payload);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleVideoClick = (videoLink) => {
    const videoId = getVideoIdFromLink(videoLink);
    setSelectedVideo(videoId);
  };

  const getVideoIdFromLink = (videoLink) => {
    const videoIdRegex = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i;
    const match = videoLink.match(videoIdRegex);
    if (match && match[1]) {
      return match[1];
    } else {
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
      <h1>กิจกรรมเสรี - Freeactivities</h1>
      <br></br>
      <div className="video-cards-container">
      {showdata
        .filter((data) => data.cont_id === 3) // Filter the data based on contV_id
        .map((data) => {
          const { video_detail, video_link, cont_id } = data;
          return (
            <div key={cont_id} className="video-card">
              <div
                className="video-thumbnail"
                onClick={() => handleVideoClick(video_link)}
              >
                <img
                  src={`https://img.youtube.com/vi/${getVideoIdFromLink(
                    video_link
                  )}/0.jpg`}
                  alt="Video Thumbnail"
                  style={{ cursor: "pointer" }}
                />
              </div>
              <h3>{video_detail}</h3>
            </div>
          );
        })}
      </div>

      {selectedVideo && (
        <Modal show={true} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Video Preview</Modal.Title>
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

export default Freeactivities;
