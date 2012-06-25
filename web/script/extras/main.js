/**
 * Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
 * @author Simon Gregory [simon.gregory@bbc.co.uk]
 */
require({
    "paths": {
        "jquery-1": "http://static.bbci.co.uk/frameworks/jquery/0.1.8/sharedmodules/jquery-1.6.2",
        "swfobject-2": "http://static.int.bbci.co.uk/frameworks/swfobject/0.1.4/sharedmodules/swfobject-2"
    },
    "waitSeconds": 30
}, [
    'embed-debug'
], function (embed) {

    //For iStats DAX compatibility
    ns_pixelUrl = "//sa.bbc.co.uk/bbc/bbc/s?name=iplayer.imp.test.page&prod_name=iplayer&app_name=iplayer",

    //Very simple logging solution
    esc = function(str) {
        return str.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;")
    },

    now = function() {
        return '[' + new Date().toLocaleTimeString().substr(0,8) + '] ';
    },

    send = function(message) {
      console.log(now() + esc(message));
    },

    info = function(args) {
      send(args);
    },

    log = function(args) {
      send(args);
    },

    embed.init();
});
