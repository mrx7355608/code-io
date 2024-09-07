import mongoose from "mongoose";

interface IUser {
    fullname: string;
    email: string;
    picture: string;
    provider: string;
}

interface IProject {
    html: string;
    css: string;
    js: string;
    preview_thumbnail: string;
    project_name: string;
    developer: mongoose.Types.ObjectId;
}

export type { IUser, IProject };
