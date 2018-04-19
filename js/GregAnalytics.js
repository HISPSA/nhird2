
/*
 * 
 * Author: Gregory Rowles [greg.rowles@gmail.com]
 * Creation Date: 2015-04-30
 */

  function legendtoSVG(LegArr,sTitle,iGrowthSentiment,currentLayerOpacity,bTransparent){

	var iRect = 18; // 30 for circles
	var iTxt = 33; // 36 for circles
	var iRowHeight = 18; // 20 for circles

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", ( ((g_dxName.length * 6) < 140) ? 140 : (g_dxName.length * 6)) + 'px');
	svgElement.setAttribute("height", (10 + ((LegArr.length +1) * iRowHeight)) + 'px');
	svgElement.setAttribute("onclick", "javascript: this.childNodes[0].childNodes[0].style.opacity = ( (this.childNodes[0].childNodes[0].style.opacity == 1) ? this.childNodes[0].childNodes[0].style.opacity = 0 : this.childNodes[0].childNodes[0].style.opacity = 1);g_bLegendOnMapTransparent=((g_bLegendOnMapTransparent)?0:1)");

	// BOUNDING BG BOX
	var svgGroupBox;
	svgGroupBox = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroupBox);

		var rectElement;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectElement.setAttribute("x", 0);
		rectElement.setAttribute("y", 0);
		rectElement.setAttribute("rx", 4); //rounded x axis borders
		rectElement.setAttribute("ry", 4); //rounded y axis borders
		rectElement.setAttribute("style", "fill:rgb(255, 255, 255);opacity:" + ((bTransparent)?0:1) + ";");
		rectElement.setAttribute("width", ( ((g_dxName.length * 6) < 140) ? 140 : (g_dxName.length * 6)) + 'px');
		rectElement.setAttribute("height", (10 + ((LegArr.length +1) * iRowHeight)) + 'px');
		svgGroupBox.appendChild(rectElement);

	// HEADER TITLE ROW
	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	var xLabel;
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.textContent = (sTitle);
	xLabel.setAttribute("x", 4);
	xLabel.setAttribute("y", 16);
	xLabel.setAttribute("style", "stroke: none; font-size:13px;font-weight:400;font-family:Roboto,sans-serif;");
	svgGroup.appendChild(xLabel);

	for (var i = 0; i < LegArr.length; i++) {

		var iFrom = LegArr[i].min;
		var iTo = LegArr[i].max;
		var myBg = LegArr[i].col;
		var iOpac =  (LegArr[i].min / LegArr[LegArr.length-1].max);

		if (iGrowthSentiment == -1){
			var sCol = ((iOpac >= 0.85) ? '#FFFFFF' : '#101010');
		} else {
			var sCol = ((iOpac >= 0.75) ? '#101010' : ((iOpac <= 0.1) ? '#FFFFFF' : '#101010'));
		}

		// BACKGROUND COLOR BLOCK
		var svgGroup;
		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgGroup.setAttribute("stroke-linecap", "square");
		svgElement.appendChild(svgGroup);

		var rectElement;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		//rectElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		//rectElement.setAttribute("cx", "12");
		//rectElement.setAttribute("cy", iRect);
		//rectElement.setAttribute("r", 9);
		rectElement.setAttribute("x", "6");
		rectElement.setAttribute("y", (4+iRect));
		rectElement.setAttribute("style", "fill:" + myBg + ";opacity:" + currentLayerOpacity + ";stroke:#fff;stroke-width:1;");
		rectElement.setAttribute("width", 18);
		rectElement.setAttribute("height", 18);
		svgGroup.appendChild(rectElement);

		// FROM value
		var svgGroup;
		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgGroup.setAttribute("stroke-linecap", "square");
		svgElement.appendChild(svgGroup);

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.textContent = (((parseFloat(iFrom) < 0) ? '0 ' : parseFloat(iFrom).toFixed(2).replace('.00','')));
		xLabel.setAttribute("x", 39);
		xLabel.setAttribute("y", (2+iTxt));
		xLabel.setAttribute("style", "stroke: none; font-size: 11px;font-weight:400;font-family:Roboto,sans-serif;");
		svgGroup.appendChild(xLabel);

		// HIPHEN BLOCK
		var svgGroup;
		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgGroup.setAttribute("stroke-linecap", "square");
		svgElement.appendChild(svgGroup);

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.textContent = (' - ');
		xLabel.setAttribute("x", 79);
		xLabel.setAttribute("y", (2+iTxt));
		xLabel.setAttribute("style", "stroke: none; font-size: 12px;font-weight:400;font-family:Roboto,sans-serif;");
		svgGroup.appendChild(xLabel);

		// TO value
		var svgGroup;
		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgGroup.setAttribute("stroke-linecap", "square");
		svgElement.appendChild(svgGroup);

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.textContent = ((parseFloat(iTo) != '') ? parseFloat(iTo).toFixed(2).replace('.00','') : '');
		xLabel.setAttribute("x", 89);
		xLabel.setAttribute("y", (2+iTxt));
		xLabel.setAttribute("style", "stroke: none; font-size: 11px;font-weight:400;font-family:Roboto,sans-serif;");
		svgGroup.appendChild(xLabel);

		iRect += iRowHeight;
		iTxt += iRowHeight;

	}

	return (svgElement.outerHTML);

  }

  function getSentimentPolarityChart(destinationID,w,h,stDev,dblValueToPlot,dblMeanMidPoint,dblTargetToPlot,iGrowthSentiment) {

	var dblRangeMin;
	var dblRangeMax;
	var dblRangeSpread;
	var dblValueToPlotX;
	var dblTargetToPlotX;
	var dblWunit;
	var GROWTH_SENTIMENT_LEGEND_SCHEME;
	var ArrCols;

	dblRangeMin = (dblMeanMidPoint - (stDev*4));
	dblRangeMax = (dblMeanMidPoint + (stDev*4));

	if (dblRangeMin >= 0){
		dblRangeSpread = (dblRangeMax - dblRangeMin);
	}
	else{
		dblRangeSpread = ((dblRangeMin*-1) + dblRangeMax);
	}

	dblWunit = (w/dblRangeSpread);
	dblValueToPlotX = (dblValueToPlot - dblRangeMin);
	dblTargetToPlotX = (dblTargetToPlot - dblRangeMin);

	dblValueToPlotX = ((dblValueToPlotX) * dblWunit);
	dblTargetToPlotX = ((dblTargetToPlotX) * dblWunit);

	switch (iGrowthSentiment) {
		case -1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#007324;#00BF33;#7AFF52;#F5F5F5;#F5F5F5;#FFC552;#FF4D00;#C70000";
			break;
		case 1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#C70000;#FF4D00;#FFC552;#F5F5F5;#F5F5F5;#7AFF52;#00BF33;#007324";
			break;
		case 0:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#000D59;#2949FF;#8FA0FF;#F5F5F5;#F5F5F5;#8FA0FF;#2949FF;#0011FF";
			break;
	}

	ArrCols = GROWTH_SENTIMENT_LEGEND_SCHEME.split(";");
	
	//console.log('dblRangeMin: ' + dblRangeMin + '; dblRangeMax: ' + dblRangeMax + '; dblRangeSpread: ' + dblRangeSpread + '(' + dblWunit + '); dblMeanMidPoint: ' + dblMeanMidPoint + '; dblValueToPlotX: ' + dblValueToPlotX + '(' + dblValueToPlot + '); dblTargetToPlotX: '  + dblTargetToPlotX + '(' + dblTargetToPlot + ')');

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.width = w;
	svgElement.height = h;
	
	if (destinationID.length){
		document.getElementById(destinationID).appendChild(svgElement); 
	}

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = w;
	svgGroup.height = h;
	svgElement.appendChild(svgGroup);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", "0");
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[0] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", (w/8));
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[1] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", ((w/8) *2));
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[2] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", ((w/8) *3));
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[3] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", ((w/8) *4));
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[4] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rectElement.setAttribute("x", (((w/8) *5)));
	rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + ArrCols[5] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", (((w/8) *6)));
    rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + ArrCols[6] + ";opacity:0.45;");
	rectElement.setAttribute("width",(w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", (((w/8) *7)));
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "fill:" + ArrCols[7] + ";opacity:0.45;");
	rectElement.setAttribute("width", (w/8));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rectElement.setAttribute("x", ((w/8) *4)-1);
	rectElement.setAttribute("y", "0");
	rectElement.setAttribute("fill", "#000000");
	rectElement.setAttribute("style", "opacity: 0.75;");
	rectElement.setAttribute("width", "3");
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "Mean: " + dblMeanMidPoint;
	rectElement.appendChild(title);


	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = w;
	svgGroup.height = h;
	svgElement.appendChild(svgGroup);

	/* Create 'range zone' block  */
	/*
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    symbol.setAttribute("x", "100");
    symbol.setAttribute("y", (h/5));
    symbol.setAttribute("style", "fill: #2C6DDE; opacity: 0.4;");
	symbol.setAttribute("width", "120");
	symbol.setAttribute("height", (h*2/3));
    symbol.setAttribute("rx", "2");
    symbol.setAttribute("ry", "2");
	svgGroup.appendChild(symbol);
	*/

	/* Create 'circle' symbol */
/*	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    symbol.setAttribute("cx", dblValueToPlotX+0.5);
    symbol.setAttribute("cy", (h/2));
    symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#FFF200;opacity: 0.75;");
	symbol.setAttribute("r", (h/3));
	svgGroup.appendChild(symbol);
*/

	/* Create 'triangle' symbol */
	if (dblTargetToPlot.length != 0){

		var symbol;
		var title;
		var svgGroup;

		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgElement.appendChild(svgGroup);

		symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
		symbol.setAttribute("transform", "translate(" + (dblTargetToPlotX) + "," + ((h/2)-1) + ")");
		symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 1;");
		symbol.setAttribute("d", "M0,-" + (h/4) + "L-" + (h/4) + "," + ((h/4)+1) + " " + ((h/4)+1) + "," + ((h/4)+1) + "Z");
		svgGroup.appendChild(symbol);

		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = "my triangle";
		symbol.appendChild(title);
	}

	/* Create upside-down 'triangle' symbol */
/*	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
    symbol.setAttribute("transform", "translate(" + (dblValueToPlotX+1) + "," + ((h/2)+1) + ")");
    symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 0.9;");
	symbol.setAttribute("d", "M0," + (h/4) + "L" + (h/4) + ",-" + ((h/4)+1) + " -" + ((h/4)+1) + ",-" + ((h/4)+1) + "Z");
	svgGroup.appendChild(symbol);
*/

	/* Create 'diamond' symbol */
	var svgGroup;
	var symbol;
	var title;

	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	symbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    symbol.setAttribute("x", (dblValueToPlotX - (h/4)));
    symbol.setAttribute("y", (h/100) + (h/4));
    symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#00A6F2;opacity: 0.9;");
	symbol.setAttribute("transform", "rotate(45, " + (dblValueToPlotX ) + ", " + (h/2) + ")");
	symbol.setAttribute("width", (h/2));
	symbol.setAttribute("height", (h/2));
	svgGroup.appendChild(symbol);

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "my diamond";
	symbol.appendChild(title);
	
	if (destinationID.length == 0){
		return (svgElement.innerHTML);
	}

 }

  function getElasticSentimentPolarityChart(destinationID,w,h,stDev,dblValueToPlot,dblMeanMidPoint,dblTargetToPlot,iGrowthSentiment) {

	var dblRangeMin;
	var dblRangeMax;
	var iMinDev;
	var iMaxDev;
	var iRangeDev;
	var dblRangeSpread;
	var dblValueToPlotX;
	var dblMeanToPlotX;
	var dblTargetToPlotX;
	var dblWunit;
	var GROWTH_SENTIMENT_LEGEND_SCHEME;
	var ArrCols;
	var xIncr = 0;

	if ((dblTargetToPlot != undefined) && (dblTargetToPlot.length > 0)){
		iMinDev = Math.floor(((dblMeanMidPoint < dblValueToPlot) ? ((dblMeanMidPoint < dblTargetToPlot) ? -1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot < dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
		iMaxDev = Math.ceil(((dblMeanMidPoint > dblValueToPlot) ? ((dblMeanMidPoint > dblTargetToPlot) ? 1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot > dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
	}
	else{
		if (dblMeanMidPoint == dblValueToPlot){
			iMinDev = -1;
			iMaxDev = 1;
		}
		else{
			iMinDev = Math.floor((dblMeanMidPoint > dblValueToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : -1);
			iMaxDev = Math.ceil((dblMeanMidPoint > dblValueToPlot) ? 1 : ((dblValueToPlot-dblMeanMidPoint)/stDev));
		}
	}

	iRangeDev = (iMaxDev - iMinDev);

	dblRangeMin = (dblMeanMidPoint + (stDev*iMinDev));
	dblRangeMax = (dblMeanMidPoint + (stDev*iMaxDev));
	dblRangeSpread = (dblRangeMax - dblRangeMin);

	dblWunit = (w/dblRangeSpread);
	dblValueToPlotX = (dblValueToPlot - dblRangeMin);
	dblMeanToPlotX = (dblMeanMidPoint - dblRangeMin);
	dblTargetToPlotX = (dblTargetToPlot - dblRangeMin);
	
	dblValueToPlotX = ((dblValueToPlotX) * dblWunit);
	dblMeanToPlotX = ((dblMeanToPlotX) * dblWunit);
	dblTargetToPlotX = ((dblTargetToPlotX) * dblWunit);

	switch (parseInt(iGrowthSentiment)) {
		case -1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#08FF00;#FF0000";
			break;
		case 1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#FF0000;#08FF00";
			break;
		case 0:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;
		default:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;

	}

	ArrCols = GROWTH_SENTIMENT_LEGEND_SCHEME.split(";");

	//console.log('iRangeDev: ' + iRangeDev + '; iGrowthSentiment: ' + parseInt(iGrowthSentiment) + '; iMinDev: ' + iMinDev + '; iMaxDev: ' + iMaxDev + '; dblRangeMin: ' + dblRangeMin + '; dblRangeMax: ' + dblRangeMax + '; dblRangeSpread: ' + dblRangeSpread + '(' + dblWunit + '); dblMeanMidPoint: ' + dblMeanMidPoint + '; dblValueToPlotX: ' + dblValueToPlotX + '(' + dblValueToPlot + '); dblTargetToPlotX: '  + dblTargetToPlotX + '(' + dblTargetToPlot + ')');

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;
	
	if (destinationID.length){
		document.getElementById(destinationID).appendChild(svgElement); 
	}

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", w);
	svgGroup.setAttribute("height", h);

	if (iMinDev < -1){
		for (i = iMinDev; i < -1; i++) {
			var rectElement;
			rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectElement.setAttribute("x", xIncr);
			rectElement.setAttribute("y", "0");
			rectElement.setAttribute("style", "fill:" + ArrCols[0] + ";opacity:" + (Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2) + ";");
			rectElement.setAttribute("width", (w/(iRangeDev)));
			rectElement.setAttribute("height", h);
			svgGroup.appendChild(rectElement);
			xIncr += (w/(iRangeDev));

			var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = (i + ': ' + (Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2));
			rectElement.appendChild(title);
		}
	}

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", xIncr);
    rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + '#F5F5F5' + ";opacity:0.1;");
	rectElement.setAttribute("width", (w/(iRangeDev)));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);
	xIncr += (w/(iRangeDev));

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = (-1);
	rectElement.appendChild(title);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", xIncr);
    rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + '#F5F5F5' + ";opacity:0.1;");
	rectElement.setAttribute("width", (w/(iRangeDev)));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);
	xIncr += (w/(iRangeDev));

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = (1);
	rectElement.appendChild(title);

	if (iMaxDev > 1){
		for (i = 2; i <= iMaxDev; i++) {
			var rectElement;
			rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectElement.setAttribute("x", xIncr);
			rectElement.setAttribute("y", "0");
			rectElement.setAttribute("style", "fill:" + ArrCols[1] + ";opacity:" + ((Math.abs(i)-0.5) / ((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev) ))).toFixed(2) + ";");
			rectElement.setAttribute("width", (w/(iRangeDev)));
			rectElement.setAttribute("height", h);
			svgGroup.appendChild(rectElement);
			xIncr += (w/(iRangeDev));

			var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = (i + ': ' + ((Math.abs(i)-0.5) / ((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev) ))).toFixed(2));
			rectElement.appendChild(title);
		}
	}

	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rectElement.setAttribute("x", dblMeanToPlotX);
	rectElement.setAttribute("y", "0");
	rectElement.setAttribute("fill", "#000000");
	rectElement.setAttribute("style", "opacity: 0.75;");
	rectElement.setAttribute("width", "3");
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "Mean: " + dblMeanMidPoint;
	rectElement.appendChild(title);

	svgElement.appendChild(svgGroup);

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = w;
	svgGroup.height = h;
	svgElement.appendChild(svgGroup);

	/* Create 'triangle' symbol */
	if (dblTargetToPlot.length != 0){

		var symbol;
		var title;
		var svgGroup;

		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgElement.appendChild(svgGroup);

		symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
		symbol.setAttribute("transform", "translate(" + (dblTargetToPlotX) + "," + ((h/2)-1) + ")");
		symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 1;");
		symbol.setAttribute("d", "M0,-" + (h/4) + "L-" + (h/4) + "," + ((h/4)+1) + " " + ((h/4)+1) + "," + ((h/4)+1) + "Z");
		svgGroup.appendChild(symbol);

		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = "Target: " + dblTargetToPlot;
		symbol.appendChild(title);
	}

	/* Create 'diamond' symbol */
	var svgGroup;
	var symbol;
	var title;

	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	symbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    symbol.setAttribute("x", (dblValueToPlotX - (h/4)));
    symbol.setAttribute("y", (h/100) + (h/4));
    symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#00AAFF;opacity: 0.9;");
	symbol.setAttribute("transform", "rotate(45, " + (dblValueToPlotX ) + ", " + (h/2) + ")");
	symbol.setAttribute("width", (h/2));
	symbol.setAttribute("height", (h/2));
	svgGroup.appendChild(symbol);

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "region score: " + dblValueToPlot;
	symbol.appendChild(title);

	if (destinationID.length == 0){
		return (svgElement.innerHTML);
	}
	//console.log(svgElement.innerHTML);

 }

  function getLegendChartFromArray(destinationID,w,h,ArrLeg,dblValueToPlot,dblMeanMidPoint,iOpac) {

	var dblRangeMin;
	var dblRangeMax;
	var dblRangeSpread;

	var ColW;
	var dblValueToPlotX;
	var ArrCols;
	var xIncr = 6;

	dblRangeMin = ArrLeg[0].min;
	dblRangeMax = ArrLeg[ArrLeg.length-1].max;
	dblRangeSpread = (dblRangeMax - dblRangeMin);

	if (dblMeanMidPoint != undefined){
		ColW = ((w - 12)/(ArrLeg.length)); //12 = 6px x 2 (left + right)
	} else {
		ColW = (w/(ArrLeg.length));
	}
 
	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", w+10);
	svgElement.setAttribute("height", h);
	svgElement.setAttribute("background-Color", 'white');
	svgElement.setAttribute("style", 'position:relative;padding:0;left:-5px;');
	
	svgElement.width = w;
	svgElement.height = h;


	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", w);
	svgGroup.setAttribute("height", h);
	svgGroup.setAttribute("x", "0");
	svgGroup.setAttribute("y", "0");
	svgElement.appendChild(svgGroup);

	for (var i = 0; i < ArrLeg.length; i++) {

		var rectElement;
		var MyBG = ArrLeg[i].col;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectElement.setAttribute("x", xIncr);
		rectElement.setAttribute("y", "0");
		rectElement.setAttribute("style", "fill:" + MyBG + ";fill-opacity:" + iOpac + ";stroke:" + MyBG + ";stroke-opacity:" + iOpac + "stroke-width:1;;");
		rectElement.setAttribute("width", ColW);
		rectElement.setAttribute("height", h);
		rectElement.setAttribute("id", ArrLeg[i].name);
		svgGroup.appendChild(rectElement);
		xIncr += (ColW); //+2 to compensate for border (1px left + 1px right)

		var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = (ArrLeg[i].min + ' - ' + ArrLeg[i].max); // + ' {' + MyBG + '}');
		rectElement.appendChild(title);

		if ((parseFloat(dblValueToPlot) >= parseFloat(ArrLeg[i].min)) && (parseFloat(dblValueToPlot) <= parseFloat(ArrLeg[i].max))){
			//console.log(ArrLeg[i].min + ' - ' + ArrLeg[i].max + ' { ' + dblValueToPlot + ' }');
			if (parseFloat(ArrLeg[i].min) != parseFloat(ArrLeg[i].max)){
				dblValueToPlotX = 	parseFloat((parseFloat(xIncr) - parseFloat(ColW)) + (((parseFloat(dblValueToPlot) - parseFloat(ArrLeg[i].min)) / (parseFloat(ArrLeg[i].max) - parseFloat(ArrLeg[i].min))) * parseFloat(ColW)));
			} else {
				if (i > 0){
					dblValueToPlotX = 	parseFloat((parseFloat(xIncr) - (parseFloat(ColW)/2)) + (((parseFloat(dblValueToPlot) - parseFloat(ArrLeg[i].min)) / ((parseFloat(ArrLeg[i-1].max) - parseFloat(ArrLeg[i].min)))) * parseFloat(ColW)));
				} else {
					dblValueToPlotX = 	parseFloat((parseFloat(xIncr) - (parseFloat(ColW)/2)) + (((parseFloat(dblValueToPlot) - parseFloat(ArrLeg[i].min)) / ((parseFloat(ArrLeg[i+1].min) - parseFloat(ArrLeg[i].min)))) * parseFloat(ColW)));
				}
			}
			/*console.log(xIncr + ', ' + ColW + ', ' + dblValueToPlot + ', ' + ArrLeg[i].min + ', ' + ArrLeg[i].max + ', ' + ColW);
			console.log(xIncr + ' - ' + ColW + ' + ( ( (' + dblValueToPlot + ' - ' + ArrLeg[i].min + ') / (' + ArrLeg[i].max + ' - ' + ArrLeg[i].min + ') ' + ' x ' + ColW + ')');
			console.log('got here: ' + dblValueToPlotX);
			console.log(ArrLeg);*/
		} else {
			
		}

		if (dblMeanMidPoint != undefined){
			
			if (ArrLeg[i].max == dblMeanMidPoint){

				var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				rectElement.setAttribute("x", xIncr);
				rectElement.setAttribute("y", "0");
				rectElement.setAttribute("fill", "#000000");
				rectElement.setAttribute("style", "opacity: 0.75;");
				rectElement.setAttribute("width", "6");
				rectElement.setAttribute("height", h);
				rectElement.setAttribute("id", 'baseline');
				svgGroup.appendChild(rectElement);

				var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
				title.textContent = "Mean: " + dblMeanMidPoint;
				rectElement.appendChild(title);

				xIncr += 6;

			}

		}
	}


	var symbol = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
	symbol.setAttribute("x", dblValueToPlotX );
	symbol.setAttribute("points", (dblValueToPlotX-(h/3)) + "," + (h-2) + " " + (dblValueToPlotX+(h/3)) + "," + (h-2) + " " + dblValueToPlotX + ",2" ); 
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#07A2FE;opacity: 1;filter: drop-shadow( 2px 0 2px hsla(0, 0%, 0%, 0.2));");
	symbol.setAttribute("id", 'valueplot');
	symbol.setAttribute("class", 'top');
	svgGroup.appendChild(symbol);

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = ("region score: " + dblValueToPlot);
	symbol.appendChild(title);

	var vDiv = document.createElement('div');
	vDiv.appendChild(svgElement);

	if (destinationID.length == 0){
		//return (vDiv.innerHTML);
		return svgElement;
	} else {
		document.getElementById(destinationID).innerHTML = (vDiv.innerHTML); 
	}

 }

  function getLegendZscoreChart(destinationID,w,h,stDev,dblValueToPlot,dblMeanMidPoint,dblTargetToPlot,iGrowthSentiment,zMin,zMax) {

	var dblRangeMin;
	var dblRangeMax;
	var iMinDev;
	var iMaxDev;
	var iRangeDev;
	var dblRangeSpread;
	var dblValueToPlotX;
	var dblMeanToPlotX;
	var dblTargetToPlotX;
	var dblWunit;
	var GROWTH_SENTIMENT_LEGEND_SCHEME;
	var ArrCols;
	var xIncr = 0;

	if ((dblTargetToPlot != undefined) && (dblTargetToPlot.length > 0)){
		iMinDev = Math.floor(((dblMeanMidPoint < dblValueToPlot) ? ((dblMeanMidPoint < dblTargetToPlot) ? -1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot < dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
		iMaxDev = Math.ceil(((dblMeanMidPoint > dblValueToPlot) ? ((dblMeanMidPoint > dblTargetToPlot) ? 1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot > dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
	}
	else{
		if (dblMeanMidPoint == dblValueToPlot){
			iMinDev = -1;
			iMaxDev = 1;
		}
		else{
			iMinDev = Math.floor((dblMeanMidPoint > dblValueToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : -1);
			iMaxDev = Math.ceil((dblMeanMidPoint > dblValueToPlot) ? 1 : ((dblValueToPlot-dblMeanMidPoint)/stDev));
		}
	}
	
	iMinDev = zMin;
	iMaxDev = zMax;

	iRangeDev = (iMaxDev - iMinDev);

	dblRangeMin = (dblMeanMidPoint + (stDev*iMinDev));
	dblRangeMax = (dblMeanMidPoint + (stDev*iMaxDev));
	dblRangeSpread = (dblRangeMax - dblRangeMin);

	dblWunit = (w/dblRangeSpread);
	dblValueToPlotX = (dblValueToPlot - dblRangeMin);
	dblMeanToPlotX = (dblMeanMidPoint - dblRangeMin);
	dblTargetToPlotX = (dblTargetToPlot - dblRangeMin);
	
	dblValueToPlotX = ((dblValueToPlotX) * dblWunit);
	dblMeanToPlotX = ((dblMeanToPlotX) * dblWunit);
	dblTargetToPlotX = ((dblTargetToPlotX) * dblWunit);

	switch (parseInt(iGrowthSentiment)) {
		case -1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#00FF00;#FF0000";
			break;
		case 1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#FF0000;#00FF00";
			break;
		case 0:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;
		default:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;

	}

	ArrCols = GROWTH_SENTIMENT_LEGEND_SCHEME.split(";");

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;
	
	if (destinationID.length){
		document.getElementById(destinationID).appendChild(svgElement); 
	}

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", w);
	svgGroup.setAttribute("height", h);

	if (iMinDev < -1){
		for (i = iMinDev; i < -1; i++) {
			var rectElement;
			var MyBG = HexOpacityToHex(ArrCols[0],(Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2));
			rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectElement.setAttribute("x", xIncr);
			rectElement.setAttribute("y", "0");
			rectElement.setAttribute("style", "fill:" + MyBG + ";");
			rectElement.setAttribute("width", (w/(iRangeDev)));
			rectElement.setAttribute("height", h);
			svgGroup.appendChild(rectElement);
			xIncr += (w/(iRangeDev));

			var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = (i + ': ' + (Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2));
			rectElement.appendChild(title);
		}
	}

	var rectElement;
	var MyBG = HexOpacityToHex(ArrCols[0],(0.5) / parseInt(Math.abs(iMinDev)).toFixed(2));
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", xIncr);
    rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + MyBG + ";opacity:1;");
	rectElement.setAttribute("width", (w/(iRangeDev)));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);
	xIncr += (w/(iRangeDev));

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = (-1);
	rectElement.appendChild(title);

	var rectElement;
	var MyBG = HexOpacityToHex(ArrCols[1],(0.5) / parseInt(Math.abs(iMaxDev)).toFixed(2));
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", xIncr);
    rectElement.setAttribute("y", "0");
	rectElement.setAttribute("style", "fill:" + MyBG + ";opacity:1;");
	rectElement.setAttribute("width", (w/(iRangeDev)));
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);
	xIncr += (w/(iRangeDev));

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = (1);
	rectElement.appendChild(title);

	if (iMaxDev > 1){
		for (i = 2; i <= iMaxDev; i++) {
			var rectElement;
			var MyBG = HexOpacityToHex(ArrCols[1],(Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2));
			rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectElement.setAttribute("x", xIncr);
			rectElement.setAttribute("y", "0");
			rectElement.setAttribute("style", "fill:" + MyBG + ";");
			rectElement.setAttribute("width", (w/(iRangeDev)));
			rectElement.setAttribute("height", h);
			svgGroup.appendChild(rectElement);
			xIncr += (w/(iRangeDev));

			var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = (i + ': ' + ((Math.abs(i)-0.5) / ((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev) ))).toFixed(2));
			rectElement.appendChild(title);
		}
	}

	var rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	rectElement.setAttribute("x", dblMeanToPlotX);
	rectElement.setAttribute("y", "0");
	rectElement.setAttribute("fill", "#000000");
	rectElement.setAttribute("style", "opacity: 0.75;");
	rectElement.setAttribute("width", "3");
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "Mean: " + dblMeanMidPoint;
	rectElement.appendChild(title);

	svgElement.appendChild(svgGroup);

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = w;
	svgGroup.height = h;
	svgElement.appendChild(svgGroup);

	/* Create 'triangle' symbol */
	if (dblTargetToPlot.length != 0){

		var symbol;
		var title;
		var svgGroup;

		svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
		svgElement.appendChild(svgGroup);

		symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
		symbol.setAttribute("transform", "translate(" + (dblTargetToPlotX) + "," + ((h/2)-1) + ")");
		symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 1;");
		symbol.setAttribute("d", "M0,-" + (h/4) + "L-" + (h/4) + "," + ((h/4)+1) + " " + ((h/4)+1) + "," + ((h/4)+1) + "Z");
		svgGroup.appendChild(symbol);

		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = "Target: " + dblTargetToPlot;
		symbol.appendChild(title);
	}

	/* Create 'diamond' symbol */
	var svgGroup;
	var symbol;
	var title;

	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	symbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    symbol.setAttribute("x", (dblValueToPlotX - (h/4)));
    symbol.setAttribute("y", (h/100) + (h/4));
    symbol.setAttribute("style", "stroke-width:1;stroke:#282828;fill:#07A2FE;opacity: 1;");
	symbol.setAttribute("transform", "rotate(45, " + (dblValueToPlotX ) + ", " + (h/2) + ")");
	symbol.setAttribute("width", (h/2));
	symbol.setAttribute("height", (h/2));
	svgGroup.appendChild(symbol);

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "region score: " + dblValueToPlot;
	symbol.appendChild(title);

	if (destinationID.length == 0){
		var vDiv = document.createElement('div');
		vDiv.appendChild(svgElement);
		return (vDiv.innerHTML);
	}

 }

  function getSentimentScoreBackgroundSVG(destinationID,w,h,stDev,dblValueToPlot,dblMeanMidPoint,iGrowthSentiment) {

	var dblTargetToPlot = 0;
	var dblValueZscore;
	var dblRangeMin;
	var dblRangeMax;
	var iMinDev;
	var iMaxDev;
	var iRangeDev;
	var dblRangeSpread;
	var dblValueToPlotX;
	var dblMeanToPlotX;
	var dblTargetToPlotX;
	var dblWunit;
	var GROWTH_SENTIMENT_LEGEND_SCHEME;
	var ArrCols;
	var xIncr = 0;

	if ((dblTargetToPlot != undefined) && (dblTargetToPlot.length > 0)){
		iMinDev = Math.floor(((dblMeanMidPoint < dblValueToPlot) ? ((dblMeanMidPoint < dblTargetToPlot) ? -1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot < dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
		iMaxDev = Math.ceil(((dblMeanMidPoint > dblValueToPlot) ? ((dblMeanMidPoint > dblTargetToPlot) ? 1 : ((dblTargetToPlot-dblMeanMidPoint)/stDev)) : (dblValueToPlot > dblTargetToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : ((dblTargetToPlot-dblMeanMidPoint)/stDev)));
	}
	else{
		if (dblMeanMidPoint == dblValueToPlot){
			iMinDev = -1;
			iMaxDev = 1;
		}
		else{
			iMinDev = Math.floor((dblMeanMidPoint > dblValueToPlot) ? ((dblValueToPlot-dblMeanMidPoint)/stDev) : -1);
			iMaxDev = Math.ceil((dblMeanMidPoint > dblValueToPlot) ? 1 : ((dblValueToPlot-dblMeanMidPoint)/stDev));
		}
	}

	iRangeDev = (iMaxDev - iMinDev);
	dblValueZscore = ((dblValueToPlot-dblMeanMidPoint)/stDev);
	dblRangeMin = (dblMeanMidPoint + (stDev*parseFloat(iMinDev)));
	dblRangeMax = (dblMeanMidPoint + (stDev*parseFloat(iMaxDev)));
	dblRangeSpread = (dblRangeMax - dblRangeMin);

	//console.log('dblValueToPlot: ' + dblValueToPlot + ' (' + ((dblValueToPlot-dblMeanMidPoint)/stDev) + '); iMinDev: ' + iMinDev + '; iMaxDev: ' + iMaxDev + '; stDev: ' + stDev);

	switch (parseInt(iGrowthSentiment)) {
		case -1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#08FF00;#FF0000";
			break;
		case 1:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#FF0000;#08FF00";
			break;
		case 0:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;
		default:
			GROWTH_SENTIMENT_LEGEND_SCHEME = "#002759;#370059";
			break;

	}

	ArrCols = GROWTH_SENTIMENT_LEGEND_SCHEME.split(";");

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", w);
	svgGroup.setAttribute("height", h);
	svgElement.appendChild(svgGroup);

	if ((dblValueZscore < -1) && (iMinDev < -1)){

		for (i = iMinDev; i < -1; i++) {
			
			if ((parseFloat(dblValueZscore) >= i) && (parseFloat(dblValueZscore) <= (i+1))){
				
				var rectElement;
				rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				rectElement.setAttribute("x", xIncr);
				rectElement.setAttribute("y", "0");
				rectElement.setAttribute("style", "fill:" + ArrCols[0] + ";opacity:" + (Math.abs(i)-0.5) / parseInt(parseInt((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev)))).toFixed(2) + ";");
				rectElement.setAttribute("width", w);
				rectElement.setAttribute("height", h);
				svgGroup.appendChild(rectElement);

			}
		}
	}
	else{

		if ((iMaxDev > 1) && (dblValueZscore > 1)){

			for (i = 2; i <= iMaxDev; i++) {

				if ((parseFloat(dblValueZscore) >= i) && (parseFloat(dblValueZscore) <= (i+1))){

					var rectElement;
					rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
					rectElement.setAttribute("x", xIncr);
					rectElement.setAttribute("y", "0");
					rectElement.setAttribute("style", "fill:" + ArrCols[1] + ";opacity:" + ((Math.abs(i)-0.5) / ((( Math.abs(iMinDev) > Math.abs(iMaxDev)) ? Math.abs(iMinDev) : Math.abs(iMaxDev) ))).toFixed(2) + ";");
					rectElement.setAttribute("width", w);
					rectElement.setAttribute("height", h);
					svgGroup.appendChild(rectElement);

				}
			}
		}
		else{
				var rectElement;
				rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				rectElement.setAttribute("x", xIncr);
				rectElement.setAttribute("y", "0");
				rectElement.setAttribute("style", "fill:#FFFFFF;opacity:1;");
				rectElement.setAttribute("width", w);
				rectElement.setAttribute("height", h);
				svgGroup.appendChild(rectElement);
		}
	}

	console.log((svgElement.innerHTML).replace(/"/g,String.fromCharCode(39)));
	return ((svgElement.innerHTML).replace(/"/g,String.fromCharCode(39)));

 }



 function getDiamondIcon(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.setAttribute("width", pxSize);
	svgElement.setAttribute("height", pxSize);
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = pxSize;
	svgGroup.height = pxSize;
	svgElement.appendChild(svgGroup);

	/* Create 'diamond' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    symbol.setAttribute("x", (pxSize/2));
    symbol.setAttribute("y", (pxSize/2));
    symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#00AAFF;opacity: 0.9;");
	symbol.setAttribute("transform", "rotate(45, " + pxSize + ", " + pxSize + ")");
	symbol.setAttribute("width", (pxSize/2));
	symbol.setAttribute("height", (pxSize/2));
	svgGroup.appendChild(symbol);

	var title;

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "my diamond icon";
	symbol.appendChild(title);

 }
 
 function getTargetIcon(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
	svgElement.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
	svgElement.width = pxSize;
	svgElement.height = pxSize;
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.width = pxSize;
	svgGroup.height = pxSize;
	svgElement.appendChild(svgGroup);

	/* Create 'target' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
	symbol.setAttribute("transform", "translate(" + (pxSize/2) + "," + (pxSize/2) + ")");
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 0.9;");
	symbol.setAttribute("d", "M0,-" + (pxSize/3) + "L-" + (pxSize/3) + "," + ((pxSize/3)+1) + " " + ((pxSize/3)+1) + "," + ((pxSize/3)+1) + "Z");
	svgGroup.appendChild(symbol);
	
	var title;

	title = document.createElementNS("http://www.w3.org/2000/svg", "title");
	title.textContent = "my target icon";
	symbol.appendChild(title);

 }

 function getTrendGreenUp(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", pxSize);
	svgElement.setAttribute("height", pxSize);
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", pxSize);
	svgGroup.setAttribute("height", pxSize);
	svgElement.appendChild(svgGroup);

	/* Create 'target' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
	symbol.setAttribute("transform", "translate(" + (pxSize/2) + "," + (pxSize/2) + ")");
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 0.9;");
	symbol.setAttribute("d", "M0,-" + (pxSize/3) + "L-" + (pxSize/3) + "," + ((pxSize/3)+1) + " " + ((pxSize/3)+1) + "," + ((pxSize/3)+1) + "Z");
	svgGroup.appendChild(symbol);
	
 }
 
 function getTrendGreenDown(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", pxSize);
	svgElement.setAttribute("height", pxSize);
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", pxSize);
	svgGroup.setAttribute("height", pxSize);
	svgElement.appendChild(svgGroup);

	/* Create 'target' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
	symbol.setAttribute("transform", "translate(" + (pxSize/2) + "," + (pxSize/2) + ")");
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#26FF00;opacity: 0.9;");
	symbol.setAttribute("d", "M0," + (pxSize/3) + "L" + (pxSize/3) + ",-" + ((pxSize/3)+1) + " -" + ((pxSize/3)+1) + ",-" + ((pxSize/3)+1) + "Z");
	svgGroup.appendChild(symbol);
	
 }
 
 function getTrendRedUp(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", pxSize);
	svgElement.setAttribute("height", pxSize);
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", pxSize);
	svgGroup.setAttribute("height", pxSize);
	svgElement.appendChild(svgGroup);

	/* Create 'target' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
	symbol.setAttribute("transform", "translate(" + (pxSize/2) + "," + (pxSize/2) + ")");
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#FF0000;opacity: 0.9;");
	symbol.setAttribute("d", "M0,-" + (pxSize/3) + "L-" + (pxSize/3) + "," + ((pxSize/3)+1) + " " + ((pxSize/3)+1) + "," + ((pxSize/3)+1) + "Z");
	svgGroup.appendChild(symbol);

 }
 
 function getTrendRedDown(destinationID,pxSize){

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", pxSize);
	svgElement.setAttribute("height", pxSize);
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgGroup.setAttribute("width", pxSize);
	svgGroup.setAttribute("height", pxSize);
	svgElement.appendChild(svgGroup);

	/* Create 'target' symbol */
	var symbol;
	symbol = document.createElementNS("http://www.w3.org/2000/svg", "path");
	symbol.setAttribute("transform", "translate(" + (pxSize/2) + "," + (pxSize/2) + ")");
	symbol.setAttribute("style", "stroke-width:1;stroke:#000000;fill:#FF0000;opacity: 0.9;");
	symbol.setAttribute("d", "M0," + (pxSize/3) + "L" + (pxSize/3) + ",-" + ((pxSize/3)+1) + " -" + ((pxSize/3)+1) + ",-" + ((pxSize/3)+1) + "Z");
	svgGroup.appendChild(symbol);

 }
 
 function getTextRotation(destinationID,sText,pxSize,Rotation){
	 
	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgText;
	svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
	//svgText.setAttribute("transform", "rotate(" + Rotation + " 0,0)");
	svgText.setAttribute("style", "stroke:#000000;fill:#ffffff;writing-mode: tb;glyph-orientation-vertical: 0;opacity: 0.9;");
	svgText.textContent = sText;
	svgElement.appendChild(svgText);

 }
 
 function createBarChartValueRange(destinationID,w,h,myData,myOU,xAxisLabel){

	var CHART_BOUNDARY_SPACE = 20;
	var SPLIT_COLOR_CODED_GROUPS = 4;
	var CHART_BOUNDARY_LEFT_PADDING_XLABEL = 50;

	var i;
	var iRows;
	var iBarWidth;
	var iYmin;
	var iYmax;
	var iYvariable;
	var iYrange;
	var iYrangeToInt;
	var iYtemp;
	var iYNeighbor;
	var iLineMarkers;
	var iColCodeGroup = 0;
	var iColCodeGroupCount = 0;
	var iColCodeGroupCounter = 0;
	var colorR = 0;
	var colorG = 0;
	var colorB = 0;
	var sFill;

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	var iCounter = 0;

	iRows = myData.length;
	iBarWidth = (((w- CHART_BOUNDARY_LEFT_PADDING_XLABEL) - CHART_BOUNDARY_SPACE*2)/(iRows));
	iYmin = 0;

	iYmax = myData[iRows-1].value;
	iYvariable = (((h-100) - (CHART_BOUNDARY_SPACE*2)) / (iYmax));
	iYrange = (iYmax - iYmin);
	iYrangeToInt = parseInt(iYmax);
	iYtemp = iYmax;
	
	var bCustomFill = (myData[0].color != undefined);
	var bNumProp = (myData[0].numproportion != undefined);

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp / 10);
	}

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp * 10);
	}

	iColCodeGroupCount = Math.floor(iRows / SPLIT_COLOR_CODED_GROUPS);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", "0");
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "stroke:#ffffff;fill:none;stroke-width: 1;");
	rectElement.setAttribute("width", (w- CHART_BOUNDARY_LEFT_PADDING_XLABEL));
	rectElement.setAttribute("height", h-100);
	svgGroup.appendChild(rectElement);

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	//console.log('iColCodeGroupCount: ' + iColCodeGroupCount + ' iRows: ' + iRows + ' iColCodeGroupCount: ' + Math.ceil(iRows/iColCodeGroupCount));

	if (iYmax > (iYtemp + (iYtemp*0.5))){

		/* y-RANGE VALUE LINE: for cases where Max value is more than 50% above NEAREST 'ROUNDED DOWN' value*/
		var pathElement;
		pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
		pathElement.setAttribute("x1", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
		pathElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
		pathElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("style", "stroke:#000000;stroke-width:1;opacity: 0.75;");
		svgGroup.appendChild(pathElement);
		
		var xLabel;
		var sLabelText = parseFloat(iYtemp + (iYtemp*0.5)).toFixed(2).replace('.00','');
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + CHART_BOUNDARY_SPACE - (sLabelText.toString().length * 1.5)));
		xLabel.setAttribute("y", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		xLabel.textContent = (sLabelText);
		xLabel.setAttribute("style", "stroke:none;font-size:" + (CHART_BOUNDARY_SPACE * (1/2)) + "px;");
		svgGroup.appendChild(xLabel);

	}
	
	/* NEAREST 'ROUNDED DOWN' y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	pathElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
    pathElement.setAttribute("style", "stroke:#000000;stroke-width:1;opacity: 0.75;");
	svgGroup.appendChild(pathElement);

	/* NEAREST 'ROUNDED DOWN' y-RANGE TEXT LABEL */
	var xLabel;
	var sLabelText = parseFloat(iYtemp).toFixed(2).replace('.00','');
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + CHART_BOUNDARY_SPACE - (sLabelText.toString().length * 1.5)));
	xLabel.setAttribute("y", (((h-100) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	xLabel.textContent = (sLabelText);;
	xLabel.setAttribute("style", "stroke: none; font-size: " + (CHART_BOUNDARY_SPACE * (1/2)) + "px;");
	svgGroup.appendChild(xLabel);

	/* MID y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	pathElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
    pathElement.setAttribute("style", "stroke:#000000;stroke-width:1;opacity: 0.75;");
	svgGroup.appendChild(pathElement);

	/* MID y-RANGE TEXT LABEL */
	var xLabel;
	var sLabelText = (iYtemp/2).toFixed(2).replace('.00','');
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + CHART_BOUNDARY_SPACE - (sLabelText.toString().length * 1.5)));
	xLabel.setAttribute("y", (((h-100) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	xLabel.textContent = (sLabelText);
	xLabel.setAttribute("style", "stroke: none; font-size: " + (CHART_BOUNDARY_SPACE * (1/2)) + "px;");
	svgGroup.appendChild(xLabel);

	/* X-AXIS LABEL */
	var xLabel;
	var sLabelText = xAxisLabel;
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (sLabelText.toString().length / 0.5)));
	xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable) + 15));
	xLabel.textContent = (sLabelText);
	xLabel.setAttribute("transform", "rotate(270," + (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 1)) + "," + (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)) + ")");
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	
	/* ZERO VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", Math.floor((h-100) - CHART_BOUNDARY_SPACE)+1);
	pathElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", Math.floor((h-100) - CHART_BOUNDARY_SPACE)+1);
    pathElement.setAttribute("style", "stroke:#000000;stroke-width:1;opacity: 0.95;");
	svgGroup.appendChild(pathElement);


	/* ZERO VALUE TEXT LABEL */
	var xLabel;
	var sLabelText = iYmin.toString();
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 10)));
	xLabel.setAttribute("y", (((h-100) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)));
	xLabel.textContent = (iYmin).toFixed(2).replace('.00','');
	xLabel.setAttribute("style", "stroke: none; font-size: " + (CHART_BOUNDARY_SPACE * (1/2)) + "px;");
	svgGroup.appendChild(xLabel);

	iLineMarkers = parseInt((h-100)/100);

	for(i = 0; i < iRows; i++) {

		iCounter = iCounter + 1
		
		if (bCustomFill){

			sFill = myData[i].color;

		} else {

			iColCodeGroupCounter = iColCodeGroupCounter + 1;

			if (iColCodeGroupCounter > iColCodeGroupCount){
				iColCodeGroup = iColCodeGroup + 1;
				colorR = (iColCodeGroup * 40);
				colorG = (iColCodeGroup * 30);
				colorB = (iColCodeGroup * 20);
				iColCodeGroupCounter = 0;
				
				if (myData[i].ou != myOU){
					sFill = "rgba(" + (0 + colorR) + "," + (48 + colorG) + "," + (120 + colorB) + ",1);"
				} else {
					sFill = "#FF9500";
				}
			}

		}

		var rectElement;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectElement.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth));
		rectElement.setAttribute("y", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable)));

		if (myData[i].ou != myOU){
			rectElement.setAttribute("style", "stroke-opacity:1;stroke:" + sFill + ";fill:" + sFill + ";");
		}
		else{
			rectElement.setAttribute("style", "stroke-opacity:2;stroke:#F5F5F5;fill:" + sFill + ";stroke-dasharray: 1");
		}

		rectElement.setAttribute("opacity", "1");
		rectElement.setAttribute("onmouseover", "evt.target.setAttribute('opacity', '0.5')");
		rectElement.setAttribute("onmouseout", "evt.target.setAttribute('opacity', '1')");

		rectElement.setAttribute("width", ( (myData[i].ou != myOU) ? iBarWidth : Math.floor(iBarWidth) ) );
		rectElement.setAttribute("height", (myData[i].value * iYvariable));


		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = (myData[i].ou + ': ' + parseFloat(myData[i].value).toFixed(3).replace('.000',''));
		rectElement.appendChild(title);

		svgGroup.appendChild(rectElement);

		var lnElement;
		lnElement = document.createElementNS("http://www.w3.org/2000/svg", "line");

		if (myData[i].ou != myOU){

			lnElement.setAttribute("x1",(CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2));
			lnElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2));
			
			if (bNumProp){

				var myLineHeight = (((h-100) - CHART_BOUNDARY_SPACE) * parseFloat(myData[i].numproportion) / 100);
				if (myLineHeight==0){
					myLineHeight = 4;
				}

				lnElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) - (iBarWidth/10)) - (myLineHeight/2));
				lnElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) + (iBarWidth/10)) + (myLineHeight/2));
				lnElement.setAttribute("style", "stroke:#333333;fill:#333333;stroke-width:" + Math.ceil(parseFloat(myData[i].numproportion)/10) + ";");

				title = document.createElementNS("http://www.w3.org/2000/svg", "title");
				title.textContent = (myData[i].numproportion);
				lnElement.appendChild(title);
				
				svgGroup.appendChild(lnElement);
				

				// top horizontal NUMERATOR bar
				var lnElement;
				lnElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
				lnElement.setAttribute("x1",(CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2) - Math.ceil(parseFloat(myData[i].numproportion)/6));
				lnElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2) + Math.ceil(parseFloat(myData[i].numproportion)/6));
				lnElement.setAttribute("style", "stroke:#333333;fill:#333333;stroke-width:" + Math.ceil(parseFloat(myData[i].numproportion)/10) + ";");
				lnElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) - (iBarWidth/10)) - (myLineHeight/2));
				lnElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) - (iBarWidth/10)) - (myLineHeight/2));

				svgGroup.appendChild(lnElement);

				// bottom horizontal NUMERATOR bar
				var lnElement;
				lnElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
				lnElement.setAttribute("x1",(CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2) - Math.ceil(parseFloat(myData[i].numproportion)/6));
				lnElement.setAttribute("x2", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2) + Math.ceil(parseFloat(myData[i].numproportion)/6));
				lnElement.setAttribute("style", "stroke:#333333;fill:#333333;stroke-width:" + Math.ceil(parseFloat(myData[i].numproportion)/10) + ";");
				lnElement.setAttribute("y1", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) + (iBarWidth/10)) + (myLineHeight/2));
				lnElement.setAttribute("y2", (((h-100) - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) + (iBarWidth/10)) + (myLineHeight/2));

				svgGroup.appendChild(lnElement);

				var xLabel;
				xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
				xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) + 5);
				xLabel.setAttribute("y",(((h-150) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) - (iBarWidth/2));
				xLabel.textContent = (myData[i].ou);
				xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/4)) + "px;");
				xLabel.setAttribute("transform", "rotate(90, " + ((CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - (iBarWidth/10)) + ", " + (((h-100) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) + ")");
				svgGroup.appendChild(xLabel);

			} else {

				lnElement.setAttribute("y1", ((h - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) - (iBarWidth/4)));
				lnElement.setAttribute("y2", ((h - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) + (iBarWidth/4)));
				lnElement.setAttribute("style", "stroke:#333333;fill:none;stroke-dasharray: 5,5");
				
				svgGroup.appendChild(lnElement);

			}
		}
		else{

				var xLabel;
				xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
				xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) + 5);
				xLabel.setAttribute("y",(((h-150) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) - (iBarWidth/2));
				xLabel.textContent = (myData[i].ou);
				xLabel.setAttribute("style", "stroke: none; fill: " + sFill + "; font-weight: 800; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (3/5)) + "px;");
				xLabel.setAttribute("transform", "rotate(90, " + ((CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - (iBarWidth/10)) + ", " + (((h-100) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) + ")");
				svgGroup.appendChild(xLabel);
/*
			var xLabel;
			xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
			xLabel.setAttribute("x", (CHART_BOUNDARY_LEFT_PADDING_XLABEL + (CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth) * 0.65);
			xLabel.setAttribute("y",(((h-150) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) - (iBarWidth/2));
			xLabel.textContent = (myData[i].ou);
			xLabel.setAttribute("style", "stroke: none; fill: #ffffff; font-weight:400; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (3/4)) + "px;");
			xLabel.setAttribute("transform", "rotate(90, " + ((CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - (iBarWidth/10)) + ", " + (((h-100) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)) + ")");
			svgGroup.appendChild(xLabel);
*/
/*
			lnElement.setAttribute("x1",((CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2));
			lnElement.setAttribute("y1", ((h - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) - (iBarWidth/4)));
			lnElement.setAttribute("x2", ((CHART_BOUNDARY_SPACE*2)) + (i * iBarWidth)+(iBarWidth/2));
			lnElement.setAttribute("y2", ((h - CHART_BOUNDARY_SPACE) - (myData[i].value * iYvariable) + (iBarWidth/4)));
			lnElement.setAttribute("style", "stroke:#0D00FF;fill:none;");
			
			var xLabel;
			xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
			xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth)-(CHART_BOUNDARY_SPACE/4));
			xLabel.setAttribute("y",(h) - (CHART_BOUNDARY_SPACE * (1/4)));
			xLabel.textContent = parseFloat(myData[i].value).toFixed(2).replace('.00','');
			xLabel.setAttribute("style", "stroke: none; font-size: " + (CHART_BOUNDARY_SPACE * (1/2)) + "px;");
			svgGroup.appendChild(xLabel);
*/
		}



	}
	

}

function createHistogramDataDistribution(destinationID,w,h,myData,myOU,xAxisLabel){

	var CHART_BOUNDARY_SPACE = 20;
	var SPLIT_COLOR_CODED_GROUPS = 4;

	var i;
	var iRows;
	var iBarWidth;
	var iYmin = 987654321;
	var iYmax = -987654321;
	var iYvariable;
	var iYrange;
	var iYrangeToInt;
	var iYtemp;
	var iYNeighbor;
	var iColCodeGroup = 0;
	var iColCodeGroupCount = 0;
	var iColCodeGroupCounter = 0;
	var colorR = 0;
	var colorG = 0;
	var colorB = 0;
	var iDecLim = 1;
	var DecRepl = '.0';
	
	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	var iCounter = 0;

	iRows = myData.length;
	iBarWidth = (((w -50) - CHART_BOUNDARY_SPACE*2)/(iRows));

	for(i = 0; i < iRows; i++) {
		iYmin = ((parseFloat(myData[i].count) < iYmin) ? parseFloat(myData[i].count) : iYmin);
		iYmax = ((parseFloat(myData[i].count) > iYmax) ? parseFloat(myData[i].count) : iYmax);
	}
	
	iYmin = ((iYmin > 0) ? 0 : iYmin);
	iYvariable = (((h - 50) - (CHART_BOUNDARY_SPACE*2)) / (iYmax));
	iYrange = (iYmax - iYmin);
	iYrangeToInt = parseInt(iYmax);
	iYtemp = iYmax;

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp / 10);
	}

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp * 10);
	}

	iColCodeGroupCount = Math.floor(iRows / SPLIT_COLOR_CODED_GROUPS);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", 50);
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "stroke:#ffffff;fill:none;stroke-width: 1;");
	rectElement.setAttribute("width", (w - 50));
	rectElement.setAttribute("height", (h - 50));
	svgGroup.appendChild(rectElement);

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	if (iYmax > (iYtemp + (iYtemp*0.5))){

		/* y-RANGE VALUE LINE: for cases where Max value is more than 50% above NEAREST 'ROUNDED DOWN' value*/
		var pathElement;
		pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
		pathElement.setAttribute("x1", (40 + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
		pathElement.setAttribute("y1", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("x2", (50 + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
		pathElement.setAttribute("y2", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
		svgGroup.appendChild(pathElement);

		var xLabel;
		var sLabelText = iYtemp.toString();
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (50 + CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
		xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		xLabel.textContent = (iYtemp + (iYtemp*0.5));
		xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
		svgGroup.appendChild(xLabel);

	}

	/* NEAREST 'ROUNDED DOWN' y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (40 + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", (((h - 50) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	pathElement.setAttribute("x2", (50 + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", (((h - 50) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
	svgGroup.appendChild(pathElement);

	/* NEAREST 'ROUNDED DOWN' y-RANGE TEXT LABEL */
	var xLabel;
	var sLabelText = iYtemp.toString();
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (40 + CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
	xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	xLabel.textContent = iYtemp;
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	/* MID y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (40 + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	pathElement.setAttribute("x2", (50 + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
	svgGroup.appendChild(pathElement);

	/* MID y-RANGE TEXT LABEL */
	var xLabel;
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (40 + CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
	xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	xLabel.textContent = (iYtemp/2);
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	/* 'FREQUENCY' LABEL */
	var xLabel;
	var sLabelText = 'FREQUENCY (count)';
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (sLabelText.toString().length / 0.5)));
	xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable) + 15));
	xLabel.textContent = (sLabelText);
	xLabel.setAttribute("transform", "rotate(270," + (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 1)) + "," + (((h - 50) - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)) + ")");
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	/* ZERO VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", (40 + (CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", Math.floor((h - 50) - CHART_BOUNDARY_SPACE)+1);
	pathElement.setAttribute("x2", (50 + (iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", Math.floor((h - 50) - CHART_BOUNDARY_SPACE)+1);
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.95;");
	svgGroup.appendChild(pathElement);

	/* ZERO VALUE TEXT LABEL */
	var xLabel;
	var sLabelText = iYmin.toString();
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (40 + CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 10)));
	xLabel.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)));
	xLabel.textContent = iYmin;
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	/* X-AXIS LABEL */
	var xLabel;
	var sLabelText = xAxisLabel;
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (w / 2) - (sLabelText.toString().length * 2) );
	xLabel.setAttribute("y", Math.floor((h - 50) - CHART_BOUNDARY_SPACE)+45);
	xLabel.textContent = (sLabelText.toUpperCase());
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
	svgGroup.appendChild(xLabel);

	for(i = 0; i < iRows; i++) {

		iCounter = iCounter + 1
		iColCodeGroupCounter = iColCodeGroupCounter + 1;

		if (iColCodeGroupCounter > iColCodeGroupCount){
			iColCodeGroup = iColCodeGroup + 1;
			colorR = 999; //(iColCodeGroup * 40);
			colorG = 999; //(iColCodeGroup * 30);
			colorB = 999; //(iColCodeGroup * 20);
			iColCodeGroupCounter = 0;
		}

		var rectElement;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectElement.setAttribute("x", (45 + (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - 1));
		rectElement.setAttribute("y", (((h - 50) - CHART_BOUNDARY_SPACE) - (myData[i].count * iYvariable))+1);

		{
			rectElement.setAttribute("style", "stroke-opacity:1;stroke-width:1;stroke:rgba(" + (57) + "," + (74) + "," + (82) + ",1);fill: rgba(" + (200) + "," + (200) + "," + (200) + ",1);");
		}

		rectElement.setAttribute("opacity", "0.95");
		rectElement.setAttribute("onmouseover", "evt.target.setAttribute('opacity', '0.6')");
		rectElement.setAttribute("onmouseout", "evt.target.setAttribute('opacity', '0.95')");

		rectElement.setAttribute("width", (iBarWidth));
		rectElement.setAttribute("height", (myData[i].count * iYvariable));

		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = ((parseFloat(myData[i].share) * 100).toFixed(2).replace('.00','') + '%');
		rectElement.appendChild(title);

		svgGroup.appendChild(rectElement);

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (45 + CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - 5);
		xLabel.setAttribute("y",((h - 45)) - (CHART_BOUNDARY_SPACE * (1/4)));
		xLabel.textContent = (parseFloat(myData[i].min).toFixed(iDecLim).replace(DecRepl,'') + '');
		xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
		svgGroup.appendChild(xLabel);

		// SHOW LABEL (COUNT) OF OCCURANCES ABOVE EACH BAR
		/*if (myData[i].count){
			var xLabel;
			xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
			xLabel.setAttribute("x", (50 + (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - 1) + (iBarWidth/2));
			xLabel.setAttribute("y",(((h - 50) - CHART_BOUNDARY_SPACE) - (myData[i].count * iYvariable)) - Math.floor(CHART_BOUNDARY_SPACE * (1/3)) );
			//xLabel.textContent = ((parseFloat(myData[i].share) * 100).toFixed(2).replace('.00','') + '%');
			xLabel.textContent = (myData[i].count);
			xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
			svgGroup.appendChild(xLabel);
		}*/

	}

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (45 + CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - 15);
		xLabel.setAttribute("y",((h - 45)) - (CHART_BOUNDARY_SPACE * (1/4)));
		xLabel.textContent = (parseFloat(myData[i-1].max).toFixed(iDecLim).replace(DecRepl,'') + '');
		xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/3)) + "px;");
		svgGroup.appendChild(xLabel);

}

