const router = require("express").Router();
const countryModule = require("./country/country.route");
const userModule = require("./user/user.route");

class ApiRoutes {
    constructor() {
        this.router = router;
        this.countryRoute();
        this.userRoute();
    }

    userRoute() {
        this.router.use("/users", userModule);
    }
}

module.exports = new ApiRoutes().router;
