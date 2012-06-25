/**
 * Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
 * @author Simon Gregory [simon.gregory@bbc.co.uk]
 * @author Rob Taylor [robert.taylor1@bbc.co.uk]
 * @author Paul Booth [paul.booth@bbc.co.uk]
 */
define([
    'jquery-1',
    'swfobject-2'
], function ($, swfobject) {

    /**
     * @exports embed
     * @requires jquery-1
     * @requires swfobject-2
     */
    var embed = {

       /**
         * A check for the embed has completed and is ready to receive messages.
         * @type {Boolean}
         */
        _isEmbedded: false,

        /**
         * Options for SWFObject
         * @type {Object}
         */
        _options: {
            src: null,
            domId: "player",
            width: 832,
            height: 468,
            flashvars: {
                bitrateCeiling: false,
                flashVersionRequired: "10.1.0",
                fullScreen: true,
                environment: 'live',
                servicelogourl: false,
                volumeLevel: 7,
                volumeMuted: false,
                embedPageURL: document.location,
                protocol: document.location.protocol
            },
            params: {
                SeamlessTabbing: "false",
                allowScriptAccess: "always",
                wmode: "direct",
                bgcolor: "0x000000",
                allowfullscreen: "true"
            },
            attributes: {
                tabindex: "0",
                id: "player",
                name: "player"
            }
        },

        /**
         * Set options for the imp
         * @param {String} option - Selected option to change.
         * @param {Mixed} value - Value being set on the selected option.
         */
        setOption: function (option, value) {
            if (option in this._options && typeof this._options[option] !== 'object') {
                this._options[option] = value;
                return true;
            }
            return false;
        },

        /**
         * Set flash variable for the imp
         * @param {String} option - Selected option to change.
         * @param {Mixed} value - Value being set on the selected option.
         */
        setFlashVar: function (option, value) {
            if (option in this._options.flashvars && typeof this._options.flashvars[option] !== 'object') {
                this._options.flashvars[option] = value;
                return true;
            }
            return false;
        },

        /**
         * URL to the channels playlist
         * @type {String}
         */
        _playlistUrl: '',

        /**
         * Set the playlist url.
         * @param {String} url
         */
        setPlaylistUrl: function (url) {
            this._playlistUrl = url;
        },

        /**
         * Service id for the selected channel.
         * @type {String}
         */
        _serviceId: '',

        /**
         * Set the Service Id
         * @param {String} service - Service name (EG: "bbc_one", "bbc_two")
         */
        setServiceId: function (serviceId) {
            this._serviceId = serviceId;
        },

        /**
         * Set the environment variable.
         * @param {String} environment
         */
        setEnvironment: function (environment) {
            this._options.flashvars.environment = environment;
        },

        /**
         * Setting dom element ID for imp to replace.
         * @param {String} domId - Elements ID.
         */
        setDomId: function (domId) {
            this._options.domId = domId;
            this._options.attributes.id = domId;
            this._options.attributes.name = domId;
        },

        /**
         * Service Logo URL.
         * @param {String} serviceLogoUrl - URL for service logo.
         */
        setServiceLogoUrl: function (serviceLogoUrl) {
            this._options.flashvars.servicelogourl = serviceLogoUrl;
        },

        /**
         * SWF Source location.
         * @return {String} Complete URL to SWF.
         */
        _getSwfSource: function () {
            var swf = {
                protocol: '', //document.location.protocol, // EG: "http:" or "https:"
                domain: './',
                directory: 'swf/',
                filename: 'slim.swf'
            };

            this._options.src = (swf.protocol + swf.domain + swf.directory + swf.filename);

            return this._options.src;
        },

        /**
         * Embed SWFObject onto the page.  Waits for DOM Ready event from RequireJS.
         * @param {Object} options - SWFObject options.  Extends the default set. (See this._options)
         */
        _embed: function (options) {
            options = $.extend(true, this._options, options);
            this._getSwfSource();

            var that = this;

            $(document).ready(function () {
                // Reset parent element size to the Imp's dimensions.
                $('#' + options.domId).parent().css({
                    height: options.height,
                    width: options.width
                });

                swfobject.embedSWF(
                    options.src, // swfUrl (String, required) specifies the URL of your SWF
                    options.domId, // id (String, required) specifies the id of the HTML element you would like to have replaced by your Flash content
                    options.width, // width (String, required) specifies the width of your SWF
                    options.height, // height (String, required) specifies the height of your SWF
                    options.flashvars.flashVersionRequired, // version (String, required) specifies the Flash player version your SWF is published for (format is: "major.minor.release" or "major")
                    false, // "expressInstall.swf", // expressInstallSwfurl (String, optional) specifies the URL of your express install SWF and activates Adobe express install. Please note that express install will only fire once (the first time that it is invoked), that it is only supported by Flash Player 6.0.65 or higher on Win or Mac platforms, and that it requires a minimal SWF size of 310x137px.
                    options.flashvars, // flashvars (Object, optional) specifies your flashvars with name:value pairs
                    options.params, // params (Object, optional) specifies your nested object element params with name:value pairs
                    options.attributes // attributes (Object, optional) specifies your object's attributes with name:value pairs
                );
            });
        },

        /**
         * Run this._embed, and is here to be extended without loosing the essential build instructions.
         * @param  {Object} options - SWFObject options.
         */
        init: function (options) {
            this._embed(options);
        },

        /**
         * Publish an event with IMP prefix.
         * @param  {String} eventName [description]
         * @param  {object} [data] object
         */
        _publish: function (eventName, data) {
            data = data || {};

            window.info = window.info || function () {};
            info('[imp publish]', 'imp:' + eventName, data);

            if (window.glow) {
                window.glow.events.fire(document, 'imp:' + eventName, data);
            }
        },

        /**
         * A private list of callback functions to run when the player has loaded.
         * @type {Array}
         */
        _playerLoadedCallbacks: [],

        /**
         * [onPlayerLoaded description]
         * @param  {Function} callback [description]
         */
        onPlayerLoaded: function (callback) {
            info('onPlayerLoaded called');
            if (typeof callback === 'function') {
                if (this._isEmbedded) {
                    callback();
                } else {
                    this._playerLoadedCallbacks.push(callback);
                }
            }
        },

        /**
         * The embedded player will call this method to signal it is ready.
         */
        _playerLoaded: function () {
            var i = 0;
            window.embed._publish('playerLoaded');
            window.embed._isEmbedded = true;
            window.embed._load();
            window.embed._pushBitrateLimits();

            for (; i < window.embed._playerLoadedCallbacks.length; i++) {
                window.embed._playerLoadedCallbacks[i]();
            }
        },

        /**
         * Get the Embedded player element for calling methods from the SWF.
         * @return {element node}
         */
        _getEmbeddedPlayer: function () {
            return document.getElementById(this._options.domId);
        },

        /**
         * Send toggle playback signal to imp.
         */
        togglePlayback: function () {
            this._getEmbeddedPlayer().togglePlayback();
        },

        /**
         * Push bitrate limits to the IMP when it's ready.
         */
        _pushBitrateLimits: function () {
            var bitrateCeiling = this._options.flashvars.bitrateCeiling;

            if (bitrateCeiling) {
                this._getEmbeddedPlayer().setBitrateCeiling(bitrateCeiling);
            }
        },

        /**
         * Setting the bitrate ceiling.
         * @param {Number} bitrate - Bitrate required.
         */
        setBitrateCeiling: function (bitrate) {
            this._options.flashvars.bitrateCeiling = bitrate;
            if (embed._isEmbedded) {
                this._getEmbeddedPlayer().setBitrateCeiling(bitrate);
            }
        },

        /**
         * IMP changes volume and broadcasts it to the page.
         * @param  {volume} volume [description]
         */
        _changeVolume: function (volume) {
            if (volume > 0) {
                this._publish('volume:changed', {
                    "volume": volume
                });
            } else {
                this._publish('volume:muted');
            }
        },

        _screenReaderAlert: function (message) {
            if (typeof message !== 'string') {
                return false;
            }

            var formattedMessage = $("<h3 role='alert' class='blq-hide'>" + message + "</h3>");

            $('body').append(formattedMessage);

            window.setTimeout(function () {
                formattedMessage.remove();
            }, 2500);
        },

        /**
         * The embedded player will call this method to signal that focus should move to the next component
         */
        _focusAfterFlash: function () {
            this._publish('focusAfterFlash');
        },

        /**
         * The embedded player will call this method to signal that focus should move to the previous component
         */
        _focusBeforeFlash: function () {
            this._publish('focusBeforeFlash');
        },

        /**
         * The embedded player will call this method to signal that we should force a refocus of the SWF
         */
        _refocusFlash: function () {
            var that = this;
            if (this._isEmbedded) {
                this._publish('refocusFlash');
                setTimeout(function () {
                    document.getElementById('focusBeforeFlash').focus();
                    document.getElementById(that._options.domId).focus();
                }, 10);
            }
        },

        /**
         * Instruct the IMPlayer to focus on its first internal component
         */
        focusFirstPlayerComponent: function () {
            if (this._isEmbedded) {
                this._publish('focusFirstComponent');
                this._getEmbeddedPlayer().focus();
                this._getEmbeddedPlayer().focusFirstComponent();
            }
        },

        /**
         * Instruct the IMPlayer to focus on its last internal component
         */
        focusLastPlayerComponent: function () {
            if (this._isEmbedded) {
                this._publish('focusLastComponent');
                this._getEmbeddedPlayer().focus();
                this._getEmbeddedPlayer().focusLastComponent();
            }
        },

        /**
         * Instruct the IMPlayer to rewind to the start of the current programme.
         */
        rewindToStart: function () {
            if (this._isEmbedded) {
                this._publish('jumpToStartOfLiveProgramme');
                this._getEmbeddedPlayer().jumpToStartOfLiveProgramme();
            }
        },

        /**
         * Instruct the IMPlayer to load a specified playlist.
         */
        _load: function () {
            if (this._isEmbedded) {
                this._publish('_load', {
                    'playlistUrl': this._playlistUrl,
                    'serviceId': this._serviceId
                });
                this._getEmbeddedPlayer().loadPlaylist(this._playlistUrl, this._serviceId);
            }
        }
    };

    return window.embed = embed;
});
