import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export function Review() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [star, setStar] = useState("");
  const [filterMeal, setFilterMeal] = useState({});
  //import "bootstrap/dist/css/bootstrap.min.css";
  console.log(filterMeal);
  useEffect(()=>{
    fetch("/api/reviews/").then((res) => res.json()).then((data) => {console.log(data);
      setFilterMeal(data)})

}, []);

  function onSubmit() {
    async function fetchReview() {
      await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: desc,
          stars: star,
          meal_id: id,
        }),
      });
    }
    fetchReview();
    alert("Thanks for your comment");
  }

  return (
    <div className="mealName">
      <div id="card">
        <h3 className="card-header badge-warning mb-3 text-white">Review</h3>
        <div className="card-body">
          <form>
            <div className="col-7 col-md-3">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="col-7 col-md-3">
              <label className="col-md-2 col-form-label">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></input>
            </div>
            <div className="col-7 col-md-3">
              <label className="col-md-2 col-form-label">Star</label>
              <input
                type="text"
                value={star}
                onChange={(e) => setStar(e.target.value)}
              ></input>
            </div>

            <div className="form-group row">
              <div className="offset-md-2 col-md-5">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}