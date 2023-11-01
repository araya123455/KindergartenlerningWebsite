import React from "react";
import "../../assets/css/index.css";

const Contact = () => {
  return (
    <div
      className="p-3 mb-8 shadow-5-strong rounded-0 cont-top"
      style={{ backgroundColor: "#fff" }}
      id="contact"
    >
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-7">
          {/* <div className="vertical"> */}
            <h4>Contact Us</h4>
            <h5 className="el el-align-center, text-muted">office hours</h5>
            <h6 className="text-muted">Closed : Saturday and Sunday </h6>
            <h6 className="text-muted">office hours : Monday - Friday </h6>
            <h6 className="text-muted">Time : 8PM - 4AM</h6>
            <h6 className="text-muted">Email : Suraoklongsib@gmail.com</h6>
            <h6 className="text-muted">Phone : 02 988 6307</h6>           
              <p>"You can contact us only during business hours."</p>
          </div>
          
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495706.5915491233!2d100.33179773570721!3d13.916409034339141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d7062b406cd4b%3A0x52611c444d5c2491!2sSurao%20Khlong%20Sip%20School!5e0!3m2!1sen!2sth!4v1688481799395!5m2!1sen!2sth"
            width="300"
            height="300"
          ></iframe>
        </div>
      </div>
  );
};

export default Contact;
