import { ObjectId } from "mongoose";
import UserModel from "../models/user";
import { UserRequest } from "../types/requests/userRequest";
import { UserResponse } from "../types/responses/userResponse";

export class DatabaseUser {
	/**
	 * Create a user
	 */
	static async create(user: UserRequest): Promise<ObjectId> {
		const result = new UserModel(user);
		await result.save();
		return result._id;
	}

	/**
	 * find a user by id
	 */
	static async read(userid: ObjectId): Promise<UserResponse | undefined> {
		const result: UserResponse | null = await UserModel.findById(userid);
		if (result) {
			return result;
		} else {
			return undefined;
		}
	}

	static async readByUsername(
		username: string
	): Promise<UserResponse | undefined> {
		const result: UserResponse | null = await UserModel.findOne({
			username
		});
		if (result) {
			return result;
		} else {
			return undefined;
		}
	}

	/**
	 * Update a user's location or password
	 */
	static async update(
		userid: ObjectId,
		newuser: Partial<UserRequest>
	): Promise<void> {
		await UserModel.updateOne({ _id: userid }, newuser);
	}

	static async delete(userid: ObjectId): Promise<void> {
		await UserModel.deleteOne({ _id: userid });
	}
}
