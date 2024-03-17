import {apiInit, log, setError} from "~/server/utils/apiConf";
// import {checkPermission} from "~/server/utils/dbUtil";


export default defineEventHandler(async (e) => {
    const API_NAME = "updateUser";
    let init = await apiInit(e);
    if (!init.success) return init;
    let {response, body, con, uid, user} = init.data;
    const {item} = body;

    // let res = await checkPermission(uid, 3);
    // if (!res.success) return res;

    let rows;
    try {
      [rows] = await con.execute(`UPDATE \`user\`
SET \`uid\`=:uid, \`user_name\`=:userName, \`user_state\`=:userState, \`user_email\`=:userEmail 
WHERE 1 AND \`user\`.\`uid\`=:uid_w`,
        {uid_w: item.uid, uid: item.uid, userName: item.userName, userState: item.userState, userEmail: item.userEmail}
        );
    } catch (e) {
      console.log(e);
      response = await setError(2);
      response.message += ":" + e.message;
      return response;
    }

    let content = `ユーザ「${user.name}」(${uid})がユーザ「」()を更新しました。`;
    await log(uid, API_NAME, "", content, {}, false, 0);

    response.success = true;
    response.data = true;
    return response;
});