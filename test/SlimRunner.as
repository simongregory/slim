package
{

import flash.display.Sprite;

import org.flexunit.internals.TraceListener;
import org.flexunit.runner.FlexUnitCore;

public class SlimRunner extends Sprite
{
    private var core:FlexUnitCore;

    public function SlimRunner()
    {
        core = new FlexUnitCore();
        core.addListener(new TraceListener());
        core.run(AllTests);
    }

}
}
