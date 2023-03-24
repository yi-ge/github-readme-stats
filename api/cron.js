import https from 'https';

export default function handler (_req, res) {
  const timestamp = Date.now();
  const options = {
    hostname: 'github-readme-stats-lyart-nine-64.vercel.app',
    path: `/api/top-langs/?username=yi-ge&layout=compact&theme=dark&langs_count=10&hide=javascript,html,css,cmake,shell,tsql,tcl,scss,less,stylus,batchfile,vue&exclude_repo=weixin_shop,YYSECRET&cache=false&timestamp=${timestamp}`,
    method: 'GET'
  };

  const req = https.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on('data', d => {
      process.stdout.write(d);
    });
  });

  req.on('error', error => {
    console.error(error);
  });

  req.end();
  res.status(200).end('Hello Cron!');
}