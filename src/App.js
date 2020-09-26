import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import NoMatch from './Components/NoMatch/NoMatch';
import Home from './Components/NoMatch/Home/Home';
import Header from './Components/NoMatch/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import TravelInfo from './Components/NoMatch/TravelInfo/TravelInfo';
import Login from './Components/NoMatch/Login/Login';
import BookingInfo from './Components/NoMatch/BookingInfo/BookingInfo';
import PrivateRoute from './Components/NoMatch/PrivateRoute/PrivateRoute';


export const UserContext = createContext()
function App() {
  const [loggedInUser, setLoggedInUser] = useState({
    isLogged: false
  })
  return (
    <UserContext.Provider value = { [loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path = '/'>
            <Home></Home>
          </Route>
          <Route path = '/travel-info/:placeId'>
            <TravelInfo></TravelInfo>
          </Route>
          <Route path = '/login'>
            <Login></Login>
          </Route>
          <PrivateRoute path = '/booking-info'>
            <BookingInfo></BookingInfo>
          </PrivateRoute>
          <Route path = '*'>
            <NoMatch></NoMatch>
          </Route>
        </Switch>    
      </Router>
    </UserContext.Provider>
  );
}

export default App;
