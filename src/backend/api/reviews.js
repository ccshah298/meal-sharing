const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const reviews = await knex("review");
    response.json(reviews);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    request.body.created_date = new Date();
    const newReview = await knex("review").insert(request.body);
    response.json(newReview);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const reviewById = await knex("review")
      .select()
      .where({ id: request.params.id });
    if (reviewById.length == 0) {
      response
        .status(404)
        .send(`Review with the corresponding id is not valid`);
    }
    response.json(reviewById[0]);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    const updatedReview = await knex("review")
      .where({ id: request.params.id })
      .update(request.body);
    if (updatedReview.length == 0) {
      response
        .status(404)
        .send("Review with the corresponding id is not valid");
    }
    response.json(updatedReview);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deleteReview = await knex("review")
      .where({ id: request.params.id })
      .del();
    if (deleteReview.length == 0) {
      response
        .status(404)
        .send("Review with the corresponding id is not valid");
    }
    response.json(deleteReview);
  } catch (error) {
    throw error;
  }
});

module.exports = router;