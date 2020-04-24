import authMiddleware from "@middleware/authMiddleware";
import ProjectController from "./project.controller";

const router = require("express").Router();

class ProjectRoutes {
    constructor() {
        this.router = router;
        this.controller = ProjectController;
        
		this.getAllProjects();
		this.getAllUserProjects();
    }

    getAllProjects() {
        this.router.get("/", authMiddleware, (req, res, next) => this.controller.index(req, res, next));
    }

    getAllUserProjects() {
        this.router.get("/user-project-list", authMiddleware, (req, res, next) => this.controller.userProjects(req, res, next));
    }
}

module.exports = new ProjectRoutes().router;
