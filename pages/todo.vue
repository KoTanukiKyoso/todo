// 「N-DEV」により作成されました。
<script lang="ts">
export default defineComponent({
  layout: false,
  name: "Todo",
});
</script>
<script setup lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import {useStore} from "~/composables";
import {useUser, User} from "~/composables/user";
import {useTodoSet, TodoSet} from "~/composables/todoSet";
import {useTodo, Todo} from "~/composables/todo";

let {endFirstAuth, isSignedIn, addMessage} = useStore();
let {user, newUser, editingUser, initUser, getUser, addUser, editUser, updateUser, deleteUser} = useUser();
let {todoSet, newTodoSet, editingTodoSet, initTodoSet, getTodoSet, addTodoSet, editTodoSet, updateTodoSet, deleteTodoSet} = useTodoSet();
let {todo, newTodo, editingTodo, initTodo, getTodo, addTodo, editTodo, updateTodo, deleteTodo} = useTodo();

onMounted(() => {
  if (!isSignedIn.value) {
    navigateTo("/");
    return;
  }
  init();
});

let initialized = false;
const init = () => {
  if (initialized) return;
  initialized = true;
  initUser();
  initTodoSet();
  initTodo();
};

// User
const userStateItems = [
  {title: "未選択", value: null},
  {title: "正常", value: 1},
  {title: "審査中", value: 2},
  {title: "凍結", value: 3},
];

// TodoSet

// To-do
const todoSetIdItems = computed(() => {
  if (!todoSet.value) return [];
  return todoSet.value.map((item: TodoSet) => {
    return {title: item.todoSetName, value: item.todoSetId};
  });
});
const todoImportanceItems = [
  {title: "未選択", value: null},
  {title: "低", value: 1},
  {title: "中", value: 2},
  {title: "高", value: 3},
];
const TODO_IMPORTANCE = [
  {title: "未選択", value: null, color: "gray"},
  {title: "低", value: 1, color: "green"},
  {title: "中", value: 2, color: "orange"},
  {title: "高", value: 3, color: "red"},
];
const todoManagerItems = computed(() => {
  if (!user.value) return [];
  return user.value.map((item: User) => {
    return {title: item.userName, value: item.uid};
  });
});

