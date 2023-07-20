import axios from "axios";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "../components/css/Vieworder.css"; // Import custom CSS file for styling
// import "../components/css/Popup.css";

const Vieworder = () => {
  const [email, setemail] = useState("");
  const [order, setorder] = useState(null);
  const [approved, setapproved] = useState();
  const [quantconfirm, setquantconfirm] = useState(false);
  const [sendquantity, setsendquantity] = useState(0);
  const [sendid, setsendid] = useState();
  const [sendapprove, setsendapprove] = useState();
  const [token, setstoken] = useState();
  const [refreshtoken, setrefreshtoken] = useState();
  const [noti, setnoti] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // const ttk = localStorage.getItem("token");
    const emai = localStorage.getItem("email");
    console.log("emai is", emai);
    const token = localStorage.getItem("token");
    console.log("token is ", token);
    setstoken(token);
    const reftoken = localStorage.getItem("refreshtoken");
    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken);

    setemail(emai);
    console.log("email is", email);

    // const isLoggedIn = localStorage.getItem("token");
  }, []);

  useEffect(() => {
    console.log("use eeefct aya");

    getData();
  }, [email, token]);

  const handlesale = () => {
    console.log("handle sale");
    const _id = sendid;

    console.log("id is before put", _id);
    console.log("email is before put", email);
    console.log("sendapprove before put", sendapprove);
    console.log("sendquantity before put", sendquantity);

    axios
      .put(`http://localhost:8082/orders/updatestatus/${email}/${_id}`, {
        // approved: sendapprove,
        sellquantity: sendquantity,
        token: token,
        refreshToken: refreshtoken,
      })
      .then((res) => {
        console.log("succesful");
        console.log("response data is ", res.data);
        getData();
        setquantconfirm(false);
        setnoti("On selling True");

        setTimeout(() => {
          setnoti("");
        }, 1000);
      })
      .catch((err) => {
        if (
          err.response.data.err ===
          "token was expired please make request with this token"
        ) {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          setstoken(err.response.data.token);
          setquantconfirm(false);
        } else {
          console.log("error is  ", err);
          setquantconfirm(false);
          setnoti(" Cancelled! Please Enter correct amount ");

          setTimeout(() => {
            setnoti("");
          }, 3000);
        }
      });
  };

  const getData = () => {
    console.log("email1 is", email);
    console.log("token1 is ", token);
    console.log("reftoken1 is", refreshtoken);

    if (email) {
      axios
        .post(`http://localhost:8082/orders/getorder/${email}`, {
          token: token,
          refreshToken: refreshtoken,
        })
        .then((res) => {
          console.log("response is ", res);
          // console.log("response data is ", res.data);
          // console.log("response data sell status is ", res.data[0].sell);

          setorder(res.data);
          console.log("orders", order);
        })
        .catch((err) => {
          if (
            err.response.data.err ===
            "token was expired please make request with this token"
          ) {
            console.log("new token", err.response.data.token);
            localStorage.setItem("token", err.response.data.token);
            setstoken(err.response.data.token);
          } else {
            console.log("Error from ShowBookList", err.response.data.token);
          }
        });
    }
  };

  const conform = (item) => {
    setsendid(item._id);
    // setsendquantity(item.quantity)
    // setsendapprove(item.sell)
    setquantconfirm(true);
  };

  const sellsta = (item) => {

    // setsendid(item._id);
    console.log("id",item._id);
    console.log("sell",item.sell);
  
    axios
      .post(`http://localhost:8082/orders/onlysellstatus/${email}/${item._id}`, {
        aproved: item.sell, // Corrected the parameter name to "aproved"
      })
      .then((res) => {
        console.log("response is", res);
        // setapproved()
        getData();
      })
      .catch((error) => {
        console.log("Error in sellsta:", error);
      });
  };

  const handleCancel = () => {
    setquantconfirm(false);
  };

  return (
    <div>
      <Navbar />
      {noti && (
        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "80%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
          }}
        >
          <h1>{noti}</h1>
        </div>
      )}

      {quantconfirm && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            border: "1px solid black",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
            zIndex: "9999",
          }}
        >
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={handleCancel}
          >
            &#10006; {/* Unicode symbol for "X" */}
          </button>

          <div className="form-group">
            <input
              type="text"
              placeholder="Quantity to sell"
              name="number"
              className="form-control"
              value={sendquantity}
              onChange={(e) => setsendquantity(e.target.value)}
            />
          </div>

          <div className="button-container">
            <button onClick={() => handlesale()}>Confirm Change</button>
          </div>
        </div>
      )}

      <div className="order-container">
        {order ? (
          <div>
            <h1 className="order-heading">Your Books</h1>
            {order.map((orde) => (
              <div key={orde._id} className="order-details">
                <h1 className="order-id">Order ID: {orde._id}</h1>
                <h3 className="total-price">Total Price: {orde.totalPrice}</h3>
                {orde.purchasedItems ? (
                  <div>
                    <h2 className="item-heading">Purchased Items:</h2>
                    {orde.purchasedItems.map((item) => (
                      <div key={item.bookId} className="item">
                        <h3 className="item-title">Title: {item.title}</h3>
                        <h3 className="item-id">Book ID: {item.bookId}</h3>
                        <h3 className="item-quantity">
                          Quantity: {item.quantity}
                        </h3>
                        <h3 className="item-quantity">
                          Quantity on selling: {item.sellquantity}
                        </h3>
                        <h3 className="item-price">Price: {item.price}</h3>
                        {/* {approved ? (
                            <h3>Do you want to stop selling your books?</h3>
                          ) : (
                            <h3>Do you want to start selling your books?</h3>
                          )} */}
                        <button onClick={() => conform(item)}>
                          {/* {item.sell
                              ? "Click to stop selling"
                              : "Click to sell"} */}
                          {/* all */}
                          Number of items you want to sell
                        </button>
                        <button onClick={() => sellsta(item)}>
                        Selling Status::
                           {item.sell
                              ? "On "
                              : "Stop "} 
                              <h3>Click to change</h3>
                      
                          
                          
                        </button>

                        <div></div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <p>No previous orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Vieworder;
