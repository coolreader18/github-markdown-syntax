const got = require("got");
const cheerio = require("cheerio");

module.exports = async function GFMSyntax(snippets) {
  let datas = snippets
    .reduce(
      (arr, { code, lang }) => {
        if (!code || !lang)
          throw new Error("Missing code or language for snippet");
        let file = arr.slice(-1)[0];
        let md = `${"`".repeat(10)}${lang}
${code}
${"`".repeat(10)}
`;
        let newFile = file + md;
        if (Buffer.from(newFile).byteLength > 400000) {
          arr.push(md);
        } else {
          arr[arr.length - 1] = newFile;
        }
        return arr;
      },
      [""]
    )
    .map(cur => cur.trim());
  console.log(Buffer.from(datas[0]).byteLength);
  let html = await Promise.all(
    datas.map(cur =>
      got
        .post("https://api.github.com/markdown/raw", {
          body: cur,
          headers: { "Content-Type": "text/plain" }
        })
        .then(r => r.body)
    )
  );
  const $ = cheerio.load(html.join(""));
  return $("body")
    .children()
    .toArray()
    .map($.html);
};