</script>
<template>
  <l-page-container max-width="860px">
    <!-- User -->
    <div class="d-flex mt-8">
      <h2>ユーザ一覧</h2>
      <v-spacer/>
      <v-btn icon="mdi-reload" variant="text" @click="getUser"/>
      <v-dialog persistent no-click-animation>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-plus-thick" variant="text"/>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card v-if="newUser" class="pb-4">
            <v-card-title class="text-white pa-4 pb-2 bg-accent">
              <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
              ユーザ追加
            </v-card-title>
            <v-card-item style="max-height: 80vh; overflow-y: auto;">
              <my-input-container label="uid" :showRequire="true">
                <v-text-field v-model.trim='newUser.uid' type='text' :rules="[rules.required, rules.max(255)]"
                              style="max-width: 300px;"/>
              </my-input-container>
              <my-input-container label="ユーザ名" :showRequire="true">
                <v-text-field v-model.trim='newUser.userName' type='text'
                              :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
              </my-input-container>
              <my-input-container label="ステータス" :showRequire="false">
                <v-select v-model="newUser.userState" :items="userStateItems" style="max-width: 200px;"/>
              </my-input-container>
              <my-input-container label="メールアドレス" :showRequire="true">
                <v-text-field v-model.trim='newUser.userEmail' type='email'
                              :rules="[rules.required, rules.max(1000), rules.emailMatch]" style="max-width: 300px;"/>
              </my-input-container>

              <div class="d-flex">
                <v-spacer/>
                <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                       min-width="120" text="閉じる"/>
                <my-btn @click="addUser(isActive)" text="ユーザ作成"/>
              </div>
            </v-card-item>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div>
      <v-table style="width: 100%;" class="mx-4">
        <template #default>
          <thead>
          <tr>
            <th class="px-1">uid</th>
            <th class="px-1">ユーザ名</th>
            <th class="px-1">ステータス</th>
            <th class="px-1">メールアドレス</th>
            <th class="px-1">最終ログイン日時</th>
            <th class="px-1">作成日時</th>

            <th class="px-1">操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item of user">
            <td class="px-1">{{ item.uid }}</td>
            <td class="px-1">{{ item.userName }}</td>
            <td class="px-1">{{ item.userState }}</td>
            <td class="px-1">{{ item.userEmail }}</td>
            <td class="px-1">{{ item.userLastLogin }}</td>
            <td class="px-1">{{ item.userDateTime }}</td>

            <td class='px-1'>
              <v-dialog persistent no-click-animation>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" @click="editUser(item)"/>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card v-if="editingUser" class="pb-4">
                    <v-card-title class="text-white pa-4 pb-2 bg-accent">
                      <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
                      ユーザ更新
                    </v-card-title>
                    <v-card-item style="max-height: 80vh; overflow-y: auto;">
                      <my-input-container label="uid" :showRequire="true">
                        <v-text-field v-model.trim='editingUser.uid' type='text'
                                      :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
                      </my-input-container>
                      <my-input-container label="ユーザ名" :showRequire="true">
                        <v-text-field v-model.trim='editingUser.userName' type='text'
                                      :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
                      </my-input-container>
                      <my-input-container label="ステータス" :showRequire="false">
                        <v-select v-model="editingUser.userState" :items="userStateItems"
                                  style="max-width: 200px;"/>
                      </my-input-container>
                      <my-input-container label="メールアドレス" :showRequire="true">
                        <v-text-field v-model.trim='editingUser.userEmail' type='email'
                                      :rules="[rules.required, rules.max(1000), rules.emailMatch]"
                                      style="max-width: 300px;"/>
                      </my-input-container>

                      <v-card-actions class="px-8">
                        <v-spacer/>
                        <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                               min-width="120" text="閉じる"/>
                        <my-btn @click="updateUser(isActive)" text="ユーザ更新"/>
                      </v-card-actions>
                    </v-card-item>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn icon="mdi-delete" variant="text" @click="deleteUser(item)"/>
            </td>
          </tr>
          </tbody>
        </template>
      </v-table>
    </div>

    <!-- TodoSet -->
    <div class="d-flex mt-16">
      <h2>ToDoセット一覧</h2>
      <v-spacer/>
      <v-btn icon="mdi-reload" variant="text" @click="getTodoSet"/>
      <v-dialog persistent no-click-animation>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-plus-thick" variant="text"/>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card v-if="newTodoSet" class="pb-4">
            <v-card-title class="text-white pa-4 pb-2 bg-accent">
              <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
              ToDoセット追加
            </v-card-title>
            <v-card-item style="max-height: 80vh; overflow-y: auto;">
              <my-input-container label="セット名" :showRequire="true">
                <v-text-field v-model.trim='newTodoSet.todoSetName' type='text'
                              :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
              </my-input-container>

              <div class="d-flex">
                <v-spacer/>
                <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                       min-width="120" text="閉じる"/>
                <my-btn @click="addTodoSet(isActive)" text="ToDoセット作成"/>
              </div>
            </v-card-item>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div>

      <div v-if="todoSet.length === 0">
        <h3 class="text-gray pa-4">
          まだ作成されていません。
        </h3>
      </div>
      <v-row v-else>
        <v-col v-for='item of todoSet' :key='item.todoSetId' cols="12" sm="6" lg="4">
          <v-card :title="item.todoSetName" height="100%" border class="d-flex flex-column">
            <v-spacer/>
            <v-card-actions>
              <v-dialog persistent no-click-animation>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" @click="editTodoSet(item)"/>
                </template>
                <template v-slot:default="{ isActive }">
                  <v-card v-if="editingTodoSet" class="pb-4">
                    <v-card-title class="text-white pa-4 pb-2 bg-accent">
                      <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
                      ToDoセット更新
                    </v-card-title>
                    <v-card-item style="max-height: 80vh; overflow-y: auto;">
                      <my-input-container label="セット名" :showRequire="true">
                        <v-text-field v-model.trim='editingTodoSet.todoSetName' type='text'
                                      :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
                      </my-input-container>

                      <v-card-actions class="px-8">
                        <v-spacer/>
                        <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                               min-width="120" text="閉じる"/>
                        <my-btn @click="updateTodoSet(isActive)" text="ToDoセット更新"/>
                      </v-card-actions>
                    </v-card-item>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn icon="" small color='primary' @click.stop='deleteTodoSet(item)'>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- To-do -->
    <div class="d-flex mt-16">
      <h2>ToDo一覧</h2>
      <v-spacer/>
      <v-btn icon="mdi-reload" variant="text" @click="getTodo"/>
      <v-dialog persistent no-click-animation>
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn v-bind="activatorProps" icon="mdi-plus-thick" variant="text"/>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card v-if="newTodo" class="pb-4">
            <v-card-title class="text-white pa-4 pb-2 bg-accent">
              <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
              ToDo追加
            </v-card-title>
            <v-card-item style="max-height: 80vh; overflow-y: auto;">
              <my-input-container label="セットID" :showRequire="true">
                <v-select v-model="newTodo.todoSetId" :items="todoSetIdItems" style="max-width: 200px;"/>
              </my-input-container>
              <my-input-container label="タイトル" :showRequire="true">
                <v-text-field v-model.trim='newTodo.todoName' type='text'
                              :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
              </my-input-container>
              <my-input-container label="詳細" :showRequire="true">
                <v-textarea v-model="newTodo.todoDescription" rows="2"/>
              </my-input-container>
              <my-input-container label="重要度" :showRequire="false">
                <v-select v-model="newTodo.todoImportance" :items="todoImportanceItems"
                          style="max-width: 200px;"/>
              </my-input-container>
              <my-input-container label="期限" :showRequire="true">
                <vue-date-picker v-model="newTodo.todoLimit" locale="ja" arrow-navigation :clearable="false"
                                 :teleport="true"
                                 auto-apply format="yyyy/MM/dd" model-type="yyyy-MM-dd" :enable-time-picker="false"
                                 week-start="0" style="max-width: 300px;"/>
              </my-input-container>
              <my-input-container label="担当者" :showRequire="false">
                <v-select v-model="newTodo.todoManager" :items="todoManagerItems" style="max-width: 200px;"/>
              </my-input-container>

              <div class="d-flex">
                <v-spacer/>
                <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                       min-width="120" text="閉じる"/>
                <my-btn @click="addTodo(isActive)" text="ToDo作成"/>
              </div>
            </v-card-item>
          </v-card>
        </template>
      </v-dialog>
    </div>
    <div class="mb-16">
      <div v-if="todo.length === 0">
        <h3 class="text-gray pa-4">
          まだ作成されていません。
        </h3>
      </div>
      <template v-else>
        <div v-for="set of todoSet" class="mb-8">
          <h2>{{ set.todoSetName }}</h2>
          <div class="pa-1 border rounded"
               style="background-color: #EEEEEE; min-height: 80px;">
            <v-row>
              <template v-for='item of todo'>
                <v-col v-if="item.todoSetId === set.todoSetId" :key='item.todoId' cols="12" sm="6" lg="4">
                  <v-card :title="item.todoName" height="100%"
                          style="border-left: solid 5px;"
                          :style="{borderColor: item.todoImportance ? TODO_IMPORTANCE[item.todoImportance].color : 'gray'}"
                          class="d-flex flex-column">
                    <template v-slot:text>
                      <my-description :show-over="false" :text="item.todoDescription" max="20"/>
                      <div>期限：{{ item.todoLimit }}</div>
                      <div>担当者：{{ item.todoManager }}</div>
                    </template>
                    <v-spacer/>
                    <v-card-actions>
                      <v-dialog persistent no-click-animation>
                        <template v-slot:activator="{ props: activatorProps }">
                          <v-btn v-bind="activatorProps" icon="mdi-pencil" variant="text" @click="editTodo(item)"/>
                        </template>
                        <template v-slot:default="{ isActive }">
                          <v-card v-if="editingTodo" class="pb-4">
                            <v-card-title class="text-white pa-4 pb-2 bg-accent">
                              <v-btn icon="mdi-arrow-left" variant="text" color="white" @click="isActive.value=false"/>
                              ToDo更新
                            </v-card-title>
                            <v-card-item style="max-height: 80vh; overflow-y: auto;">
                              <my-input-container label="セットID" :showRequire="true">
                                <v-select v-model="editingTodo.todoSetId" :items="todoSetIdItems"
                                          style="max-width: 200px;"/>
                              </my-input-container>
                              <my-input-container label="タイトル" :showRequire="true">
                                <v-text-field v-model.trim='editingTodo.todoName' type='text'
                                              :rules="[rules.required, rules.max(255)]" style="max-width: 300px;"/>
                              </my-input-container>
                              <my-input-container label="詳細" :showRequire="true">
                                <v-textarea v-model="editingTodo.todoDescription" rows="2"/>
                              </my-input-container>
                              <my-input-container label="重要度" :showRequire="false">
                                <v-select v-model="editingTodo.todoImportance" :items="todoImportanceItems"
                                          style="max-width: 200px;"/>
                              </my-input-container>
                              <my-input-container label="期限" :showRequire="true">
                                <vue-date-picker v-model="editingTodo.todoLimit" locale="ja" arrow-navigation
                                                 :clearable="false" :teleport="true"
                                                 auto-apply format="yyyy/MM/dd" model-type="yyyy-MM-dd" :enable-time-picker="false"
                                                 week-start="0" style="max-width: 300px;"/>
                              </my-input-container>
                              <my-input-container label="担当者" :showRequire="false">
                                <v-select v-model="editingTodo.todoManager" :items="todoManagerItems"
                                          style="max-width: 200px;"/>
                              </my-input-container>

                              <v-card-actions class="px-8">
                                <v-spacer/>
                                <v-btn @click="isActive.value=false" color="error" variant="outlined" class="mr-4"
                                       min-width="120" text="閉じる"/>
                                <my-btn @click="updateTodo(isActive)" text="ToDo更新"/>
                              </v-card-actions>
                            </v-card-item>
                          </v-card>
                        </template>
                      </v-dialog>
                      <v-btn icon="" small color='primary' @click.stop='deleteTodo(item)'>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
              </template>
            </v-row>
          </div>
        </div>
      </template>
    </div>

  </l-page-container>
</template>
<style scoped lang="scss">
</style>
