/**
 * @module lazy-tab-view
 * @desc Version of {@link module:tab-view|tab-view} which doesn't render views until they are required.
 * @extends tab-view
 */
define([
    'js-utils/js/tab-view'
], function(TabView) {

    return TabView.extend({

        /**
         * @desc Shows a tab in response to an event from the jQuery plugin. Renders a view if it hasn't been rendered
         * before. Calls the tabActivation method of the view if it is defined.
         * @param {object} e jQuery event object
         * @param {object} ui jQuery UI tabs data
         */
        showTab: function(e, ui) {
            var id = ui.newPanel.attr('id');

            var tabData = _.find(this.tabs, function(tab) {
                return tab.href === id;
            });

            if (!tabData.hasRendered) {
                var tab = tabData.view;

                tab.render();

                this.$('#' + id).append(tab.el);

                tabData.hasRendered = true;
            }

            TabView.prototype.showTab.call(this, e, ui);

            if (tabData.view && tabData.view.tabActivation) {
                tabData.view.tabActivation();
            }
        },

        /**
         * @desc Returns a route representing the current state of the tab view
         * @param {string} [id=this.selectedId] The id of the tab which will be used in the route
         * @returns {string} The route for the lazy-tab-view.
         */
        getSelectedRoute: function(id) {
            id = id || this.selectedId;

            var route = TabView.prototype.getSelectedRoute.apply(this, arguments);

            if (id) {
                var selectedView = this.find(id).view;

                if (selectedView && selectedView.getSelectedRoute) {
                    var additionalRoute = selectedView.getSelectedRoute();

                    if (additionalRoute) {
                        route += '/' + additionalRoute
                    }
                }
            }

            return route;
        }
    });
});