import React, { Profiler, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
// import { config } from './utils/Config';

import CreateBook from './components/CreateBook';
import ShowBookList from './components/ShowBookList';
import ShowBookDetails from './components/ShowBookDetails';
import UpdateBookInfo from './components/UpdateBookInfo';
import StoreImage from './components/StoreImage';
import Practicemap from './components/Practicemap';
import Otherpage2 from './components/Otherpage2';
import Register from './components/Register';
import Login from './components/Login';
import Otherpage1 from './components/Otherpage1';
import Userbuy from './components/Userbuy';
import Userlist from './components/Userlist';
import Details from './components/Details';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Vieworder from './components/Vieworder';
import Profile from './components/Profile';
import Recovered from './components/Recovered';
import Reset from "./components/Reset"
import OTPInput from './components/OTPInput';
import Selleritems from './components/Selleritems';
// import { createContext } from "react";

// export const RecoveryContext = createContext();

const App = () => {


 
  return (
    <Router>
      <div>
        <Routes>
        

          <Route path="/" element={<ShowBookList />} />
          <Route path="/recovered" element={<Recovered />} />
          <Route path="/selleritems" element={<Selleritems />} />
          <Route path="/otp-input" element={<OTPInput />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-book" element={<CreateBook />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-order" element={<Vieworder />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/edit-book/:id" element={<UpdateBookInfo />} />
          <Route path="/show-book/:id" element={<ShowBookDetails />} />
          <Route path="/storeimage" element={<StoreImage />} />
          <Route path="/practicemap" element={<Practicemap />} />
          <Route path="/otherpage/2" element={<Otherpage2 />} />
          <Route path="/otherpage/1" element={<Otherpage1 />} />
          <Route path="/user-buy" element={<Userbuy />} />
          <Route path="/user-list" element={<Userlist />} />
          <Route path="/details/:title" element={<Details />} />
          {/* <Route path="/checkout/:image/:title/:quantity/:totalPrice" element={<Checkout />} /> */}
          <Route path="/details/:title/:isbn/:quantity/:image" element={<Details />} />
          <Route path="/details/:title/:isbn/:quantity" element={<Details />} />
          <Route path="/details" element={<Details />} />
          {/* <Route path="/details" element={<Details />} /> */}
          {/* <Route path="/details/:title" component={Details} /> */}


        </Routes>
      </div>
    </Router>
  );
};

export default App;
