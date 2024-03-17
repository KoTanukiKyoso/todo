// 「N-DEV」により作成されました。
<style scoped lang="scss">
.sign-in {
  margin: 0 auto 0;
  max-width: 900px;
  font-size: 34px;
}

@media screen and (max-width: 400px) {
  .sign-in {
    margin: 6px auto 0;
  }
}
</style>
<template>
  <div style="max-width: 600px; background: white; border-radius: 8px;" class="mx-auto pa-8">
    <template v-if="showTitle">
      <div v-if="[0,1].includes(pageType)" class="sign-in">
        <div style="width: 360px;">
          <div style="text-align: start;" class="font-weight-bold">登録/サインイン</div>
          <v-divider color="pink"/>
          <div style="text-align: start;" class="font-family-Oswald">Sign up / in</div>
        </div>
      </div>
      <div v-else-if="pageType===2" class="sign-in">
        <div style="width: 360px;">
          <div style="text-align: start;" class="font-weight-bold">新規登録</div>
          <v-divider color="pink"/>
          <div style="text-align: start;" class="font-family-Oswald">Sign up</div>
        </div>
      </div>
    </template>
    <div class="mt-8">
      <div v-if="pageType===0" class="pt-4">
        <div v-if="hasEmail" class="text-center pb-4">
          <my-btn prepend-icon icon="email" min-width="240" text="メール ログイン" color="#DB4437" @click="pageType=1" variant="elevated"
                  size="large"/>
        </div>
        <div v-if="hasGoogle" class="text-center pb-4">
          <my-btn prepend-icon icon="google" prepend-icon-color="#ea4335" min-width="240" text="Google ログイン" color="undefined" size="large"
                  @click="oauthLogin('google')"/>
        </div>
        <div v-if="hasFacebook" class="text-center pb-4">
          <my-btn prepend-icon icon="facebook" min-width="240" text="Facebook ログイン" color="#3b5998" size="large"
                  @click="oauthLogin('facebook')"/>
        </div>
        <div v-if="hasGitHub" class="text-center pb-4">
          <my-btn prepend-icon icon="github" min-width="240" text="GitHub ログイン" color="black" size="large"
                  @click="oauthLogin('github')"/>
        </div>
        <div v-if="hasApple" class="text-center pb-4">
          <my-btn prepend-icon icon="apple" dark min-width="240" text="Apple Id ログイン" color="#3b5998" size="large"
                  @click="oauthLogin('apple')"/>
        </div>
      </div>
      <div v-else-if="pageType===1" class="pt-4">
        <div class="d-flex justify-center">
          <div>
            <v-text-field :clearable="true" v-model="email" label="メールアドレス" type="email"
                          prepend-inner-icon="mdi-email" style="width: 400px;"
                          :rules="[rules.required, rules.emailMatch]"/>
            <my-password v-model="password" @enter="login(false)" class="mt-4"/>
          </div>
        </div>
        <v-card-actions class="mt-2">
          <v-spacer/>
          <v-btn color="error" variant="outlined" width="140" class="mx-2" @click="pageType=0">戻る</v-btn>
          <v-btn color="primary" variant="flat" width="140" class="mx-2" @click="login">ログイン</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center mt-8">
          <v-btn v-if="canCreate" color="grey" @click="pageType=2">新規登録</v-btn>
          <v-btn variant="text" color="grey" @click="pageType=4">パスワードを忘れた場合</v-btn>
        </v-card-actions>
      </div>
      <template v-else-if="pageType===4">
        <h3 class="text-left">パスワード更新</h3>
        <div class="text-left pt-2">＊パスワード更新後は過去のパスワードは使用できません</div>
        <v-text-field :clearable="true" v-model="email" outlined label="メールアドレス" type="email"
                      prepend-inner-icon="mdi-email" class="mt-8" hide-details/>
        <v-card-actions class="mt-2">
          <v-spacer/>
          <v-btn color="error" variant="outlined" @click="pageType=1" class="mx-2">戻る
          </v-btn>
          <v-btn color="primary" variant="elevated" @click="sendPassResetMail">
            パスワード再設定メール送信
          </v-btn>
        </v-card-actions>
      </template>
      <template v-else-if="pageType===2 && canCreate">
        <v-card-actions class="justify-center">
          <div>
            <v-text-field :clearable="true" v-model="userName" outlined label="ユーザ名" type="text" counter="20"
                          prepend-inner-icon="mdi-card-account-details"
                          :rules="[rules.required]"
                          style="width: 400px;" class="mb-4"/>
            <v-text-field :clearable="true" v-model="email" outlined label="メールアドレス" type="email"
                          prepend-inner-icon="mdi-email"
                          :rules="[rules.required, rules.emailMatch]"
                          style="width: 400px;" class="mb-4"/>
            <my-password v-model="password" @enter="signup"/>
          </div>
        </v-card-actions>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="primary" variant="elevated" width="120" @click="signup">ユーザ登録</v-btn>
        </v-card-actions>
        <v-card-actions class="justify-center">
          <v-btn variant="text" color="grey" @click="pageType=0">ログインはこちら</v-btn>
        </v-card-actions>
      </template>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  layout: false,
  name: "LoginForm",
});
</script>
<script setup>
import {
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GithubAuthProvider, OAuthProvider,
  GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider, sendEmailVerification,
  signInWithRedirect, updateProfile, sendPasswordResetEmail, setPersistence, browserLocalPersistence, getRedirectResult
} from "firebase/auth";
import {rules, isMail} from "~/utils/myUtils";
import {useStore} from "~/composables";
import Swal from 'sweetalert2'

