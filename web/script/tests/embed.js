/**
 * Example Tests
 * @author Rob Taylor <robert.taylor1@bbc.co.uk>
 * @module tests/embed
 * @requires utils/_example
 * @requires utils/core
 */
define('tests/embed', [
    'jquery-1',
    'embed'
], function ($, embed) {
    module('Embed');

    test('"Namespaces"', function () {
        equal(typeof embed, 'object', 'Embed is an object');
        equal(typeof window.embed, 'object', 'Window.Embed is an object');
    });

    test('onPlayerLoaded', function () {
        equal(typeof embed.onPlayerLoaded, 'object', 'Embed.onPlayerLoaded is a function');
        equal(typeof window.embed.onPlayerLoaded, 'object', 'Window.Embed.onPlayerLoaded is a function');
    });

    asyncTest('_isEmbedded', function () {

    });

});
