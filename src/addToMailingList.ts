import { functions, cors } from './util';
import { ContactsApi, CreateContact } from 'sib-api-v3-typescript';

const apiInstance: any = new ContactsApi();

// Configure API key authorization: api-key
const apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = functions.config().sendinblue.apikey;

const emailRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

export default functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {

    if (request.method !== 'POST') {
      response.status(400).send('Invalid request.');
      return;
    } else if (request.body.email === '') {
      response.status(400).send('Please input an email.');
      return;
    } else if (!emailRegExp.test(request.body.email)) {
      response.status(500).send('Email is invalid.');
      return;
    }

    try {
      const contact = new CreateContact();
      contact.email = request.body.email;

      const res = await apiInstance.createContact(contact);
      console.log(res);

      response.status(200).send('Thanks for subscribing!');
    } catch (error) {
      const { body: { message } } = error.response;
      console.error(message);

      switch (message) {
        case 'Contact already exist':
          response.status(409).send('You\'ve already subscribed.');
        default:
          response.status(502).send(message);
      }
    }
  })
})