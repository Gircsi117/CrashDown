"use strict";
const CONTAIENR = document.querySelector(".container");
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;
if (WINDOW_WIDTH > WINDOW_HEIGHT)
    CONTAIENR.style.height = `100%`;
else
    CONTAIENR.style.width = `100%`;
