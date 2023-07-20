import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "../components/css/Profile.css";
import "../components/css/Popup.css";
import Navbar from "./Navbar";
const Profile = () => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [editting, seteditting] = useState(false);
  const [address, setaddress] = useState("");
  const [number, setnumber] = useState("");
  const [image, setimage] = useState("");

  const navigate = useNavigate();
  // let abubakr ="";
  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    setEmail(email);

    if (ttk) {
      setToken(ttk);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getData();
  }, [email]);

  const getData = () => {

    if (email) {
      console.log(email);
      axios
        .get(`http://localhost:8082/user/find/${email}`)
        .then((res) => {
          console.log("response is ", res);
          console.log("response data is ", res.data);
          setUsername(res.data[0].username);

          setaddress(res.data[0].address);
          setnumber(res.data[0].number);
          setimage(res.data[0].image);
          console.log("username", res.data[0].username);
          console.log("retaddress", res.data[0].address);
          console.log("number", res.data[0].number);
          console.log("image ret", res.data[0].image);
        })
        .catch((err) => {
          console.log("Error from ShowBookList", err);
        });
    }
  };
  


  // useEffect(() => {
  //   console.log("qasim bhai", retaddress);
  // }, [retaddress]);

  const onChange = (e) => {
    console.log(e.target.name);

    if (e.target.name == "address") {
      setaddress(e.target.value);

      console.log("setaddress", address);
    } else if (e.target.name == "number") {
      setnumber(e.target.value);
      console.log("setnumber", number);
    } else if (e.target.name === "image") {
      console.log("file is 1 ", e.target.files);
      console.log("file is 2", e.target.files[0]);
      // setimage(e.target.fi);
      setimage(e.target.files[0]);
      console.log("image is", image);
      // console.log("first abubakar", abubakr);

      // let abubakr = await blobToString(image);

      // console.log("after abubakar", abubakr);
    }
  };

  const confirmChange = async () => {
    console.log("address is ", address);
    console.log("number is ", number);
    let abubakr="";
    console.log(image);


     if(typeof(image)=="object"){


       abubakr = await blobToString(image);
   
       console.log("")
     }
     else{
    
      // console.log("type of abubakr",typeof(abubakr))
      abubakr=image

     }
// console.log(abubakr);

    console.log("addres,number,umage", address, number, abubakr);
    axios
      .put(`http://localhost:8082/user/update/${email}`, {
        address,
        number,
        abubakr,
      })
      .then((res) => {
        console.log("update successfully");

        getData();
        seteditting(false);
      })
      .catch((err) => {
        console.log("Error updating user ", err);
        seteditting(false);
      });
  };

  const edit = (e) => {
    seteditting(true);
  };

  const handleCancel = (e) => {
    seteditting(false);
  };

  function blobToString(blob) {
    console.log("blobaya");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (blob) reader.readAsDataURL(blob);
      console.log("blobayaif");

      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#f5f5f5",
          padding: "2rem",
        }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "2rem" }}
        >
          Profile
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              overflow: "hidden",
              marginBottom: "1rem",
              border: "4px solid #fff",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <img
              src={image}
              alt="Profile Picture"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h2
            style={{
              fontSize: "1.8rem",
              marginBottom: "0.5rem",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Username:{" "}
            <span style={{ fontSize: "1.3rem", fontFamily: "Georgia, serif" }}>
              {username}
            </span>
          </h2>
          <h3
            style={{ fontSize: "1.4rem", marginBottom: "1rem", color: "#555" }}
          >
            Email: {email}
          </h3>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            Phone Number: {number}
          </p>
          <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
            Address: {address}
          </p>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <button
            onClick={edit}
            style={{
              padding: "0.8rem 2rem",
              fontSize: "1.2rem",
              borderRadius: "4px",
              backgroundColor: "#007bff",
              color: "#fff",
              cursor: "pointer",
              border: "none",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>

      <div className={`popup ${editting ? "open" : ""}`}>
        <div className="content">
          {editting && (
            <>
              <button className="cancel-button" onClick={handleCancel}>
                &#10006; {/* Unicode symbol for "X" */}
              </button>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="address"
                  name="address"
                  className="form-control"
                  value={address}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Number"
                  name="number"
                  className="form-control"
                  value={number}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="file" // Change the input type to 'file'
                  name="image"
                  className="form-control"
                  onChange={onChange}
                />
              </div>

              <div className="button-container">
                <button onClick={confirmChange}>Confirm Change</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "../components/css/Profile.css";

// const Profile = () => {
//   const [token, setToken] = useState(null);
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [retaddress, setretaddress] = useState("");
//   const [editting, seteditting] = useState(false);
//   const [address, setaddress] = useState("");
//   const [retnumber, setretnumber] = useState("");
//   const [number, setnumber] = useState("");
//   const [retimage, setretimage] = useState("");
//   const [image, setimage] = useState("");

//   const navigate = useNavigate();

//   useEffect(() => {
//     const ttk = localStorage.getItem("token");
//     const email = localStorage.getItem("email");

//     setEmail(email);

//     if (ttk) {
//       setToken(ttk);
//     } else {
//       navigate("/login");
//     }
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [email]);

//   const getData = () => {
//     if (email) {
//       console.log(email);
//       axios
//         .get(`http://localhost:8082/user/find/${email}`)
//         .then((res) => {
//           console.log("response is ", res);
//           console.log("response data is ", res.data);
//           setUsername(res.data[0].username);
//           setretaddress(res.data[0].address);
//           setretnumber(res.data[0].number);
//           setretimage(res.data[0].image);
//           console.log("username", res.data[0].username);
//           console.log("retaddress", res.data[0].address);
//           console.log("number", res.data[0].number);
//           console.log("image ret", res.data[0].image);
//         })
//         .catch((err) => {
//           console.log("Error from ShowBookList", err);
//         });
//     }
//   };

//   const onChange = (e) => {
//     if (e.target.name === "address") {
//       setaddress(e.target.value);
//       console.log("setaddress", address);
//     } else if (e.target.name === "number") {
//       setnumber(e.target.value);
//       console.log("setnumber", number);
//     }

//     else if (e.target.name === "image") {
//       console.log("file is 1 ",e.target.files );
//       console.log("file is 2",e.target.files[0] );
//       // setimage(e.target.fi);
//       setimage(e.target.files[0]);
//       console.log("image is", image);
//       // console.log("first abubakar", abubakr);

//       // let abubakr = await blobToString(image);

//       // console.log("after abubakar", abubakr);
//     }

//   };

//   const confirmChange = async () => {
//     let abubakr = await blobToString(image);

//     console.log("addres,number,umage",address,number,abubakr)
//     axios
//       .put(`http://localhost:8082/user/update/${email}`, { address, number,abubakr })
//       .then((res) => {
//         console.log("update successfully");
//         getData();
//         seteditting(false);
//       })
//       .catch((err) => {
//         console.log("Error updating user ", err);
//       });
//   };

//   const edit = (e) => {
//     seteditting(true);
//   };

//   function blobToString(blob) {
//     console.log("blobaya")
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       if (blob) reader.readAsDataURL(blob);
//       console.log("blobayaif")

//       reader.onloadend = () => {
//         const base64String = reader.result;
//         resolve(base64String);
//       };

//       reader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

//   return (
//     <div className="profile-container">
//       <h1>Username is: {username}</h1>
//       <h1>Email is: {email}</h1>
//       <h1>Phone Number is:{retnumber} </h1>
//       <h1>Address is:{retaddress} </h1>
//       <div className="profile-image-container">
//         <img src={retimage} alt="Profile" className="profile-image" />
//         <span className="profile-image-label">Profile Picture</span>

//       </div>

//       <div className="edit-button-container" onClick={edit}>
//         <button className="edit-button">Edit</button>
//       </div>

//       <div className={`popup ${editting ? "open" : ""}`}>
//         <div className="content">
//           {editting && (
//             <>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Address"
//                   name="address"
//                   className="form-control"
//                   value={address}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Number"
//                   name="number"
//                   className="form-control"
//                   value={number}
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="form-group">
//                 <input
//                   type="file"
//                   name="image"
//                   className="form-control"
//                   onChange={onChange}
//                 />
//               </div>

//               <div className="button-container">
//                 <button onClick={confirmChange}>Confirm Change</button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
