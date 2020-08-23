import { functions } from './util';
import { ContactsApi, CreateContact } from 'sib-api-v3-typescript';

const apiInstance: any = new ContactsApi();

// Configure API key authorization: api-key
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = functions.config().sendinblue.apikey;

const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default functions.https.onRequest(async (request, response) => {

  if (request.method !== 'POST') {
    response.status(500).send('Invalid method.');
    return;
  }

  if (!request.body || !emailRegExp.test(request.body.email)) {
    response.status(400).send('Email is invalid.');
    return;
  }

  try {
    const contact = new CreateContact();
    contact.email = request.body.email;

    const res = await apiInstance.createContact(contact);
    console.log(res);
    
    response.status(200).send('Thanks for subscribing!');
  } catch (error) {
    const { message } = error;
    
    switch (message) {
      case 'Contact already exist':
        response.status(502).send('You\'ve already subscribed');
      default:
        response.status(502).send(message);
    }
    
  } 
  
})