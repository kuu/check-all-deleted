const fs = require('fs');
const OoyalaApi = require('ooyala-api');
const config = require('config');
const all = require('./all.json');

const input = {
  62480: {
    list: all['62480'],
    api: config['62480']
  },
  62482: {
    list: all['62482'],
    api: config['62482']
  },
  62484: {
    list: all['62484'],
    api: config['62484']
  }
};

report(input);

async function report(obj) {
  try {
    await reportObj(obj);
  } catch (err) {
    console.error(err.stack);
  }
}

async function reportObj(obj) {
  for (const [key, {list, api}] of Object.entries(obj)) {
    const results = await reportList(list, new OoyalaApi(api.key, api.secret));
    const deleted = results.filter(result => Boolean(result));
    console.log(`${key} - total: ${list.length}, deleted: ${deleted.length}`);
    writeResults(key, deleted);
  }
}

function reportList(list, api) {
  return Promise.all(list.map(asset => {
    return reportAsset(asset, api);
  }));
}

function reportAsset(asset, api) {
  return api.get(`/v2/assets/${asset}`)
  .then(() => {
    return null;
  })
  .catch(err => {
    console.log(`${asset} => ${err.message}`);
    if (err.message === 'Response: 404 Not Found') {
      return asset;
    }
    return null;
  });
}

function writeResults(pid, deleted) {
  const date = getDateStr();
  fs.writeFileSync(`${pid}_${date}_deleted.log`, deleted.join('\n'));
}

function getDateStr() {
  const date = new Date();
  return `${date.getFullYear()}-${`00${date.getMonth() + 1}`.slice(-2)}-${`00${date.getDate()}`.slice(-2)}`;
}
