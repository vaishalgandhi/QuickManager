import { DataTypes } from "sequelize";
import moment from 'moment';

export default class Project {
    static definition = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Primary and auto increment key of the table',
        },
        userId: {
            field: 'user_id',
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: 'Foreign key of the users table, Id of project manager',
            references: {
                model: 'users', // Can be both a string representing the table name, or a reference to the model
                key:   "id",
            },
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(100),
            allowNull: false,
            comment: 'Title/Name of project',
            validate: {
                isAlphanumeric: true,
            },
        },
        description: {
            field: 'description',
            type: DataTypes.TEXT,
            allowNull: false,
            comment: 'Project description',
        },
    }

    /*
    * Class method
    */
    static modelOptions = {
        freezeTableName: true,
        tableName: 'projects'
    }

    // All relationships goes here
    static associate(models) {
        this.belongsTo(models.User, {
            as: 'User',
            constraints: true,
            foreignKey: {
                name: 'userId',
                field: 'user_id',
                allowNull: false,
            },
        });
    };

    // This method will return created at date in display format
    createdAtDisplay() {
        return moment(this.created_at, "YYYY-MM-DD H:m").format("DD-MM-YYYY H:m");
    }
}
