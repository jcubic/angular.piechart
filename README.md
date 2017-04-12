# Angular Piechart 0.2.3

Angular piechart is a angular component that create svg based piecharts.

Based on [Lea Verou](http://lea.verou.me/) [Designing Flexible, Maintainable Pie Charts With CSS And SVG](https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/)

[Demo](http://codepen.io/jcubic/pen/xRMGZz)

#installation

to install you can grab the files from the repo or install from

## bower

```
browser install angular.piechart --save
```

## npm

```
npm install angular.piechart --save
```

include the files:

```html
<script src="js/angular.piechart.min.js"></script>
<link href="css/angular.piechart.min.css" rel="stylesheet"/>
```

and you can use this code to initialize the plugin:

```html
<piechart ng-model="vm.data"></piechart>
```

```javascript
function controller() {
	this.data = {
		color: '#1F187A',
		data: [
			{
				color: 'red',
				value: 10 // 10%
			},
			{
				color: 'green',
				value: 20 // 20%
			},
			{
				color: 'blue',
				value: 30 // 30%
			},
			{
				color: 'yellow',
				value: 40 // 40%
			}
		]
	};
}
```

You can also inject stuff into piechart component it will be added after piechart so it will be on top.

For instance to add donat chart you can add another circle:

<piechart ng-model="vm.data">
	<circle r="12" cx="16" cy="16" style="fill: white"/>
</piechart>

# License

Licensed under [MIT](http://opensource.org/licenses/MIT) license

Copyright (c) 2016 [Jakub Jankiewicz](http://jcubic.pl)