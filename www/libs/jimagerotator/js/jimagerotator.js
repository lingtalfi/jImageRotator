(function ($) {


    var pluginName = "imageRotator";


    $[pluginName] = function (element, options) {

        var defaults = {
            /**
             * @param timer - int, the time to wait before fire the next rotation
             */
            timer: '2200',
            /**
             * @param activeClass - string, the css class of the current active element.
             */
            activeClass: 'active'
        };
        var plugin = this;

        plugin.settings = {};

        var $el = $(element);

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            rotate($el);
        };

        function doRotateImages(jNewActive, jOldActive) {
            jNewActive.addClass(plugin.settings.activeClass);
            jOldActive.removeClass(plugin.settings.activeClass);
        }

        function rotateImages(jImages) {
            setTimeout(function () {
                var jActive;
                jImages.each(function () {
                    if ($(this).hasClass(plugin.settings.activeClass)) {
                        jActive = $(this);
                    }
                });
                if (jActive.length) {
                    var jNext = jActive.next();
                    if (jNext.length === 0) {
                        jNext = jImages.first();
                    }
                    doRotateImages(jNext, jActive);
                    rotateImages(jImages);
                }
            }, plugin.settings.timer);
        }

        function rotate(jContainer) {
            var jItems = jContainer.find('>');
            if (jItems.length > 1) {
                jItems.first().addClass(plugin.settings.activeClass);
                rotateImages(jItems);
            }
            else {
                jItems.first().addClass(plugin.settings.activeClass);
            }
        }

        plugin.init();

    };

    $.fn[pluginName] = function (options) {

        return this.each(function () {
            if (undefined == $(this).data(pluginName)) {
                var plugin = new $[pluginName](this, options);
                $(this).data(pluginName, plugin);
            }
        });

    };

})(jQuery);