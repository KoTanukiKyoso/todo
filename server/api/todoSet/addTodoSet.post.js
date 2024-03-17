import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";


export default defineEventHandler(async (e) => {
    const API_NAME = "addTodoSet";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {item} = body;

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`INSERT INTO \`todo_set\`
(\`todo_set_name\`) 
VALUES (:todoSetName)`,
        {todoSetName: item.todoSetName}
        );
    } catch (e) {
      console.log(e);
      response = await setError(2);
      response.message += ":" + e.message;
      return response;
    }

    let content = `ユーザ「${user.name}」(${uid})がToDoセット「」()を追加しました。`;
    await log(uid, API_NAME, "", content, {}, false, 0);

    response.success = true;
    response.data = true;
    return response;
});