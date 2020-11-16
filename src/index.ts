import tagApplicants from "./TagApplicants";
import setAdmin from "./setAdmin"
import addToMailingList from "./addToMailingList";
import {CMSRebuildonCreate, CMSRebuildonDelete} from './CMSRebuild';
/**
 * Export all of our functions so firebase can deploy them
 */
export {
  setAdmin,
  tagApplicants,
  addToMailingList,
  CMSRebuildonCreate,
  CMSRebuildonDelete
};
