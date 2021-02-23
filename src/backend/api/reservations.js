const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    const reservations = await knex("reservation");
    response.json(reservations);
  } catch (error) {
    throw error;
  }
});

router.post("/", async (request, response) => {
  try {
    request.body.created_date = new Date();
    const newReservation = await knex("reservation").insert(request.body);
    response.json(newReservation);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    
    const reservationById = await knex("reservation")
      .select()
      .where({ id: request.params.id });
    if (reservationById.length == 0) {
      response
        .status(404)
        .send(`Reservation with the corresponding id is not valid`);
    }
    response.json(reservationById[0]);
  } catch (error) {
    throw error;
  }
});

router.put("/:id", async (request, response) => {
  try {
    //console.log(request.body.id)
    const updatedReservation = await knex("reservation")
      .where({ id: request.params.id })
      .update(request.body);
    if (updatedReservation.length == 0) {
      response
        .status(404)
        .send("Reservation with the corresponding id is not valid");
    }
    response.json(updatedReservation);
  } catch (error) {
    throw error;
  }
});

router.delete("/:id", async (request, response) => {
  try {
    const deleteReservation = await knex("reservation")
      .where({ id: request.params.id })
      .del();
    if (deleteReservation.length == 0) {
      response
        .status(404)
        .send("Reservation with the corresponding id is not valid");
    }
    response.json(deleteReservation);
  } catch (error) {
    throw error;
  }
});

module.exports = router;