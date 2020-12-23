import { db, functions, admin } from "./util";

const update = async (field: string, num: number) => {
  const offset = admin.firestore.FieldValue.increment(num);
  const HACKATHONS = "Hackathons";
  const HACKATHON_ID = "nwHacks2021";
  switch (field) {
    case "firstTimeHackers":
      console.log(`${num} firstTimeHackers`);
      return db
        .collection(HACKATHONS)
        .doc(HACKATHON_ID)
        .update({ "Statistics.firstTimeHackers.count": offset });
    case "femaleApplicants":
      console.log(`${num} femaleApplicants`);
      return db
        .collection(HACKATHONS)
        .doc(HACKATHON_ID)
        .update({ "Statistics.femaleApplicants.count": offset });
    case "applicants":
      console.log(`${num} applicants`);
      return db
        .collection(HACKATHONS)
        .doc(HACKATHON_ID)
        .update({ "Statistics.applicants.count": offset });
    default:
      return;
  }
};

export const updateStats = functions.firestore
  .document("/Hackathons/nwHacks2021/Applicants/{applicants}")
  .onWrite(async (change) => {
    const {
      basicInfo: {
        hackathonsAttended: updatedHackathonAttended,
        gender: updatedGender,
      }
    }: any = change.after.data();
    if (!change.before.exists && change.after.exists) {
      // New applicants
      if (updatedHackathonAttended === 0) await update("firstTimeHackers", 1);
      if (updatedGender === "female") await update("femaleApplicants", 1);
      await update("applicants", 1);
    } else if (change.before.exists && change.after.exists) {
      // Applicant changing their stats
      const {
        basicInfo: { hackathonsAttended, gender },
      }: any = change.before.data();
      if (hackathonsAttended === 0 && updatedHackathonAttended !== 0)
        await update("firstTimeHackers", -1);
      else if (hackathonsAttended !== 0 && updatedHackathonAttended === 0)
        await update("firstTimeHackers", 1);
      if (gender === "female" && updatedGender !== "female")
        await update("femaleApplicants", -1);
      else if (gender !== "female" && updatedGender === "female")
        await update("femaleApplicants", 1);
    }
  });
