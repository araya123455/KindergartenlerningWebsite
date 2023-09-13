import React, { useState } from 'react';
import ReportLearningForm from './ReportLearningFrom'
import ReportDisplayLearning from './ReportDisplayLearning'
import '../assets/css/PrintStyles.css';

function Report() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can process or send the form data here if needed
  };

  return (
    <div className="report">
      <h1>Report learning Materia</h1>
      <br></br>
      {/* <ReportLearningForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} /> */}
      <ReportDisplayLearning formData={formData} />
    </div>
  );
}


export default Report