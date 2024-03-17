import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";


export default defineEventHandler(async (e) => {
    const API_NAME = "updateTodoSet";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {item} = body;

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`UPDATE \`todo_set\`
SET \`todo_set_name\`=:todoSetName 
WHERE 1 AND \`todo_set\`.\`todo_set_id\`=:todoSetId_w`,
        {todoSetId_w: item.todoSetId, todoSetName: item.todoSetName}
        );
    } catch (e) {
      console.log(e);
      response = await setError(2);
      response.message += ":" + e.message;
      return response;
    }

    let content = `ユーザ「${user.name}」(${uid})がToDoセット「」()を更新しました。`;
    await log(uid, API_NAME, "", content, {}, false, 0);

    response.success = true;
    response.data = true;
    return response;
});