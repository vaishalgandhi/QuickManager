import authMiddleware from "@middleware/authMiddleware";
import ProjectController from "./project.controller";

const router = require("express").Router();

class ProjectRoutes {
    constructor() {
        this.router = router;
        this.controller = ProjectController;
        
		this.getAllProjects();
    }

    getAllProjects() {
        this.router.get("/", authMiddleware, (req, res, next) => this.controller.index(req, res, next));
    }
}

module.exports = new ProjectRoutes().router;
