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
        "Cookie": "SAP_SESSIONID_FO4_100=vpoxzw76u3Ujp-UOyaUqA3EU70VsNBHvguidleiXvqQ%3d; SAP_SESSIONID_FO4_200=dm-vYt3km77b6c8lTQ8uCd92OCd1lBHvmxFJ9p2xU3w%3d; sap-usercontext=sap-client=200"
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
async function getOrderDetailsFromGETApi(getorders, csrfToken, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.post(getorders, {
      auth: auth,
      headers: {
        "X-CSRF-Token": csrfToken,
        "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_100=vpoxzw76u3Ujp-UOyaUqA3EU70VsNBHvguidleiXvqQ%3d; SAP_SESSIONID_FO4_200=dm-vYt3km77b6c8lTQ8uCd92OCd1lBHvmxFJ9p2xU3w%3d; sap-usercontext=sap-client=200"
      },
      httpsAgent: agent,
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('Error making GET request:', error);
    throw error;
  }
}

describe('Postman API Test with get Purchase Order', () => {

        it(`should get order`, async () => {
    const url = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?SAP-Client=200';
    const getorders = "https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder('4500000557')?SAP-Client=200&application=JSON";
    const auth = {
        username: 'PATILN',
        password: 'Football@123',
    };
    
  const csrfToken = await getCsrfToken(url, auth);

  const postResponse = await getOrderDetailsFromGETApi(getorders, csrfToken, auth);

  console.log('Retrieved CSRF token:', csrfToken);

  console.log('Order Details', postResponse);
  

 
  });
});
