import { DataTypes } from "sequelize";
import moment from 'moment';

export default class UserProject {
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
            comment: 'Foreign key of the users table',
            references: {
                model: 'users', // Can be both a string representing the table name, or a reference to the model
                key:   "id",
            },
        },
        projectId: {
            field: 'project_id',
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            comment: 'Foreign key of the projects table',
            references: {
                model: 'projects', // Can be both a string representing the table name, or a reference to the model
                key:   "id",
            },
        },
    }

    /*
    * Class method
    */
    static modelOptions = {
        freezeTableName: true,
        paranoid: false,
        timestamps: false,
        tableName: 'user_project'
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

        this.belongsTo(models.Project, {
            as: 'Project',
            constraints: true,
            foreignKey: {
                name: 'projectId',
                field: 'project_id',
                allowNull: false,
            },
        });
    };

    // This method will return created at date in display format
    createdAtDisplay() {
        return moment(this.created_at, "YYYY-MM-DD H:m").format("DD-MM-YYYY H:m");
    }
}
