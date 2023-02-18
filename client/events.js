import { file } from "./index.js";
import displayStats from "./index.js";

jQuery(document).ready(function ($) {

    $(".nav-import-data").click(function(e){
        e.preventDefault();
        $(".choose-file-form-content").addClass("display-form");
    });

    $(".choose-file-form-close").click(function(e){
        $(".choose-file-form-content").removeClass("display-form");
        
    });

    $("#chooseFile").submit(function(e){
        // e.preventDefault();
        // $(".choose-file-form-content").removeClass("display-form");
        $("#choose-columns").addClass("display");
        $(this).addClass("hide-form");
    });

    $("#choose-columns").submit(function(e){
        $(".choose-file-form-content").removeClass("display-form");
    });

    // Display stats in Statistics area
    $(document).on("click",".data-table-tab-main-container .column-name" ,function (e) { 

        const metaTable = $(".visualiser-statistics-container ul.meta-container");
        const statsTable = $(".visualiser-statistics-container ul.stats-container");
        $(metaTable).empty();
        $(statsTable).empty();

        console.log("click");
        const dataMeta = $(this).attr("data-meta");
        const dataStats = $(this).attr("data-stats");

        const parsedDataMeta = JSON.parse(dataMeta);
        const parsedDataStats = JSON.parse(dataStats);
        console.log(JSON.parse(dataMeta));
        console.log(JSON.parse(dataStats));

        $('<li class="meta-row"><div>File Name</div><div>' + parsedDataMeta["Data File"]["name"] + '</div></li>').appendTo(metaTable);
        $('<li class="meta-row"><div>Column Name</div><div>' + parsedDataMeta["Column Name"] + '</div></li>').appendTo(metaTable);
        $('<li class="meta-row"><div>Data Type</div><div>' + parsedDataMeta["Data Type"] + '</div></li>').appendTo(metaTable);
        $('<li class="meta-row"><div>Data Length</div><div>' + parsedDataMeta["Data File"]["numRows"] + '</div></li>').appendTo(metaTable);

        for(const [stat, value] of Object.entries(parsedDataStats)){
            if(stat === "Distinct Values"){
                $(`<li class="stat-row distinct-values"><div class="stat-header">Distinct Value(s)</div></li>`).appendTo(statsTable);
                for(const [s, v] of Object.entries(parsedDataStats[stat])){
                    $(`<li class="stat-row distinct-value"><div class="stat-header">${s}</div><div class="stat-value">${v}</div></li>`).appendTo(statsTable);
                }
            } else {
                $(`<li class="stat-row"><div class="stat-header">${stat}</div><div class="stat-value">${value}</div></li>`).appendTo(statsTable);
            }
        }

        // console.log(file); 
        // diplayStats();
    });

    
});