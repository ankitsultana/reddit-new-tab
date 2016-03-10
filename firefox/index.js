const preferences = require('sdk/simple-prefs')
const NewTabURL = require('resource:///modules/NewTabURL.jsm').NewTabURL

const newtaboverride = {
  init: function () {
    this.onPrefChange()
  },
  onPrefChange: function () {
    NewTabURL.override('resource://reddit-new-tab/lib/index.html' || 'about:newtab')
  }
}

const main = () => {
  newtaboverride.init()
  preferences.on('url', newtaboverride.onPrefChange)
}

exports.main = main
