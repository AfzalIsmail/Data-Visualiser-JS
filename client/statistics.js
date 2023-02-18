export default class Statistics{

    constructor(data, columnName, numRows){
        this.data = data;
        this.columnName = columnName;
        this.numRows = numRows;
        this.missingValues = 0;
    }

    getMissingValues(){
        // let numberMissing = 0;

        this.data.forEach(dataRow => {
            if(dataRow[this.columnName] == null || dataRow[this.columnName] == ""){
                this.missingValues += 1;
                // console.log(dataRow[this.columnName]);
            }
        });

        return this.missingValues;

    }


}