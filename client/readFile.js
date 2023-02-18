import DataFile from "./dataFile.js";
import ColumnData from "./columnData.js";

export default class ReadFile{

    constructor(){
        this.dataFile = new DataFile;
        this.data = null;
        this.selectedColumns = [];
    }

    addTab(){
        const tableTabNames = document.getElementById("data-table-tab-names");
        const $this = this;

        let tabName = document.createElement("div");
        tabName.setAttribute('class', 'tab-name');
        tabName.setAttribute('data-info', JSON.stringify(this.dataFile));
        tabName.innerHTML = `
            <p>${this.dataFile.name}</p>
        `;
        tableTabNames.appendChild(tabName);

        const tableTabContents = document.getElementById("data-table-tab-contents");

        let tabContent = document.createElement("div");
        tabContent.setAttribute('class', 'tab-content');
        
        let tabTable = document.createElement("table");
        tabContent.appendChild(tabTable);

        let tabHeaders = document.createElement("thead");
        tabTable.appendChild(tabHeaders);

        let tabHeadersRow = document.createElement("tr");
        tabHeaders.appendChild(tabHeadersRow);

        let tabBody = document.createElement("tbody");
        tabTable.appendChild(tabBody);

        this.selectedColumns.forEach(colName => {
            let tabHeaderName = document.createElement("th");
            tabHeaderName.innerHTML = colName;
            tabHeaderName.setAttribute("class", "column-name")
            tabHeadersRow.appendChild(tabHeaderName);

            let stats = new ColumnData(colName, $this.data, this.dataFile);
            // let colStats = stats.getStats();
            // stats.getDataType();
            // stats.getStats();
            

            tabHeaderName.setAttribute("data-meta", JSON.stringify(stats.getMeta()));
            tabHeaderName.setAttribute("data-stats", JSON.stringify(stats.getStats()));
        });

        let rowLimit = 100;

        this.data.every((row) => {
            if(rowLimit > 0){
                let dataRow = document.createElement("tr");

                $this.selectedColumns.forEach((colName) => {
                    let dataAttribute = document.createElement("td");
                    dataAttribute.innerHTML = row[colName];
                    dataRow.appendChild(dataAttribute);
                });
                tabBody.appendChild(dataRow);

                rowLimit--;
                return true;
            } else {
                return false;
            }
        });

        tableTabContents.appendChild(tabContent);

    }

    displayColumnChoice(){

        let choiceForm = document.getElementById("choose-columns");

        const $this = this;

        this.dataFile.columnNames.forEach(name => {
            let columnNameChoice = document.createElement("input");
            columnNameChoice.setAttribute('type', 'checkbox');
            columnNameChoice.setAttribute('id', name.toLowerCase());
            columnNameChoice.setAttribute('value', name);

            let columnNameLabel = document.createElement("label");
            columnNameLabel.setAttribute('for', name.toLowerCase());
            columnNameLabel.innerHTML = name;

            choiceForm.append(columnNameChoice, columnNameLabel);
        });

        choiceForm.addEventListener("submit", function(e){
            e.preventDefault();
            let choiceSelected = document.querySelectorAll("#choose-columns input:checked");
            // let selectedColumns = [];
            choiceSelected.forEach((checkbox) => {
                $this.selectedColumns.push(checkbox.value);
            });
            $this.addTab();

        });
    }


    extractData() {
        const fileForm = document.getElementById("chooseFile");
        const csvFile = document.getElementById("csvFile");

        // const fileSelector = document.getElementById('file-selector');
        // fileSelector.addEventListener('change', (event) => {
        //     const fileList = event.target.files;
        //     console.log(fileList);
        // });

        const $this = this;

        fileForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const input = csvFile.files[0];
            const reader = new FileReader();

            // this.dataFile = new DataFile();

            reader.onload = function (e) {
                const text = e.target.result;
                $this.data = d3.csvParse(text);

                $this.dataFile.name = input.name;
                const cols = Object.keys($this.data[0]);
                $this.dataFile.columnNames = cols;
                $this.dataFile.numColumns = cols.length;
                $this.dataFile.numRows = $this.data.length;
                $this.displayColumnChoice();
            };
            
            reader.readAsText(input);
            
        });

    }

}