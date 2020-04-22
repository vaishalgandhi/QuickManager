import _ from "lodash";
import moment from "moment";
import GeneralError from "@util/generalError";
import BaseController from "@api/BaseController";
import ProjectRepository from "./project.repository";
import { transformPromise, sequelizeErrorHandler } from "@helpers";
import logger from "@util/logger";

class ProjectController extends BaseController {
    constructor() {
        super();
        this.repository = ProjectRepository;
    }

    async index(req, res, next) {
        const queryString = req.query;
        const queryConfig = super.queryParameter(queryString);

        if (queryString.hasOwnProperty("dropdown") && queryString.dropdown == "true") {
            queryConfig.attributes = ["id", "name"];
        }

        queryConfig.where = {
            user_id: req.user.id
        };

        const [error, projects] = await transformPromise(this.repository.paginate(queryConfig));

        if (error !== null) {
            logger.error(error);
            res.send(super.respondWithError(error, error.error_message, 500));
        }

        res.send(super.respondWithPagination(projects, queryConfig));
    }
}

module.exports = new ProjectController();