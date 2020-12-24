import React, { useState, useRef, useLayoutEffect, Component } from 'react';
import { IonIcon, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonAlert,  } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { userLogin } from '../service/userService'
import { connect } from '../data/connect';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

 
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
//   setIsLoggedIn: typeof setIsLoggedIn;
}

interface MyHealthDataProps extends OwnProps,  DispatchProps { }


/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let chart = am4core.create("chartdiv", am4charts.PieChart);

// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(40);



// Add and configure Series
let pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.innerRadius = 10;
pieSeries.slices.template.fillOpacity = 0.5;

pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";


// Add data
pieSeries.data = [{
  "category": "First + Second",
  "value": 60
}, {
  "category": "Unused",
  "value": 30,
  "labelDisabled":true
}];


// // Add second series
// let pieSeries2 = chart.series.push(new am4charts.PieSeries());
// pieSeries2.dataFields.value = "value";
// pieSeries2.dataFields.category = "category";
// pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
// pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
// pieSeries2.slices.template.propertyFields.fill = "fill";

// Add data
// pieSeries2.data = [{
//   "category": "First",
//   "value": 30
// }, {
//   "category": "Second",
//   "value": 30
// }, {
//   "category": "Remaining",
//   "value": 30,
//   "fill":"#dedede"
// }];

// @ts-ignore
pieSeries.adapter.add("innerRadius", function(innerRadius, target){
  return am4core.percent(40);
})

// pieSeries2.adapter.add("innerRadius", function(innerRadius, target){
//   return am4core.percent(60);
// })
// @ts-ignore
pieSeries.adapter.add("radius", function(innerRadius, target){
  return am4core.percent(100);
})

// pieSeries2.adapter.add("radius", function(innerRadius, target){
//   return am4core.percent(80);
// })



class MyHealthData extends Component {

	initPeople = () => {
		  /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"

    let chart = am4core.create("chartdiv", am4charts.SlicedChart);
    chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

	chart.data = [{
      "name": "休息",
      "value": 600,
      "fill": am4core.color("#42c5f5")
    }, {
      "name": "低",
      "value": 100,
      "fill": am4core.color("#f5d442")
    }, {
      "name": "中",
      "value": 50,
      "fill": am4core.color("#f59e42")
    }, {
      "name": "高",
      "value": 30,
      "fill": am4core.color("#f56642")
    }];

		let series = chart.series.push(new am4charts.PictorialStackedSeries());
		series.dataFields.value = "value";
		series.dataFields.category = "name";
		series.alignLabels = true;

		series.maskSprite.path = iconPath;
		series.ticks.template.locationX = 1;
		series.ticks.template.locationY = 0.5;

		series.labelsContainer.width = 200;

		// chart.legend = new am4charts.Legend();
		// chart.legend.position = "left";
		// chart.legend.valign = "bottom";
		// @ts-ignore
		this.chart = chart;
	}

  componentDidMount() {
		this.initPeople();
	}

	componentWillUnmount() {
		// @ts-ignore
		if (this.chart) {
			// @ts-ignore
			this.chart.dispose();
		}
	}

	render() {
		return (
			<IonPage id="myHealthData-page">
				<IonHeader>
					<IonToolbar>
						<IonButtons slot="start">
							<IonMenuButton></IonMenuButton>
						</IonButtons>
						<IonTitle>我的健康数据</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent>
					<IonCard>
						<IonCardHeader>
							{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
							<IonCardTitle>压力</IonCardTitle>
						</IonCardHeader>
	
						<IonCardContent>
								<div id="chartdiv" style={{ width: "100%", height: "200px" }}></div>
								<div>2020-12-04</div>
						</IonCardContent>
					</IonCard>
	
					<IonCard>
						<IonItem>
							<IonIcon slot="start" />
							<IonLabel>ion-item in a card, icon left, button right</IonLabel>
							<IonButton fill="outline" slot="end">View</IonButton>
						</IonItem>
	
						<IonCardContent>
							This is content, without any paragraph or header tags,
							within an ion-cardContent element.
						</IonCardContent>
					</IonCard>
				</IonContent>
			</IonPage>
		);
	}
}

export default MyHealthData;

