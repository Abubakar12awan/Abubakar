// import React, { Component } from 'react';
// import { withRouter } from "react-router-dom";
// import axios from "axios";
// import Cookies from 'universal-cookie';

// import UserContext from "./UserContext";

// const cookies = new Cookies();

// class UserProvider extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoggedIn: false,

//             name: null
//         }
//     }

//     componentDidMount() {
//         if (cookies.get('token') !== null) {
//             axios({
//                 method: 'GET',
//                 url: "http://localhost:3000/api/user/whoami",
//                 headers: {
//                     'X-ACCESS-TOKEN': cookies.get('token')
//                 },
//                 withCredentials: true
//             })
//                 .then(response => {
//                     if (response.status === 200) {
//                         this.setState({
//                             isLoggedIn: true,
//                             name: response.data.result
//                         });
//                     } else {
//                         alert(response.data.message);
//                         this.props.history.push('/');
//                     }
//                 })
//                 .catch(error => {
//                     console.log(error);
//                 })
//         }
//     }

//     render() {
//         return (
//             <UserContext.Provider
//                 value={{
//                     isLoggedIn: this.state.isLoggedIn,
//                     name: this.state.name,
//                     handleLogin: data => {
//                         axios({
//                             method: 'POST',
//                             url: "http://localhost:3000/api/user/login",
//                             data: data,
//                             headers: {
//                                 'Content-Type': 'application/json'
//                             },
//                             withCredentials: true
//                         })
//                             .then(response => {
//                                 if (response.status === 200) {
//                                     this.setState({
//                                         isLoggedIn: true
//                                     }, () => {
//                                         this.props.history.push('/dashboard');
//                                     });
//                                 } else {
//                                     alert(response.data.message);
//                                 }
//                             })
//                             .catch(error => {
//                                 // return;
//                                 alert(error.data && error.data.message);
//                             })
//                     },
//                     handleLogout: data => {
//                         cookies.remove('token');
//                         this.props.history.push('/');
//                     }
//                 }}
//             >

//                 {this.props.children}
//             </UserContext.Provider>
//         );
//     }
// }

// export default withRouter(UserProvider);




import React, { useEffect, useState } from 'react';
import { useNavigate, withRouter } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';

import UserContext from './UserContext';

const cookies = new Cookies();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.get('token') !== null) {
      axios({
        method: 'GET',
        url: 'http://localhost:3000/api/user/whoami',
        headers: {
          'X-ACCESS-TOKEN': cookies.get('token'),
        },
        withCredentials: true,
      })
        .then((response) => {
          if (response.status === 200) {
            setIsLoggedIn(true);
            setName(response.data.result);
          } else {
            alert(response.data.message);
            navigate('/');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogin = (data) => {
    axios({
      method: 'POST',
      url: 'http://localhost:3000/api/user/login',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(true);
          navigate('/dashboard');
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.data && error.data.message);
      });
  };

  const handleLogout = () => {
    cookies.remove('token');
    navigate('/');
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        name: name,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};


export default withRouter(UserProvider);
