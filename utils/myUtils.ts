// 「N-DEV」により作成されました。
import {useStore, useTasks} from "~/composables";
// @ts-ignore
import loadImage from "blueimp-load-image";

export const postApi = async (url: string, arr: Dictionary, overlay: boolean = true, login: boolean = true,
                              errorMessageDismissible: boolean = false): Promise<ClientResponse | FuncResponse> => {
    let {user, addMessage, emailVerified}: { user: globalThis.Ref<null | Dictionary>, addMessage: Function, emailVerified: Function } = useStore();
    let tasks: any = useTasks();
    let response: ClientResponse = getClientResponse();
    if ((!user || !user.value || !user.value.token) && login) {
        addMessage({
            text: "この操作にはログインが必要です。"
        });
        return response;
    }
    if (!emailVerified() && login) {
        addMessage({
            text: "サービスのご利用にはメールアドレスの確認が必要です。"
        });
        return response;
    }
    if (overlay) tasks.value++;
    const r: Response = await fetch(`/api/${url}`, {
        method: 'POST',
        body: JSON.stringify(arr),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `token ${user?.value?.token}`,
        },
    });
    let res: FuncResponse = await r.json();
    if (overlay) tasks.value--;
    if (res.success) return res;
    addMessage({
        text: process.env.NODE_ENV === "development" ? res.message + "：" + url : res.message,
        dismissible: errorMessageDismissible,
    });
    return res;
};

export const isURL = (url: string) => {
    const pattern: RegExp = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
};
export const isMail = (address: string) => {
    if (!address) return false;
    let regex: RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    return !!address.match(regex);
};
export const isPassword = (password: string) => {
    if (!password) return false;
    let regex: RegExp = new RegExp(/^[a-zA-Z0-9.!#$%&*+=?_~-]+$/);
    return !!password.match(regex);
};

export const readImage = async (file: Blob, maxW: number = 1500, maxH: number = 1500, maxS: number = 2): Promise<any> => {
    if (!file) return null;
    if (file.type.indexOf('image') < 0) return null;
    let options: any = {
        canvas: true,
    };
    let exifData = await loadImage.parseMetaData(file).then((data: any) => {
        if (data.exif) return data.exif;
        return null;
    });
    if (exifData) {
        let exifAll = exifData.getAll();
        if (exifAll.Orientation) options.orientation = exifAll.Orientation;
    }
    let mb: number = Math.round(file.size / 1024 / 1024);
    if (mb >= maxS) {
        options.maxWidth = maxW;
        options.maxHeight = maxH;
    }

    let data = await loadImage(file, options);
    return data.image.toDataURL();
};

export const toArray = (obj: Dictionary) => {
    return Object.keys(obj).map((key: string | number) => obj[key]);
};

export const makeResult = (data: any[], tofs: null | string[] = null, secrets: null | string[] = null) => {
    let res: any[] = [];
    for (let d of data) {
        let item: Dictionary = {};
        for (let k in d) {
            item[snakeToCamel(k)] = d[k];
        }
        res.push(item);
    }
    if (tofs || secrets) {
        for (let d of res) {
            for (let k in d) {
                if (secrets && secrets.includes(k)) {
                    d[k] = "";
                } else if (tofs && tofs.includes(k)) {
                    d[k] = d[k] === 1;
                }
            }
        }
    }
    return res;
}

export const rules: Dictionary = {
    required: (v: string) => !!v || '必須項目です',
    passwordMatch: (v: string) => isPassword(v) || "パスワードに使用できない文字が含まれています",
    emailMatch: (v: string) => isMail(v) || `メールアドレスの形式が不正です`,
    urlMatch: (v: string) => isURL(v) || `URLの形式が不正です`,
    min: (n: number) => (v: string) => (!v || v.length >= n) || `${n}文字以上で入力してください`,
    max: (n: number) => (v: string) => (!v || v.length <= n) || `${n}文字以下で入力してください`,
    fileSizeKMax: (n: number, v: File) => !v || (v.size <= n * 1024) || `${n}KB以下のファイルを選択してください`,
    fileSizeMMax: (n: number, v: File) => !v || (v.size <= n * 1024 * 1024) || `${n}MB以下のファイルを選択してください`,
}

export const escapeForCSV = (s: string) => {
    return `"${s.replace(/"/g, '\"\"')}"`
}

export const getRandom = (length: number = 10, type: string = "number"): string => {
    let rand: string = "";
    let t, p, num: number = 10;
    if (type === "number") {
        t = "0123456789";
    } else if ("string") {
        t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        num = 52;
    } else {
        t = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        num = 62;
    }
    for (let i: number = 0; i < length; i++) {
        let array: Uint32Array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        p = array[0] % num;
        rand += t[p];
    }
    return rand;
};

export const saveFile = async (file: File) => {
    return "https://fileurl";
}

export const saveImage = async (image: string, savePath: string) => {
    return savePath;
}

export interface ClientResponse {
    errorNumber: number,
    errorCode: string,
    message: string,
    description: string,
    success: boolean,
    data: any,
}

export const snakeToCamel = (snake: string): string => {
    return snake.replace(/[-_](.)/g, (match, group1) => {
        return group1.toUpperCase();
    });
};

export const toUpperFirst = (str: string): string => {
    let s: string = snakeToCamel(str);
    return snakeToCamel(s).charAt(0).toUpperCase() + s.slice(1);
}

export const getClientResponse = (): ClientResponse => {
    return {
        errorNumber: 0,
        errorCode: "",
        message: "原因不明のエラーが発生しました。",
        description: "",
        success: false,
        data: null,
    };
};
