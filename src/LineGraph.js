import React , {useEffect,useState} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display:false,
    },
    elements:{
        points:{
            radius:0
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function (tooltipItem,data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },

    scales:{
        xAxes:[
            {
                type:"time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat:"ll",
                },
            },
        ],


        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    //Include a dollar sigh in ticks 
                    callback:function(value,index,values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },

};

    const buildChartData = (data,casestype = 'cases') => {
        let chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if (lastDataPoint) {
                let newDataPoint = {
                    x:date,
                    //Logic to generate NewCases todays Cases - Yesterdays Cases;
                    y:data[casestype][date] - lastDataPoint,


                };

                chartData.push(newDataPoint);
                
            }
            lastDataPoint = data[casestype][date];
        };
        return chartData;
    };

function LineGraph({casestype = 'cases',...props}) {

    const [data,setData] = useState({});

    
    useEffect(() => {

        const fetchData = async () => {

        await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => {
          return response.json();
        })
        .then((data) => {

            let chartData = buildChartData(data,casestype); 
            setData(chartData);

        });

        };

       fetchData();


        
    }, [casestype]);

    



  return (
    <div className={props.className}>

    {data?.length > 0 && (

        <Line 
    options={options}
    data={
        {
            datasets : [{
                backgroundColor:"rgba(204,16,52,0.5)",
                borderColor:"#CC1034",
                data:data,
            },
            ],
        }
    }
     />
    )}

    
      
    </div>
  );
}

export default LineGraph;
