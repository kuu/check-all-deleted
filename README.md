# check-all-deleted

## Install
* Install the latest [Node.js](https://nodejs.org) and git
* Clone the repository and install dependencies
```
$ git clone git@github.com:kuu/check-all-deleted.git
$ cd check-all-deleted
$ npm install
```

## Configure
Put a config file in your work directory.
```js
$ mkdir config
$ vi config/default.json
{
  "62480": {
    "key": "API key for 62480",
    "secret": "API secret for 62480"
  },
  "62482": {
    "key": "API key for 62482",
    "secret": "API secret for 62482"
  },
  "62484": {
    "key": "API key for 62484",
    "secret": "API secret for 62484"
  }
}
```

## Run
```
$ npm test
```
