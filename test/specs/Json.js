import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';

// Function to convert Excel file to JSON
async function convertExcelToJson() {
  try {
    const excelFilePath = path.resolve('C:\\Users\\RY214ZU\\Downloads\\Webdriverpractise\\Webdriverpractise\\test\\Data', 'CreatePurchaseOrder.xlsx');
    const workbook = XLSX.readFile(excelFilePath);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const jsonFilePath = path.resolve('C:\\Users\\RY214ZU\\Downloads\\Webdriverpractise\\Webdriverpractise\\test\\Data', 'output.json');
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    console.log('Excel file has been converted to JSON and saved to output.json');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Execute the function
convertExcelToJson().catch(e => console.error(e));


describe('excel to json convert', () => {
    it('should convert excel to json', async () => {
      await convertExcelToJson();
  
    });
  });