import { Router } from "express";
import { flightRouter } from "./routes/flightRoutes";
import { passengerRouter } from "./routes/passengerRoutes";

export const router = Router();

router.use("/flights", flightRouter);
router.use("/passengers", passengerRouter);
