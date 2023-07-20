// import React from "react";
// import "../components/css/Navbar.css";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";

// const Navbar = () => {
//   const [token, setToken] = useState(null);
//   const [role, setRole] = useState(null);
//   const location = useLocation();

//   const isHome = location.pathname === "/";
//   const Vieworder = location.pathname === "/view-order";
//   const isuserlist = location.pathname === "/user-list";
//   const isBuy = location.pathname === "/user-buy";
//   const iscreatebook = location.pathname === "/create-book";
//   const iscart = location.pathname === "/cart";

//   const navigate = useNavigate();

//   useEffect(() => {
//     const ttk = localStorage.getItem("token");
//     const ro = localStorage.getItem("role");

//     setToken(ttk);
//     setRole(ro);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("purchasedItems");
//     localStorage.removeItem("role");
//     localStorage.removeItem("email");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">
//           Octaloop
//         </Link>

//         <div className="navbar-buttons">
//             <div>
//               <Link to="/" className="navbar-button">
//                 Home
//               </Link>
//             </div>

//             <div>
//               <Link to="/user-list" className="navbar-button">
//                 User's List
//               </Link>
//             </div>

//             <div>
//               <Link to="/user-buy" className="navbar-button">
//                 Buy books
//               </Link>
//             </div>

//             <div>
//               <Link to="/selleritems" className="navbar-button">
//                 Buy More items
//               </Link>
//             </div>

//           {token && role === "admin" &&  (
//             <div>
//               <Link to="/create-book" className="navbar-button">
//                 Create Book
//               </Link>
//             </div>
//           )}



//             <div>
//               <Link to="/view-order" className="navbar-button">
//                 Your Orders
//               </Link>
//             </div>

//             <div>
//               <Link to="/cart" className="navbar-button">
//                 Cart
//               </Link>
//             </div>

//           {token ? (
//             <div>
//               <button className="navbar-button" onClick={handleLogout}>
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <div>
//               <Link to="/login" className="navbar-button">
//                 Login
//               </Link>
//               <Link to="/register" className="navbar-button">
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from "react";
import "../components/css/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const location = useLocation();

  const isHome = location.pathname === "/";
  const Vieworder = location.pathname === "/view-order";
  const isuserlist = location.pathname === "/user-list";
  const isBuy = location.pathname === "/user-buy";
  const iscreatebook = location.pathname === "/create-book";
  const iscart = location.pathname === "/cart";

  const navigate = useNavigate();

  useEffect(() => {
    const ttk = localStorage.getItem("token");
    const ro = localStorage.getItem("role");

    setToken(ttk);
    setRole(ro);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("purchasedItems");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("refreshtoken");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Octaloop
        </Link>

        <div className="navbar-buttons">
          <div>
            <Link to="/" className="navbar-button">
              Home
            </Link>
          </div>

          <div>
            <Link to="/user-list" className="navbar-button">
              User's List
            </Link>
          </div>

          <div>
            <Link to="/user-buy" className="navbar-button">
              Buy books
            </Link>
          </div>

          <div>
            <Link to="/selleritems" className="navbar-button">
              Buy More items
            </Link>
          </div>

          {token && role === "admin" && (
            <div>
              <Link to="/create-book" className="navbar-button">
                Create Book
              </Link>
            </div>
          )}

          <div>
            <Link to="/view-order" className="navbar-button">
              Your Orders
            </Link>
          </div>

          <div>
            <Link to="/cart" className="navbar-button">
              Cart
            </Link>
          </div>
          <div>
            <Link to="/profile" className="navbar-button">
Profile            </Link>
          </div>

          {token ? (
            <div>
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login" className="navbar-button">
                Login
              </Link>
              <Link to="/register" className="navbar-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
