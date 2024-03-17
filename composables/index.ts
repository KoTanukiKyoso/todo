// 「N-DEV」により作成されました。
import {type Auth, getAuth, onAuthStateChanged} from "firebase/auth";

export const useStore = () => {
    let title: Ref<string> = useState('title', () => "サンプルアプリ");//NOTE:アプリタイトル
    let messages: globalThis.Ref<any[]> = useState('messages', () => []);
    let user: any = useState('user', () => null);
    let isSignedIn: globalThis.Ref<boolean> = useState('isSignedIn', () => false);
    let gotUserData: globalThis.Ref<boolean> = useState('gotUserData', () => false);
    let endFirstAuth: globalThis.Ref<boolean> = useState('endFirstAuth', () => false);
    let isRail: globalThis.Ref<boolean> = useState('isRail', () => false);
    let drawer: globalThis.Ref<boolean> = useState('drawer', () => false);
    const resetAuth = () => {
        console.log("resetAuth");
        user.value = null;
        isSignedIn.value = false;
        gotUserData.value = false;
    };
    const addMessage = (message: any) => {
        if (!message.dismissible) message.dismissible = false;
        if (!message.time) message.time = 4;
        if (message.risk !== 0 && !message.risk) message.risk = 3;
        messages.value.push(message);
    };
    const onAuthStateChanged = (_user: any) => {
        if (!_user) {
            user.value = null;
            endFirstAuth.value = true;
            return;
        }
        if (!user.value) user.value = {};
        let __user = {...user.value};
        for (let k in _user) __user[k] = _user[k]; //firebaseが返したユーザー情報をマージ
        user.value = __user;
        endFirstAuth.value = true;
    };
    /**
     * Eメール確認済みならtrueを返す
     */
    const emailVerified = () => true;
    return {
        title,
        messages,
        user,
        isSignedIn,
        gotUserData,
        endFirstAuth,
        drawer,
        isRail,
        storageRoot: "public/",
        imgStorageRoot: "public/min",
        storageGetRoot: "https://storage.googleapis.com/sample.appspot.com/", // Firebase StorageのURL
        fileStorageRoot: "public/files/",

        pages: [//NOTE: サイドナビゲーションに表示するページを配列で設定する
            {
                title: "TOP", to: "/",
                description: "サンプルページ１。",
                icon: "mdi-apps",
                conds: {
                    signedIn: false,
                },
            },
            {
                title: "ToDo", to: "/todo",
                description: "サンプルページ２。",
                icon: "mdi-apps",
                conds: {
                    signedIn: false,
                },
            },
        ],

        resetAuth,
        onAuthStateChanged,
        addMessage,
        emailVerified,
    };
};
export const useTasks = (): Ref<number> => useState('tasks', () => 0);

export const useFirebaseAuth = () => {
    let {gotUserData, resetAuth, addMessage, onAuthStateChanged, isSignedIn} = useStore();
    // const auth: Auth = getAuth();
    // let tasks = useTasks();
    // let timer: any = useState("timer", () => null);
    // let token: any = useState("token", () => null);
    // let authed = useState("authed", () => false);
    const getUserData = async (__user: any) => {
        onAuthStateChanged({
            name: "nexs",
            email: "sample@smail.com",
            image: null,
            token: "sample_token",
        });
        gotUserData.value = true;
    };
    const logout = () => {
        addMessage({
            text: `ログアウトしました。`,
            risk: 0
        });
        resetAuth();
        navigateTo("/login");
    };
    // if (!authed.value) { //NOTE: ユーザ認証例
    //     authed.value = true;
    //     onAuthStateChanged(auth, (user) => {
    //         console.log("onAuthStateChanged");
    //         if (!endFirstAuth.value) tasks.value--;
    //         if (user && user.uid) {
    //             user.getIdToken(true).then(async function (idToken) {
    //                 if (timer.value) {
    //                     clearInterval(timer.value);
    //                     timer.value = null;
    //                 }
    //                 timer.value = setInterval(() => {
    //                     user.getIdToken(true).then(function (idToken) {
    //                         changeAuthState({
    //                             token: idToken
    //                         });
    //                         token.value = idToken;
    //                         console.log("firebase トークン更新");
    //                     }).catch(function (error) {
    //                         console.log("firebase トークンの更新エラー:" + error);
    //                     });
    //                 }, 1000 * 60 * 30);
    //                 changeAuthState({
    //                     providerData: user.providerData,
    //                     uid: user.uid,
    //                     displayName: user.displayName,
    //                     name: user.displayName,
    //                     email: user.email,
    //                     photoURL: user.photoURL,
    //                     emailVerified: user.emailVerified,
    //                     token: idToken
    //                 });
    //                 isSignedIn.value = true;
    //                 token.value = idToken;
    //                 //ユーザデータ書き込み 取得
    //                 await getUserData(user);
    //                 gotUserData.value = true;
    //                 console.log("firebase トークン更新");
    //             }).catch(function (error) {
    //                 console.log("firebase トークンの更新エラー:" + error);
    //             });
    //         } else {
    //             changeAuthState(null);
    //             resetAuth();
    //         }
    //     });
    // }

    // NOTE: サンプルでは認証無しでログイン状態にしています
    onAuthStateChanged({
        name: "nexs",
        email: "sample@smail.com",
        image: null,
        token: "sample_token",
    });
    isSignedIn.value = true;

    return {
        logout,
        getUserData,
    };
};
