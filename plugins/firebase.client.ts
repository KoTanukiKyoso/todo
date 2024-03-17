// 「N-DEV」により作成されました。
import {type FirebaseApp, initializeApp, type FirebaseOptions} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

export default defineNuxtPlugin(() => {//NOTE: Firebase を使用する場合
    let firebaseConfig: FirebaseOptions = {
        apiKey: "Sample",
        authDomain: process.env.NODE_ENV === "development" ? "sample.firebaseapp.com" : "sample.vercel.app",// vercelで FirebaseAuth 使う場合
        projectId: "sample-1234",
        storageBucket: "sample.appspot.com",
        messagingSenderId: "123456789",
        appId: "1:1234567:web:samplesample",
        measurementId: "G-SAMPLE",
    };

    // const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);
    // getAnalytics(firebaseApp);//NOTE: Firebase Analytics を使用する場合
});
