
import {postApi, saveFile, saveImage} from "~/utils/myUtils";
import Swal from "sweetalert2";
import {useStore} from "~/composables";

export class TodoSet {
todoSetId?: number;
todoSetName: string = "";
todoSetDateTime?: string;

  constructor() {

  }
}


export const useTodoSet = () => {
    let {addMessage, isSignedIn} = useStore();
    let newTodoSet: Ref<TodoSet> = useState(() => new TodoSet());
    let todoSet: Ref<TodoSet[]> = useState(() => []);
    let selectedTodoSet: Ref<TodoSet | null> = useState(() => null);
    let editingTodoSet: Ref<TodoSet | null> = useState(() => null);

    const initTodoSet = async () => {
        clearTodoSet();
        await getTodoSet();
    }

    const clearTodoSet = () => {
        newTodoSet.value = new TodoSet();
        selectedTodoSet.value = null;
        editingTodoSet.value = null;
        todoSet.value = [];
    };

    const editTodoSet = (item: TodoSet) => {
        editingTodoSet.value = {...item};
    };

    const getTodoSet = async () => {
        // if (!isSignedIn.value) return;
        let res = await postApi("todoSet/getTodoSet", {
        });
        console.log(res.data);
        if (!res.success) return res;
        todoSet.value = res.data;
    };

    const addTodoSet = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!newTodoSet.value) return;

        if (!newTodoSet.value.todoSetName) {
            addMessage({
              text: "セット名を入力して下さい。",
            });
            return;
        }

        let res = await postApi("todoSet/addTodoSet", {
            item: newTodoSet.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoセットを追加しました。`,
            risk: 0,
        });
        isActive.value = false;
        newTodoSet.value = new TodoSet();
        await getTodoSet();
    };

    const updateTodoSet = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!editingTodoSet.value) return;
        
        if (!editingTodoSet.value.todoSetName) {
            addMessage({
              text: "セット名を入力して下さい。",
            });
            return;
        }

        let res = await postApi("todoSet/updateTodoSet", {
            item: editingTodoSet.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoセットを更新しました。`,
            risk: 0,
        });
        isActive.value = false;
        await getTodoSet();
    };

    const deleteTodoSet = async (item: TodoSet) => {
        // if (!isSignedIn.value) return;
        let sw = await Swal.fire({
            title: `ToDoセット「」を削除しますか？`,//${item.name} //NOTE: 削除対象が識別できる名前を挿入
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
        let res = await postApi("todoSet/deleteTodoSet", {
            todoSetId: item.todoSetId,//NOTE: ID項目の確認
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoセットを削除しました。`,
            risk: 0,
        });

        await getTodoSet();
    };

    return {
        newTodoSet,
        todoSet,
        selectedTodoSet,
        editingTodoSet,

        initTodoSet,
        getTodoSet,
        addTodoSet,
        editTodoSet,
        updateTodoSet,
        deleteTodoSet,
    };
};
