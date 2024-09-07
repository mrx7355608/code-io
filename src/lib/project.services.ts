import { IProject } from "@/types/models.types";
import { ProjectModel } from "./models";

export async function getAllProjects(developerId: string) {
    try {
        const projects: IProject[] = await ProjectModel.find({
            developer: developerId,
        })
            .populate("developer", "fullname image")
            .lean();
        return projects;
    } catch (error) {
        throw new Error("Unable to fetch all projects");
    }
}
export async function createProject(data: IProject) {
    try {
        await ProjectModel.create(data);
    } catch (error) {
        throw new Error("There was an error while creatign a new project");
    }
}
export async function deleteProject(projectId: string) {}
export async function editProject(projectId: string, data: IProject) {}
