import BaseRepository from "@api/BaseRepository";
import { Project, UserProject } from "@db/db-connect";
import ProjectMapper from "./project.mapper";
import { transformPromise } from "@helpers";

class ProjectRepository extends BaseRepository {
    constructor() {
        super(Project);
    }

    userProjectList(query) {
    	return UserProject.findAndCountAll(query);
    }
}

module.exports = new ProjectRepository();