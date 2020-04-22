const router = require("express").Router();
const userModule = require("./user/user.route");
const projectModule = require("./project/project.route");

class ApiRoutes {
    constructor() {
        this.router = router;
        this.userRoute();
        this.projectRoute();
    }

    userRoute() {
        this.router.use("/users", userModule);
    }

    projectRoute() {
        this.router.use("/projects", projectModule);
    }
}

module.exports = new ApiRoutes().router;
