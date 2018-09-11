import {buildUI, codeColors, colorCodes, setCubeColor} from "./ui_helpers.js";
import {Cube, cubeSides} from "./cube.js";

var permutations = ["T", "D", "F", "B", "L", "R", "T'", "D'", "F'", "B'", "L'", "R'"];

// TODO: check if color combination invalid
function ready() {
    // reset color-picker selected style
    var pickerColors = document.getElementsByClassName("picker-color");
    for (let c of pickerColors) c.style.borderColor = "#fff";

    // remove color-setting event listener
    //var colors = document.getElementsByClassName("color");
    //for (let color of colors) color.removeEventListener("click", setCubeColor);

    // create cube data-structure and return Cube class
    var cubeColors = {}
    for (let side of cubeSides) {
        let colors = [];
        for (let i = 0; i < 4; i++) {
            let color = document.getElementById(side+"-"+i).style.backgroundColor;
            colors.push(colorCodes[color]);
        }
        cubeColors[side] = colors;
    }
    //document.getElementById('ready').disabled = true;
    document.body.appendChild(document.createTextNode("Solving, this might take a while... "));
    setTimeout(solve, 0, new Cube(cubeColors));
}

function updateDOMCube(newColors) {
    for (const side of ["top", "down", "front", "back", "left", "right"]) {
        for (let i = 0; i < 4; i++) {
            document.getElementById(side+"-"+i).style.backgroundColor = codeColors[newColors[side][i]];
        }
    }
}

function makePermutation(cube, perm) {
    switch (perm) {
        case "T":
            return cube.top();
        
        case "D":
            return cube.down();
        
        case "F":
            return cube.front();
        
        case "B":
            return cube.back();
        
        case "L":
            return cube.left();

        case "R":
            return cube.right();
        
        case "T'":
            return cube.topR();
        
        case "D'":
            return cube.downR();

        case "F'":
            return cube.frontR();
        
        case "B'":
            return cube.backR();

        case "L'":
            return cube.leftR();

        case "R'":
            return cube.rightR();
    }
}

function reversePermuationStr(permuationStr) {
    var reverse = [];

    var wasInv = false;
    for (let i = permuationStr.length-1; i >= 0; i--) {
        if (permuationStr.charAt(i) == "'") {
            wasInv = true;
            continue;
        }
        if (wasInv) {
            reverse.push(permuationStr.charAt(i));
        } else {
            reverse.push(permuationStr.charAt(i) + "'");
        }
        wasInv = false;
    }

    return reverse.join();
}

function stateStr(cubeColors) {
    var state = "";
    for (let i = 0; i < 6; i++) state += cubeColors[cubeSides[i]].join() + ",";
    return state;
}

function solve(cube) {
    var DOMCubeStateStr = stateStr(cube.cubeColors);

    var solvedColors = {};
    let i = 1;
    for (const side of cubeSides) {
        solvedColors[side] = [i, i, i, i];
        i++;
    }

    var oldStates = []
    var newStates = [solvedColors];
    var oldStatePermutations = [];
    var newStatePermutations = [""];
    
    var stateSolutions = {};
    stateSolutions[stateStr(solvedColors)] = "FINISHED!";
    
    // breadth-first search
    while (true) {
        oldStates = newStates;
        newStates = [];
        oldStatePermutations = newStatePermutations;
        newStatePermutations = [];
        
        for (let i = 0; i < oldStates.length; i++) {
            let oldState = oldStates[i];
            let oldStatePermStr = oldStatePermutations[i];

            for (const p of permutations) {
                // make new permutation
                let newState = makePermutation(new Cube(oldState), p);
                let newStateStr = stateStr(newState);
                let newStatePermStr = oldStatePermStr + p;

                // continue if solution for state exists            
                if (newStateStr in stateSolutions) continue;
                if (newStateStr == DOMCubeStateStr) {                    
                    console.log(Object.keys(stateSolutions).length);
                    document.body.appendChild(document.createTextNode(" Solved!"));
                    alert(reversePermuationStr(newStatePermStr));
                    return;
                }
                // add state solution and cube state
                stateSolutions[newStateStr] = reversePermuationStr(newStatePermStr);
                newStates.push(newState);
                newStatePermutations.push(newStatePermStr);
            }
        }
        console.log(Object.keys(stateSolutions).length);
    }
}

function main() {
    buildUI();
    document.getElementById("ready").addEventListener("click", ready);
}
window.onload = main;