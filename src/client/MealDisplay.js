import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
export default function MealDisplay() {
  const [meal, setMeal] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await fetch("/api/meals").then((res) => res.json());

      console.log(result);
      setMeal(result);
    })();
  }, []);

  return (
    <>
      <div className="mealName">
        <p className="text"> For Reservation: Click on Meal </p>
        {meal?.map((item) => (
          <NavLink key={item.id} to={"/meal-display/" + item.id}>
            <div className="meal-list">
              {item.title} ----------{item.price}
              dkk <img src="/src/client/assets/images/img1.png" alt="paneer" height="44" width="100"></img>
            </div>
          </NavLink>
        ))}
      </div>
    </>
  );
}