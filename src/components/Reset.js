import React from "react";
import { useContext,useState,useEffect } from "react";
// import { RecoveryContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

 const Reset=()=> {
//   const { setPage } = useContext(RecoveryContext);
const navigate = useNavigate(); // Hook for navigation
const [email, setemail] = useState("");

useEffect(() => {
  const foremail =localStorage.getItem("foremail");
  setemail(foremail);
   console.log("aya",foremail)
  }, []);

const [formData, setFormData] = useState({
   
    password: '',
    confirmpassword: ''
  });


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      .put(`http://localhost:8082/register/update/password/${email}`, formData)
      .then((response) => {
        console.log(response.data);
        setSuccessMessage('Registration successful!');
        // setErrorMessage('');
        navigate('/recovered');
      })
      .catch((error) => {
        console.log('Registration failed.', error.message);
        console.log('error.', error.response.data);
        setErrorMessage(error.response.data);
        // setSuccessMessage('');
      });

   
  };



  return (
    <div>
    <h1>Reset your password</h1>
    {successMessage && (
        <div className="success">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="error">{errorMessage}</div>
      )}
    <form onSubmit={handleSubmit}>
       
       
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
          reset
        </button>
        {/* <p className="signInText">
          Already have an account? <Link to="/login" className="signInLink">Sign In</Link>
        </p> */}
      </form>
      
    </div>
  );
}

export default Reset