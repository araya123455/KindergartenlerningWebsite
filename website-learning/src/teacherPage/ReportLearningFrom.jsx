import React, { useState } from 'react';

const ReportLearningForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    // Define your form fields here
    name: '',
    age: '',
    // Add more fields as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form className="report-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      {/* Add more form fields as needed */}
    </form>
  );
};

export default ReportLearningForm;
