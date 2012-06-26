//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package bbc.js
{

//Some of the methods on the HTML 5 Video element API
public interface IHTMLVideo
{
    function play():void;
    function pause():void;
    function paused():Boolean;
    function stop():void;
    function currentTime(value:Number):Number;
    function duration():Number;
    function volume(value:Number):Number;
    function width():uint;
    function height():uint;
    function buffered():Boolean;
    function muted():Boolean; //Need setter for this
    function src(url:String):void;
    function load():void;
    function currentSrc():void;
    function autoplay():Boolean; //Need setter for this
    //function error():void; //What should be returned?
}

}