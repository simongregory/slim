//AS3///////////////////////////////////////////////////////////////////////////
//
// Copyright MMXII British Broadcasting Corporation. All Rights Reserved.
//
////////////////////////////////////////////////////////////////////////////////

package bbc.js
{
import flash.external.ExternalInterface;

public class Bridge implements IBridge
{
    public function get available():Boolean
    {
        return ExternalInterface.available
    }

    public function addCallback(method:String, closure:Function):void
    {
        ExternalInterface.addCallback(method, closure)
    }

    public function call(method:String, ...args):*
    {
        args.unshift(method)
        return ExternalInterface.call.apply(null, args)
    }
}
}
