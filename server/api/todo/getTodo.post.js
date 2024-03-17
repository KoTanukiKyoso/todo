import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";
import {makeResult} from "~/utils/myUtils";

export default defineEventHandler(async (e) => {
    const API_NAME = "getTodo";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {} = body;// item, todoId

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`SELECT \`todo\`.* 
FROM \`todo\` 
 `,//  1 AND \`todo\`.\`todo_id\`=:todoId 
        // {todoId: todoId}
        );
    } catch (e) {
      console.log(e);
      response = await setError(2);
      response.message += ":" + e.message;
      return response;
    }

    

    response.success = true;
    response.data = makeResult(rows);
    return response;
});