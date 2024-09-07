import mongoose, { Model } from "mongoose";
import { IUser, IProject } from "@/types/models.types";

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

const projectSchema = new mongoose.Schema<IProject>(
    {
        project_name: {
            type: String,
            required: true,
        },
        preview_thumbnail: {
            type: String,
            required: true,
        },
        html: {
            type: String,
            required: true,
        },
        css: {
            type: String,
            required: true,
        },
        js: {
            type: String,
            required: true,
        },
        developer: {
            type: String,
            required: true,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

const UserModel: Model<IUser> =
    mongoose.models.User || mongoose.model<IUser>("User", userSchema);

const ProjectModel: Model<IProject> =
    mongoose.models.Project ||
    mongoose.model<IProject>("Project", projectSchema);

export { UserModel, ProjectModel };
