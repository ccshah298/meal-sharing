import React, { useState, useEffect } from "react";

 function ViewReservation() {
  const [reservation, setReservation] = useState([]);
  useEffect(() => {
    fetch('/api/reservations')
        .then(res => res.json())
        .then(result => {
            console.log(result)
            setReservation(result)
        })
}, [])

  return (
    <>
      <p className="mealName text"> Total Reservations</p>
     <div>
  {reservation.map((item) => (
    <div key={item.id} className="meal-list">
    <li>
        Meal ID :{item.meal_id}
      </li>
      <li>
       Total Guest:{item.number_of_guests}
      </li>
      <li>
        Name:{item.contact_name}
      </li>
    </div>
  ))}
</div>
    </>
  );
}

export default ViewReservation;

