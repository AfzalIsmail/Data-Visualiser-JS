import Statistics from "./statistics.js";

export default class CategoricalStatistics extends Statistics{
    
    constructor(data, columnName, numRows){
        super(data, columnName, numRows);

        this.data = data;
        this.columnName = columnName;
        this.numRows = numRows;

        this.distinctValues = new Map();
        this.numberElements = 0;
    }
    
    // TODO: get distinct values, mode

    getStats(){
        this.#calculateBasicStats();

        return ({"Missing values": this.getMissingValues(),"Number of elements": this.numberElements, "Distinct Values": Object.fromEntries(this.distinctValues)})
    }

    #calculateBasicStats(){
        this.data.forEach(dataRow => {
            const current = dataRow[this.columnName];

            if(current == null || current == ""){
                // dataArray.push(0);
                // sortedDataArray.push(0);
            } else {

                if(this.distinctValues.has(current)){

                    const currentAmount = this.distinctValues.get(current);
                    this.distinctValues.set(current, currentAmount + 1);

                } else {

                    this.distinctValues.set(current, 1);

                }

            }

            this.numberElements = this.distinctValues.size;
        });
    }
}