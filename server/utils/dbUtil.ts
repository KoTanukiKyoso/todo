// 「N-DEV」により作成されました。
import {getResponse} from "./apiConf";

// @ts-ignore
import mysql from "mysql2/promise";
// @ts-ignore
import bluebird from "bluebird";

let con: null | mysql.Connection = null;
export const getDB = async () => {
    let connection;
    try {
        connection = await mysql.createConnection({//NOTE: データベース接続情報の修正
            host: "localhost",
            port: 3306,
            user: 'root',
            password: 'root',
            database: 'todo',
            Promise: bluebird,
            namedPlaceholders: true,
            dateStrings: true,
        });
    } catch (e: any) {
        return {
            connection: null,
            success: false,
            message: e.message,
        };
    }

    con = connection;
    return {
        connection: connection,
        success: true,
    };
}

export const getUser = async (uid: string) => {
    let response: FuncResponse = await getResponse();
    response.success = true;
    response.data = {
        name: "nexs",
        state: "active",
    };
    return response;
}

export const checkPermission = async () => {
    let response: FuncResponse = await getResponse();
    response.success = true;
    return response;
}
