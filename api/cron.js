import axios from 'axios';
import {
  parseArray
} from "../src/common/utils.js";
import { fetchTopLanguages } from "../src/fetchers/top-languages-fetcher.js";

export default async function handler (_req, res) {
  const username = 'yi-ge'
  const exclude_repo = 'weixin_shop,YYSECRET'
  const topLangs = await fetchTopLanguages(
    username,
    parseArray(exclude_repo),
  );

  const { data } = await axios.post('https://util.yizcore.xyz/top-langs.php', {
    data: topLangs
  })
  res.status(200).end(data);
}