//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package bbc.slim
{
import flash.display.Sprite;

import org.osmf.containers.IMediaContainer;
import org.osmf.containers.MediaContainer;
import org.osmf.events.MediaErrorEvent;
import org.osmf.events.MediaPlayerStateChangeEvent;
import org.osmf.events.TimeEvent;
import org.osmf.media.DefaultMediaFactory;
import org.osmf.media.MediaElement;
import org.osmf.media.MediaPlayer;
import org.osmf.media.URLResource;

import bbc.js.Bridge;
import bbc.js.IBridge;
import flash.display.DisplayObject;

public class Player extends Sprite
{
    public function Player()
    {
        init()
    }

    private var model:MediaElement
    private var view:IMediaContainer
	private var controller:MediaPlayer

    private var page:IBridge

    private function init():void
    {
        controller = new MediaPlayer
        controller.addEventListener(MediaPlayerStateChangeEvent.MEDIA_PLAYER_STATE_CHANGE, onStateChange)
        controller.addEventListener(TimeEvent.CURRENT_TIME_CHANGE, onCurrentTimeChange)

        view = new MediaContainer
        //view.width = 832
        //view.height = 468

		addChild(view as DisplayObject)

        startPageAPI()
    }

    public function startPageAPI():void
    {
        page = new Bridge

        //Current start playback implementation
        page.addCallback('loadMedia', onLoadMedia)

        //Basic playback controls
        page.addCallback('pause', controller.pause)
        page.addCallback('play', controller.play)
        page.addCallback('stop', controller.stop)
        page.addCallback('paused', paused)
        page.addCallback('volume', volume)
        page.addCallback('buffered', buffered)

        //page.addCallback('muted', controller.muted)
        //page.addCallback('currentTime', controller.currentTime)
        //page.addCallback('duration', controller.duration)
        //page.addCallback('width', controller.mediaWidth)
        //page.addCallback('height', controller.mediaHeight)
        //page.addCallback('autoplay', controller.autoplay)

        page.addCallback('src', src)
        page.addCallback('currentSrc', currentSrc)

        page.call('embed._playerLoaded')
        page.call('embed._dispatch', 'foobar')
    }

    private function src(value:String):void
    {
        onLoadMedia(value) //Temporary solution
    }

    private function volume(value:String=''):Number
    {
        return controller.volume
    }

    private function paused():Boolean
    {
        return controller.paused
    }

    private function currentSrc():String
    {
        return 'implement-this'
    }

    private function buffered():Boolean
    {
        return !controller.buffering
    }

    private function onLoadMedia(url:String, pid:String=''):void
    {
        if (model)
        {
            view.removeMediaElement(model)
            model.removeEventListener(MediaErrorEvent.MEDIA_ERROR, onMediaError)
        }

        model = makeMediaElement(url)
        model.addEventListener(MediaErrorEvent.MEDIA_ERROR, onMediaError)

        controller.media = model

        view.addMediaElement(model)
    }

    private function makeMediaElement(url:String):MediaElement
    {
		var resource:URLResource = new URLResource(url)
        var factory:DefaultMediaFactory = new DefaultMediaFactory
        var element:MediaElement = factory.createMediaElement(resource)

        return element
    }

	private function onCurrentTimeChange(event:TimeEvent):void
	{
        page.call('embed._playbackUpdate', controller.currentTime, controller.duration)
        page.call('embed._dispatch', 'foobar')
	}

    private function onStateChange(event:MediaPlayerStateChangeEvent):void
    {
        trace('Player::onStateChange()', event.state)
    }

    private function onMediaError(event:MediaErrorEvent):void
    {
        trace('Player::onMediaError()', event.error.errorID)
    }
}
}
