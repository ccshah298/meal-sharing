import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function GiveReview() {
  const [review, setReview] = useState([]);
  useEffect(()=>{
    fetch("/api/meals").then((res) => res.json()).then((result) => {console.log(result);
      setReview(result);})

}, []);

  return (
    <>
      <p className="mealName text"> Click on Meal and put your Reviews</p>
      <div>
        {review?.map((item) => (
          <li key={item.id}>
            <NavLink to={"/give-reviews/" + item.id}>{item.title}</NavLink>
          </li>
        ))}
      </div>
    </>
  );
}