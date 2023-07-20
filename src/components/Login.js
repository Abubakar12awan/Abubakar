/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { RecoveryContext } from "../App";

const cookies = new Cookies();

const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [EmailError, setEmailError] = useState();

  // const { setEmail, setPage, email, setOTP } = useContext(RecoveryContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [approveMessage, setApproveMessage] = useState("");
  const [forgetemail, setforgetemail] = useState("");
  // const [OTP, setOTP] = useState("");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("token");

    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8082/login/",
        formData
      );

      const { token, refreshToken, role, approve, email } = response.data;
      console.log(response.data);
      if (!approve) {
        setApproveMessage("You are blocked. Please contact the admin.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);
      localStorage.setItem("refreshtoken", refreshToken);
      // localStorage.setItem("purchasedItems", []); // Clear the purchasedItems

      if (role === "user") {
        navigate("/user-buy");
      } else if (role === "admin") {
        navigate("/create-book");
      }
    } catch (error) {
      // console.log("Login failed.", error.message);
      console.log("Login error.response.data.error", error.response.data.error);
      // setErrorMessage("Invalid credentials. Please try again.");
      setApproveMessage(error.response.data.error);
    }
  };

  function nagigateToOtp() {
    console.log("forgetemail is ", forgetemail);
    localStorage.setItem("foremail", forgetemail);

    if (forgetemail) {
      // const OTP = Math.floor(Math.random() * 9000 + 1000);
      // setOTP(OTP);
      // console.log("otp is ",OTP);
      // localStorage.setItem("otp", OTP);




      axios
        .post("http://localhost:8082/send_recovery_email", {
          // OTP,
          recipient_email: forgetemail,
        })
        .then((res) => {
          console.log("response data is ", res);
          console.log("response data is ", res.data);

          //  setPage("otp")
          navigate("/otp-input");
        })
        .catch((err) => {
          console.log("error response is ", err.response.data.error);
          console.log("error aya");
          setErrorMessage(err.response.data.error);

          // setTimeout(() => {
          //   setErrorMessage('');
          // }, 1000);
        });
    }
  }

  const handlefrogetemail = (e) => {
    setforgetemail(e.target.value);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(forgetemail)) {
      setEmailError(
        'Please enter a valid email address :"@gmail.com" is missing'
      );
      setTimeout(() => {
        setEmailError("");
      }, 3000);
    } else {
      setEmailError("");
    }
  };

  return (
    <div style={styles.container}>
      <div>{EmailError && <p className="error">{EmailError}</p>}</div>
      <h2 style={styles.heading}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <div style={styles.signupContainer}>
        <h2 style={styles.signupText}>
          If you haven't signed up yet, please{" "}
          <Link to="/register" style={styles.signupLink}>
            sign up
          </Link>{" "}
          first.
        </h2>
      </div>

      <div className="formGroup">
        <label className="label">Email:</label>
        <input
          type="email"
          name="email"
          value={forgetemail}
          onChange={handlefrogetemail}
          // className="input"
        />
      </div>

      {
        <div>
          <a href="#" onClick={() => nagigateToOtp()} className="text-gray-800">
            Forgot password?
          </a>
        </div>
      }

      {errorMessage && <div style={styles.errorMessage}>{errorMessage}</div>}
      {approveMessage && (
        <div style={styles.errorMessage}>{approveMessage}</div>
      )}
    </div>
  );
};


const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f2f2f2",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    width: "100%",
    marginBottom: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#555",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },
  errorMessage: {
    backgroundColor: "#f2dede",
    color: "#a94442",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ebccd1",
    textAlign: "center",
  },
  signupContainer: {
    marginTop: "20px",
    textAlign: "center",
  },
  signupText: {
    fontSize: "16px",
    color: "#555",
  },
  signupLink: {
    color: "#007bff",
    textDecoration: "none",
    fontWeight: "bold",
    // border:"1px solid black"
  },
};

export default Login;
