import connection from "../config/db";
import { DataTypes } from "sequelize";
const users = connection.define('users',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    roleid:{
        type:  DataTypes.STRING,
        allowNull: false
    },
    uid:{
        type:  DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:  DataTypes.STRING,
        allowNull: false
    },
    password:{
        type:  DataTypes.STRING,
        allowNull: false
    },
    addedby:{
        type:  DataTypes.STRING,
        allowNull: false
    },
    },
    {
        tablename: "users",
        timestamps: false,
    });

    export default users;