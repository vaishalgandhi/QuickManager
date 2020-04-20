import BaseRepository from "@api/BaseRepository";
import { User } from "@db/db-connect";
import UserMapper from "./user.mapper";
import { transformPromise } from "@helpers";

class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    allUserList() {
    	return this.model.all();
    }

    async getUserDetailsById(id) {
        const [error, collection] = await transformPromise(this.find({
            where: { id },
            include: ["Role"],
        }));

        return new Promise(((resolve, reject) => {
            if (error !== null) {
                reject(error);
            }

            resolve(UserMapper.map(collection));
        }));
    }

    add(input) {
        return this.model.create(input);
    }

    async update(input, id) {
    	const [error, collection] = await transformPromise(this.model.update(input, {
        	returning: true,
        	plain: true,
        	where: { id: id }
        }));

        return new Promise(((resolve, reject) => {
            if (error !== null) {
                reject(error);
            }

            resolve(collection);
        }));
    }
}

module.exports = new UserRepository();
