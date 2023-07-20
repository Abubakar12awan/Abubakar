import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/css/Uerbuy.css";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import "../components/css/Selleritems.css";
import { useNavigate } from "react-router-dom";

const Selleritems = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [sellerBooks, setsellerBooks] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [refreshtoken, setrefreshtoken] = useState();
  const [token, settoken] = useState(null);
  const [noti, setnoti] = useState();
  const [email, setemail] = useState();
  const [useremail, setuseremail] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const reftoken = localStorage.getItem("refreshtoken");
    const emai = localStorage.getItem("email");
    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken);
    setuseremail(emai);
    if (ttk && role) {
      settoken(ttk);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(
      "Local Storage Purchased",
      JSON.parse(localStorage.getItem("purchasedItems"))
    );

    console.log(purchasedItems);
    if (
      JSON.parse(localStorage.getItem("purchasedItems")) &&
      purchasedItems.length == 0
    ) {
      console.log("Yes");
      setPurchasedItems(JSON.parse(localStorage.getItem("purchasedItems")));
    }

    // localStorage.getItem("purchasedItems");
  }, []);

  useEffect(() => {
    getsellerData();
    // localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, [token, refreshtoken]);

  const getsellerData = () => {
    if (token && refreshtoken) {
      console.log("token before sendinf", token);
      console.log("refreify token before sendinf", refreshtoken);
      axios
        .post("http://localhost:8082/books/getsellerbooks", {
          token: token,
          refreshToken: refreshtoken,
        })
        .then((res) => {
          console.log("response of getsellerdata is ", res);
          console.log("response data getsellerdata  data is ", res.data.orders);
          setsellerBooks(res.data.orders);
          // console.log("books", sellerBooks);
        })
        .catch((err) => {
          if (
            err.response.data.err ===
            "token was expired please make request with this token"
          ) {
            console.log("new token", err.response.data.token);
            localStorage.setItem("token", err.response.data.token);
            settoken(err.response.data.token);
          }
          console.log("Error from ShowBookList", err);
        });
    }
  };

  // useEffect(() => {

  //     confirmPurchase()
  // }, [purchasedItems]);

  const confirmPurchase = () => {
    console.log(
      "seeler items before confirm purchase. ",
      selectedBook.email,
      selectedBook.title,
      selectedBook.isbn,
      selectedBook.price
    );

    axios
      .put(
        `http://localhost:8082/orders/update/${selectedBook._id}/${useremail}`,
        {
          //   .put(`http://localhost:8082/orders/update/`, {
          token: token,
          refreshToken: refreshtoken,
          email: selectedBook.email,
          title: selectedBook.title,
          isbn: selectedBook.isbn,
          price: selectedBook.price,
          image: selectedBook.image,

          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
        }
      )
      .then((res) => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);

        getsellerData();
        console.log("buy", purchasedItems);

        const existingItemIndex = purchasedItems.findIndex(
          (item) => item._id === selectedBook._id
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...purchasedItems];
          const existingItem = { ...updatedItems[existingItemIndex] };
          existingItem.quantity += 1;
          updatedItems[existingItemIndex] = existingItem;
          // localStorage.setItem("items 1", updatedItems)
          console.log("updatedItems", updatedItems);

          localStorage.setItem("purchasedItems", JSON.stringify(updatedItems));
          //   localStorage.setItem("purchasedItems1", updatedItems);
          //   console.log("updatedItems1", updatedItems);
          setPurchasedItems(updatedItems);

          console.log("PurchasedItems", purchasedItems);

          //   return updatedItems;
        } else {
          // localStorage.setItem("items 2", [...prevItems, { ...selectedBook, quantity: 1 }])
          console.log("purchasedItems2", purchasedItems);
          let tempArr = [...purchasedItems, { ...selectedBook, quantity: 1 }];
          console.log("Temp Arr", tempArr);
          localStorage.setItem(
            "purchasedItems",
            JSON.stringify([
              ...purchasedItems,
              { ...selectedBook, quantity: 1 },
            ])
          );

          setPurchasedItems((prev) => [
            ...prev,
            {
              ...selectedBook,
              quantity: 1,
            },
          ]);
          console.log("New Added", [
            ...purchasedItems,
            {
              ...selectedBook,
              quantity: 1,
            },
          ]);

          return [...purchasedItems, { ...selectedBook, quantity: 1 }];
        }
      })
      .catch((err) => {
        if (
          err.response.data.err ===
          "token was expired please make request with this token"
        ) {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          settoken(err.response.data.token);
        }

        console.log("Error purchasing book", err);
        console.log("err.response.data.console.error", err.response.data.error);
        setnoti(err.response.data.error);

        setTimeout(() => {
          setnoti("");
        }, 3000);
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  const handlePurchase = (item, email) => {
    // console.log(email);
    // {...item,email}
    item.email = email;
    setSelectedBook(item);

    setShowConfirmation(true);
  };

  const bookList =
    sellerBooks.length === 0 ? (
      <div className="alert alert-info">There is no book record!</div>
    ) : (
      <div
        className="row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          marginRight: "-15px",
          marginLeft: "-15px",
        }}
      >
        {sellerBooks.map((book) => (
          <div
            className="col-md-3 mb-4"
            key={book._id}
            style={{
              flex: "0 0 25%",
              maxWidth: "25%",
              paddingRight: "15px",
              paddingLeft: "15px",
              marginTop: "10px",

              marginBottom: "1.5rem",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              padding: "1rem",
              backgroundColor: "rgb(216, 239, 243)",
              marginLeft: "15px",
              marginRight: "10px",
            }}
          >
            {/* <h1>{book.email}</h1> */}
            {book.purchasedItems.map((item) => (
              <div key={item._id} style={{ marginBottom: "1rem" }}>
                {/* <h1>Owner is {book.email}</h1> */}
                <h1 style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>
                  {item.title}
                </h1>
                <h1 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {item.sellquantity}
                </h1>
                <h1 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                  {item.price}
                </h1>
                <h1 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
  Owner is <span style={{ color: "blue", marginLeft: "4px" }}>{book.email.slice(0, 6)}</span>...
</h1>
                <img
                  src={item.image}
                  alt="nothing"
                  style={{
                    width: "250px",
                    height: "200px",
                    marginBottom: "0.5rem",
                  }}
                />
                {/* <h1>{item.bookId}</h1> */}
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(item, book.email)}
                  style={{ fontSize: "1rem" }}
                >
                  Purchase
                </button>
              </div>
            ))}
            <div className="" style={{ marginBottom: "1rem" }}>
              <div className="">{/* Additional content */}</div>
            </div>
          </div>
        ))}
      </div>
    );

  const cancelPurchase = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <Navbar />
      {noti && (
        <div
          style={{
            position: "fixed",
            zIndex: "100",
            top: "20%",
            left: "80%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "red",
          }}
        >
          <h1>{noti}</h1>
        </div>
      )}

      {bookList}

      {showConfirmation && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Purchase</h5>
                <button
                  type="button"
                  className="close"
                  onClick={cancelPurchase}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to buy "{selectedBook.title}"?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={confirmPurchase}
                >
                  Yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelPurchase}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`notification ${showNotification ? "show" : ""}`}>
        <h1>Item added to cart!</h1>
      </div>
    </div>
  );
};

