import axios from 'axios';
import https from 'https';
import assert from 'assert';

async function getCsrfToken(url, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.get(url, {
      auth: auth,
      headers: {
        "X-CSRF-Token": "fetch",
      //  "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_100=vpoxzw76u3Ujp-UOyaUqA3EU70VsNBHvguidleiXvqQ%3d; SAP_SESSIONID_FO4_200=qrzm2CYGRL_ziOKrUaPJPjb7EwVwzRHvj9adleiXvqQ%3d; sap-usercontext=sap-client=200"
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
async function postWithCsrfToken(postUrl, csrfToken, rawBody, auth) {
  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const response = await axios.post(postUrl, rawBody, {
      auth: auth,
      headers: {
        "X-CSRF-Token": csrfToken,
        "Content-Type": "application/json",
        "Authorization": "••••••",
        "Cookie": "SAP_SESSIONID_FO4_100=vpoxzw76u3Ujp-UOyaUqA3EU70VsNBHvguidleiXvqQ%3d; SAP_SESSIONID_FO4_200=qrzm2CYGRL_ziOKrUaPJPjb7EwVwzRHvj9adleiXvqQ%3d; sap-usercontext=sap-client=200"
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

const ordersData = [
    {
        "CompanyCode" : "9210",
        "PurchaseOrderType" : "NB",
        "Language" : "EN",
        "PurchasingOrganization" : "9210",
        "PurchasingGroup" : "U10",
        "DocumentCurrency" : "USD",
        "Supplier" : "17300003",
    
      "to_PurchaseOrderItem": [
        {
        "PurchaseOrderItem" : "30",
        "Material" : "R-302",
        "OrderQuantity" : "3",
        "Plant" : "9210",
        "NetPriceAmount" : "30"       
        }  
      ]
    },
    {
      "CompanyCode" : "1710",
    "PurchaseOrderType" : "NB",
    "Language" : "EN",
    "PurchasingOrganization" : "1710",
    "PurchasingGroup" : "001",
    "DocumentCurrency" : "USD",
    "Supplier" : "0017300001",

  "to_PurchaseOrderItem": [
    {
    "PurchaseOrderItem" : "10",
    "Material" : "R-302",
    "OrderQuantity" : "50",
    "Plant" : "1710",
    "NetPriceAmount" : "10"       
    }  
  ]     
    },
   {
    "CompanyCode" : "1710",
    "PurchaseOrderType" : "NB",
    "Language" : "EN",
    "PurchasingOrganization" : "1710",
    "PurchasingGroup" : "001",
    "DocumentCurrency" : "USD",
    "Supplier" : "0017300001",

  "to_PurchaseOrderItem": [
    {
    "PurchaseOrderItem" : "20",
    "Material" : "R-302",
    "OrderQuantity" : "100",
    "Plant" : "1710",
    "NetPriceAmount" : "20"       
    }  
  ]     
   }
  ];

describe('Postman API Test with Create Purchase Order', () => {
        ordersData.forEach((rawBody, index) => {
        it(`should create order #${index + 1}`, async () => {
    const url = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?SAP-Client=200';
    const postUrl = 'https://EUWDRH205RL01.rsnonp.sbp.eyclienthub.com:44301/sap/opu/odata/sap/API_PURCHASEORDER_PROCESS_SRV/A_PurchaseOrder?SAP-Client=200';
    const auth = {
      username: 'PATILN',
      password: 'Football@123',
    };
    
  const csrfToken = await getCsrfToken(url, auth);

  const postResponse = await postWithCsrfToken(postUrl, csrfToken, rawBody, auth);

  console.log('Retrieved CSRF token:', csrfToken);

  console.log(`Order #${index + 1} created:`, postResponse);
  assert.equal(postResponse.status, 201, 'Response status is not 201');
 
  });
});
});