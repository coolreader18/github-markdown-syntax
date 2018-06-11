const got = require("got");
const cheerio = require("cheerio");

module.exports = function GFMSyntax(snippets, token) {
  return Promise.resolve()
    .then(() => {
      let datas = snippets
        .reduce(
          (arr, { code, lang }) => {
            if (typeof code !== "string")
              throw new Error(
                "Missing code snippet or code snippet is not a string"
              );
            const file = arr.slice(-1)[0];
            const backticks = "`".repeat(10);
            const md = `${backticks}${lang != null ? lang : ""}
${code}
${backticks}
`;
            const newFile = file + md;
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
      const gotOpts = {
        body: cur,
        headers: {
          "Content-Type": "text/plain"
        }
      };
      if (token) gotOpts.headers.Authorization = `token ${token}`;
      return Promise.all(
        datas.map(cur => {
          return got
            .post("https://api.github.com/markdown/raw", gotOpts)
            .then(r => r.body);
        })
      );
    })
    .then(html => {
      const $ = cheerio.load(html.join(""));
      return $("body")
        .children()
        .toArray()
        .map($.html);
    });
};
