import axios from 'axios';
import { browser } from '@wdio/globals';

async function hitPostmanApiWithBasicAuth() {
  try {
    const url = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_SALESDISTRICT_SRV';
    const method = 'GET';
    const headers = {
      'Content-Type': 'application/json',
    };
    // Basic Auth credentials
    const auth = {
      username: 'PATILN', 
      password: 'Football@123',  
    };

    const response = browser.call(() => {             
      return axios.get(url);
      method: method;  
      headers: headers;
      auth: auth;       
     });         
     console.log('Response Data:', response.data);  
     dataconsole.log('Status Code:', response.status);
 

    //response data
    console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error('Error making API request with basic auth:', error);
  }
}

// Call the function within a WebDriverIO test
describe('Postman API Test with Basic Auth', () => {
  it('should make an API request with basic authentication', async () => {
    await hitPostmanApiWithBasicAuth();
  });
});
