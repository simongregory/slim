//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package bbc.slim
{
import flash.display.Sprite;
import flash.external.ExternalInterface;

import org.osmf.containers.MediaContainer;
import org.osmf.media.DefaultMediaFactory;
import org.osmf.media.MediaElement;
import org.osmf.media.MediaPlayer;
import org.osmf.media.URLResource;
import org.osmf.events.MediaPlayerStateChangeEvent;
import org.osmf.events.MediaErrorEvent;

import bbc.js.Bridge;
import bbc.js.IBridge;

public class Player extends Sprite
{
    public function Player()
    {
        init()
    }

    private var model:MediaElement
    private var view:MediaContainer
	private var controller:MediaPlayer

    private var page:IBridge

    private function init():void
    {
        controller = new MediaPlayer
        controller.addEventListener(MediaPlayerStateChangeEvent.MEDIA_PLAYER_STATE_CHANGE, onStateChange)

        view = new MediaContainer
        view.width = 832
        view.height = 468

		addChild(view)

        startPageAPI()
    }

    private function makeMediaElement(url:String):MediaElement
    {
		var resource:URLResource = new URLResource(url)
        var factory:DefaultMediaFactory = new DefaultMediaFactory
        var element:MediaElement = factory.createMediaElement(resource)

        return element
    }

    public function startPageAPI():void
    {
        page = new Bridge
        page.addCallback('loadPlaylist', onLoadMedia)
        page.addCallback('pause', controller.pause)
        page.addCallback('play', controller.play)
        page.addCallback('stop', controller.stop)
        page.call('embed._playerLoaded')
    }

    private function onLoadMedia(playlist:String, service:String='', startEpoch:String='0'):void
    {
        if (model)
        {
            view.removeMediaElement(model)
            model.removeEventListener(MediaErrorEvent.MEDIA_ERROR, onMediaError)
        }

        model = makeMediaElement(playlist)
        model.addEventListener(MediaErrorEvent.MEDIA_ERROR, onMediaError)

        //We would like to destroy and re
        controller.media = model

        view.addMediaElement(model)
    }

    private function onStateChange(event:MediaPlayerStateChangeEvent):void
    {
        trace('Player::onStateChange()', event.state)
    }

    private function onMediaError(event:MediaErrorEvent):void
    {
        trace('Player::onMediaError()', event.error.message)
    }
}
}
