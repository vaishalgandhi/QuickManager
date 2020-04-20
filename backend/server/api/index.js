const router = require("express").Router();
const userModule = require("./user/user.route");

class ApiRoutes {
    constructor() {
        this.router = router;
        this.userRoute();
    }

    userRoute() {
        this.router.use("/users", userModule);
    }
}

module.exports = new ApiRoutes().router;
