import { ObjectId } from "mongoose";
import UserModel from "../models/user";
import { UserRequest } from "../types/requests/userRequest";
import { UserResponse } from "../types/responses/userResponse";

export class DatabaseEvent {
    /**
	 * Create a user
	 */
    async create(user: UserRequest){
        const result = new UserModel(user);
        await result.save();
    }

    /**
	 * find a user by id
	 */
    async read(userid: ObjectId): Promise<UserResponse|undefined>{
        const result: UserResponse|null = await UserModel.findById(userid);
        if (result){
            return result;
        }
        else {
            return undefined;
        }
    }

    /**
	 * Update a user's location or password
	 */
    async update(userid: ObjectId, newuser: Partial<UserRequest>): Promise<void>{
        await UserModel.updateOne({_id:userid}, newuser);
    }

    async delete(userid: ObjectId): Promise<void>{
        await UserModel.deleteOne({_id: userid});
    }
}