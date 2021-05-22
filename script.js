
let action_log = [];
let operation_exist = null;
let operation = null;
let equal;
let num1 = [];
let num2 = [];
let current_array = num1;

function toggleTheme () {
    const htmlTag = document.getElementsByTagName('html')[0]
    const themeNum = document.getElementById("slider").value;
    
    switch(themeNum) {
        case "1":
            htmlTag.setAttribute('data-mytheme', 'dark')
            window.localStorage.setItem("site-theme", "dark")        
            window.localStorage.setItem("slider-val", "1")        
            break;
        case "2":
            htmlTag.setAttribute('data-mytheme', 'light')
            window.localStorage.setItem("site-theme", "light")
            window.localStorage.setItem("slider-val", "2")        
            break;
        case "3":
            htmlTag.setAttribute('data-mytheme', 'purple')
            window.localStorage.setItem("site-theme", "purple")        
            window.localStorage.setItem("slider-val", "3")        
            break;
        default:
            htmlTag.setAttribute('data-mytheme', 'dark')
            window.localStorage.setItem("site-theme", "dark")
            window.localStorage.setItem("slider-val", "1")        
      }
}

function applyInitialTheme () {
    const theme = window.localStorage.getItem("site-theme")
    const sliderValue = window.localStorage.getItem("slider-val")

    if (theme !== null) {
        const htmlTag = document.getElementsByTagName("html")[0]
        const slider = document.getElementById("slider");

        htmlTag.setAttribute("data-mytheme", theme)
        slider.value = sliderValue;
    }
}

function enterNumber (number) {
    if (operation_exist === null) {
        action_log.push("num");
        current_array.push(number);
        displayNumber(current_array);
    } else if (operation_exist === "plus") {
        action_log.push("num");
        current_array.push(number);
        operation_exist = null;
        operation = "plus";
        displayNumber(current_array);
    } else if (operation_exist === "minus") {
        action_log.push("num");
        current_array.push(number);
        operation_exist = null;
        operation = "minus";
        displayNumber(current_array);        
    } else if (operation_exist === "times") {
        action_log.push("num");
        current_array.push(number);
        operation_exist = null;
        operation = "times";
        displayNumber(current_array);
    } else if (operation_exist === "divide") {
        action_log.push("num");
        current_array.push(number);
        operation_exist = null;
        operation = "divide";
        displayNumber(current_array);
    }
    
}

function enterDot () {
    if (!action_log.includes("dot")) {
        action_log.push("dot");
        current_array.push(".");
        displayNumber(current_array);
    }     
}

function enterRst () {
    action_log.push("rst");
    num1 = [];
    num2 = [];
    num3 = [];
    action_log = [];
    equal = 0;
    operation_exist = null;
    operation = null;
    current_array = num1;
    displayNumber(current_array);
}

function enterDel () {
    action_log.push("del");
    current_array.splice(current_array.length-1, 1);
    displayNumber(current_array);

}

function enterPlus () {
    action_log.push("op");
    if (operation == null) {
        current_array = num2;
        displayNumber(current_array);
        operation_exist = "plus";
    } else if (operation) {
        num1 = doMath(operation, num1, num2);
        num2 = [];
        current_array = num2;
        displayNumber(num1);
        operation_exist = "plus";
    }
}
function enterMinus () {
    action_log.push("op");
    if (operation == null) {
        current_array = num2;
        displayNumber(current_array);
        operation_exist = "minus";
    } else if (operation) {
        num1 = doMath(operation, num1, num2);
        num2 = [];
        current_array = num2;
        displayNumber(num1);
        operation_exist = "minus";
    }
}

function enterTimes () {
    action_log.push("op");
    if (operation == null) {
        current_array = num2;
        displayNumber(current_array);
        operation_exist = "times";
    } else if (operation) {
        num1 = doMath(operation, num1, num2);
        num2 = [];
        current_array = num2;
        displayNumber(num1);
        operation_exist = "times";
    }
}

