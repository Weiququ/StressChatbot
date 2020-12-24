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


class MyHealthDataAmCharts extends Component {

  componentDidMount() {
    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

		// Create chart instance
		let chart = am4core.create("chartdiv", am4charts.PieChart);
		// @ts-ignore
		// chart.labelsEnabled = false;//不显示label
		// @ts-ignore
		// chart.autoMargins = false;

		// Let's cut a hole in our Pie chart the size of 40% the radius
		chart.innerRadius = am4core.percent(30);

		// Add and configure Series
		// let pieSeries = chart.series.push(new am4charts.PieSeries());
		// pieSeries.dataFields.value = "value";
		// pieSeries.dataFields.category = "category";
		// pieSeries.slices.template.stroke = am4core.color("#fff");
		// pieSeries.innerRadius = 20;
		// pieSeries.slices.template.fillOpacity = 0.3;
		// pieSeries.slices.template.fill = am4core.color("#f08d30");

		// pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
		// pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
		// pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";

		let label = chart.seriesContainer.createChild(am4core.Label);
		label.text = "30";
		label.horizontalCenter = "middle";
		label.verticalCenter = "middle";
		label.fontSize = 18;
		let label2 = chart.seriesContainer.createChild(am4core.Label);
		label2.text = "均值";
		label2.horizontalCenter = "middle";
		// label2.verticalCenter = "middle";
		label2.paddingTop = 10;
		label2.fontSize = 12;

		// // Add data
		// pieSeries.data = [{
		// 	"category": "有压力",
		// 	"value": 60
		// }, {
		// 	"category": "Unused",
		// 	"value": 100,
		// 	"labelDisabled": true
		// }];

		// Disable sliding out of slices
		// @ts-ignore
		// pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
		// // @ts-ignore
		// pieSeries.slices.template.states.getKey("hover").properties.scale = 1;

		// Add second series
		let pieSeries2 = chart.series.push(new am4charts.PieSeries());
		pieSeries2.dataFields.value = "value";
		pieSeries2.dataFields.category = "stressLevel";
		// @ts-ignore
		pieSeries2.slices.template.states.getKey("hover").properties.shiftRadius = 0;
		// @ts-ignore
		pieSeries2.slices.template.states.getKey("hover").properties.scale = 1;
		pieSeries2.slices.template.propertyFields.fill = "fill";
		
		pieSeries2.ticks.template.disabled = true;
		pieSeries2.labels.template.disabled = true;

		// Add data
		pieSeries2.data = [{
			"stressLevel": "休息",
			"value": 100,
			"fill": "#42c5f5"
		},{
			"stressLevel": "低",
			"value": 30,
			// "fill": "#f5d442"
			"fill": "#f0c060"
		}, {
			"stressLevel": "中",
			"value": 20,
			"fill": "#f59e42"
		}, {
			"stressLevel": "高",
			"value": 10,
			"fill": "#f56642"
		}];


		// pieSeries.adapter.add("innerRadius", function(innerRadius, target){
		// 	return am4core.percent(40);
		// })

		pieSeries2.adapter.add("innerRadius", function(innerRadius, target){
			return am4core.percent(60);
		})

		// pieSeries.adapter.add("radius", function(innerRadius, target){
		// 	return am4core.percent(100);
		// })

		pieSeries2.adapter.add("radius", function(innerRadius, target){
			return am4core.percent(80);
		})

		chart.legend = new am4charts.Legend();
		chart.legend.position = "right";

		// @ts-ignore
		this.chart = chart;
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

export default MyHealthDataAmCharts;

