import {postApi, saveFile, saveImage} from "~/utils/myUtils";
import Swal from "sweetalert2";
import {useStore} from "~/composables";

export class User {
    uid: string = "";
    userName: string = "";
    userState: number | null = null;
    userEmail: string = "";
    userLastLogin?: string;
    userDateTime?: string;

    constructor() {

    }
}


export const useUser = () => {
    let {addMessage, isSignedIn} = useStore();
    let newUser: Ref<User> = useState(() => new User());
    let user: Ref<User[]> = useState(() => []);
    let selectedUser: Ref<User | null> = useState(() => null);
    let editingUser: Ref<User | null> = useState(() => null);

    const initUser = async () => {
        clearUser();
        await getUser();
    }

    const clearUser = () => {
        newUser.value = new User();
        selectedUser.value = null;
        editingUser.value = null;
        user.value = [];
    };

    const editUser = (item: User) => {
        editingUser.value = {...item};
    };

    const getUser = async () => {
        // if (!isSignedIn.value) return;
        let res = await postApi("user/getUser", {});
        console.log(res.data);
        if (!res.success) return res;
        user.value = res.data;
    };

    const addUser = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!newUser.value) return;

        if (!newUser.value.uid) {
            addMessage({
                text: "uidを入力して下さい。",
            });
            return;
        }
        if (!newUser.value.userName) {
            addMessage({
                text: "ユーザ名を入力して下さい。",
            });
            return;
        }
        if (!newUser.value.userEmail) {
            addMessage({
                text: "メールアドレスを入力して下さい。",
            });
            return;
        }

        let res = await postApi("user/addUser", {
            item: newUser.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ユーザを追加しました。`,
            risk: 0,
        });
        isActive.value = false;
        newUser.value = new User();
        await getUser();
    };

    const updateUser = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!editingUser.value) return;

        if (!editingUser.value.uid) {
            addMessage({
                text: "uidを入力して下さい。",
            });
            return;
        }
        if (!editingUser.value.userName) {
            addMessage({
                text: "ユーザ名を入力して下さい。",
            });
            return;
        }
        if (!editingUser.value.userEmail) {
            addMessage({
                text: "メールアドレスを入力して下さい。",
            });
            return;
        }

        let res = await postApi("user/updateUser", {
            item: editingUser.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ユーザを更新しました。`,
            risk: 0,
        });
        isActive.value = false;
        await getUser();
    };

    const deleteUser = async (item: User) => {
        // if (!isSignedIn.value) return;
        let sw = await Swal.fire({
            title: `ユーザ「」を削除しますか？`,//${item.name} //NOTE: 削除対象が識別できる名前を挿入
            text: "削除すると元に戻せません。",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: "削除する",
        }).then((result) => {
            return !!result.value;
        });
        if (!sw) {
            return;
        }
        let res = await postApi("user/deleteUser", {
            uid: item.uid,//NOTE: ID項目の確認
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ユーザを削除しました。`,
            risk: 0,
        });

        await getUser();
    };

    return {
        newUser,
        user,
        selectedUser,
        editingUser,

        initUser,
        getUser,
        addUser,
        editUser,
        updateUser,
        deleteUser,
    };
};
