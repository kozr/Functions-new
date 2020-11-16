import { functions } from './util';
import fetch from 'node-fetch';

const CMS_BUILD_WEBHOOK_URL = functions.config().amplify.cms

const callAWSWebhook = async (snap: functions.firestore.QueryDocumentSnapshot, deleted: boolean) => {
    console.log(`Hackathon ${snap.id} has been ${deleted ? "deleted" : "created"}`)
    console.log("Triggering a new CMS build..")
    const res = await fetch(CMS_BUILD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({})
    })
    console.log("build webhook called with response:")
    console.log((await res.text()))
}

export const CMSRebuildonCreate = functions.firestore.document("Hackathons/{hackathonId}").onCreate(async (snap) => {
    return callAWSWebhook(snap, false)
})

export const CMSRebuildonDelete = functions.firestore.document("Hackathons/{hackathonId}").onDelete(async (snap) => {
    return callAWSWebhook(snap, true)
})
