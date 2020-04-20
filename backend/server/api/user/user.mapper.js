import _ from "lodash";

class UserMapper {
    // this will transform the object
    // to desire output
    map(user) {
        const object = {
            id: user.id,
            name:user.first_name,
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