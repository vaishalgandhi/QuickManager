import _ from "lodash";
import moment from "moment";

class UserMapper {
    // this will transform the object
    // to desire output
    map(user) {
        const object = {
            id: user.id,
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            dob: moment(user.dob, "YYYY-MM-DD").format("DD-MM-YYYY"),
            status: user.status,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        if (user.hasOwnProperty("Role")) {
            object.Role = user.Role;
        }

        return object;
    }

    collection(users) {
        const self = this;

        return _.map(users, user => self.map(user));
    }
}

module.exports = new UserMapper();