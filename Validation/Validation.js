import fs from 'fs';
import path from 'path';
import {logger} from '../logerror/logfile.js';
const DataChitfundfile = 'D:/Webdriverpractise/test/Data/chitfund/login.json';
const Dataflipkartfile = 'D:/Webdriverpractise/test/Data/flipkart/login.json';
const DataHealtcarefile = 'D:/Webdriverpractise/test/Data/Healthcare/login.json';
const DataJamaicafile =  'D:/Webdriverpractise/test/Data/Jamaica/Homepage.json';
// elementidentifiers 

const elementChitfundfile = 'D:/Webdriverpractise/test/pageobjects/elementIdentifiers/chitfund/login.json';
const elementflipkartfile = 'D:/Webdriverpractise/test/pageobjects/elementIdentifiers/flipkart/login.json';
const elementHealtcarefile = 'D:/Webdriverpractise/test/pageobjects/elementIdentifiers/Healthcare/login.json';
const elementJamaica = 'D:/Webdriverpractise/test/pageobjects/elementIdentifiers/Jamaica/Homepage.json';

const masterJSON = [DataChitfundfile, Dataflipkartfile, DataHealtcarefile,DataJamaicafile, elementChitfundfile, elementflipkartfile, elementHealtcarefile, elementJamaica];


class MasterJsonValidate{

    validateJson(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf-8', (err, data) => {
                if (err) {
                    logger.error(`${path.basename(filePath)}: No such file or directory found at path ${filePath}`);
                    reject(new Error(`Error reading JSON file: ${err}`));
                    return;
                }
                try {
                    if (JSON.parse(data)){
                        const value = JSON.parse(data);
                        console.log(`Validation successful for ${filePath}`);
                        resolve(value);
                    }
                    else{
                        reject(new Error("syntax error"))
                        return
                    }
                } catch (err) {
                    logger.error(`${path.basename(filePath)}: ${err}`);
                    reject(new Error(err));
                }
            });
        });
    }
    
    
   async masterdatavalidation(){

        for (let i of masterJSON){
            await this.validateJson(i)
        }

   }

// Constructing total paths using Object.keys()



}

const master = new MasterJsonValidate()

export default master
master.masterdatavalidation();