import { UserModel } from "./models";
import { IUser } from "@/types/models.types";

export async function getUserByEmail(
    email: string,
    provider: string,
): Promise<IUser | null> {
    try {
        return await UserModel.findOne({ email, provider }).lean();
    } catch (err) {
        throw new Error("Unable to fetch user by email");
    }
}

export async function createNewUser(user: IUser) {
    await UserModel.create(user);
}
