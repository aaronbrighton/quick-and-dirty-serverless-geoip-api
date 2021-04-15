#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { QuickAndDirtyServerlessGeoipApiStack } from '../lib/quick-and-dirty-serverless-geoip-api-stack';

import * as os from 'os';
import * as path from 'path';
import * as https from 'https';
import * as fs from 'fs';
import * as decompress from 'decompress';

const app = new cdk.App();

// Generate a YYYYMMDD date stamp to use in the filename of the temp downloaded MaxMind GeoLite2 City database
const dateStamp = new Date().getFullYear() + // Year
                    ("0" + (new Date().getMonth() + 1)).slice(-2) + // Month
                    ("0" + new Date().getDate()).slice(-2); // Day
const tempCityDatabaseDownloadFileName = `${fs.mkdtempSync(path.join(os.tmpdir(), 'qdsgeoipapi-'))}/GeoLite2-City_${dateStamp}.tar.gz`;

// Download the MaxMind GeoLite2 City database
const tempCityDatabaseDownloadFile = fs.createWriteStream(tempCityDatabaseDownloadFileName);
console.log(`Retrieving compressed MaxMind GeoLite2 City database to ${tempCityDatabaseDownloadFileName} ...`);
https.get(`https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=${app.node.tryGetContext('maxMindLicenseKey')}&suffix=tar.gz`, function(response) {
    response.pipe(tempCityDatabaseDownloadFile);
});

tempCityDatabaseDownloadFile.on('finish', () => {

  // Extract the downloaded MaxMind GeoLite2 City database
  console.log(`Extracting MaxMind GeoLite2 City database to ../lambda/GeoLite2-City.mmdb ...`);
  decompress(tempCityDatabaseDownloadFileName, path.join(__dirname, '../lambda'), {
      filter: file => path.extname(file.path) == '.mmdb',
      strip: 1
  }).then(files => {

      // Now that we've retrieved, extracted, and placed the MaxMind GeoLite2 City database into our Lambda function directory
      // We can now synth/deploy our apps
      new QuickAndDirtyServerlessGeoipApiStack(app, 'QuickAndDirtyServerlessGeoipApiStack');

  });

})

