import type {DecodedIdToken} from "firebase-admin/auth";
import {H3Event} from "h3";
import type {Connection} from "mysql2/promise";

declare global {
    interface FuncResponse {
        errorNumber: number,
        errorCode: string,
        message: string | number,
        description: string,
        success?: boolean,
        status?: number,
        data?: any,
    }

    interface Dictionary {
        [index: string | number]: any,
    }

    interface apiInitRes {
        response: FuncResponse,
        uid: string,
        con: Connection,
        body: any,//H3Event<Request>
        user: DecodedIdToken,
    }

    interface LogData {
        uid: string | null,
        appId: number | null,
        place: string,
        errorCode?: string,
        message?: string,
        details: Dictionary,
        isError?: boolean,
        risk: 0 | 1 | 2 | 3,
    }
}
