import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
// import "./css/Uerbuy.css";
import "../components/css/Uerbuy.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Userbuy = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showOrder, setshowOrder] = useState("");
  const [email, setemail] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const [purchasedItems, setPurchasedItems] = useState([]);
  const [token, settoken] = useState(null);
  const [sellerBooks, setsellerBooks] = useState([]);
  const [refreshtoken, setrefreshtoken] = useState();

  // const [sortedBooks, setsortedBooks] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const reftoken = localStorage.getItem("refreshtoken");
    const emai = localStorage.getItem("email");
    // const emai = localStorage.getItem("email");
    setemail(emai)
    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken)
    if (ttk && role) {
      settoken(ttk);
    } else {
      navigate("/login");
    }
  },[token]);

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
    getData();
    // localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  }, []);

  // useEffect(() => {
  //   console.log("useeffect purchasedItems", purchasedItems);
  //   if (purchasedItems && purchasedItems.length > 0) {
  //     localStorage.setItem("purchasedItems", JSON.stringify(purchasedItems));
  //   }
  // }, [purchasedItems]);

  useEffect(() => {
    // setshowOrder(sortOrder);
  }, [sortOrder]);

  const getData = () => {
    axios
      .get("http://localhost:8082/books", {
        token: token,
        refreshToken: refreshtoken
      })
      .then((res) => {
        console.log("response is ", res);
        console.log("response  data is ", res.data);
        setBooks(res.data);
        console.log("books", books);
      })
      .catch((err) => {
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          settoken(err.response.data.token)
          confirmPurchase()
        }
        else{

          console.log("Error from ShowBookList", err);
        }
      });
  };

 

  let sortedBooks = [...books];

  const searchTextBook = () => {
    if (searchQuery.trim() === "") {
      // If search query is empty, reset the book list to the original state
      getData();
    } else {
      // Perform search based on the search query
      const filtered = books.filter(
        (item) =>
          (item.title &&
            item.title
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) ||
          (item.isbn &&
            item.isbn
              .toString()
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      );

      setBooks(filtered);
    }
  };

  const resetSearch = () => {
    getData();
    setSearchQuery("");
  };

  //Sort

  // console.log("sortted books are",sorttedBooks)

  const handleSort = (option) => {
    if (option === sortOption) {
      // Toggle sort order if the same option is clicked again
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new sort option and default to ascending order
      setSortOption(option);
      setSortOrder("asc");
    }
  };

  const confirmPurchase = () => {
    axios
      .put(`http://localhost:8082/books/update/${selectedBook._id}/${email}`, {
        token: token,
        refreshToken: refreshtoken,
        title:selectedBook.title,
        isbn:selectedBook.isbn,
        price:selectedBook.price,
        image:selectedBook.image

  
      })


      .then((res) => {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 3000);

        getData();
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
          localStorage.setItem("purchasedItems1", updatedItems);
          console.log("updatedItems", updatedItems);
          setPurchasedItems(updatedItems);
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
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          settoken(err.response.data.token)
          // confirmPurchase()

        }

        console.log("Error purchasing book", err);
      })
      .finally(() => {
        setShowConfirmation(false);
      });
  };

  console.log("p", purchasedItems);

  const cancelPurchase = () => {
    setShowConfirmation(false);
  };

  if (sortOption === "title") {
    sortedBooks.sort((a, b) => {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      if (sortOrder === "asc") {
        // setorderbuttontitle("asendingc")

        return titleA.localeCompare(titleB);
      } else {
        //   setorderbuttontitle("desening")
        return titleB.localeCompare(titleA);
      }
    });
  } else if (sortOption === "isbn") {
    sortedBooks.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.isbn - b.isbn;
      } else {
        return b.isbn - a.isbn;
      }
    });
  } else <></>;

  const handlePurchase = (book) => {
    setSelectedBook(book);

    setShowConfirmation(true);
  };

  const bookList =
    sortedBooks.length === 0 ? (
      <div className="alert alert-info">There is no book record!</div>
    ) : (
      <div className="row">
        {sortedBooks?.map((book) => (
          <div  className="col-md-3 mb-4" key={book._id}>
            <div className="card">
              <img style={{ marginLeft:"40px", width: '140px', height: '180px' }}  src={book.image} className="card-img-top" alt="Book" />
              <div className="card-body">
                {book.title ? (
                  <h5 className="card-title">{book.title}</h5>
                ) : null}

                <h3 className="card-title">{book.quantity}</h3>
                <p className="card-text">{book.author}</p>
                <p className="card-text">ISBN: {book.isbn}</p>
                <p className="card-text">ID: {book._id}</p>
                <p className="card-text">Email: {book.email}</p>
                <p className="card-text">Total Price: {book.totalPrice}</p>

                {/* {book.title.purchasedItems ? (
 
      <h1>{book.title.purchasedItems.title}</h1>
   
) : null} */}

                <p className="card-text">
                  <span style={{ fontSize: "22px", fontWeight: "bold" }}>
                    Price:
                    <span />
                  </span>
                  {book.price}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() => handlePurchase(book)}
                >
                  Purchase
                </button>
                {/* const sanitizedImageUrl = book.image.replaceAll('/', '---REPLACE---');     */}
                <Link
                  to={`/details/${book.title}/${book.isbn}/${
                    book.quantity
                  }/${book.image.replaceAll("/", "---REPLACE---")}`}
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
    // className="container"
    >
      <Navbar />
      <div>
        <h2 className="display-4 text-center">Books List</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50px",
            backgroundColor: "#f2f2f2",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            width: "300px",
            marginLeft:"480px"
          }}
        >
          <Link
            to="/cart"
            style={{
              textDecoration: "none",
              color: "#333",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Cart
          </Link>
        </div>
        <div>
          {/* <Link
      to="/other-page"
      style={{
        background: "none",
        border: "none",
        color: "blue",
        textDecoration: "underline",
        cursor: "pointer",
        padding: "0",
        fontSize: "inherit",
      }}
    >
      My Link Button
    </Link> */}
        </div>
      </div>

      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title or ISBN number"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <div className="input-group-append">
          <button className="btn btn-primary" onClick={searchTextBook}>
            Search
          </button>
          <button className="btn btn-secondary" onClick={resetSearch}>
            Reset
          </button>
        </div>
      </div>
      <div>
        <p>{showOrder}</p>
      </div>

      <div style={{ marginLeft: "520px" }} className="btn-group mb-3">
        <button
          className={`btn ${
            sortOption === "title" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("title")}
        >
          Sort by Title
        </button>

        <button
          className={`btn ${
            sortOption === "isbn" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleSort("isbn")}
        >
          Sort by ISBN
        </button>
      </div>

      {/* <div>
      {purchasedItemList}
      </div> */}

      <div>
        {purchasedItems?.length > 0 && (
          <div>
            <h4>Purchased Items:</h4>
            <ul>
              {purchasedItems?.map((item, index) => (
                <li key={index}>
                  {item.title} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>{bookList}</div>
      {/* <div>{sellerbooklist}</div> */}
      <div className={`notification ${showNotification ? "show" : ""}`}>
        <h1>Item added to cart!</h1>
      </div>

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
    </div>
  );
};

export default Userbuy;