const {isSignedIn, user, addMessage, onAuthStateChanged, emailVerified} = useStore();
const {canCreate, hasEmail, hasFacebook, hasGoogle, hasApple, showTitle, to} = defineProps({
  canCreate: {
    type: Boolean,
    default: true
  },
  hasEmail: {
    type: Boolean,
    default: true
  },
  hasFacebook: {
    type: Boolean,
    default: false
  },
  hasGoogle: {
    type: Boolean,
    default: true
  },
  hasApple: {
    type: Boolean,
    default: false,
  },
  hasGitHub: {
    type: Boolean,
    default: false,
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  to: {
    type: String,
    default: "/"
  }
});

let pageType = ref(0);//0:ログイン 1:メールログイン 2:新規作成 4:パスワードリセット
const errorCodes = {
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
let email = ref("");
let password = ref("");
let userName = ref("");

const signup = () => {
  if (!email.value || !password.value || !userName.value) {
    addMessage({
      text: `ユーザ名，メールアドレス，パスワードを入力してください。`,
    });
    return;
  }
  if (!isMail(email.value)) {
    addMessage({
      text: `正しいメールアドレスを入力してください。`,
    });
    return;
  }

  if (import.meta.env.MODE === "production" && email.value.indexOf("+") >= 0) {
    addMessage({
      text: `メールアドレスに使用できない文字が含まれています。：「+」`,
    });
    return;
  }
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
    const user = userCredential.user;
    updateProfile(auth.currentUser, {
      displayName: userName.value,
    }).then(() => {
      console.log(`update user name success`);
      onAuthStateChanged({
        displayName: userName.value,
      });
    }).catch((error) => {
      const errorCode = error.code;
      let message = error.message;
      console.log(`ユーザ作成に失敗しました。：エラーコード[${errorCode}], ${message}`);
    });
    sendVerify(user);
    navigateTo(to)
  }).catch((error) => {
    const errorCode = error.code;
    let message = error.message;
    if (errorCodes[errorCode]) {
      message = errorCodes[errorCode].message;
    }
    addMessage({
      text: `ユーザ作成に失敗しました。：エラーコード[${errorCode}], ${message}`,
      dismissible: true,
    });
  });
};
const sendVerify = (user = null) => {
  if (!user) {
    const auth = getAuth();
    user = auth.currentUser;
  }
  sendEmailVerification(user).then(() => {
    addMessage({
      text: `確認メールを送信しました、メールが届かない場合は迷惑メールフォルダをご確認ください。`,
      risk: 0,
      dismissible: true,
    });
  });
};
const login = (force = true) => {
  if (!email.value || !password.value) {
    if (force) {
      addMessage({
        text: `ユーザ名，メールアドレス，パスワードを入力してください。`,
        risk: 3,
      });
    }
    return;
  }
  if (!isMail(email.value)) {
    if (force) {
      addMessage({
        text: `メールアドレスの形式が不正です。`,
        risk: 3,
      });
    }
    return;
  }
  const auth = getAuth();
  setPersistence(auth, browserLocalPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email.value, password.value).then((userCredential) => {
        const user = userCredential.user;
        addMessage({
          text: `ログインしました。`,
          risk: 0
        });
        navigateTo(to);
      }).catch(async (error) => {
        const errorCode = error.code;
        console.log(errorCode);
        let message = error.message;
        if (errorCode === "auth/user-not-found") {
          let res = await Swal.fire({
            title: "ユーザが登録されておりません",
            html: "新規登録しますか？",
            icon: "question",//"success", "error", "warning", "info" or "question"
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "移動する"
          }).then((result) => {
            return !!result.value;
          });
          if (res) {
            pageType.value = 2;
          }
          return;
        }
        if (errorCodes[errorCode]) {
          message = errorCodes[errorCode].message;
        }
        addMessage({
          text: `ログインに失敗しました。：エラーコード[${errorCode}]，${message}`,
          // dismissible: true
        });
      });
    }).catch((error) => {
    const errorCode = error.code;
    const message = error.message;
    console.log(`${errorCode}:${message}`);
  });
};
const oauthLogin = (type) => {
  const auth = getAuth();
  auth.languageCode = 'ja';
  let provider;
  setPersistence(auth, browserLocalPersistence).then(() => {
    if (type === "google") {
      provider = new GoogleAuthProvider();
    } else if (type === "facebook") {
      provider = new FacebookAuthProvider();
    } else if (type === "twitter") {
      provider = new TwitterAuthProvider();
      provider.setCustomParameters({
        'lang': 'ja'
      });
    } else if (type === "github") {
      provider = new GithubAuthProvider();
    } else if (type === "apple") {
      provider = new OAuthProvider('apple.com');
      provider.setCustomParameters({
        locale: 'ja'
      });
    } else {
      return;
    }
    return signInWithRedirect(auth, provider).then((result) => {
      addMessage({
        text: `ログインしました。`,
        risk: 0
      });
      navigateTo(to);
    }).catch((error) => {
      const errorCode = error.code;
      let message = error.message;
      if (errorCodes[errorCode]) {
        message = errorCodes[errorCode].message;
      }
      addMessage({
        text: `ログインに失敗しました。：エラーコード[${errorCode}], ${message}`
      });
    });
  }).catch((error) => {
    const errorCode = error.code;
    const message = error.message;
    console.log(`${errorCode}:${message}`);
  });
};
const sendPassResetMail = () => {
  if (!email.value) {
    addMessage({
      text: `アカウントのメールアドレスを入力してください。`,
    });
    return;
  }
  if (!isMail(email.value)) {
    addMessage({
      text: `正しいメールアドレスを入力してください。`,
    });
    return;
  }
  const auth = getAuth();
  sendPasswordResetEmail(auth, email.value).then(() => {
    addMessage({
      text: `「${email.value}」に再設定メールを送信しました、メールが届かない場合は迷惑メールフォルダをご確認ください。`,
      risk: 0,
      dismissible: true,
    });
    email.value = "";
    pageType.value = 0;
  }).catch((error) => {
    const errorCode = error.code;
    const message = error.message;
    addMessage({
      text: `メール送信に失敗しました。：エラーコード[${errorCode}]，${message}`,
      dismissible: true
    });
  });
};

watch(isSignedIn, async (now) => {
  if (now && emailVerified()) {
    await navigateTo(to);
  }
});

onMounted(async () => {
  const auth = getAuth();
  getRedirectResult(auth).then(async (result) => {
    // console.log("getRedirectResult", result);
    if (result && result.operationType === "signIn" && result.user && result.user.uid) {
      await navigateTo(to);
    }
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // console.log(`${errorCode}:${errorMessage}`);
    if (FirebaseErrorCodes[errorCode]) {
      addMessage({
        text: FirebaseErrorCodes[errorCode].message,
        dismissible: false,
      });
    } else {
      addMessage({
        text: `ログインに失敗しました。：エラーコード[${errorCode}], ${errorMessage}`,
        dismissible: false,
      });
    }
  });

  if (isSignedIn.value && emailVerified()) {
    await navigateTo(to);
  }
});
</script>
