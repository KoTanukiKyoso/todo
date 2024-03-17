// 「N-DEV」により作成されました。
import {H3Event} from "h3";
import {getDB} from "~/server/utils/dbUtil";
import {getUserByToken, initializeFirebase} from "~/server/utils/firebaseUtil";
import {type Connection} from "mysql2/promise";

interface errorCodes {
    [key: number]: FuncResponse
}

export const errorCodes: errorCodes = {
    1: {
        errorNumber: 1,
        errorCode: "unexplained",
        message: "原因不明のエラーです。",
        description: "一般のエラー",
        success: false,
        status: 200,
        data: {},
    },
    2: {
        errorNumber: 2,
        errorCode: "unexplained-database",
        message: "データベースでエラーが発生しました。",
        description: "一般のエラー",
    },
    3: {
        errorNumber: 3,
        errorCode: "illegal-data",
        message: "不正なデータを検知しました。",
        description: "一般のエラー",
    },
    5: {
        errorNumber: 5,
        errorCode: "permission-denied",
        message: "この操作の権限がありません。",
        description: "一般のエラー",
    },
    6: {
        errorNumber: 6,
        errorCode: "data-not-found",
        message: "対象のデータがありません，削除・変更済みの可能性があります。",
        description: "一般のエラー",
    },
};

export const setError = async (errorNumber: number): Promise<FuncResponse> => {
    let res: FuncResponse = {...errorCodes[errorNumber]};
    res.success = false;
    res.status = 200;
    res.data = {};
    return res;
}

export const getResponse = async (): Promise<FuncResponse> => {
    return await setError(1);
};

export const apiInit = async (e: H3Event<Request>): Promise<FuncResponse> => {
    let response: FuncResponse = await getResponse();
    const body: any = await readBody(e);
    if (!body) return response;
    const token: string | undefined = getHeader(e, "Authorization")?.split(" ")[1];
    const db = await getDB();
    if (!db.success) return response;
    if (!db.connection) return response;

    const con: Connection = db.connection;

    //NOTE: ここにFirebase Authenticationのトークンからユーザー情報を取得する処理を追加してください。
    // initializeFirebase();
    // let res: FuncResponse = await getUserByToken(token || "");
    // if (!res.success) return res;
    // let user = res.data;
    // let uid = res.data.uid;
    let user = {uid: "uid"};// ダミー
    let uid = "sample-uid";// ダミー

    response.data = {
        response: await getResponse(),
        body: body,
        user: user,
        uid: uid,
        con: con,
    }
    response.success = true;
    return response;
}

export const log = async (uid: string | null, place: string = "", errorCode: string, content: string | number,
                          details: {} = {}, isError: boolean = false, risk: number = 0): Promise<FuncResponse> => {
    let response: FuncResponse = await getResponse();
    console.log("log", uid, place, errorCode, content, details, isError, risk);
    //NOTE: ここにログを記録する処理を追加してください。
    return response;
}

export default {
    errorCodes,
    getResponse,
    apiInit,
}
