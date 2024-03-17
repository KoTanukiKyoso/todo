import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";


export default defineEventHandler(async (e) => {
    const API_NAME = "updateTodo";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {item} = body;

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`UPDATE \`todo\`
SET \`todo_set_id\`=:todoSetId, \`todo_name\`=:todoName, \`todo_description\`=:todoDescription, \`todo_importance\`=:todoImportance, \`todo_limit\`=:todoLimit, \`todo_manager\`=:todoManager 
WHERE 1 AND \`todo\`.\`todo_id\`=:todoId_w`,
        {todoId_w: item.todoId, todoSetId: item.todoSetId, todoName: item.todoName, todoDescription: item.todoDescription, todoImportance: item.todoImportance, todoLimit: item.todoLimit, todoManager: item.todoManager}
        );
    } catch (e) {
      console.log(e);
      response = await setError(2);
      response.message += ":" + e.message;
      return response;
    }

    let content = `ユーザ「${user.name}」(${uid})がToDo「」()を更新しました。`;
    await log(uid, API_NAME, "", content, {}, false, 0);

    response.success = true;
    response.data = true;
    return response;
});