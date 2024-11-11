const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUxvNUlVWFN1VFBMcWJLZW1xNmNjc2x4c2hrR0ZiNGQwaWV6KzBVeWhGaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVWN2ZWRWTzdoYVJUdzdBaXp1OXdyNit0bE9sVjNTbXZyVEJ6Wm5VWE5oTT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3S2ZtV0ZOQjY2aUt1NUhnVEVNT3FGMkNlKzg0YjJDOWlhVytsSGF5Q1dvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyci9OZjV6UG5SNXNheHh6SGFhZUF5ZEdwWUN0RjBoQ0dXb0h1M2NrdVZjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZGQ2ZuRDd6NWxIUkhpTVh5ZSt3Q0xuMjN6RXhtY3lZTmFFdERtZlVjRnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJpTlR2OXdVdGIwRzhZdnRqS2wrYm1ER1hUc0lRak5CUDRQT2pFR3VKbW89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUU9oSWRoMjhyM0QvUmpNR3RTY3JHU2tqQU5sMDZMZFdGZitKREZBSlNtMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRm5JbFlERVBpV2VCTEZMNGM0elpTUHZ5THlrNWp6WlpFM2ptcis3cW5XND0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRIN00yNWNvNXlpQVRSUHRLbWRWa2ZrcExlWFJJKzIrVU1OWVJhRDZ6R3plMkhNT2x0dVlEdDg1K3R1eFRUSzJ3eTN2SGNBbFdRVVRvU1RkUWhZWWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgzLCJhZHZTZWNyZXRLZXkiOiJlWmpXdVZsWi9QZWkzcnNYYmdhQm5WZi9uQVk4UzA2NHZuOVNRQmkwbDFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJOTE93UFRmaVR1Q0F2aDhGT3VhSVJRIiwicGhvbmVJZCI6ImFmNDE1OTc4LThmZTAtNDI3OC1hZGQzLTRhMzUwNTFhZDZmNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSE9rNXA0bm5KNm9wVDJGZFJNakJpTi92ZXM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXhRQTI1em80UmM4aDB1RnhVWTNybEZyemVVPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjY2UEExTTY1IiwibWUiOnsiaWQiOiIyNjM3NzcyOTcxMjg6NDJAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2QuvCdkZbwnZGm8J2RoiDwnZGH8J2RnPCdkZrwnZGW8J2RnPCdkZjwnZGOIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPbUUzSzhCRUo3Sng3a0dHQlVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaSVNXd2VSWXVocEQ0NWp5OFJNTkNIcWtDbXl6OWIzU1BLdVRHdmR6dEYwPSIsImFjY291bnRTaWduYXR1cmUiOiJPR2lVWks4V2w2REdjTjdjdjFQWW9iRDZtbUFlbFJzQjlCcGF4SXd5QTYxTGszUS9CVVMzRGVjVFZhMXJRQ3BpclREeUN0ZzJkNit2QXRjY1M1elRDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoibC9tU3hlN1VsaElHUUF4d0p3aTNHdytyRDdmT2VWMkxUOGNxSGw3alNSS1FyaFNFMDNVc1hibmVXNlJDNFM5c1VhcnZCSmVIVzQ5NWhubUdzMG5OaHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNjM3NzcyOTcxMjg6NDJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1NFbHNIa1dMb2FRK09ZOHZFVERRaDZwQXBzcy9XOTBqeXJreHIzYzdSZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTMyMzA1MSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFJejQifQ==',
    PREFIXE: process.env.PREFIX || ".",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "giyu Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263777297128",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ Mirage",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
