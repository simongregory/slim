//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII original author or authors. All Rights Reserved.
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
