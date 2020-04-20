import { DataTypes } from "sequelize";
import bcrypt from 'bcryptjs';
import moment from 'moment';

export default class User {
    static definition = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Primary and auto increment key of the table',
        },
        roleId: {
            field: 'role_id',
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: 'Foreign key of the roles table',
            references: {
                model: 'roles', // Can be both a string representing the table name, or a reference to the model
                key:   "id",
            },
        },
        firstName: {
            field: 'first_name',
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'First name',
            validate: {
                isAlphanumeric: true,
            },
        },
        lastName: {
            field: 'last_name',
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: null,
            comment: 'Last name',
            validate: {
                isAlphanumeric: true,
            },
        },
        email: {
            field: 'email',
            type: DataTypes.STRING(191),
            allowNull: false,
            unique: true,
            comment: 'Email of user',
            validate: {
                isEmail: true,
            },
        },
        password: {
            field: 'password',
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'User password',
        },
        dob: {
            field: 'dob',
            type: DataTypes.DATEONLY,
            allowNull: true,
            defaultValue: null,
            comment: 'User date of birth',
        },
        status: {
            field: 'status',
            type: DataTypes.TINYINT(1),
            defaultValue: 0,
            allowNull: false,
            comment: '0 - inactive, 1 - active',
        },
        country: {
            field: 'country',
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Canada",
            comment: 'Name of country user living in',
            validate: {
                isAlphanumeric: true,
            },
        },
        state: {
            field: 'state',
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: "Ontario",
            comment: 'Name of state user living in',
            validate: {
                isAlphanumeric: true,
            },
        },
        address: {
            field: 'address',
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: " ",
            comment: 'Address of user living in',
        },
    }

    /*
    * Class method
    */
    static modelOptions = {
        freezeTableName: true,
        tableName: 'users',
        hooks: {
            // This is hook that will call before any user is created
            beforeCreate : user => {
                user.password = user.generatePasswordHash(user.password);
            }
        }
    }

    // All relationships goes here
    static associate(models) {
        this.belongsTo(models.Role, {
            as: 'Role',
            constraints: true,
            foreignKey: {
                name: 'roleId',
                field: 'role_id',
                allowNull: false,
            },
        });
    };

    // This method will fetch user by id
    static getUserById(id = null) {
        return this.findById(id);
    }

    // This method will concate first name and last name
    get fullName() {
        return `${this.firstName} ${this.lastName}`.trim();
    }


    // This method will return status in text format
    statusText() {
        return this.status == 1 ? 'Active' : 'Inactive';
    }

    // This method will return created at date in display format
    createdAtDisplay() {
        return moment(this.created_at, "YYYY-MM-DD H:m").format("DD-MM-YYYY H:m");
    }

    /*
    * Instance Methods
    */

    // This method will compare plain text password to hashed password
    authenticate(inputPassword) {
        return bcrypt.compareSync(inputPassword, this.password);
    }

    // This method will generate hash password from plain text password
    generatePasswordHash(plainPassword) {
        const salt = bcrypt.genSaltSync(10);

        // Generate hash of plain password string using bcrypt
        return bcrypt.hashSync(plainPassword, salt);
    }

    // This method will convert our instance into object
    // Remove password property from the object
    toJson() {
        const obj = Object.assign({}, this.get());

        // Remove Password from the object
        delete obj.password;
        return obj;
    }
}
