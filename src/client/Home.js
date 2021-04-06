import React from "react";
var foodmenu3 = path.basename("/src/client/assets/images/foodmenu3.png");

export default function Home() {
  return (
      <div className="mealName">
          <img src={foodmenu3} alt="foodmenu" height="600" width="600"></img>
          <p>Welcome to MyMeal App</p>
          <p>Created by Charmi</p>
      </div>
  );
}
