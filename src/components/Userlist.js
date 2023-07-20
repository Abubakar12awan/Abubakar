import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../components/css/Userlist.css";

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [refreshtoken, setrefreshtoken] = useState();


  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const emai = localStorage.getItem("email");
    console.log("emai is", emai);
   
    const reftoken = localStorage.getItem("refreshtoken");
    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken)

    if (ttk && role === "admin") {
      setToken(ttk);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getData();
  }, []);


  const getData = () => {
    axios
      .get("http://localhost:8082/register/",{
        token: token,
        refreshToken: refreshtoken
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          setToken(err.response.data.token)

        }
        else{

          console.log("Error from Userlist", err);
          setError("Error retrieving user list");        }
       
      });
  };

  const toggleApproval = (userId) => {
    console.log("token is",token);
    const user = users.find((user) => user._id === userId);
    const newApprovalStatus = !user.approve;

    axios
      .put(`http://localhost:8082/register/update/users/${userId}`, {
        approve: newApprovalStatus,
        token: token,
        refreshToken: refreshtoken
      })
      .then((res) => {
        // Update the user's approval status in the local state
        const updatedUsers = users.map((user) => {
          if (user._id === userId) {
            return { ...user, approve: newApprovalStatus };
          }
          return user;
        });
        setUsers(updatedUsers);
      })
      .catch((err) => {
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          setToken(err.response.data.token)

        }
        else{

          console.log("Error updating user approval status", err);
        }

      });
  };

  const userList =
    users.length > 0 ? (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <button style={{ width: '100px', height: '40px' }} onClick={() => toggleApproval(user._id)}>
                  {user.approve ? "Block" : "Unblock"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : null;

  return (
    <div className="Userlist">
      <Navbar />
      <div className="header">
        <div className="container">
          <h2 className="display-4">User List</h2>
          {error && <div className="alert alert-info">Error: {error}</div>}
          {userList}
        </div>
      </div>
    </div>
  );
};

export default Userlist;
