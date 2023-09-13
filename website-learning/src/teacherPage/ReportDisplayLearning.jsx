import React from 'react';

const ReportDisplayLearning  = ({ formData }) => {
  return (
    <div className="report-display">
      {/* <Img src="logo.jpg" /> */}
      <h2>รายงานผลการเรียน</h2>
      <h3>ภาคเรียนที่ 1 ปีการศึกษา 2565 ชั้นอนุบาลปีที่ 2</h3>
      <p>Name: {formData.name}</p>
      <p>Age: {formData.age}</p>
      {/* Add more fields here */}
    </div>
  );
};
export default ReportDisplayLearning;
