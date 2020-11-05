const fs = require('fs');

const saveToJSON = (fileName, data) => {
  fs.writeFile(`./db/${fileName}.json`, `${data}`, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('✅ data scrapped ✅');
  });
};

module.exports = saveToJSON;
