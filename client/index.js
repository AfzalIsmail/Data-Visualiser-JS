"use strict";

import ReadFile from './readFile.js';

export let file = null;

function initialise(){
    file = new ReadFile();
    file.extractData();
}

initialise();


export default function displayStats(){
    console.log(file);
}