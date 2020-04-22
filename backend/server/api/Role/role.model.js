import { DataTypes } from "sequelize";

export default class Role {
    static definition = {
        id: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            comment: 'Primary and auto increment key of the table',
        },
        name: {
            field: 'name',
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }

    /*
    * Class method
    */
    static modelOptions = {
        freezeTableName: true,
        tableName: 'roles'
    }
}
