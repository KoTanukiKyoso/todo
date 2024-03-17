import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";
import {makeResult} from "~/utils/myUtils";

export default defineEventHandler(async (e) => {
    const API_NAME = "getUser";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {} = body;// item, uid

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`SELECT \`user\`.* 
FROM \`user\` 
 `,//  1 AND \`user\`.\`uid\`=:uid 
        // {uid: uid}
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