import { Router } from "express";
import { Flight } from "../models/Flight";

export const flightRouter = Router();

flightRouter.get("/", async (req, res) => {
  try {
    const flights = await Flight.find();
    res.status(200).json(flights);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

flightRouter.get("/:flightCode", async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightCode: req.params.flightCode });
    if (!flight) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }
    const response = {
      ...flight.toJSON(),
      _links: {
        self: `/api/flights/${flight.flightCode}`,
        passengers: `/api/passengers/flight/${flight.flightCode}`,
        collection: "/api/flights",
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

flightRouter.post("/", async (req, res) => {
  try {
    if (!req.body.flightCode || !req.body.passengers) {
      return res.status(400).json({
        error: "Se requieren flightCode y passengers",
      });
    }

    const existingFlight = await Flight.findOne({
      flightCode: req.body.flightCode,
    });
    if (existingFlight) {
      return res.status(409).json({
        error: "Ya existe un vuelo con ese código",
      });
    }

    const flight = new Flight(req.body);
    await flight.save();
    res.status(201).json(flight);
  } catch (error) {
    res.status(400).json({ error: "Datos de vuelo inválidos" });
  }
});

flightRouter.put("/:flightCode", async (req, res) => {
  try {
    if (!req.body.flightCode || !req.body.passengers) {
      return res.status(400).json({
        error: "Se requieren todos los campos (flightCode y passengers)",
      });
    }

    const flight = await Flight.findOneAndUpdate(
      { flightCode: req.params.flightCode },
      req.body,
      { new: true }
    );
    if (!flight) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(400).json({ error: "Datos de vuelo inválidos" });
  }
});

flightRouter.patch("/:flightCode", async (req, res) => {
  try {
    const flight = await Flight.findOneAndUpdate(
      { flightCode: req.params.flightCode },
      { $set: req.body },
      { new: true }
    );
    if (!flight) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }
    res.status(200).json(flight);
  } catch (error) {
    res.status(400).json({ error: "Datos de actualización inválidos" });
  }
});

flightRouter.delete("/:flightCode", async (req, res) => {
  try {
    const flight = await Flight.findOneAndDelete({
      flightCode: req.params.flightCode,
    });
    if (!flight) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
