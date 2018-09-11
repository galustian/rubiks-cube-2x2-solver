var currentPickerColor = 0;
export var codeColors = {1: "rgb(230, 230, 230)", 2: "gold", 3: "orange", 4: "red", 5: "blue", 6: "green"}
export var colorCodes = {"rgb(230, 230, 230)": 1, "gold": 2, "orange": 3, "red": 4, "blue": 5, "green": 6}

function create2x2Block(heading) {
    var block = document.createElement("div");
    block.id = heading;
    block.className = "block";

    var headingElem = document.createElement("p");
    headingElem.innerText = heading;
    block.appendChild(headingElem);

    for (let i = 0; i < 4; i++) {
        let color = document.createElement("div");
        color.className = "color";
        color.id = heading + "-" + i;
        block.appendChild(color);
    }
    return block;
}

function createCube() {
    var cube = document.createElement("div");
    cube.id = "cube";

    cube.appendChild(create2x2Block("left"));

    var container = document.createElement("div");
    container.appendChild(create2x2Block("back"));
    container.appendChild(create2x2Block("top"));
    container.appendChild(create2x2Block("front"));

    cube.appendChild(container);
    cube.appendChild(create2x2Block("right"));
    cube.appendChild(create2x2Block("down"));

    return cube;
}

function createMenu() {
    var menu = document.createElement("menu");
    var picker = document.createElement("picker");
    picker.id = "picker";

    var colors = ["#e6e6e6", "gold", "orange", "red", "blue", "green"]
    for (let i = 0; i < 6; i++) {
        let color = document.createElement("div");
        color.className = "picker-color";
        color.style.backgroundColor = colors[i];
        picker.appendChild(color);
    }


    var buttonContainer = document.createElement("div");

    var readyButton = document.createElement("button");
    readyButton.innerText = "Compute Steps";
    readyButton.id = "ready";
    readyButton.style.display = "inline-block";

    buttonContainer.appendChild(readyButton);

    menu.appendChild(picker);
    menu.appendChild(buttonContainer);

    return menu;
}

export function setCubeColor(e) { e.target.style.backgroundColor = currentPickerColor; }

function setPickerColorEventListeners() {
    var pickerColors = document.getElementsByClassName("picker-color");

    for (let color of pickerColors) {
        color.addEventListener("click", (e) => {
            currentPickerColor = e.target.style.backgroundColor;
            for (let c of pickerColors) c.style.borderColor = "#fff";
            e.target.style.borderColor = "#000";
        });
    }

    var cubeColors = document.getElementsByClassName("color");
    for (let color of cubeColors) {
        color.addEventListener("click", setCubeColor);
    }
}

export function buildUI() {
    document.body.appendChild(createCube());
    document.body.appendChild(createMenu());

    setPickerColorEventListeners();
}