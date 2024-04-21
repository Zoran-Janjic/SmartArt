import { Schema, model, models, Document } from "mongoose";

// Define interface for the transaction document in MongoDB
export interface ITransaction extends Document {
  createdAt: Date;
  stripeId: string;
  amount: number;
  plan?: string;
  credits?: number;
  buyer: Schema.Types.ObjectId;
}

// Define the schema for the transaction document
const TransactionSchema = new Schema<ITransaction>({
  // Date and time when the transaction was created
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // Unique identifier for the transaction (e.g., from Stripe)
  stripeId: {
    type: String,
    required: true,
    unique: true,
  },
  // Amount of the transaction
  amount: {
    type: Number,
    required: true,
  },
  // Plan associated with the transaction (if applicable)
  plan: {
    type: String,
  },
  // Number of credits associated with the transaction (if applicable)
  credits: {
    type: Number,
  },
  // Reference to the buyer (user) who made the transaction
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Create or retrieve the Transaction model
const Transaction =
  models?.Transaction || model<ITransaction>("Transaction", TransactionSchema);

// Export the Transaction model
export default Transaction;
