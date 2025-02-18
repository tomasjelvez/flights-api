import { Schema, model, Document } from "mongoose";
import { passengerSchema, IPassenger } from "./Passenger";

export interface IFlight extends Document {
  flightCode: string;
  passengers: IPassenger[];
}

const flightSchema = new Schema<IFlight>(
  {
    flightCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    passengers: [passengerSchema],
  },
  {
    collection: "flights",
    timestamps: true,
    versionKey: false,
  }
);

flightSchema.index({ flightCode: 1 });

export const Flight = model<IFlight>("Flight", flightSchema);
