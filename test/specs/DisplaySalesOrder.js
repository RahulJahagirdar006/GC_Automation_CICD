import axios from 'axios';
import https from 'https';
import assert from 'assert';
import fs from 'fs';


// Function to make a POST request with the CSRF token
async function salesOrderCreationDisplay(getUrl, rawBody, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: true
  });

  try {
    const response = await axios.get(getUrl, rawBody, {
      auth: auth,
      headers:{
        "X-CSRF-Token": "UE-dkk-BlXCOyGayn38LAA==",
        "Content-Type": "application/json",
        //"Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_200=Sg4b-Q4DS8xiQ48FIs3G6Pb7tQuF_hHvhxBJ9p2xU3w%3d; sap-usercontext=sap-client=200"
      },
      httpsAgent: agent,
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error making get request:', error);
    throw error;
  }
}


describe('Postman API Test with Sales order Display', () => {
      
        it('Should Display Order ', async () => {
 // Sales Order API
    const getUrl = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?SAP-Client=200&application=json';
    const auth = {
        username: 'PATILN',
        password: 'Football@123',
    };
    const rawBody = {  
        "SalesOrder" : "296"
        };

  const getResponse = await salesOrderCreationDisplay(getUrl, rawBody, auth);

  console.log(`Sales Order:`, getResponse);

 
  });
});
