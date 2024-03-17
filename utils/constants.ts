// 「N-DEV」により作成されました。
import type {Dictionary} from "../types";
export const FirebaseErrorCodes: Dictionary = {
    "auth/email-already-in-use": {
        message: "メールアドレスは既に使用されています",
    },
    "auth/invalid-email": {
        message: "メールアドレスの形式が不正です",
    },
    "auth/popup-blocked": {
        message: "ポップアップが拒否されました，設定を変更してください",
    },
    "auth/unauthorized-domain": {
        message: "現在この認証方法はご利用頂けません",
    },
    "auth/requires-recent-login": {
        message: "認証の有効期限が切れています",
    },
    "auth/weak-password": {
        message: "パスワードが脆弱です，6文字以上で単純でないものにしてください",
    },
    "auth/wrong-password": {
        message: "メールアドレスまたはパスワードが違います",
    },
    "auth/user-not-found": {
        message: "メールアドレスまたはパスワードが違います",
    },
    "auth/user-disabled": {
        message: "不正な操作等の検知により，サービスの利用が停止されています",
    },
    "auth/account-exists-with-different-credential": {
        message: "別のログイン方式で登録されております，他のログイン方式で実行してください",
    },
};

export const PREFECTURES: string[] = ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県',
    '栃木県', '群馬県', '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県',
    '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県', '三重県',
    '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県', '鳥取県', '島根県',
    '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
    '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'];

export const SEX: Dictionary[] = [
    {
        title: "未定義",
        description: "性別を指定しません",
        value: 0
    },
    {
        title: "男性",
        description: "",
        value: 1
    },
    {
        title: "女性",
        description: "",
        value: 2
    },
    {
        title: "その他",
        description: "",
        value: 3
    },
];
let SEX_OBJECT: Dictionary = {};
for (let g of SEX) {
    SEX_OBJECT[g.value] = g;
}
export {SEX_OBJECT};

export default {
    SEX, SEX_OBJECT,
};

export const WEEKS: Dictionary[] = [
    {title: "日曜日", value: "sunday", short: "日"},
    {title: "月曜日", value: "monday", short: "月"},
    {title: "火曜日", value: "tuesday", short: "火"},
    {title: "水曜日", value: "wednesday", short: "水"},
    {title: "木曜日", value: "thursday", short: "木"},
    {title: "金曜日", value: "friday", short: "金"},
    {title: "土曜日", value: "saturday", short: "土"},
];
let WEEKS_OBJECT: Dictionary = {};
for (let g of WEEKS) {
    WEEKS_OBJECT[g.value] = g;
}
export {WEEKS_OBJECT};
