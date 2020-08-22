import { functions, admin } from "./util"
import { CallableContext } from "firebase-functions/lib/providers/https";

export default functions.https.onCall(async (data: any, context: CallableContext) => {
    const userID = context?.auth?.uid;
    const userEmail = context?.auth?.token?.email;
    if (userID != undefined && /.+@nwplus\.io$/.test(userEmail)) {
        await admin.auth().setCustomUserClaims(userID, { admin: true });
    }
})