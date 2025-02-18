import { Router } from "express";
import { Flight } from "../models/Flight";
import type { IPassenger } from "../models/Passenger";

export const passengerRouter = Router();

passengerRouter.get("/", async (req, res) => {
  try {
    const flights = await Flight.find({});
    const allPassengers = flights.reduce<IPassenger[]>((passengers, flight) => {
      return [...passengers, ...flight.passengers];
    }, []);

    const uniquePassengers = Array.from(
      new Map(allPassengers.map((p) => [p.id, p])).values()
    );

    res.status(200).json(uniquePassengers);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

passengerRouter.get("/:id", async (req, res) => {
  try {
    const passengerId = Number(req.params.id);
    const flights = await Flight.find({ "passengers.id": passengerId });

    const passenger = flights[0]?.passengers.find((p) => p.id === passengerId);

    if (!passenger) {
      return res.status(404).json({ error: "Pasajero no encontrado" });
    }
    const response = {
      ...passenger.toObject(),
      _links: {
        self: `/api/passengers/${passenger.id}`,
        flights: `/api/passengers/${passenger.id}/flights`,
        collection: "/api/passengers",
      },
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

passengerRouter.get("/:id/flights", async (req, res) => {
  try {
    const passengerId = Number(req.params.id);
    const flights = await Flight.find({ "passengers.id": passengerId });

    if (!flights.length) {
      return res
        .status(404)
        .json({ error: "No se encontraron vuelos para este pasajero" });
    }

    const flightResponses = flights.map((flight) => ({
      flightCode: flight.flightCode,
      _links: {
        self: `/api/flights/${flight.flightCode}`,
        passengers: `/api/flights/${flight.flightCode}/passengers`,
      },
    }));

    res.status(200).json(flightResponses);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

passengerRouter.patch("/:id", async (req, res) => {
  try {
    const passengerId = Number(req.params.id);
    const flights = await Flight.find({ "passengers.id": passengerId });

    if (!flights.length) {
      return res.status(404).json({ error: "Pasajero no encontrado" });
    }

    const updatePromises = flights.map((flight) => {
      const passengerIndex = flight.passengers.findIndex(
        (p) => p.id === passengerId
      );
      if (passengerIndex !== -1) {
        flight.passengers[passengerIndex] = {
          ...flight.passengers[passengerIndex].toObject(),
          ...req.body,
        };
        return flight.save();
      }
    });

    await Promise.all(updatePromises);

    const updatedFlight = await Flight.findOne({
      "passengers.id": passengerId,
    });
    const updatedPassenger = updatedFlight?.passengers.find(
      (p) => p.id === passengerId
    );

    res.status(200).json(updatedPassenger);
  } catch (error) {
    res.status(400).json({ error: "Datos de actualización inválidos" });
  }
});

passengerRouter.get("/flight/:flightCode", async (req, res) => {
  try {
    const flight = await Flight.findOne({ flightCode: req.params.flightCode });
    if (!flight) {
      return res.status(404).json({ error: "Vuelo no encontrado" });
    }

    const passengersWithLinks = flight.passengers.map((passenger) => ({
      ...passenger.toObject(),
      _links: {
        self: `/api/passengers/${passenger.id}`,
        flight: `/api/flights/${flight.flightCode}`,
      },
    }));

    res.status(200).json(passengersWithLinks);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
});
