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
       // "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_200=C8Qjha_FUJYeKoLULlE4BLyYaRCCFRHvu3xJ9p2xU3w%3d; sap-usercontext=sap-client=200"
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
async function salesOrderCreation(postUrl, csrfToken, rawBody, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.post(postUrl, rawBody, {
      auth: auth,
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
      //  "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_200=C8Qjha_FUJYeKoLULlE4BLyYaRCCFRHvu3xJ9p2xU3w%3d; sap-usercontext=sap-client=200"
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

const ordersData =JSON.parse(fs.readFileSync('C:\\Users\\RY214ZU\\Downloads\\Webdriverpractise\\Webdriverpractise\\test\\Data\\SalesOrderData.json','utf-8'));

describe('Postman API Test with Sales order Creation', () => {
        ordersData.forEach((rawBody, index) => {
        it(`should create order #${index + 1}`, async () => {
    // Get url for CSRF token        
    const url = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?SAP-Client=200';
    // Create Sales Order API
    const postUrl = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_SALES_ORDER_SRV/A_SalesOrder?SAP-Client=200&application=json';
    const auth = {
        username: 'PATILN',
        password: 'Football@123',
    };
    
  const csrfToken = await getCsrfToken(url, auth);

  const postResponse = await salesOrderCreation(postUrl, csrfToken, rawBody, auth);

  console.log('Retrieved CSRF token:', csrfToken);

  console.log(`Sales Order #${index + 1} created:`, postResponse);

 
  });
});
});