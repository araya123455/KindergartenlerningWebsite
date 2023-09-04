import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setpdfUrlEnglish } from "../slice/PdfSliceEnglish";      
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import axios from "axios";
import "../assets/css/learning.css";
import "../assets/css/clouds.css";
import "../assets/css/Split.css";

function SubjectFileEnglish() {
  const dispatch = useDispatch();
  const pdfUrlEnglish = useSelector((state) => state.pdf.pdfUrlEnglish);

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
    const fectchPdfUrlsEnglish = async () => {
      try {
        const response = await axios.get("http://localhost:3000/pdfEnglish");
        const pdfData = response.data;
        console.log(pdfData);
        const pdfUrlEnglish = pdfData.map((item) => {
          return {
            url: `http://localhost:3000${item.url}`,
            name: item.name,
          };
        });
        console.log(pdfUrlEnglish);
        dispatch(setpdfUrlEnglish(pdfUrlEnglish));
      } catch (error) {
        console.error("Error fetching PDF URLs:", error);
      }
    };

    fectchPdfUrlsEnglish();
  }, [dispatch]);

  const [selectedPdfIndex, setSelectedPdfIndex] = useState(null);

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
      <h1>วิชาภาษาอังกฤษ</h1>{" "}
      {pdfUrlEnglish && pdfUrlEnglish.length > 0 ? (
        <div className="pdf-row">
          {pdfUrlEnglish.map((pdfEnglish, index) => (
            <div className="pdf-entry" key={index}>
              <p>{`PDF File : ${pdfEnglish.name}`}</p>
              <button
                className="learn-more"
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
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
                  <Viewer
                   fileUrl={pdfEnglish.url}
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

export default SubjectFileEnglish;
