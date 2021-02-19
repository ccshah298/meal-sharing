const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (req, res) => {
  try {
    let result;
    let maxPrice = req.query.maxPrice;
    let maxPriceParse = parseInt(maxPrice);
    const availableReservations = req.query.availableReservations;
    let someTitle = req.query.title;
    let createdAfter = req.query.createdAfter;
    let limit = req.query.limit;

    if (maxPrice) {
      result = await knex("meal").where("price", "<", maxPriceParse).select();
    } else if (availableReservations) {
      result = await knex
        .from("meal")
        .leftJoin("reservation", { "meal.id": "reservation.meal_id" })
        .groupBy("meal.id")
        .having(
          knex.raw(
            "meal.max_reservation > coalesce(sum(reservation.number_of_guests), 0)"
          )
        )

        .select("meal.*");
    } else if (someTitle) {
      result = await knex("meal")
        .where("title", "like", `%${someTitle}%`)
        .select();
    } else if (createdAfter) {
      result = await knex("meal")
        .where("created_date", ">", createdAfter)
        .select();
    } else if (limit) {
      let limitParse = parseInt(limit);
      result = await knex("meal").limit(limitParse).select();
    } else {
      result = await knex("meal").select();
    }
    res.json(result);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    request.body.created_date = new Date();
    const newMeal = await knex("meal").insert(request.body);
    response.json(newMeal);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealById = await knex("meal")
      .select()
      .where({ id: request.params.id });
    if (mealById.length == 0) {
      response.status(404).send(`Meal with the corresponding id is not valid`);
    }
    response.json(mealById[0]);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    console.log(request.body.id);
    const updatedMeal = await knex("meal")
      .where({ id: request.params.id })
      .update(request.body);
    if (updatedMeal.length == 0) {
      response.status(404).send("Meal with the corresponding id is not valid");
    }
    response.json(updatedMeal);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    console.log(request.body.id);
    const deleteMeal = await knex("meal")
      .where({ id: request.params.id })
      .del();
    if (deleteMeal.length == 0) {
      response.status(404).send("Meal with the corresponding id is not valid");
    }
    response.json(deleteMeal);
  } catch (error) {
    throw error;
  }
});

module.exports = router;