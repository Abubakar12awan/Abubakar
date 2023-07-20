import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Cart = () => {
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // const ali = localStorage.getItem('purchasedItems');
    const emai = localStorage.getItem('email');
    setemail(emai)
    // if (ali) {
    //   const parsedItems = JSON.parse(ali);
    //   setPurchasedItems(parsedItems);
    // }

    getData()
  }, []);
  useEffect(() => {
    
    // if (ali) {
    //   const parsedItems = JSON.parse(ali);
    //   setPurchasedItems(parsedItems);
    // }

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


useEffect(() => {
  calculateTotalPrice()
}, [purchasedItems]);

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

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = (item) => {
    // const updatedItems = purchasedItems.filter((purchasedItem) => purchasedItem !== item);
    // setPurchasedItems(updatedItems);
    // localStorage.setItem('purchasedItems', JSON.stringify(updatedItems));
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.header}>
        <h1>Your Cart</h1>
        <Link to="/user-buy" style={styles.link}>
          Continue Shopping
        </Link>
      </div>

      {purchasedItems.length > 0 ? (
        <div>
          <h4>Purchased Items:</h4>
          <ul style={styles.list}>
            {purchasedItems.map((item, index) => (
              <li key={index} style={styles.listItem}>
                <div style={styles.itemContainer}>
                  {/* <div style={styles.imageContainer}>
                    <img src={item.image} alt={item?.title} style={styles.image} />
                  </div> */}
                  <div style={styles.infoContainer}>
                    <h3 style={styles.title}>{item.title}</h3>
                    <p style={styles.quantity}>Quantity: {item?.quantity}</p>
                    <img src= {item.image} alt="image" />
                    {/* <p style={styles.quantity}>Image: {item?.image}</p> */}
                    <p style={styles.price}>Price: ${item?.price?.toFixed(2)}</p>
                    <button onClick={() => handleDelete(item)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div style={styles.totalContainer}>
            <h1 style={styles.totalTitle}>Total Price</h1>
            <p style={styles.totalPrice}>${totalPrice.toFixed(2)}</p>
            <Link to="/checkout" style={styles.proceedButton}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p style={styles.emptyMessage}>Your cart is empty.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    padding: '20px',
  },
  itemContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  imageContainer: {
    marginRight: '20px',
  },
  image: {
    width: '100px',
    height: 'auto',
    borderRadius: '6px',
  },
  infoContainer: {
    flex: '1',
  },
  title: {
    fontSize: '18px',
    marginBottom: '10px',
  },
  quantity: {
    fontSize: '14px',
    marginBottom: '5px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: '30px',
    textAlign: 'right',
  },
  totalTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  totalPrice: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'green',
    marginBottom: '20px',
  },
  proceedButton: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#337ab7',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '16px',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#999',
    fontSize: '18px',
    marginTop: '50px',
  },
};

export default Cart;
