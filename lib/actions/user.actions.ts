/**
 * This module contains functions for CRUD operations related to users.
 */

"use server";

import { revalidatePath } from "next/cache"; // Import revalidatePath function from Next.js cache
import User from "../database/models/user.model"; // Import the User model from the database
import { connectToDatabase } from "../database/mongoose"; // Import the connectToDatabase function from mongoose
import { handleError } from "../utils"; // Import the handleError function from utils

/**
 * Creates a new user.
 * @param user - The user object to create.
 * @returns The newly created user.
 */
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    const newUser = await User.create(user); // Create a new user in the database

    return JSON.parse(JSON.stringify(newUser)); // Return the newly created user
  } catch (error) {
    handleError(error); // Handle any errors
  }
}

/**
 * Retrieves a user by their ID.
 * @param userId - The ID of the user to retrieve.
 * @returns The retrieved user.
 */
export async function getUserById(userId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    const user = await User.findOne({ clerkId: userId }); // Find the user by their ID

    if (!user) throw new Error("User not found"); // Throw an error if the user is not found

    return JSON.parse(JSON.stringify(user)); // Return the retrieved user
  } catch (error) {
    handleError(error); // Handle any errors
  }
}

/**
 * Updates a user.
 * @param clerkId - The clerk ID of the user to update.
 * @param user - The updated user object.
 * @returns The updated user.
 */
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    }); // Find and update the user by their clerk ID

    if (!updatedUser) throw new Error("User update failed"); // Throw an error if the update fails

    return JSON.parse(JSON.stringify(updatedUser)); // Return the updated user
  } catch (error) {
    handleError(error); // Handle any errors
  }
}

/**
 * Deletes a user.
 * @param clerkId - The clerk ID of the user to delete.
 * @returns The deleted user.
 */
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    const userToDelete = await User.findOne({ clerkId }); // Find the user to delete by their clerk ID

    if (!userToDelete) {
      throw new Error("User not found");
    }

    const deletedUser = await User.findByIdAndDelete(userToDelete._id); // Delete the user
    revalidatePath("/"); // Revalidate the cache for the home page

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null; // Return the deleted user
  } catch (error) {
    handleError(error); // Handle any errors
  }
}

/**
 * Updates the credit balance of a user.
 * @param userId - The ID of the user to update.
 * @param creditFee - The amount to update the credit balance by.
 * @returns The updated user with the new credit balance.
 */
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase(); // Connect to the database

    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    ); // Update the user's credit balance

    if (!updatedUserCredits) throw new Error("User credits update failed"); // Throw an error if the update fails

    return JSON.parse(JSON.stringify(updatedUserCredits)); // Return the updated user
  } catch (error) {
    handleError(error); // Handle any errors
  }
}
