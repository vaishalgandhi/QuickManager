import _ from "lodash";
import moment from "moment";
import GeneralError from "@util/generalError";
import BaseController from "@api/BaseController";
import UserRepository from "./user.repository";
import { transformPromise, sequelizeErrorHandler } from "@helpers";
import logger from "@util/logger";

class UserController extends BaseController {
    constructor() {
        super();
        this.repository = UserRepository;
    }

    loggedInUser(req, res) {
        res.json(super.respond(req.user.toJson(), "User Logged in successfully"));
    }


    async params(req, res, next, id) {
        if (isNaN(id)) {
            return super.respondWithError(new GeneralError("Id should be numeric", 422), null, 422);
        }
        
        const [error, user] = await transformPromise(this.repository.getUserDetailsById(id));

        if (error !== null) {
            logger.error(error);
            next(error);
        }

        req.currentuser = user;
        next();
    }

    async index(req, res, next) {
        const queryString = req.query;
        const queryConfig = super.queryParameter(queryString);

        if (queryString.hasOwnProperty("dropdown") && queryString.dropdown == "true") {
            queryConfig.attributes = ["id", "name"];
        }

        queryConfig.include = ["Role"];

        const [error, users] = await transformPromise(this.repository.paginate(queryConfig));

        if (error !== null) {
            logger.error(error);
            res.send(super.respondWithError(error, error.error_message, 500));
        }


        res.send(super.respondWithPagination(users, queryConfig));
    }

    getById(req, res, next) {
        const user = req.currentuser;

        if (user === null) {
            res.send(super.respondWithError(["User not found"], "User not found", 404));
        } else {
            res.json(super.respond(user, null));
        }
    }

    store(req, res, next) {
        // Converting dob format
        req.body.dob = moment(req.body.dob, "DD-MM-YYYY").format("YYYY-MM-DD");

        // adding default active status in input object
        const input = _.extend(req.body, {
            status: 1,
            password: "Quick@123"
        });

        this.repository
            .add(input)
            .then((user) => {
                res.send(super.respond({ user: user.toJson() }, "Employee created successfully"));
            })
            .catch((error) => {
                res.send(super.respondWithError(sequelizeErrorHandler(error), null, 500));
            });
    }

    async update(req, res, next) {
        // Converting dob format
        req.body.dob = moment(req.body.dob, "DD-MM-YYYY").format("YYYY-MM-DD");

        const [error, user] = await transformPromise(this.repository.update(req.body, req.currentuser.id));

        if (error !== null) {
            logger.error(error);
            res.send(super.respond(error, error.error_message, 500));
        }

        const [alert, updatedUser] = await transformPromise(this.repository.getUserDetailsById(req.currentuser.id));

        res.send(super.respond(updatedUser));
    }
}

module.exports = new UserController();
