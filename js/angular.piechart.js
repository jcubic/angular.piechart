/**@license
 *
 * Angular piechart is a angular component that create svg based piecharts - version 0.2.8
 *
 * Copyright (c) 2016 Jakub Jankiewicz <http://jcubic.pl/me>
 * Released under the MIT license
 *
 * Date: Sun, 29 Jul 2018 16:32:10 +0000
 */
/* global exports module define require */
(function (global, factory) {
    'use strict';
    if (typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory(require('angular'));
    } else if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else {
        factory(global.angular);
    }
})(this, function(angular) {
    'use strict';
    var module = angular.module('piechart', []);
    var template;
    // arc based on https://stackoverflow.com/a/18473154/387194
    function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = angleInDegrees * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    function describeArc(x, y, radius, startAngle, endAngle) {
        var start = polarToCartesian(x, y, radius, endAngle);
        var end = polarToCartesian(x, y, radius, startAngle);
        var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        var d = [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
            "L", x, y,
            "L", start.x, start.y,
            "Z"
        ].join(" ");

        return d;
    }

    if (/Edge\/\d.|MSIE/i.test(navigator.userAgent)) {
        template = '<svg viewBox="0 0 32 32" ng-style="{\'background-color\': vm.color}">'+
            '<path id="circle-{{$index}}" ng-attr-d="{{vm.arc(16, 16, 16, 0, part.angle)}}"'+
            '        ng-repeat="part in vm.parts" ng-attr-transform="rotate({{part.offset}} 16 16)"'+
            '        ng-attr-foo="{{part.start + \' \' + part.end}}"' +
            '        fill="{{part.color}}"/>' +
            '<g ng-transclude></g>'+
            '</svg>';
    } else {
        template = '<svg viewBox="0 0 32 32" ng-style="{\'background-color\': vm.color}">'+
            '<circle ng-if="part.value" id="circle-{{$index}}" r="16" cx="16" cy="16" '+
            '        ng-repeat="part in vm.parts" ng-attr-transform="rotate({{part.offset}})" '+
            '        stroke="{{part.color}}" ng-attr-stroke-dasharray="{{part.value}} 100" />'+
            '<g ng-transclude></g>'+
            '</svg>';
    }
    module.component('piechart', {
        template: template,
        require: {
            ngModel: '^ngModel'
        },
        bindings: {
            color: '@'
        },
        transclude: true,
        controller: controller,
        controllerAs: 'vm'
    });
    function controller($scope) {
        var maxValue = 100;
        function sumValues(items, offset) {
            return items.reduce(function(count, part) {
                return count + part.value;
            }, 0);
        }
        var self = this;
        function update() {
            function toDeg(num) {
                return 360 * num / 100;
            }
            if (self.ngModel.$modelValue) {
                self.parts = self.ngModel.$modelValue.data.slice();
                self.color = self.ngModel.$modelValue.color;
                var sum = sumValues(self.parts);
                for (var i = 0; i < self.parts.length; ++i) {
                    self.parts[i].angle = toDeg(self.parts[i].value);
                    self.parts[i].offset = Math.round(toDeg(sumValues(self.parts.slice(0, i))));
                }
            }
        }
        $scope.$watch(function() { return self.ngModel.$modelValue; }, update, true);
        self.arc = describeArc;
    }
    controller.$inject = ['$scope'];
    return module;
});
