import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as corsModule from "cors";
const cors = corsModule({ origin: true });

admin.initializeApp();
const db = admin.firestore();


/**
 * Checks the authentication of a header.
 * @param header
 */

const VerifyAuth = async (header: string) => {
  const idToken = header.split("Bearer ")[1];
  const uid = (await admin.auth().verifyIdToken(idToken)).uid;
  const ref = db.collection("admins");
  const admins = (await ref.get()).docs;
  return admins.find(doc => {
    return doc.id === uid;
  });
};

export { admin, functions, cors, VerifyAuth, db };