function createHistogramDataDistributionWithStdDevBands(destinationID,w,h,myData,myOU,iDecLim,LegendCols,LegendGrades,iStDev,iScaleAbsLow,iScaleAbsHigh,RegAvg){

	var CHART_BOUNDARY_SPACE = 20;
	var SPLIT_COLOR_CODED_GROUPS = 4;

	var i;
	var iRows;
	var iBarWidth;
	var iYmin = 987654321;
	var iYmax = -987654321;

	var iXmin = 987654321;
	var iXmax = -987654321;

	var iYvariable;
	var iYrange;
	var iYrangeToInt;
	var iYtemp;
	var iYNeighbor;
	var iColCodeGroup = 0;
	var iColCodeGroupCount = 0;
	var iColCodeGroupCounter = 0;
	var colorR = 0;
	var colorG = 0;
	var colorB = 0;
	var DecRepl = '.';

	//console.log(JSON.stringify(myData));

	for(i = 0; i < iDecLim; i++) {
		DecRepl += '0';
	}

	var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgElement.setAttribute("width", w);
	svgElement.setAttribute("height", h);
	svgElement.width = w;
	svgElement.height = h;
	document.getElementById(destinationID).appendChild(svgElement); 

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	var iCounter = 0;

	iRows = myData.length;
	iBarWidth = ((w - (CHART_BOUNDARY_SPACE*2))/(iRows)); // width - (boundary space) - (Rows x 2 = 1px per left + right border color) / rows

	for(i = 0; i < iRows; i++) {
		iYmin = ((parseFloat(myData[i].count) < iYmin) ? parseFloat(myData[i].count) : iYmin);
		iYmax = ((parseFloat(myData[i].count) > iYmax) ? parseFloat(myData[i].count) : iYmax);
	}

	iYmin = ((iYmin > 0) ? 0 : iYmin);

	iYvariable = ((h - (CHART_BOUNDARY_SPACE*2)) / (iYmax));
	iYrange = (iYmax - iYmin);
	iYrangeToInt = parseInt(iYmax);

	iYtemp = iYmax;

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp / 10);
	}

	for(i = 1; i < iYrangeToInt.toString().length; i++) {
		iYtemp = Math.floor(iYtemp * 10);
	}

	iColCodeGroupCount = Math.floor(iRows / SPLIT_COLOR_CODED_GROUPS);

	var rectElement;
	rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rectElement.setAttribute("x", "0");
    rectElement.setAttribute("y", "0");
    rectElement.setAttribute("style", "stroke:#ffffff;fill:none;stroke-width: 1;");
	rectElement.setAttribute("width", w);
	rectElement.setAttribute("height", h);
	svgGroup.appendChild(rectElement);

	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

		iXmin = parseFloat(LegendGrades[0]);
		iXmin = ((myData[0].min > iXmin) ? myData[0].min : iXmin);
		//iXmax = (LegendGrades[(LegendGrades.length-1)] + iStDev);
		iXmax = (myData[myData.length-1].max);

	/*  Z  SCORE  BANDS  ::  START  */

		var ZbarWidth = ((w - CHART_BOUNDARY_SPACE*2)/(LegendGrades.length));
		iXmin = ((parseFloat(iXmin)<0) ? 0 : iXmin);
		/*
		console.log('BarWidth: ' + (w - ((CHART_BOUNDARY_SPACE * 2) - 1)) + ' (' + w + ')');
		console.log('X starting point: ' + ((CHART_BOUNDARY_SPACE * 2) - 1) + ' (' + iXmin + ')');
		console.log('X ending point: ' + (w - ((CHART_BOUNDARY_SPACE * 2) - 1)) + ' (' + iXmax + ')');
		console.log('1 unit = ' + ((w - ((CHART_BOUNDARY_SPACE * 2) - 1)) /  (iXmax - iXmin)) + 'px (' + (iXmax - iXmin) + ')');
		console.log('1px = ' + ((iXmax - iXmin) / (w - ((CHART_BOUNDARY_SPACE * 2) - 1))) + 'units (' + (iXmax - iXmin) + ')');
		console.log('iXmin: ' + iXmin + ', iXmax: ' + iXmax);
		*/

		var iXpx = ((iXmax - iXmin) / (w - ((CHART_BOUNDARY_SPACE * 2))));
		var iXunit = ((w - ((CHART_BOUNDARY_SPACE * 2) - 1)) /  (iXmax - iXmin));


		var OffSetZband = ((CHART_BOUNDARY_SPACE*2)-1);

		for (var i = 0; i < LegendGrades.length; i++) {

			var RgFrom = parseFloat(LegendGrades[i]);
			var RgTo = ((i < (LegendGrades.length-1)) ? LegendGrades[i + 1] : (LegendGrades[i] + iStDev));
			var iLgZs = parseFloat(( (((parseFloat(RgFrom) + (parseFloat(iStDev)/2)) - parseFloat(RegAvg)) / parseFloat(iStDev))));
			var iOpac = (Math.abs(iLgZs) / (( Math.abs(iScaleAbsLow) > Math.abs(iScaleAbsHigh)) ? Math.abs(iScaleAbsLow) : Math.abs(iScaleAbsHigh) )).toFixed(2);

			var RgFrom = ((parseFloat(LegendGrades[i])<0) ? 0 : parseFloat(LegendGrades[i]));
			    RgFrom = ((RgFrom < iXmin) ? iXmin : RgFrom);

			var rectElement;
			rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			rectElement.setAttribute("x", OffSetZband);
			//rectElement.setAttribute("y", (h - 20));
			rectElement.setAttribute("y", (0));

			{
				rectElement.setAttribute("style", "stroke-opacity:1;stroke-width:0;stroke:" + LegendCols[i] + ";fill:" + LegendCols[i] + ";");
			}

			rectElement.setAttribute("opacity", iOpac);
			rectElement.setAttribute("onmouseover", "evt.target.setAttribute('opacity', " + (parseFloat(iOpac) + parseFloat((iOpac*0.5))) + ")");
			rectElement.setAttribute("onmouseout", "evt.target.setAttribute('opacity', " + iOpac + ")");

			if (i == (LegendGrades.length-1)) {
				if ((OffSetZband + (((RgTo - RgFrom)) * iXunit)) < w){
					rectElement.setAttribute("width", (((myData[(iRows-1)].max)- RgFrom) * iXunit));
				}
				else{
					rectElement.setAttribute("width", (((RgTo - RgFrom)) * iXunit));
				}
			}
			else
			/*if (((OffSetZband + (((RgTo - RgFrom)) * iXunit)) < w) && (i = (LegendGrades.length-1))){
				rectElement.setAttribute("width", (((myData[(iRows-1)].max)- RgFrom) * iXunit));
			}
			else*/{
				rectElement.setAttribute("width", (((RgTo - RgFrom)) * iXunit));
			}
			rectElement.setAttribute("height", (h-CHART_BOUNDARY_SPACE));

			title = document.createElementNS("http://www.w3.org/2000/svg", "title");
			title.textContent = (RgFrom.toFixed(2).replace('.00','') + ((i == (LegendGrades.length-1)) ? ("+ " + RgTo.toFixed(2)) : " - " + RgTo.toFixed(2).replace('.00','')));
			rectElement.appendChild(title);

			svgGroup.appendChild(rectElement);

			OffSetZband += (((RgTo - RgFrom)) * iXunit);

			//console.log(OffSetZband + '; w: ' + (((RgTo - RgFrom)) * iXunit));

		}

	/*  Z  SCORE  BANDS  ::  END  */


	var svgGroup;
	svgGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
	svgElement.appendChild(svgGroup);

	if (iYmax > (iYtemp + (iYtemp*0.5))){

		/* y-RANGE VALUE LINE: for cases where Max value is more than 50% above NEAREST 'ROUNDED DOWN' value*/
		var pathElement;
		pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
		pathElement.setAttribute("x1", ((CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
		pathElement.setAttribute("y1", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("x2", ((iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
		pathElement.setAttribute("y2", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
		svgGroup.appendChild(pathElement);

		var xLabel;
		var sLabelText = iYtemp.toString();
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
		xLabel.setAttribute("y", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp + (iYtemp*0.5)) * iYvariable)));
		xLabel.textContent = (iYtemp + (iYtemp*0.5));
		xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/5)) + "px;");
		svgGroup.appendChild(xLabel);

	}

	/* NEAREST 'ROUNDED DOWN' y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", ((CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", ((h - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	pathElement.setAttribute("x2", ((iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", ((h - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
	svgGroup.appendChild(pathElement);

	/* NEAREST 'ROUNDED DOWN' y-RANGE TEXT LABEL */
	var xLabel;
	var sLabelText = iYtemp.toString();
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
	xLabel.setAttribute("y", ((h - CHART_BOUNDARY_SPACE) - (iYtemp * iYvariable)));
	xLabel.textContent = iYtemp;
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/5)) + "px;");
	svgGroup.appendChild(xLabel);

	/* MID y-RANGE VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", ((CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	pathElement.setAttribute("x2", ((iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.5;");
	svgGroup.appendChild(pathElement);

	/* MID y-RANGE TEXT LABEL */
	var xLabel;
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 0.35)));
	xLabel.setAttribute("y", ((h - CHART_BOUNDARY_SPACE) - ((iYtemp/2) * iYvariable)));
	xLabel.textContent = (iYtemp/2);
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/5)) + "px;");
	svgGroup.appendChild(xLabel);

	/* ZERO VALUE LINE */
	var pathElement;
	pathElement = document.createElementNS("http://www.w3.org/2000/svg", "line");
	pathElement.setAttribute("x1", ((CHART_BOUNDARY_SPACE*2) - (CHART_BOUNDARY_SPACE/4)));
	pathElement.setAttribute("y1", Math.floor(h - CHART_BOUNDARY_SPACE)+1);
	pathElement.setAttribute("x2", ((iRows * iBarWidth) + (CHART_BOUNDARY_SPACE*2)));
	pathElement.setAttribute("y2", Math.floor(h - CHART_BOUNDARY_SPACE)+1);
    pathElement.setAttribute("style", "stroke:#008DC9;stroke-width:1;opacity: 0.95;");
	svgGroup.appendChild(pathElement);

	/* ZERO VALUE TEXT LABEL */
	var xLabel;
	var sLabelText = iYmin.toString();
	xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
	xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE - (iYtemp.toString().length / 10)));
	xLabel.setAttribute("y", ((h - CHART_BOUNDARY_SPACE) - (iYmin * iYvariable)));
	xLabel.textContent = iYmin;
	xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/5)) + "px;");
	svgGroup.appendChild(xLabel);


	
	for(i = 0; i < iRows; i++) {

		iCounter = iCounter + 1
		iColCodeGroupCounter = iColCodeGroupCounter + 1;

		if (iColCodeGroupCounter > iColCodeGroupCount){
			iColCodeGroup = iColCodeGroup + 1;
			colorR = 999; //(iColCodeGroup * 40);
			colorG = 999; //(iColCodeGroup * 30);
			colorB = 999; //(iColCodeGroup * 20);
			iColCodeGroupCounter = 0;
		}

		var rectElement;
		rectElement = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		rectElement.setAttribute("x", ((CHART_BOUNDARY_SPACE*2) + (i * iBarWidth)));
		rectElement.setAttribute("y", ((h - CHART_BOUNDARY_SPACE) - (myData[i].count * iYvariable))+1);

		{
			//rectElement.setAttribute("style", "stroke-opacity:1;stroke-width:1;stroke:rgba(" + (57) + "," + (74) + "," + (82) + ",1);fill: rgba(" + (200) + "," + (200) + "," + (200) + ",1);");
			rectElement.setAttribute("style", "stroke-opacity:1;stroke-width:1;stroke:rgba(" + (0) + "," + (0) + "," + (0) + ",1);fill: rgba(" + (255) + "," + (255) + "," + (255) + ",1);");
		}

		rectElement.setAttribute("opacity", "0.95");
		rectElement.setAttribute("onmouseover", "evt.target.setAttribute('opacity', '0.5')");
		rectElement.setAttribute("onmouseout", "evt.target.setAttribute('opacity', '0.95')");

		rectElement.setAttribute("width", (iBarWidth));
		rectElement.setAttribute("height", (myData[i].count * iYvariable));

		title = document.createElementNS("http://www.w3.org/2000/svg", "title");
		title.textContent = (myData[i].count + ' (' + (parseFloat(myData[i].share) * 100).toFixed(2).replace('.00','') + '%)');
		rectElement.appendChild(title);

		svgGroup.appendChild(rectElement);

		var xLabel;
		xLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
		xLabel.setAttribute("x", (CHART_BOUNDARY_SPACE*2) + (i * iBarWidth) - (((myData[i].min).length == 1) ? 1 : 5));
		xLabel.setAttribute("y",(h) - (CHART_BOUNDARY_SPACE * (1/4)));
		xLabel.textContent = (parseFloat(myData[i].min).toFixed(iDecLim).replace(DecRepl,'') + '');
		xLabel.setAttribute("style", "stroke: none; font-size: " + Math.floor(CHART_BOUNDARY_SPACE * (2/5)) + "px;");
		svgGroup.appendChild(xLabel);

	}

}


	function getParameterByName(name) {0
		name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
			results = regex.exec(location.search);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
