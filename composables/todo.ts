
import {postApi, saveFile, saveImage} from "~/utils/myUtils";
import Swal from "sweetalert2";
import {useStore} from "~/composables";

export class Todo {
todoId?: number;
todoSetId: number | null = null;
todoName: string = "";
todoDescription: string = "";
todoImportance: number | null = null;
todoLimit: string = "";
todoManager: string | null = null;
todoDateTime?: string;

  constructor() {

  }
}


export const useTodo = () => {
    let {addMessage, isSignedIn} = useStore();
    let newTodo: Ref<Todo> = useState(() => new Todo());
    let todo: Ref<Todo[]> = useState(() => []);
    let selectedTodo: Ref<Todo | null> = useState(() => null);
    let editingTodo: Ref<Todo | null> = useState(() => null);

    const initTodo = async () => {
        clearTodo();
        await getTodo();
    }

    const clearTodo = () => {
        newTodo.value = new Todo();
        selectedTodo.value = null;
        editingTodo.value = null;
        todo.value = [];
    };

    const editTodo = (item: Todo) => {
        editingTodo.value = {...item};
    };

    const getTodo = async () => {
        // if (!isSignedIn.value) return;
        let res = await postApi("todo/getTodo", {
        });
        console.log(res.data);
        if (!res.success) return res;
        todo.value = res.data;
    };

    const addTodo = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!newTodo.value) return;

        if (newTodo.value.todoSetId !== 0 && !newTodo.value.todoSetId) {
          addMessage({
            text: "セットIDを入力して下さい。",
          });
          return;
        }
        if (!newTodo.value.todoName) {
            addMessage({
              text: "タイトルを入力して下さい。",
            });
            return;
        }
        if (!newTodo.value.todoDescription) {
            addMessage({
              text: "詳細を入力して下さい。",
            });
            return;
        }
        if (!newTodo.value.todoLimit) {
            addMessage({
              text: "期限を入力して下さい。",
            });
            return;
        }

        let res = await postApi("todo/addTodo", {
            item: newTodo.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoを追加しました。`,
            risk: 0,
        });
        isActive.value = false;
        newTodo.value = new Todo();
        await getTodo();
    };

    const updateTodo = async (isActive: Ref<boolean>) => {
        // if (!isSignedIn.value) return;
        if (!editingTodo.value) return;
        
        if (editingTodo.value.todoSetId !== 0 && !editingTodo.value.todoSetId) {
            addMessage({
              text: "セットIDを入力して下さい。",
            });
            return;
        }
        if (!editingTodo.value.todoName) {
            addMessage({
              text: "タイトルを入力して下さい。",
            });
            return;
        }
        if (!editingTodo.value.todoDescription) {
            addMessage({
              text: "詳細を入力して下さい。",
            });
            return;
        }
        if (!editingTodo.value.todoLimit) {
            addMessage({
              text: "期限を入力して下さい。",
            });
            return;
        }

        let res = await postApi("todo/updateTodo", {
            item: editingTodo.value,
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoを更新しました。`,
            risk: 0,
        });
        isActive.value = false;
        await getTodo();
    };

    const deleteTodo = async (item: Todo) => {
        // if (!isSignedIn.value) return;
        let sw = await Swal.fire({
            title: `ToDo「」を削除しますか？`,//${item.name} //NOTE: 削除対象が識別できる名前を挿入
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
        let res = await postApi("todo/deleteTodo", {
            todoId: item.todoId,//NOTE: ID項目の確認
        });
        console.log(res);
        if (!res.success) return res;
        addMessage({
            text: `ToDoを削除しました。`,
            risk: 0,
        });

        await getTodo();
    };

    return {
        newTodo,
        todo,
        selectedTodo,
        editingTodo,

        initTodo,
        getTodo,
        addTodo,
        editTodo,
        updateTodo,
        deleteTodo,
    };
};