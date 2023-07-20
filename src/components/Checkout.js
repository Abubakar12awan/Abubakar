import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CheckoutComponent = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [price, setprice] = useState(0);
  const [success, setsuccess] = useState("");
  const [noti, setnoti] = useState(false);

  const [purchasedItems, setPurchasedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [token, settoken] = useState(null);
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const [refreshtoken, setrefreshtoken] = useState();


  useEffect(() => {
    setprice(totalPrice);

  }, []);

  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const email=localStorage.getItem("email");
    const reftoken = localStorage.getItem("refreshtoken");

    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken)
    setemail(email)

    if (ttk) {
      settoken(ttk);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    getData()

  }, [email]);

  const getData = () => {
    if (email){

      console.log("email in data ", email);
  
      axios.get(`http://localhost:8082/books/cart/get/${email}`)
        .then((response) => {
          console.log("response is", response.data.books.items);
          setPurchasedItems(response.data.books.items)
        })
        .catch((err) => {
          console.log("error aya");
          
          console.log("error is ", err);
        });
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;

    for (let i = 0; i < purchasedItems.length; i++) {
      total += purchasedItems[i].price * purchasedItems[i].quantity;
    }

    return total;
  };

  useEffect(() => {
    setTotalPrice(calculateTotalPrice());
  }, [purchasedItems]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setsuccess("");
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);


  const handleCardNumberChange = (event) => {
    let { value } = event.target;

    // Remove any non-digit characters from the input value
    value = value.replace(/\D/g, "");

    // Add a space after every four digits
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(value);
  };
  const handleExpiryDateChange = (event) => {
    let { value } = event.target;

    // Remove any non-digit characters from the input value
    value = value.replace(/\D/g, "");

    // Add a "/" after the second digit (month) if the value is longer than 2 characters
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    // Limit the value to 5 characters (MM/YY)
    value = value.slice(0, 5);

    setExpiryDate(value);
  };

  const handleCVVChange = (e) => {
    setCVV(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Card Number:", cardNumber);
    console.log("Expiry Date:", expiryDate);
    console.log("CVV:", cvv);
    setnoti(true);
  };

  function blobToString(blob) {
    
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      if (blob) reader.readAsDataURL(blob);


      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    });
  }


  const makePurchase = () => {
    setsuccess("Order placed successfully");
    setnoti(false);
    localStorage.removeItem("purchasedItems")
    axios.post(`http://localhost:8082/orders/createorder/ `, {
      token: token,
      refreshToken: refreshtoken,
        email:email,
        totalPrice: totalPrice,

        purchasedItems: purchasedItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          bookId: item._id,
          image:item.image,
// sellquantity:


        })),
      })

        .then((response) => {
          // Handle the successful response
          console.log("Order created:", response.data);
          navigate("/view-order")
          setTotalPrice("");
          localStorage.removeItem("purchasedItems")


        })
        .catch((err) => {
          if (err.response.data.err === "token was expired please make request with this token") {
            console.log("new token", err.response.data.token);
            localStorage.setItem("token", err.response.data.token);
            settoken(err.response.data.token)
  
          }
          // Handle the error
          console.log("Error creating order:", err);
        });
  };

  const cancPurchase = () => {
    setsuccess("Order cancelled");
    setnoti(false);
  };

  

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} className="container">
        <div>
          <h3 style={{ color: "red", backgroundColor: "black" }}>Purchased items:</h3>
          <ul>
            {purchasedItems.map((item, index) => (
              <li key={index}>
                <div>
                  <div>
                    <img src={item.image} alt={item.title} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h1>Total Price</h1>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
      <label htmlFor="cardNumber" className="form-label">
        Card Number
      </label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQanH2taB5qLlUne1YhtuxTdWCfp5W8RDuKfPlRsCGcmfF_VTh1X_6eUlcpPC4mlSBX_oE&usqp=CAU"
          alt="Mastercard"
          style={{ width: "50px", marginRight: "10px" }}
        />
        <input
          type="text"
          className="form-control"
          id="cardNumber"
          value={cardNumber}
          onChange={handleCardNumberChange}
          placeholder="1111 3333 4444 6666"
          maxLength="19"
          required
        />
      </div>
    </div>
            <div className="mb-3">
      <label htmlFor="expiryDate" className="form-label">
        Expiry Date
      </label>
      <input
        type="text"
        className="form-control"
        id="expiryDate"
        value={expiryDate}
        onChange={handleExpiryDateChange}
        placeholder="MM/YY"
        autoComplete="off"
      />
    </div>
            <div className="mb-3">
              <label htmlFor="cvv" className="form-label">
                CVV
              </label>
              <input
                type="text"
                className="form-control"
                id="cvv"
                value={cvv}
                onChange={handleCVVChange}
                placeholder="746"
                pattern="\d{3}"

                maxLength="3"
    required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={totalPrice.toFixed(2)}
                placeholder="Price"
                readOnly
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Pay
            </button>
          </form>
        </div>

        <div>
          {noti && (
            <div>
              <h1>Are you sure you want to buy?</h1>
              <button onClick={makePurchase}>Yes</button>
              <button onClick={cancPurchase}>No</button>
            </div>
          )}
        </div>
      </div>

      {success.length > 0 && (
        <div>
          <h1>{success}</h1>
        </div>
      )}
    </>
  );
};

export default CheckoutComponent;
