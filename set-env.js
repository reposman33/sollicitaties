const fs = require('fs');
const path = require('path');

// Pad vanaf de root naar je environments map
const targetPath = path.join(__dirname, 'apps/sollicitaties/src/app/environments/firebase.config.ts');

const envConfigFile = `export const firebaseConfig = {
  apiKey: '${process.env.API_KEY || ""}',
  authDomain: '${process.env.AUTH_DOMAIN || ""}',
  projectId: '${process.env.PROJECT_ID || ""}',
  storageBucket: '${process.env.STORAGE_BUCKET || ""}',
  messagingSenderId: '${process.env.MESSAGING_SENDER_ID || ""}',
  appId: '${process.env.APP_ID || ""}'
};
`;

console.log('Genereren van Firebase config...');

// Zorg dat de map bestaat
const dir = path.dirname(targetPath);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

try {
    fs.writeFileSync(targetPath, envConfigFile);
    console.log(`✅ Bestand succesvol aangemaakt op: ${targetPath}`);
} catch (err) {
    console.error('❌ Fout bij aanmaken bestand:', err);
    process.exit(1);
}