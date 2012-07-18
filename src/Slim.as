//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII original author or authors. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package
{
import flash.display.MovieClip
import flash.display.StageAlign
import flash.display.StageScaleMode
import flash.system.Security

import bbc.slim.Player

public class Slim extends MovieClip
{
    public function Slim()
    {
        init()
    }

    private function init():void
    {
        Security.allowDomain('*')

        stage.scaleMode = StageScaleMode.NO_SCALE
        stage.align = StageAlign.TOP_LEFT

        addChild(new Player)
    }
}
}
