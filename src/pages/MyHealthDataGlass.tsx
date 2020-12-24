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

let iconPath = "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"



let chart = am4core.create("chartdiv", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = [{
    "name": "The first",
    "value": 354
}, {
    "name": "The second",
    "value": 245
}, {
    "name": "The third",
    "value": 187
}, {
    "name": "The fourth",
    "value": 123
}, {
    "name": "The fifth",
    "value": 87
}, {
    "name": "The sixth",
    "value": 45
}, {
    "name": "The seventh",
    "value": 23
}];

let series = chart.series.push(new am4charts.PictorialStackedSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;

series.maskSprite.path = iconPath;
series.ticks.template.locationX = 1;
series.ticks.template.locationY = 0.5;

series.labelsContainer.width = 200;

chart.legend = new am4charts.Legend();
chart.legend.position = "left";
chart.legend.valign = "bottom";


am4core.useTheme(am4themes_animated);

class MyHealthDataGlass extends Component {

  initGlass = () => {
    am4core.useTheme(am4themes_animated);
    // Themes end

    let iconPath = "M256.814,72.75c0-26.898-10.451-52.213-29.43-71.277C226.444,0.529,225.17,0,223.84,0H87.712c-1.329,0-2.604,0.529-3.543,1.473c-18.978,19.064-29.43,44.379-29.43,71.277c0,50.615,37.414,92.654,86.037,99.922v108.88h-21.25c-8.271,0-15,6.729-15,15c0,8.271,6.729,15,15,15h72.5c8.271,0,15-6.729,15-15c0-8.271-6.729-15-15-15h-21.25v-108.88C219.399,165.404,256.814,123.365,256.814,72.75z M106.709,120.879c-1.234,1.083-2.765,1.615-4.285,1.615c-1.807,0-3.604-0.748-4.888-2.212c-13.153-14.986-18.888-34.832-15.733-54.451c0.571-3.543,3.902-5.956,7.45-5.385c3.544,0.57,5.955,3.905,5.386,7.45c-2.538,15.779,2.079,31.747,12.667,43.811C109.674,114.404,109.406,118.511,106.709,120.879z M144.351,136.662c-0.514,3.194-3.274,5.468-6.409,5.468c-0.343,0-0.69-0.027-1.041-0.083c-6.937-1.117-13.6-3.299-19.804-6.488c-3.193-1.641-4.451-5.559-2.811-8.752c1.641-3.194,5.563-4.451,8.752-2.81c4.985,2.562,10.345,4.317,15.929,5.215C142.511,129.782,144.922,133.118,144.351,136.662z";

    let chart = am4core.create("chartdiv", am4charts.SlicedChart);
    chart.paddingTop = am4core.percent(10);

    chart.data = [{
      "name": "休息",
      "value": 600,
      "color": am4core.color("#42c5f5")
    }, {
      "name": "低",
      "value": 100,
      "color": am4core.color("#f5d442")
    }, {
      "name": "中",
      "value": 50,
      "color": am4core.color("#f59e42")
    }, {
      "name": "高",
      "value": 30,
      "color": am4core.color("#f56642")
    }];

    let series = chart.series.push(new am4charts.PictorialStackedSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "name";
    series.startLocation = 0.3
    series.endLocation = 0.85

    series.slicesContainer.background.fill = am4core.color("#676767")
    series.slicesContainer.background.fillOpacity = 0.2;

    series.maskSprite.path = iconPath;

    series.labelsContainer.width = am4core.percent(100);
    series.alignLabels = true;
    series.slices.template.propertyFields.fill = "color";
    series.slices.template.propertyFields.stroke = "color";

    let gradientModifier = new am4core.LinearGradientModifier();
    gradientModifier.lightnesses = [0.2, -0.7];
    series.slices.template.fillModifier = gradientModifier;
    series.slices.template.strokeModifier = gradientModifier;

    // this makes the fills to start and end at certain location instead of taking whole picture
    series.endLocation = 0.553;
    series.startLocation = 0.1;
    // this makes initial fill animation
    series.hiddenState.properties.startLocation = 0.553;
    series.ticks.template.locationX = 0.7;
    series.labelsContainer.width = 120;

    let sliderContainer = chart.createChild(am4core.Container);
    sliderContainer.marginTop = am4core.percent(5);
    sliderContainer.width = am4core.percent(80);
    sliderContainer.align = "center";
    sliderContainer.paddingRight = 120;


    let label = sliderContainer.createChild(am4core.Label);
    label.text = "move me!";
    label.dy = -40;
    label.isMeasured = false;

    let slider = sliderContainer.createChild(am4core.Slider);
    slider.start = 0;
    slider.background.fill = am4core.color("#676767");
    slider.background.fillOpacity = 0.2;

    // doing it later for animation to finish
    setTimeout(initSlider, 1500);

    function initSlider(){
        slider.events.on("rangechanged", function(){
            series.startLocation = 0.1 + (0.553 - 0.1) * slider.start;
            // @ts-ignore
            series.dataItems.getIndex(0).value = (1 - slider.start) * 200;
            slider.background.fill = new am4core.Color(am4core.colors.interpolate(am4core.color("#676767").rgb, am4core.color("#7b131c").rgb, slider.start));
            slider.background.fillOpacity = 0.2 + slider.start * 0.8;

            blurFilter.blur = slider.start * 5;
        })
    }

    let title = chart.createChild(am4core.Label);
    title.text = "Sorts of wine I drank yesterday"
    title.fontSize = 20;
    title.fill = am4core.color("#390511");
    title.isMeasured = false;
    title.x = am4core.percent(100);
    title.horizontalCenter = "right";
    title.fontWeight = "600";

    let blurFilter = new am4core.BlurFilter();
    blurFilter.blur = 0;
    title.filters.push(blurFilter);
    // @ts-ignore
    this.chart = chart;
  }
  componentDidMount() {
    this.initGlass()
    // let chart = am4core.create("chartdiv", am4charts.XYChart);

    // chart.paddingRight = 20;

    // let data = [];
    // let visits = 10;
    // for (let i = 1; i < 366; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    // }

    // chart.data = data;

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // // @ts-ignore
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 35;

    // let series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = "date";
    // series.dataFields.valueY = "value";

    // series.tooltipText = "{valueY.value}";
    // chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;
    // // @ts-ignore
    // this.chart = chart;

    /* Chart code */
    // Themes begin
  
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
                <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
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

export default MyHealthDataGlass;

// const MyHealthData: React.FC<MyHealthDataProps> = ({history}) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const chart = useRef(null);

//   useLayoutEffect(() => {
//     let x = am4core.create("chartdiv", am4charts.XYChart);

//     x.paddingRight = 20;

//     let data = [];
//     let visits = 10;

//     data = [{
//       "name": "Pinot Noir",
//       "value": 200,
//       "color": am4core.color("#390511")
//     }, {
//       "name": "Primitivo",
//       "value": 300,
//       "color": am4core.color("#7b131c")
//     }];

//     x.data = data;

//     // let dateAxis = x.xAxes.push(new am4charts.DateAxis());
//     // dateAxis.renderer.grid.template.location = 0;

//     // let valueAxis = x.yAxes.push(new am4charts.ValueAxis());
//     // // @ts-ignore
//     // valueAxis.tooltip.disabled = true;
//     // valueAxis.renderer.minWidth = 35;

//     // let series = x.series.push(new am4charts.LineSeries());
//     // series.dataFields.dateX = "date";
//     // series.dataFields.valueY = "value";
//     // series.tooltipText = "{valueY.value}";
//     // x.cursor = new am4charts.XYCursor();

//     // let scrollbarX = new am4charts.XYChartScrollbar();
//     // scrollbarX.series.push(series);
//     // x.scrollbarX = scrollbarX;
    
//     // @ts-ignore
//     let series = x.series.push(new am4charts.PictorialStackedSeries());
//     series.dataFields.value = "value";
//     // @ts-ignore
//     series.dataFields.category = "name";
//     // @ts-ignore
//     series.startLocation = 0.3
//     // @ts-ignore
//     series.endLocation = 0.85

//     // @ts-ignore
//     series.slicesContainer.background.fill = am4core.color("#676767")
//     // @ts-ignore
//     series.slicesContainer.background.fillOpacity = 0.2;
//     // @ts-ignore
//     series.maskSprite.path = iconPath;
//     // @ts-ignore
//     series.labelsContainer.width = am4core.percent(100);
//     // @ts-ignore
//     series.alignLabels = true;
//      // @ts-ignore
//     series.slices.template.propertyFields.fill = "color";
//      // @ts-ignore
//     series.slices.template.propertyFields.stroke = "color";

//     let gradientModifier = new am4core.LinearGradientModifier();
//     gradientModifier.lightnesses = [0.2, -0.7];
//      // @ts-ignore
//     series.slices.template.fillModifier = gradientModifier;
//      // @ts-ignore
//     series.slices.template.strokeModifier = gradientModifier;

//     // this makes the fills to start and end at certain location instead of taking whole picture
//      // @ts-ignore
//     series.endLocation = 0.553;
//      // @ts-ignore
//     series.startLocation = 0.1;
//     // this makes initial fill animation
//      // @ts-ignore
//     series.hiddenState.properties.startLocation = 0.553;
//      // @ts-ignore
//     series.ticks.template.locationX = 0.7;
//      // @ts-ignore
//     series.labelsContainer.width = 120;

//     let sliderContainer = x.createChild(am4core.Container);
//     sliderContainer.marginTop = am4core.percent(5);
//     sliderContainer.width = am4core.percent(80);
//     sliderContainer.align = "center";
//     sliderContainer.paddingRight = 120;


//     let label = sliderContainer.createChild(am4core.Label);
//     label.text = "move me!";
//     label.dy = -40;
//     label.isMeasured = false;

//     let slider = sliderContainer.createChild(am4core.Slider);
//     slider.start = 0;
//     slider.background.fill = am4core.color("#676767");
//     slider.background.fillOpacity = 0.2;

//     // doing it later for animation to finish
//     setTimeout(initSlider, 1500);

//     function initSlider(){
//         slider.events.on("rangechanged", function(){
//             // @ts-ignore
//             series.startLocation = 0.1 + (0.553 - 0.1) * slider.start;
//             // @ts-ignore
//             console.log('---->dataItems', series.dataItems);
//             // @ts-ignore
//             series.dataItems.getIndex(0).value = (1 - slider.start) * 200;
//             slider.background.fill = new am4core.Color(am4core.colors.interpolate(am4core.color("#676767").rgb, am4core.color("#7b131c").rgb, slider.start));
//             slider.background.fillOpacity = 0.2 + slider.start * 0.8;

//             blurFilter.blur = slider.start * 5;
//         })
//     }

//     let title = x.createChild(am4core.Label);
//     title.text = "Sorts of wine I drank yesterday"
//     title.fontSize = 20;
//     title.fill = am4core.color("#390511");
//     title.isMeasured = false;
//     title.x = am4core.percent(100);
//     title.horizontalCenter = "right";
//     title.fontWeight = "600";

//     let blurFilter = new am4core.BlurFilter();
//     blurFilter.blur = 0;
//     title.filters.push(blurFilter);


//     // @ts-ignore
//     chart.current = x;

//     return () => {
//       x.dispose();
//     };
//   }, []);

//   return (
//     <IonPage id="myHealthData-page">
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton></IonMenuButton>
//           </IonButtons>
//           <IonTitle>我的健康数据</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
// 				<IonCard>
// 					<IonCardHeader>
// 						{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
// 						<IonCardTitle>压力</IonCardTitle>
// 					</IonCardHeader>

// 					<IonCardContent>
//               <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
// 							<div>2020-12-04</div>
// 					</IonCardContent>
//         </IonCard>

// 				<IonCard>
//           <IonItem>
//             <IonIcon slot="start" />
//             <IonLabel>ion-item in a card, icon left, button right</IonLabel>
//             <IonButton fill="outline" slot="end">View</IonButton>
//           </IonItem>

//           <IonCardContent>
//             This is content, without any paragraph or header tags,
//             within an ion-cardContent element.
//       		</IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
    
//   );


//   return (
//     <IonPage id="myHealthData-page">
//       <IonHeader>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton></IonMenuButton>
//           </IonButtons>
//           <IonTitle>我的健康数据</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent>
// 				<IonCard>
// 					<IonCardHeader>
// 						{/* <IonCardSubtitle>压力</IonCardSubtitle> */}
// 						<IonCardTitle>压力</IonCardTitle>
// 					</IonCardHeader>

// 					<IonCardContent>
// 							Keep close to Nature's heart... and break clear away, once in awhile,
// 							and climb a mountain or spend a week in the woods. Wash your spirit clean.
// 							<div>2020-12-04</div>
// 					</IonCardContent>
//         </IonCard>

// 				<IonCard>
//           <IonItem>
//             <IonIcon slot="start" />
//             <IonLabel>ion-item in a card, icon left, button right</IonLabel>
//             <IonButton fill="outline" slot="end">View</IonButton>
//           </IonItem>

//           <IonCardContent>
//             This is content, without any paragraph or header tags,
//             within an ion-cardContent element.
//       		</IonCardContent>
//         </IonCard>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default connect<OwnProps, {}, DispatchProps>({
//   mapDispatchToProps: {
//   },
//   component: MyHealthData
// })


