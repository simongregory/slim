/*
  Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
 * @author Simon Gregory [simon.gregory@bbc.co.uk]
 * @author Rob Taylor [robert.taylor1@bbc.co.uk]
 * @author Paul Booth [paul.booth@bbc.co.uk]
*/
define('embed-debug', [
    '../embed',
    'jquery-1',
    'swfobject-2',
], function (embed, $, swfobject) {

    /**
     * @extends embed
     * @requires embed
     * @requires jquery-1
     * @requires swfobject-2
     */
    var embed_debug = {

        /**
         * Overwrite embed init method with this version, centered around development.
         * @param  {Object} options - An object, containing options for SWFObject
         */
        init: function (options) {

            //Live BBC1 HDS stream
            this.setMediaUrl('http://www.bbc.co.uk/mediaselector/playlists/hds/pc/ak/bbc1.f4m');
            this.setServiceId('bbc_one_london');
            this._embed({
                src: this._options.src + '?' + new Date().getTime()
            });
            this._attachClickHandling();
            this._attachKeyHandling();
        },

        /**
         * Attach click events to the A tags on the page.
         */
        _attachClickHandling: function () {
            var that = this,
                hb = '#!';

            $('a').click(function (event, data) {
                var url = $(this).attr('href'),
                    urlDetails;

                if (url.indexOf(hb) > -1) {
                    event.preventDefault();

                    urlDetails = url.substring(url.indexOf(hb) + hb.length, url.length).split('/');

                    switch (urlDetails.shift()) {
                    case 'pause':
                        that._getEmbeddedPlayer().pause();
                        break;
                    case 'play':
                        that._getEmbeddedPlayer().play();
                        break;
                    case 'stop':
                        that._getEmbeddedPlayer().stop();
                        break;
                    case 'load':
                        that._loadMedia(urlDetails)
                        break;
                    case 'rewindToStart':
                        that.rewindToStart();
                        break;
                    default:
                        log('Unknown command: ', urlDetails[0], ', Source: ', url, ', Source Interpreted: ', urlDetails);
                    }
                    return false;
                }
            });
        },

        /**
         * Deduce the base path from the link, we expect this link to be in a conventional format.
         */
        _loadMedia: function(link) {

          var service = link.pop(),
              env = link.shift(),
              path = ''

          switch (env) {
            case 'live':
              path = 'http://www.bbc.co.uk/mediaselector/playlists/hds/pc/ak/';
              break;
            default:
              path = env + '/' + link.join('/');
          }

          path += '/' + service + '.f4m'

          if (this._isEmbedded) {
              this._getEmbeddedPlayer().loadMedia(path, service);
          }
        },

        /**
         * Attach keydown events to the two elements in the page the user can enter and exit the player from using the keyboard.
         */
        _attachKeyHandling: function () {
            var that = this;
            $('#focusBeforeFlash').keydown(function (event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode === 9 && !event.shiftKey) {
                    that.focusFirstPlayerComponent();
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                }
            });

            $('#focusAfterFlash').keydown(function (event) {
                var keyCode = event.keyCode || event.which;
                if (keyCode === 9 && event.shiftKey) {
                    that.focusLastPlayerComponent();
                    event.preventDefault ? event.preventDefault() : event.returnValue = false;
                }
            });
        },

        _playbackUpdate: function(currentTime, duration) {
            var player = this._getEmbeddedPlayer()
            var status = "Player current time: " + currentTime + " duration: " + duration + " paused:" + player.paused() + " volume: " + player.volume()

            document.getElementById("status").innerHTML = status;
        },

        /**
         * The embedded player will call this method to signal that focus should move to the next component
         */
        _focusAfterFlash: function () {
            this._publish('focusAfterFlash');
            setTimeout(function() { document.getElementById('focusAfterFlash').focus(); }, 10);
        },

        /**
         * The embedded player will call this method to signal that focus should move to the previous component
         */
        _focusBeforeFlash: function () {
            this._publish('focusBeforeFlash');
            setTimeout(function() { document.getElementById('focusBeforeFlash').focus(); }, 10);
        }
    };

    return  $.extend(true, embed, embed_debug);
});
