

import '../components/css/Register.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: ''
  });


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8082/register/', formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
        navigate('/login');
      })
      .catch((error) => {
        console.log('Registration failed.', error.message);
        console.log('error.', error.response.data);
        setErrorMessage(error.response.data);
        setSuccessMessage('');
      });

   
  };

  return (
    <div >
      {successMessage && (
        <div className="success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}
      <h2 className="heading">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            // className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            // className="input"
          />
        </div>
        <div className="formGroup">
        <label className="label">Password:<span><p>Password must be at least <span style={{ color: 'red', fontWeight: 'bold' }}>8 characters</span> long and contain at least <span style={{ color: 'blue', fontWeight: 'bold' }}> one letter</span> and <span style={{ color: 'green', fontWeight: 'bold' }}>one special character</span>.</p></span></label>



          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            // className="input"
          />
        </div>
        <div className="formGroup">
          <label className="label">Confirm Password:</label>
          <input
            type="password"
            name="confirmpassword"
            value={formData.confirmpassword}
            onChange={handleInputChange}
            // className="input"
          />
        </div>
        <button type="submit" className="button">
          Register
        </button>
        <p className="signInText">
          Already have an account? <Link to="/login" className="signInLink">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

// CSS


