import { Schema, Document } from "mongoose";
import { FlightCategory } from "./types";

export interface IPassenger extends Document {
  id: number;
  name: string;
  hasConnections: boolean;
  age: number;
  flightCategory: FlightCategory;
  reservationId: string;
  hasCheckedBaggage: boolean;
}

export const passengerSchema = new Schema<IPassenger>({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  hasConnections: {
    type: Boolean,
    required: true,
    default: false,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  flightCategory: {
    type: String,
    enum: Object.values(FlightCategory),
    required: true,
  },
  reservationId: {
    type: String,
    required: true,
    trim: true,
  },
  hasCheckedBaggage: {
    type: Boolean,
    required: true,
    default: false,
  },
});

passengerSchema.index({ id: 1 });
