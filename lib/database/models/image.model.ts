import { Document, Schema, model, models } from "mongoose";

// Define interface for the image document in MongoDB
export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the image document
const ImageSchema = new Schema<IImage>({
  title: { type: String, required: true }, // Title of the image
  transformationType: { type: String, required: true }, // Transformation type
  publicId: { type: String, required: true }, // Public ID of the image
  secureURL: { type: String, required: true }, // Secure URL of the image
  width: { type: Number }, // Width of the image
  height: { type: Number }, // Height of the image
  config: { type: Object }, // Configuration object
  transformationUrl: { type: String }, // Transformation URL of the image
  aspectRatio: { type: String }, // Aspect ratio of the image
  color: { type: String }, // Color of the image
  prompt: { type: String }, // Prompt for the image
  author: { type: Schema.Types.ObjectId, ref: "User" }, // Author of the image
  createdAt: { type: Date, default: Date.now }, // Creation date of the image
  updatedAt: { type: Date, default: Date.now }, // Last update date of the image
});

// Create or retrieve the Image model
const Image = models?.Image || model("Image", ImageSchema);

// Export the Image model
export default Image;