function enterDivide () {
    action_log.push("op");
    if (operation == null) {
        current_array = num2;
        displayNumber(current_array);
        operation_exist = "divide";
    } else if (operation) {
        num1 = doMath(operation, num1, num2);
        if (num1.join("") === "ERROR!") {
            operation_exist = null;
            num2 = [];
            current_array = num2;
            displayNumber(num1);    
        } else {
            operation_exist = null;
            num2 = [];
            current_array = num2;
            displayNumber(num1);
        }
    }
}

function enterEq () {
    action_log.push("eq");
    if (operation == null) {
        displayNumber([]);
    } else if (operation) {
        num1 = doMath(operation, num1, num2);
        num2 = [];
        operation = null;
        equal = true;
        displayNumber(num1);
    }
}

function doMath (operation, num1, num2) {
    int1 = parseFloat(num1.join(""));
    int2 = parseFloat(num2.join(""));
    if (operation == "plus") {
        ans = int1 + int2;
    } else if (operation == "minus") {
         ans = int1 - int2;
    } else if (operation == "times") {
        ans = int1 * int2;
    } else if (operation == "divide") {
        if (int2 === 0) {
            ans = "ERROR!"
        } else {
            ans = int1 / int2;
        }
    }
    if (isNaN(ans)) {
        return "ERROR!"
    } else {
        return ans.toString().split("");
    }
}

function displayNumber (array) {
    if (array.length < 17) { //if greater cut off
        var screen = document.getElementById("screen");
        let temp = [];
        let i;
        let disp_str;
        if (array.length === 0) {
            disp_str = "";
        } else if (array.join("") === "ERROR!"){
            disp_str = array.join("");
        }else {
            if (array.includes(".")) {
                let integers = array.slice(0,array.indexOf("."));
                integers = parseInt(integers.join("")).toString().split("");
                let decimals = array.slice(array.indexOf("."),array.length);
                if (integers.length%3) {
                    temp.push(integers.slice(0, integers.length%3).join(""));
                }
                for (i=0; i<Math.floor(integers.length/3); i++) {
                    let j = i*3 + integers.length%3;
                    temp.push(integers.slice(j,j+3).join(""));
                }
                let int_str = temp.join(",");
                if (int_str.charAt(0) === ",") {
                    int_str = int_str.slice(1,int_str.length);
                }    
                let dec_str = decimals.join("");
                disp_str = int_str + dec_str;
    
            } else {
                array = parseInt(array.join("")).toString().split("");
                if (array.length%3) {
                    temp.push(array.slice(0, array.length%3).join(""));
                }
                for (i=0; i<Math.floor(array.length/3); i++) {
                    let j = i*3 + array.length%3;
                    temp.push(array.slice(j,j+3).join(""));
                }
                disp_str = temp.join(",");
                if (disp_str.charAt(0) === ",") {
                    disp_str = disp_str.slice(1,disp_str.length);
                }    
            }    
        }
        screen.innerText = disp_str;

    }

}

applyInitialTheme();

document
    .getElementById("slider")
    .addEventListener("input", toggleTheme);

document
    .querySelectorAll(".key")
    .forEach( item => {
        switch (item.dataset.keytype) {
            case "num":
                item.addEventListener("click", () => {
                    enterNumber(item.value);
                })
                break;
            case "dot":
                item.addEventListener("click", () => {
                    enterDot();
                })
                break;
            case "rst":
                item.addEventListener("click", () => {
                    enterRst();
                })
                break;
            case "del":
                item.addEventListener("click", () => {
                    enterDel();
                })
                break;
            case "plus":
                item.addEventListener("click", () => {
                    enterPlus();
                })
                break;
            case "minus":
                item.addEventListener("click", () => {
                    enterMinus();
                })
                break;
            case "times":
                item.addEventListener("click", () => {
                    enterTimes();
                })
                break;
            case "divide":
                item.addEventListener("click", () => {
                    enterDivide();
                })
                break;
            case "eq":
                item.addEventListener("click", () => {
                    enterEq();
                })
                break;
                               
        }
    });
