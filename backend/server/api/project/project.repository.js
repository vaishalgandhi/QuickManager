import BaseRepository from "@api/BaseRepository";
import { Project } from "@db/db-connect";
import ProjectMapper from "./project.mapper";
import { transformPromise } from "@helpers";

class ProjectRepository extends BaseRepository {
    constructor() {
        super(Project);
    }
}

module.exports = new ProjectRepository();