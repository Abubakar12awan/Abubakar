import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const CreateBook = (props) => {
  const navigate = useNavigate();
  const [image, setimage] = useState("");
  const [token, settoken] = useState(null);
  const [refreshtoken, setrefreshtoken] = useState();

  const [book, setBook] = useState({
    title: "",
    isbn: "",
    author: "",
    description: "",
    published_date: "",
    quantity: "",
    price:""
  });

  useEffect(() => {
    let token = localStorage.getItem("token");
    settoken(token);
    console.log("token in createbook", token);
    const reftoken = localStorage.getItem("refreshtoken");
    console.log("reftoke", reftoken);
    setrefreshtoken(reftoken)

    const userRole = localStorage.getItem("role");
    console.log("createbook mein user", userRole);
    if (userRole !== "admin") {
      navigate("/login");
    } else {
      navigate("/create-book");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const timeout = setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        console.log("token is", token);
      }, 10 * 1000);

      return () => clearTimeout(timeout); // Cleanup function to clear the timeout
    }
  }, []);

  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
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


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("esubmit", e);
    console.log("book", book);
    console.log("image1", image);

    const abubakr = await blobToString(image);
    console.log(abubakr);
    const test = { data: book, image: abubakr };
    console.log("test", test);
    
    axios
      .post("http://localhost:8082/books/", test, {
        token: token,
        refreshToken: refreshtoken
   
      })

      .then((res) => {
        console.log(res.data);
        setBook({
          title: "",
          isbn: "",
          author: "",
          description: "",
          published_date: "",
          quantity: "",
          testimage: "",
          price:"",
        });
        // Push to /
        // navigate("/");
      })
      .catch((err) => {
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          settoken(err.response.data.token)

        }
        console.log("Error in CreateBook!");
      });
  };



  const getbutton = async (e) => {
    e.preventDefault();
    console.log("get button clicked");

    axios
      .get("http://localhost:8082/welcome/", {
        token: token,
        refreshToken: refreshtoken
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response.data.err === "token was expired please make request with this token") {
          console.log("new token", err.response.data.token);
          localStorage.setItem("token", err.response.data.token);
          settoken(err.response.data.token)

        }
        console.log(err);
      });
  };



  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <div className="CreateBook">
    <Navbar/>
      <div className="container">
        <div className="row">
        
        
          <div className="col-md-8 m-auto">
            {/* <h1 className="display-4 text-center">Add Book</h1> */}
            <p className="lead text-center">Create new book</p>
            {/* <button onClick={getbutton}>Get</button> */}

            <form noValidate onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Title of the Book"
                  name="title"
                  className="form-control"
                  value={book.title}
                  onChange={onChange}
                />
              </div>
              <br />

              <div className="form-group">
                <input
                  type="text" pattern=""
                  placeholder="ISBN"
                  name="isbn"
                  className="form-control"
                  value={book.isbn}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Author"
                  name="author"
                  className="form-control"
                  value={book.author}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Describe this book"
                  name="description"
                  className="form-control"
                  value={book.description}
                  onChange={onChange}
                />
              </div>

              {/* <div className='form-group'>
                <input
                  type='date'
                  placeholder='published_date'
                  name='published_date'
                  className='form-control'
                  value={book.published_date}
                  onChange={onChange}
                />
              </div> */}
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Qunatity"
                  name="quantity"
                  className="form-control"
                  value={book.quantity}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Price"
                  name="price"
                  className="form-control"
                  value={book.price}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <input
                  type="file" // Change the input type to 'file'
                  name="image"
                  className="form-control"
                  onChange={(e) => {
                    setimage(e.target.files[0]);
                  }}
                />
              </div>

              <input
                type="submit"
                className="btn btn-outline-warning btn-block mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
