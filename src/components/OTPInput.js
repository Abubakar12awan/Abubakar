// import React from "react";
// import { useState ,useEffect} from "react";
// import { useContext } from "react";
// // import { RecoveryContext } from "../App";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const OTPInput = () =>{

//     //   const { email, otp, setPage } = useContext(RecoveryContext);

//     const [timerCount, setTimer] = React.useState(60);
//     const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
//     const [disable, setDisable] = useState(true);
//     const [otp, setotp] = useState("");
//     const [email, setemail] = useState("");
//     const navigate = useNavigate(); // Hook for navigation

//     useEffect(() => {
//         const emai  = localStorage.getItem("foremail");
//         setemail(emai)
//         const ot  = localStorage.getItem("otp");
//         setotp(ot)

//         // if (isLoggedIn) {
//         //   navigate("/");
//         // }

//       }, []);

//   function resendOTP() {
//     if (disable) return;
//     axios
//       .post("http://localhost:5000/send_recovery_email", {
//         OTP: otp,
//         recipient_email: email,
//       })
//       .then(() => setDisable(true))
//       .then(() => alert("A new OTP has succesfully been sent to your email."))
//       .then(() => setTimer(60))
//       .catch(console.log);
//   }

//   function verfiyOTP() {
//     if (parseInt(OTPinput.join("")) === otp) {
//         navigate("/reset")
//       return;
//     }
//     alert(
//       "The code you have entered is not correct, try again or re-send the link"
//     );
//     return;
//   }

//   React.useEffect(() => {
//     let interval = setInterval(() => {
//       setTimer((lastTimerCount) => {
//         lastTimerCount <= 1 && clearInterval(interval);
//         if (lastTimerCount <= 1) setDisable(false);
//         if (lastTimerCount <= 0) return lastTimerCount;
//         return lastTimerCount - 1;
//       });
//     }, 1000); //each count lasts for a second
//     //cleanup the interval on complete
//     return () => clearInterval(interval);
//   }, [disable]);

//   return (
//     <div className="flex justify-center items-center w-screen h-screen bg-gray-50">
//     <h1>otp</h1>
//       <div className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
//         <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
//           <div className="flex flex-col items-center justify-center text-center space-y-2">
//             <div className="font-semibold text-3xl">
//               <p>Email Verification</p>
//             </div>
//             <div className="flex flex-row text-sm font-medium text-gray-400">
//               <p>We have sent a code to your email {email}</p>
//             </div>
//           </div>

//           <div>
//             <form>
//               <div className="flex flex-col space-y-16">
//                 <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
//                   <div className="w-16 h-16 ">
//                     <input
//                       maxLength="1"
//                       className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                       type="text"
//                       name=""
//                       id=""
//                       onChange={(e) =>
//                         setOTPinput([
//                           e.target.value,
//                           OTPinput[1],
//                           OTPinput[2],
//                           OTPinput[3],
//                         ])
//                       }
//                     ></input>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input
//                       maxLength="1"
//                       className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                       type="text"
//                       name=""
//                       id=""
//                       onChange={(e) =>
//                         setOTPinput([
//                           OTPinput[0],
//                           e.target.value,
//                           OTPinput[2],
//                           OTPinput[3],
//                         ])
//                       }
//                     ></input>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input
//                       maxLength="1"
//                       className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                       type="text"
//                       name=""
//                       id=""
//                       onChange={(e) =>
//                         setOTPinput([
//                           OTPinput[0],
//                           OTPinput[1],
//                           e.target.value,
//                           OTPinput[3],
//                         ])
//                       }
//                     ></input>
//                   </div>
//                   <div className="w-16 h-16 ">
//                     <input
//                       maxLength="1"
//                       className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                       type="text"
//                       name=""
//                       id=""
//                       onChange={(e) =>
//                         setOTPinput([
//                           OTPinput[0],
//                           OTPinput[1],
//                           OTPinput[2],
//                           e.target.value,
//                         ])
//                       }
//                     ></input>
//                   </div>
//                 </div>

//                 <div className="flex flex-col space-y-5">
//                   <div>
//                     <a
//                       onClick={() => verfiyOTP()}
//                       className="flex flex-row cursor-pointer items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
//                     >
//                       Verify Account
//                     </a>
//                   </div>

//                   <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                     <p>Didn't recieve code?</p>{" "}
//                     <a
//                       className="flex flex-row items-center"
//                       style={{
//                         color: disable ? "gray" : "blue",
//                         cursor: disable ? "none" : "pointer",
//                         textDecorationLine: disable ? "none" : "underline",
//                       }}
//                       onClick={() => resendOTP()}
//                     >
//                       {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OTPInput;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./OTPInput.css"; // Import the CSS file
import "../components/css/Otpinput.css";

const OTPInput = () => {
  const [OTPinput, setOTPinput] = useState([0, 0, 0, 0]);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  // useEffect(() => {
  //   // const email = localStorage.getItem("foremail");
  //   // setEmail(email);

  // }, []);

  function verifyOTP() {
    // console.log("type of otp input ",typeof(OTPInput))

    // OTPinput=parseInt(OTPinput.join("")
    axios
      .post("http://localhost:8082/verifyotp", {
        OTPinput: OTPinput,
        // recipient_email: email,
      })
      .then((res) => {
        console.log("successfull");
        console.log(res.data);
        // alert("Update your password")

        navigate("/reset");
      })
      .catch((err) => {
        setErrorMessage("unsuccessfull:Plase Enter Correct Code");

        console.log("unsuccessfull");
        console.log(err);
      });
  }


  return (
    <div className="container">
 {errorMessage && (
  <div
    style={{
      backgroundColor: '#f2dede',
      color: '#a94442',
      padding: '10px',
      marginBottom: '20px',
      borderRadius: '4px',
      border: '1px solid #ebccd1',
      textAlign: 'center'
    }}
    // className="error"
  >
    {errorMessage}
  </div>
)}

      <div className="card">
        <div className="title">Email Verification</div>
        <div className="description">
          We have sent a code to your email <br/> {email}
          <br/>Please enter the code Below
        </div>

        <form>
          <div className="input-group">
            {OTPinput.map((value, index) => (
              <input
                key={index}
                maxLength="1"
                className="input"
                type="text"
                onChange={(e) => {
                  const newOTPinput = [...OTPinput];
                  newOTPinput[index] = e.target.value;
                  setOTPinput(newOTPinput);
                }}
              />
            ))}
          </div>

          <div className="button-group">
            
            {/* 
            <div className="resend-group">
              <p className="resend-text">Didn't receive the code?</p>
              <a
                onClick={() => resendOTP()}
                className={`resend-link ${disable ? "disabled" : ""}`}
              >
                {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
              </a>
            </div> */}
          </div>
        </form>
        <button onClick={() => verifyOTP()} className="button">
              Verify Account
            </button>
      </div>
    </div>
  );
};

export default OTPInput;
