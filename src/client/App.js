import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import TestComponent from "./TestComponent";
import Home from './Home';
import "./App.css";
import "./index.css";
//import { AddMeal } from "./AddMeal";
import GiveReview from "./GiveReview";
import MealDisplay from "./MealDisplay";
import Navbar from "./Navbar";
import { Reservation } from "./Reservation";
import { Review } from "./Review";
import ViewReservation from "./ViewReservation";
import Contact from "./Contact";

  function App() {
    return (
      <div>
          <style>{"body { background-image: url(https://i.ibb.co/QmdyCDD/back1.jpg); }"}</style>
        <Router>
          <Navbar></Navbar>
          <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/home">
          <Home></Home>
        </Route>
          {/* <Route exact path="/add-meal">
            <AddMeal></AddMeal>
          </Route>   */}
          <Route exact path="/reservation">
            <ViewReservation></ViewReservation>
          </Route>
          <Route exact path="/meal-display">
            <MealDisplay></MealDisplay>
          </Route>
          <Route exact path="/give-reviews">
            <GiveReview></GiveReview>
          </Route>
  
          <Route exact path="/meal-display/:id">
            <Reservation></Reservation>
          </Route>
          <Route exact path="/give-reviews/:id">
            <Review></Review>
          </Route>
          <Route exact path="/contact">
            <Contact></Contact>
          </Route>
        </Router>
      </div>
    );
  }
  

export default App;
