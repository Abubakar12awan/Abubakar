// import '../components/css/Showbooklist.css';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';
// import "../components/css/Navbar.css"
// function ShowBookList() {

//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [image, setImage] = useState('');

//   useEffect(() => {
//     axios
//       .get('http://localhost:8082/books')
//       .then((res) => {
//         setBooks(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log('Error from ShowBookList', err);
//         setError('Error retrieving book list');
//         setLoading(false);
//       });
//   }, []);


//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const bookList =
//     books.length === 0 ? (
//       <div className="alert alert-info">There is no book record!</div>
//     ) : (
//       <table className="table table-striped">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Description</th>
//             <th>Picture</th>
//             <th>Quantity</th>
//             <th>ISBN</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book) => (
//             <tr key={book._id}>
//               <td>{book.title}</td>
//               <td>{book.author}</td>
//               <td>{book.description}</td>
//               <td>
//                 <img src={book.image} alt="img" />
//               </td>
//               <td>{book.quantity}</td>
//               <td>{book.isbn}</td>
//               <td>{book.price}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );

//     const handleLogout = () => {
//       localStorage.removeItem("role");
//       localStorage.removeItem("token");
//       navigate("/login")
//     };

//   return (
//     <div className="ShowBookList">
//       <Navbar/>

//       <div className="header">
//         <div className="container">
//           <div className="top-bar">
//             <div className="logo">
//               <h1>My Book Store</h1>
//             </div>
//             {/* <div className="buttons">
//               <Link to="/login" className="btn">
//                 Login
//               </Link>
//               <Link to="/register" className="btn">
//                 Sign Up
//               </Link>
//             </div> */}
          
//           </div>
//           <h2 className="display-4">Books List</h2>
//           <hr />
//           <div className="list">{bookList}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ShowBookList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// import "../components/css/Navbar.css"
import '../components/css/Showbooklist.css';

function ShowBookList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8082/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Error from ShowBookList', err);
        setError('Error retrieving book list');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const bookList =
    books.length === 0 ? (
      <div className="alert alert-info">There is no book record!</div>
    ) : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Quantity</th>
            <th>ISBN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.description}</td>
              <td >
  <img style={{ width: '90px', height: '110px' }} src={book.image} alt="img" />
</td>
              <td>{book.quantity}</td>
              <td>{book.isbn}</td>
              <td>{book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login")
  };

  return (
    <div className="ShowBookList">
      <Navbar/>

      <div className="">
        <div className="container">
          <div className="top-bar">
            <div className="logo">
              {/* <h1>My Book Store</h1> */}
            </div>
            {/* <div className="buttons">
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn">
                Sign Up
              </Link>
            </div> */}
          </div>
          <h2 className="display-4">Books List</h2>
          <hr />
          <div className="list">{bookList}</div>
        </div>
      </div>
    </div>
  );
}

export default ShowBookList;

