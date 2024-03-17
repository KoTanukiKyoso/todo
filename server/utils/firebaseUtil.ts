// 「N-DEV」により作成されました。
import {cert, getApps, initializeApp} from "firebase-admin/app";
import {type DecodedIdToken, getAuth} from "firebase-admin/auth";
import type {FuncResponse} from "~/types";

export const initializeFirebase = (): void => {//NOTE: Firebase Admin SDK を使用する場合（環境変数を用いることが望ましい）
    const _cert = {
        projectId: "sample-1234",
        clientEmail: "firebase-adminsdk-sample@sample-1234.iam.gserviceaccount.com",
        privateKey: "-----BEGIN PRIVATE KEY-----\nSAMPLE\nhogehoge\n-----END PRIVATE KEY-----\n",
    }

    if (getApps().length === 0) {
        initializeApp({
            credential: cert(_cert),
        });
    }
}

const providers: string[] = ["google.com", "facebook.com", "github.com", "apple.com"];

export const getUserByToken = async (token: string, requireEmailVerified: boolean = true): Promise<FuncResponse> => {
    let response: FuncResponse = await setError(110);
    return await getAuth().verifyIdToken(token).then((decodedToken: DecodedIdToken) => {
        if (requireEmailVerified && !providers.includes(decodedToken.firebase.sign_in_provider) && !decodedToken.email_verified) {
            response.message += "メールアドレスが確認されていません。";
            return response;
        }
        response.success = true;
        response.data = decodedToken;
        return response;
    }).catch((error) => {
        response.message += error.message;
        return response;
    });
};
