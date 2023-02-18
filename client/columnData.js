import CategoricalStatistics from "./categoricalStatistics.js";
import NumericalStatistics from "./numericalStatistics.js";

export default class ColumnData{

    constructor(columnName, data, dataFile){
        this.columnName = columnName;
        this.data = data;
        this.dataFile = dataFile;
        this.dataType = this.getDataType();

    }

    getMeta(){
        return {"Column Name": this.columnName, "Data File": this.dataFile, "Data Type": this.dataType}
    }

    getStats(){

        if(this.dataType === "Number"){
            return this.getNumericalStats();
        } else {
            return this.getCategoricalStats();
        }

    }

    getNumericalStats(){
        console.log("Numerical stats");
        const numStats = new NumericalStatistics(this.data, this.columnName, this.dataFile.numRows);
        // let test = numStats.getMissingValues();
        // console.log(test);
        // console.log(this.dataType);
        const numStatValues = numStats.getStats();
        console.log(numStatValues);
        return numStatValues;
    }

    getCategoricalStats(){
        console.log("Categorical stats");
        // console.log(this.dataType);
        const catStats = new CategoricalStatistics(this.data, this.columnName, this.dataFile.numRows);
        const catStatsValues = catStats.getStats();
        console.log(catStatsValues);
        return catStatsValues;
    }

    getDataType(){
        let rowCount = 0;

        if(this.dataFile.numRows < 100){
            rowCount = this.dataFile.numRows;
        } else {
            rowCount = 100;
        }

        let floatCount = 0;
        let stringCount = 0;
        let boolCount = 0;

        for(let i = 0; i < rowCount; i++){
            let current = this.data[i][this.columnName];
            let parsed = parseFloat(current);
            let rowDataCount = rowCount;

            if(current == null || current == ""){
                rowDataCount--;
                // console.log("null");
                continue;
            } else {
                // console.log("not null");
                if(isNaN(parsed)){
                    // console.log("parsed");
                    if(current.toLowerCase() == "false" || current.toLowerCase() == "true"){
                        boolCount++;
    
                        if(boolCount == rowDataCount - 1){
                            return "Boolean";
                        }
                    } else {
                        return "String";
                    }
    
                } else {
                    floatCount++;
    
                    if(floatCount == rowDataCount - 1){
                        return "Number";
                    }
    
                }

            }

            // console.log(floatCount);
            
        }

    }

}