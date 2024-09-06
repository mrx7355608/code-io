import mongoose from "mongoose";
import { IUser } from "@/types/models.types";

const userSchema = new mongoose.Schema<IUser>(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
        provider: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const UserModel =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export { UserModel };
