import { functions, admin } from "./util"
import { CallableContext } from "firebase-functions/lib/providers/https";

export default functions.https.onCall(async (data: any, context: CallableContext) => {
    const userID: string | undefined = context?.auth?.uid;
    const userEmail: string | undefined = context?.auth?.token?.email;
    if (userID != undefined && userEmail != undefined && /.+@nwplus\.io$/.test(userEmail)) {
        await admin.auth().setCustomUserClaims(userID, { admin: true });
        return { isAdmin: true };
    }
    return { isAdmin: false };
})