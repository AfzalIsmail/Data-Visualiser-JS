import { file } from "./index.js";
import getCorrelationCoefficient from "./correlationCoefficient.js";
import CorrelationCoefficient from "./correlationCoefficient.js";

const chartArea = document.getElementById("visualiser-charts-container");
const choiceColChartForm = document.getElementById("choose-col-chart");
let selection = [];
let dataTypes = new Map();

jQuery(document).ready(function ($) {

    $(".choose-chart-form-close").click(function(e){
        $(".choose-chart-form-content").removeClass("display-form");
        
    });
    
    $(".nav-display-charts").click(function(){
        console.log(file);
        $(".choose-chart-form-content").addClass("display-form");


        const $this = this;

        file.selectedColumns.forEach(name => {
            let columnNameChoice = document.createElement("input");
            columnNameChoice.setAttribute('type', 'checkbox');
            columnNameChoice.setAttribute('id', name.toLowerCase());
            columnNameChoice.setAttribute('value', name);

            let columnNameLabel = document.createElement("label");
            columnNameLabel.setAttribute('for', name.toLowerCase());
            columnNameLabel.innerHTML = name;

            choiceColChartForm.append(columnNameChoice, columnNameLabel);
        });

        let columnNameSubmit = document.createElement("input");
        columnNameSubmit.setAttribute('type', 'submit');
        columnNameSubmit.setAttribute('value', 'Select');
        choiceColChartForm.append(columnNameSubmit);
    });

    choiceColChartForm.addEventListener("submit", function(e){
        e.preventDefault();

        $(choiceColChartForm).addClass("hide-form");

        let choiceSelected = document.querySelectorAll("#choose-col-chart input:checked");

        choiceSelected.forEach((checkbox) => {
            selection.push(checkbox.value);
        });

        $("th.column-name").each(function(){
            let temp = $(this).text();
            const $this = $(this);

            selection.forEach(value => {
                if(value === temp){
                    const type = $($this).attr("data-meta");
                    if(dataTypes.has(JSON.parse(type)["Data Type"])){
                        dataTypes.set(JSON.parse(type)["Data Type"], [...dataTypes.get(JSON.parse(type)["Data Type"]), value]);
                    } else {
                        dataTypes.set(JSON.parse(type)["Data Type"], [value]);
                    }
                }
            });
        });

        console.log(dataTypes);

        $("form#choose-chart").addClass("display");

        if(dataTypes.has("Number")){
            if(dataTypes.get("Number").length > 1){
                $("<input type='button' value='Scatter Chart' id='scatter-chart'>").appendTo("form#choose-chart");
            }
        }

        if(dataTypes.has("String")){
            if(dataTypes.get("String").length >= 1){
                $("<input type='button' value='Bar Chart' id='bar-chart'>").appendTo("form#choose-chart");
                $("<input type='button' value='Pie Chart' id='pie-chart'>").appendTo("form#choose-chart");
            }
        }
        
    });

    $(document).on("click", "form#choose-chart input[type='button']", function(e){
        $(".choose-chart-form-content").removeClass("display-form");
        $(".visualiser-charts-container").empty();
    });

    $(document).on("click", "form#choose-chart input#scatter-chart", function(e){
        console.log("Display scatter chart");
        displayScatterChart();
    });

    $(document).on("click", "form#choose-chart input#bar-chart", function(e){
        console.log("Display bar chart");
        displayBarChart();
    });

    $(document).on("click", "form#choose-chart input#pie-chart", function(e){
        console.log("Display pie chart");
        displayPieChart();
    });

    function displayScatterChart(){

        const dataArray = dataTypes.get("Number");

        for(let i = 0; i < dataArray.length; i++){
            let nextPos = i + 1;
            if(nextPos >= dataArray.length){
                nextPos = 0;
            }

            $("<div id=" + dataArray[i] + "v" + dataArray[nextPos] + "></div>").appendTo(chartArea);

            let xdata = [];
            let ydata = [];

            file["data"].forEach(value => {
                // console.log(value);
                xdata.push(value[dataArray[i]]);
                ydata.push(value[dataArray[nextPos]]);
            });

            let chartData = [{
                x:xdata,
                y:ydata,
                mode:"markers",
                type:"scatter"
            }];

            let chartLayout = {
                xaxis: {title: dataArray[i]},
                yaxis: {title: dataArray[nextPos]},  
                title: dataArray[i] + " vs. " + dataArray[nextPos]
            };

            Plotly.newPlot(dataArray[i] + "v" + dataArray[nextPos], chartData, chartLayout);
            
            // const correlation = new CorrelationCoefficient(xdata, ydata);

            // const currentChart = $(".visualiser-charts-container #" + dataArray[i] + "v" + dataArray[nextPos])
            // $("<div class='correlation-coefficient'><p>Correlation Coefficient: " + correlation.getCorrelationCoefficient() + "</p></div>").appendTo(currentChart);
        }

    }

    function displayBarChart(){
        const dataArray = dataTypes.get("String");

        for(let i = 0; i < dataArray.length; i++){
            $("<div id=" + dataArray[i] + "-bar-chart" + "></div>").appendTo(chartArea);

            let xdata = [];
            let ydata = [];

            $("th.column-name").each(function(){
                let temp = $(this).text();
                const $this = $(this);    
                
                if(dataArray[i] === temp){
                    const stats = $($this).attr("data-stats");
                    const distinct = JSON.parse(stats)["Distinct Values"];
                    console.log(distinct);

                    for(const [key, value] of Object.entries(distinct)){
                        xdata.push(key);
                        ydata.push(value);
                    }

                    const data = [{
                        x: xdata,
                        y: ydata,
                        type: "bar"
                    }];

                    const layout = {title: dataArray[i] + " Bar Chart"}

                    Plotly.newPlot(dataArray[i] + "-bar-chart", data, layout);
                }

            });
        }

    }

    function displayPieChart(){
        const dataArray = dataTypes.get("String");

        for(let i = 0; i < dataArray.length; i++){
            $("<div id=" + dataArray[i] + "-pie-chart" + "></div>").appendTo(chartArea);

            let xdata = [];
            let ydata = [];

            $("th.column-name").each(function(){
                let temp = $(this).text();
                const $this = $(this);    
                
                if(dataArray[i] === temp){
                    const stats = $($this).attr("data-stats");
                    const distinct = JSON.parse(stats)["Distinct Values"];
                    console.log(distinct);

                    for(const [key, value] of Object.entries(distinct)){
                        xdata.push(key);
                        ydata.push(value);
                    }

                    const data = [{
                        labels: xdata,
                        values: ydata,
                        type: "pie"
                    }];

                    const layout = {title: dataArray[i] + " Pie Chart"}

                    Plotly.newPlot(dataArray[i] + "-pie-chart", data, layout);
                }

            });
        }

    }

});