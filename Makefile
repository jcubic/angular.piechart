VERSION=0.1.0
COMPRESS=uglifyjs
SED=sed
CP=cp
RM=rm
CAT=cat
DATE=`date -uR`


ALL: Makefile .$(VERSION) js/angular.piechart-$(VERSION).js js/angular.piechart.js js/angular.piechart-$(VERSION).min.js js/angular.piechart.min.js css/angular.piechart-$(VERSION).css css/angular.piechart.css README.md bower.json package.json

.$(VERSION): Makefile
	touch .$(VERSION)

bower.json: bower.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" bower.in > bower.json

package.json: package.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" package.in > package.json

js/angular.piechart-$(VERSION).js: js/angular.piechart-src.js .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" js/angular.piechart-src.js > js/angular.piechart-$(VERSION).js

js/angular.piechart.js: js/angular.piechart-$(VERSION).js
	$(CP) js/angular.piechart-$(VERSION).js js/angular.piechart.js

js/angular.piechart-$(VERSION).min.js: js/angular.piechart-$(VERSION).js
	$(COMPRESS) -o js/angular.piechart-$(VERSION).min.js --comments --mangle -- js/angular.piechart-$(VERSION).js

js/angular.piechart.min.js: js/angular.piechart-$(VERSION).min.js
	$(CP) js/angular.piechart-$(VERSION).min.js js/angular.piechart.min.js

css/angular.piechart-$(VERSION).css: css/angular.piechart-src.css .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" -e "s/{{DATE}}/$(DATE)/g" css/angular.piechart-src.css > css/angular.piechart-$(VERSION).css

css/angular.piechart.css: css/angular.piechart-$(VERSION).css .$(VERSION)
	$(CP) css/angular.piechart-$(VERSION).css css/angular.piechart.css

README.md: README.in .$(VERSION)
	$(SED) -e "s/{{VER}}/$(VERSION)/g" < README.in > README.md
