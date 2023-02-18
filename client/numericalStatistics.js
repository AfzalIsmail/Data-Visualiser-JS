import Statistics from "./statistics.js";

const decimalPlaces = 3;

export default class NumericalStatistics extends Statistics{

    constructor(data, columnName, numRows){
        super(data, columnName, numRows);

        this.data = data;
        this.columnName = columnName;
        this.numRows = numRows;
        this.sum = 0;
        this.median = 0;
        this.mean = 0;
        this.min = Infinity;
        this.max = 0;
        this.variance = 0;
        this.stdDeviation = 0;
        // this.missingValues = getMisssingValues();
    }

    // TODO: sum, mean, median, variance, st deviation, min, max

    getStats(){
        this.#calculateBasicStats();
        this.#calculateVariance();
        this.#calculateStdDeviation();

        return {"Missing values": this.getMissingValues(), "Sum": this.sum.toFixed(decimalPlaces), "Mean": this.mean.toFixed(decimalPlaces), "Median": this.median.toFixed(decimalPlaces), "Min": this.min, "Max": this.max, "Variance": this.variance.toFixed(decimalPlaces), "Standard Deviation": this.stdDeviation.toFixed(decimalPlaces)}
    }

    #calculateBasicStats(){

        let dataArray = [];
        let sortedDataArray = [];

        this.data.forEach(dataRow => {
            if(dataRow[this.columnName] == null || dataRow[this.columnName] == ""){
                // dataArray.push(0);
                // sortedDataArray.push(0);
            } else {
                const current = parseFloat(dataRow[this.columnName]);
                dataArray.push(current);
                sortedDataArray.push(current);
                this.sum += current;

                if(current < this.min){
                    this.min = current;
                }

                if(current > this.max){
                    this.max = current;
                }

            }
        });

        this.mean = this.sum/this.numRows;

        sortedDataArray.sort(function(a, b){return a - b});

        const midpoint = Math.ceil(sortedDataArray.length / 2) - 1;

        if(sortedDataArray.length%2 === 1){
            this.median = sortedDataArray[midpoint];
        } else {
            this.median = (sortedDataArray[midpoint + 1] + sortedDataArray[midpoint]) / 2;
        }

    }

    #calculateVariance(){
        let sumData = 0;

        this.data.forEach(value => {
            if(value[this.columnName] == null || value[this.columnName].length == 0){
                
            } else {

                const currentVal = parseFloat(value[this.columnName]);
                const difference = this.mean - currentVal;
                const differenceSquare = difference ** 2;
                sumData += differenceSquare;
            }
        });

        this.variance = sumData/this.numRows;
    }

    #calculateStdDeviation(){
        this.stdDeviation = Math.sqrt(this.variance);
    }




}