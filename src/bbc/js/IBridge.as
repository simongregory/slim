//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package bbc.js
{
public interface IBridge
{
    function get available():Boolean;
    function addCallback(functionName:String, closure:Function):void;
    function call(method:String, ...args):*;
}
}