export default Selleritems;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";
// import "../components/css/Selleritems.css";

// const Selleritems = () => {
//   const [showConfirmation, setShowConfirmation] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [sellerBooks, setsellerBooks] = useState([]);
//   const [purchasedItems, setPurchasedItems] = useState([]);
//   const [showNotification, setShowNotification] = useState(false);

//   useEffect(() => {
//     if (
//       JSON.parse(localStorage.getItem("purchasedItems")) &&
//       purchasedItems.length === 0
//     ) {
//       setPurchasedItems(JSON.parse(localStorage.getItem("purchasedItems")));
//     }
//   }, []);

//   useEffect(() => {
//     getsellerData();
//   }, []);

//   const getsellerData = () => {
//     axios
//       .get("http://localhost:8082/books/getsellerbooks")
//       .then((res) => {
//         setsellerBooks(res.data.order);
//       })
//       .catch((err) => {
//         console.log("Error from getsellerData:", err);
//       });
//   };

//   const confirmPurchase = () => {
//     axios
//       .put(`http://localhost:8082/orders/update/${selectedBook._id}`, {
//         sell: !selectedBook.sell,
//       })
//       .then((res) => {
//         setShowNotification(true);
//         setTimeout(() => {
//           setShowNotification(false);
//         }, 3000);
//         getsellerData();
//       })
//       .catch((error) => {
//         console.log("Error purchasing book:", error);
//       })
//       .finally(() => {
//         setShowConfirmation(false);
//       });
//   };

//   const handlePurchase = (item) => {
//     setSelectedBook(item);
//     setShowConfirmation(true);
//   };

//   const bookList =
//     sellerBooks.length === 0 ? (
//       <div className="alert alert-info">There is no book record!</div>
//     ) : (
//       <div className="row">
//         {sellerBooks.map((book) => (
//           <div className="col-md-3 mb-4" key={book._id}>
//             {book.purchasedItems.map((item) => (
//               <div key={item._id}>
//                 <h1>{item.title}</h1>
//                 <h1>{item.quantity}</h1>
//                 <h1>{item.price}</h1>
//                 {/* <h1>{item.bookId}</h1> */}
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => handlePurchase(item)}
//                 >
//                   Purchase
//                 </button>
//               </div>
//             ))}
//             {/* <div className="card"> */}
//               {/* <div className="card-body"> */}
//                 {/* <h5 className="card-title">{book.title}</h5> */}
//                 {/* <p className="card-text">Email: {book.email}</p> */}
//               {/* </div> */}
//             {/* </div> */}
//           </div>
//         ))}
//         <div>
//           <Link
//             to="/cart"
//             className="cart-link"
//           >
//             Cart
//           </Link>
//         </div>
//       </div>
//     );

//   const cancelPurchase = () => {
//     setShowConfirmation(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       {bookList}
//       {showConfirmation && (
//         <div className="modal" style={{ display: "block" }}>
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Purchase</h5>
//                 <button
//                   type="button"
//                   className="close"
//                   onClick={cancelPurchase}
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to buy "{selectedBook.title}"?</p>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={confirmPurchase}
//                 >
//                   Yes
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={cancelPurchase}
//                 >
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className={`notification ${showNotification ? "show" : ""}`}>
//         <h1>Item added to cart!</h1>
//       </div>
//     </div>
//   );
// };

// export default Selleritems;
