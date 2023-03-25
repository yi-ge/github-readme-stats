import https from 'https';
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";

// Only test, Please do not abuse the interface, thank you!
const sendData = (json) => {
  const postData = JSON.stringify({ data: json });

  // https.globalAgent.options.rejectUnauthorized = false

  const options = {
    hostname: 'util.yizcore.xyz',
    path: '/top-langs.php',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.write(postData);
  req.end();
}

export default async function handler (_req, res) {
  const username = 'yi-ge'
  const exclude_repo = 'weixin_shop,YYSECRET'
  const topLangs = await fetchTopLanguages(
    username,
    parseArray(exclude_repo),
  );

  sendData(topLangs)
  res.status(200).end('Hello Cron!');
}