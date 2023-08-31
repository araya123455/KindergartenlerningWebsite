import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setpdfUrl } from "../slice/PdfSlice"
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import "../assets/css/learning.css";
import "../assets/css/clouds.css";

function LearningFile() {
  const dispatch = useDispatch();
  const pdfUrls = useSelector((state) => state.pdf.pdfUrl);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openViewer = (index) => {
    setSelectedPdfIndex(index);
    setIsViewerOpen(true);
  };

  const closeViewer = () => {
    setSelectedPdfIndex(null);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const fetchPdfUrls = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pdf");
        const pdfData = response.data;
      console.log("1233",response)
        const pdfUrls = pdfData.map((item) => {
          return { 
            url: `http://localhost:3000${item.url}`,
            name: item.name, 
          };
        });

        dispatch(setpdfUrl(pdfUrls));
      } catch (error) {
        console.error("Error fetching PDF URLs:", error);
      }
    };

    fetchPdfUrls();
  }, [dispatch]);

  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);

  console.log("pdf", pdfUrls);
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
      <h1>Learning File PDF</h1>
      {pdfUrls && pdfUrls?.length > 0 ? (
        <div className="pdf-row">
          {pdfUrls.map((pdf, index) => (
            <div className="pdf-entry" key={index}>
             <p>{`PDF File : ${pdf.name}`}</p> {/* Display the file name */}
              <button 
                className="glow-on-hover"
                onClick={() => {
                  if (selectedPdfIndex === index && isViewerOpen) {
                    closeViewer();
                  } else {
                    openViewer(index);
                  }
                }}
              >
                {selectedPdfIndex === index && isViewerOpen ? "Close" : "View"}
              </button>
              {selectedPdfIndex === index && isViewerOpen && (
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
                  <Viewer
                    fileUrl={pdf.url}
                    plugins={[defaultLayoutPluginInstance]}
                  />
                </Worker>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No PDF files available</p>
      )}
    </div>
  );
}

export default LearningFile;
