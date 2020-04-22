import authMiddleware from "@middleware/authMiddleware";
import UserController from "./user.controller";

const router = require("express").Router();

class UserRoutes {
    constructor() {
        this.router = router;
        this.controller = UserController;
        
        this.parameterizedRoute();
        this.getLoggedInUserDetails();
        this.getAllUsers();
        this.getUserDetails();
        this.storeUser();
        this.updateUser();
        this.deleteUser();
    }

    parameterizedRoute() {
        this.router.param("id", async (req, res, next, id) => {
            const response = await this.controller.params(req, res, next, id);

            if (response != undefined) {
                next(response.errors);
            }
        });
    }

    getLoggedInUserDetails() {
        this.router.get("/loggedin-user", authMiddleware, (req, res, next) => this.controller.loggedInUser(req, res, next));
    }

    getAllUsers() {
        this.router.get("/all", authMiddleware, (req, res, next) => this.controller.index(req, res, next));
    }

    getUserDetails() {
        this.router.get("/:id", authMiddleware, (req, res, next) => this.controller.getById(req, res, next));
    }

    storeUser() {
        this.router.post("/store", authMiddleware, (req, res, next) => this.controller.store(req, res, next));
    }

    updateUser() {
        this.router.put("/:id", authMiddleware, (req, res, next) => this.controller.update(req, res, next));
    }

    deleteUser() {
        this.router.delete("/:id", authMiddleware, (req, res, next) => this.controller.delete(req, res, next));
    }
}

module.exports = new UserRoutes().router;
