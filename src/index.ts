import tagApplicants from "./TagApplicants";
import setAdmin from "./setAdmin"
import addToMailingList from "./addToMailingList";
import {updateStats} from './updateStats';
import { CMSRebuildonCreate, CMSRebuildonDelete } from './CMSRebuild';
/**
 * Export all of our functions so firebase can deploy them
 */
export {
  setAdmin,
  tagApplicants,
  addToMailingList,
  updateStats,
  CMSRebuildonCreate,
  CMSRebuildonDelete,
};
