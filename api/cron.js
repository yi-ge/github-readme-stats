import axios from 'axios';
import {
  parseArray
} from "../src/common/utils.js";
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";

export default async function handler (_req, res) {
  const username = 'yi-ge'
  const exclude_repo = 'weixin_shop,YYSECRET,JAVA-MyBatis-Test,JAVA-MyBatis-Test,GUISUVPay,fe9-home,bluewhale-web,amis-admin-webpack,todolist'
  const topLangs = await fetchTopLanguages(
    username,
    parseArray(exclude_repo),
  );

  try {
    const { data } = await axios.post('https://util.yizcore.xyz/top-langs.php', {
      data: topLangs
    })
    res.status(200).end(JSON.stringify(data));
  } catch (err) {
    console.log(err)
    res.status(200).end(JSON.stringify({
      err
    }));
  }
}