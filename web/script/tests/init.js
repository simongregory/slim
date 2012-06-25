/**
 * TViPlayer WebApp RequireJS initialisation script.
 * @author Rob Taylor [robert.taylor1@bbc.co.uk]
 * @module tests/init
 *
 * @requires jquery-1
 *
 * @requires tests/embed
 */
require({
    baseUrl: window.PROJECT_STATIC + '/webapp/static-versioned/script',
    paths: {
        "jquery-1": ''
    }
}, [
    'jquery-1'
], function ($) {
    require([
        // Utils Tests
        'tests/embed'
    ]);
});