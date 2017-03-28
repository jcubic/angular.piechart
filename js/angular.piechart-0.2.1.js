/**@license
 *
 * Angular piechart is a angular component that create svg based piecharts - version 0.2.1
 *
 * Copyright (c) 2016 Jakub Jankiewicz <http://jcubic.pl>
 * Released under the MIT license
 *
 * Date: Tue, 28 Mar 2017 15:07:38 +0000
 */
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
	var template = '<svg viewBox="0 0 32 32" ng-style="{\'background-color\': vm.color}">'+
		'<circle ng-if="part.value" id="circle-{{$index}}" r="16" cx="16" cy="16" '+
		'        ng-repeat="part in vm.parts" ng-attr-transform="rotate({{part.offset}} 50% 50%)" '+
		'        stroke="{{part.color}}" ng-attr-stroke-dasharray="{{part.value}} 100" />'+
		'<g ng-transclude></g>'+
		'</svg>';
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
			return Math.floor(items.reduce(function(count, part) {
				count += part.value;
				if (offset && part.value > 0 && part.value < maxValue) {
					count -= offset;
				}
				return count;
			}, 0));
		}
		var self = this;
		function update() {
			if (self.ngModel.$modelValue) {
				self.parts = self.ngModel.$modelValue.data.slice();
				self.color = self.ngModel.$modelValue.color;
				for (var i=0; i<self.parts.length; ++i) {
					self.parts[i].offset = Math.round((sumValues(self.parts.slice(0, i)) * 360) / 100);
				}
			}
		}
		$scope.$watch(function() { return self.ngModel.$modelValue; }, update, true);
	}
	controller.$inject = ['$scope'];
	return module;
});
