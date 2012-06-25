package {

import flash.display.Sprite;

import org.osmf.media.MediaPlayerSprite;
import org.osmf.media.URLResource;
import org.osmf.elements.VideoElement;
import org.osmf.media.DefaultMediaFactory;
import org.osmf.media.MediaElement;
import org.osmf.media.MediaPlayer;
import org.osmf.containers.MediaContainer;
import flash.system.Security;
import flash.display.StageScaleMode;
import flash.display.StageAlign;

public class Slim extends Sprite
{

    public function Slim()
    {
        Security.allowDomain('*')

        stage.scaleMode = StageScaleMode.NO_SCALE
        stage.align = StageAlign.TOP_LEFT

        //go()
        goFurther()
    }

    public var playerSprite:MediaPlayerSprite

    public function go():void
    {
        playerSprite = new MediaPlayerSprite()

        var simpleMedia:String = "http://mediapm.edgesuite.net/strobe/content/test/AFaerysTale_sylviaApostol_640_500_short.flv"

        var resource:URLResource = new URLResource(simpleMedia)

        playerSprite.media = new VideoElement(resource)

        addChild(playerSprite)
    }

	public var player:MediaPlayer;
	public var container:MediaContainer;

    public function goFurther():void
    {
        var manifest:String = "http://www.bbc.co.uk/mediaselector/playlists/hds/pc/ak/bbc1.f4m"

        //the pointer to the media
		var resource:URLResource = new URLResource(manifest)

        var mediaFactory:DefaultMediaFactory = new DefaultMediaFactory
        var element:MediaElement = mediaFactory.createMediaElement(resource)

		//the simplified api controller for media
		player = new MediaPlayer(element)

		//the container (sprite) for managing display and layout
		container = new MediaContainer
		container.addMediaElement(element)

        container.width = stage.stageWidth
        container.height = stage.stageHeight

		//Adds the container to the stage
		addChild(container)
    }
}
}