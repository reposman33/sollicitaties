const fs = require('fs');
const writeFile = fs.writeFile;

const targetPath = './apps/sollicitaties/src/app/environments/firebase.config.ts';

const envConfigFile = `export const firebaseConfig = {
  apiKey: '${process.env.API_KEY}',
  authDomain: '${process.env.AUTH_DOMAIN}',
  projectId: '${process.env.PROJECT_ID}',
  storageBucket: '${process.env.STORAGE_BUCKET}',
  messagingSenderId: '${process.env.MESSAGING_SENDER_ID}',
  appId: '${process.env.APP_ID}'
};
`;

writeFile(targetPath, envConfigFile, (err: any) => {
  if (err) { console.error(err); }
  console.log(`Firebase config gegenereerd op ${targetPath}`);
});