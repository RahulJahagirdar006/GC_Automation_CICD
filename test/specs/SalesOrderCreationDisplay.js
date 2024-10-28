import axios from 'axios';
import https from 'https';
import assert from 'assert';
import fs from 'fs';

async function getCsrfToken(url, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.get(url, {
      auth: auth,
      headers: {
        "X-CSRF-Token": "fetch",
        //"Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_200=1B3Cir5oyPi9AOIbwPiZQosXdkuEdxHvgo9J9p2xU3w%3d; sap-usercontext=sap-client=200"
      },
      httpsAgent: agent,
      withCredentials: true
    });

    const csrfToken = response.headers['x-csrf-token']; 
    return csrfToken;
  } catch (error) {
    console.error('Error retrieving CSRF token:', error);
    throw error;
  }
}
// Function to make a POST request with the CSRF token
async function salesOrderCreationDisplay(getUrl, csrfToken, rawBody, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.get(getUrl, rawBody, {
      auth: auth,
      headers:{
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
       // "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_200=1B3Cir5oyPi9AOIbwPiZQosXdkuEdxHvgo9J9p2xU3w%3d; sap-usercontext=sap-client=200"
      },
      httpsAgent: agent,
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error making POST request:', error);
    throw error;
  }
}


describe('Postman API Test with Sales order Display', () => {
      
        it('Should Display Order ', async () => {
    // Get url for CSRF token        
    const url = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?SAP-Client=200';
    // Sales Order API
    const getUrl = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?SAP-Client=200&application=json';
    const auth = {
        username: 'PATILN',
        password: 'Football@123',
    };
    const rawBody = {  
        "SalesOrder" : "296"
        };
    
  const csrfToken = await getCsrfToken(url, auth);

  const getResponse = await salesOrderCreationDisplay(getUrl, csrfToken, rawBody, auth);

  console.log('Retrieved CSRF token:', csrfToken);

  console.log(`Sales Order:`, getResponse);

 
  });
});
