import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

function jsonToArray(jsonData) {
  const headers = [
    "CompanyCode",
    "PurchaseOrderType",
    "Language",
    "PurchasingOrganization",
    "PurchasingGroup",
    "DocumentCurrency",
    "Supplier",
    "PurchaseOrderItem",
    "Material",
    "OrderQuantity",
    "Plant",
    "NetPriceAmount"
  ];
  const arrayData = [headers];

  jsonData.forEach(item => {
    item.to_PurchaseOrderItem.forEach(poItem => {
      const row = [
        item.CompanyCode,
        item.PurchaseOrderType,
        item.Language,
        item.PurchasingOrganization,
        item.PurchasingGroup,
        item.DocumentCurrency,
        item.Supplier,
        poItem.PurchaseOrderItem,
        poItem.Material,
        poItem.OrderQuantity,
        poItem.Plant,
        poItem.NetPriceAmount
      ];
      arrayData.push(row);
    });
  });

  return arrayData;
}

async function convertJsonToXlsx(jsonData, outputFilePath) {
  try {
    // Convert JSON data to an array of arrays
    const arrayData = jsonToArray(jsonData);

    // Convert array data to worksheet
    const ws = XLSX.utils.aoa_to_sheet(arrayData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Write the workbook to file
    XLSX.writeFile(wb, outputFilePath);

    console.log(`JSON data has been converted to XLSX and saved to ${outputFilePath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Sample JSON data
const sampleJsonData = [
  // ... (your JSON data)
];

// Path where the XLSX file will be saved
const outputFilePath = path.resolve('C:\\Users\\RY214ZU\\Downloads\\Webdriverpractise\\Webdriverpractise\\test\\Data', 'PurchaseOrder.xlsx');

// Convert JSON to XLSX
convertJsonToXlsx(sampleJsonData, outputFilePath);

// Test case using WebdriverIO (if needed)
describe('excel to json convert', () => {
  it('should convert excel to json', async () => {
    await convertJsonToXlsx(sampleJsonData, outputFilePath);
  });
});
