import { functions, admin } from "./util"

export default functions.auth.user().onCreate(async (user: any) => {
    if (/.+@nwplus\.io$/.test(user.email)) {
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    }
})