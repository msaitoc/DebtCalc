let formBoxCounter = 1;
var svgHeight = 400;
var svgWidth = 800;
var debtYAxis = 10000;
var timeSpan = 20 * 12;
var mySVG = document.getElementById("mySVG");
mySVG.setAttribute("height", svgHeight);
mySVG.setAttribute("width", svgWidth);
var debtData = [];


function addFormBox() {
    formBoxCounter++;
    var formBox = document.querySelector('.formBox');
    var newFormBox = formBox.cloneNode(true);
    var inputs = newFormBox.querySelectorAll('input');
    var formBoxNumber = newFormBox.querySelector('.formBoxNumber');
    console.log(inputs);
   
    for(var i=0; i < inputs.length; i++) {
        var originalId = inputs[i].id;
        var newId = originalId + formBoxCounter;
        inputs[i].id = newId;
        inputs[i].name = newId; // Also update the 'name' attribute to match the new 'id'
        inputs[i].value = '';

    }
    formBoxNumber.textContent ='Time period number: ' + formBoxCounter;

    var leftMenu = document.querySelector('.leftMenu');
    leftMenu.appendChild(newFormBox);
    
}


function checkFields() {
    let formBoxes = document.querySelectorAll('.formBox');
    formBoxes.forEach(function(formBox){
        let inputs = formBox.querySelectorAll('input');

        inputs.forEach(input => { 
            if(Array.from(inputs).every(input => input.value !== ''&& !isNaN(input.value))) {
            console.log('All fileds in a formBox are filled.');
            getValues(formBox);
            } else if(Array.from(inputs).every(input => input.value !== '') && Array.from(inputs).some(input => isNaN(input.value))) {
            console.log('All fields in a formBox are filled but not all are numbers.');
        }
 

        })
       
    });
}


function getValues(formBox) {
    var idF = formBox.querySelector('.formBoxNumber');
    var idNumber = parseInt(idF.textContent.split(':')[1].trim());
    console.log(idNumber);
    console.log('#loan' + idNumber);
    console.log('#r' + idNumber);
    if (idNumber == 1) {
        var d = parseFloat(document.querySelector('#loan').value);
        var ir = parseFloat(document.querySelector('#r').value);
        var p = parseFloat(document.querySelector('#mPayment').value);
        var t = parseFloat(document.querySelector('#time').value);
        loanCalc(d, ir, p, idNumber, t);
    

    } else if (idNumber !== 1) {
        var d = parseFloat(document.querySelector('#loan' + idNumber).value);
        var ir = parseFloat(document.querySelector('#r' + idNumber).value);
        var p = parseFloat(document.querySelector('#mPayment' + idNumber).value);
        var t = parseFloat(document.querySelector('#time' + idNumber).value);
        loanCalc(d, ir, p, idNumber);

    }
    console.log(d, ir, p, t, idNumber);



}


//if a new box gets filled, it will be added to the data with this
function loanCalc(d, ir, p, idNumber, t) {
    
    var r = ir * .01;
    var timeCounter = 0;

    for (var i=1; i <= timeSpan; i++) {
        timeCounter++;
        var divisor = Math.pow(Math.E, (-r /(12)) * i);
        var remainingDebt =  12 * ( p / r ) + ( (d - 12 * (p /r ) ) / divisor );
        var existingEntry = debtData.find(entry => entry.idNumber === idNumber);
        
        if (existingEntry) {
            console.log("Updating existing entry for idNumber:", idNumber);
            existingEntry.month = timeCounter;
            existingEntry.remainingDebt = remainingDebt;
            existingEntry.ir = ir;
            existingEntry.time = t;

        } else {
            console.log("adding new entry for idNumber:", idNumber);
            debtData.push({
                idNumber: idNumber,
                month: timeCounter,
                remainingDebt: remainingDebt,
                ir: ir, 
                time: t

        
            });
    

        }
    }}
window.onload = function () {
    checkFields();
        
    }
        console.log("Current debtData:", debtData);
                

       

/*
        graphData(d, remainingDebt); 
        if (remainingDebt <= 0) {
            console.log(timeCounter)

            break;
        }
        else if (remainingDebt >= 0) {
            console.log(remainingDebt);
        }
        
    }

}




/*
var monthCounter = 1;
function graphData(){
    debtData.forEach(function(data) {
        graphPoint(data.idNumber, data.Month, data.remainingDebt);
    });
}

function graphPoint(idNumber, d, remainingDebt ) {
   
    var maxHeight = pixelDollar +50;
    var pixelDollar =(svgHeight/d);
    var pixelMonth = svgWidth/timeSpan;
    var monthsPassed = monthCounter * pixelMonth;
    var yInput = svgHeight - (remainingDebt * pixelDollar);
    var circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    circle.setAttribute("cx", monthsPassed);
    circle.setAttribute("cy", yInput);
    circle.setAttribute("r", 3);
    circle.setAttribute("fill", "black");
    circle.classList.add('dot');
    mySVG.appendChild(circle);
    monthCounter++;

}

/*
function xyaxis() {
    let svgNS = "http://www.w3.org/2000/svg";
    let mySVG = document.getElementById('mySVG');
    let xAxis = document.createElementNS(svgNS, "line");
    var yValAxis = svgHeight / 2;
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('x2', svgWidth);
    xAxis.setAttribute('y1', yValAxis);
    xAxis.setAttribute('y2', yValAxis);
    xAxis.setAttribute('stroke','rgb(255, 0, 0)');
    mySVG.appendChild(xAxis);

}
xyaxis();

function xLines(timeSpan) {
    let svgNS = "http://www.w3.org/2000/svg";
    let mySVG = document.getElementById('mySVG');
   var y1 = 0;
   var y2 = svgHeight;

   var lineNum = timeSpan / 48
    for (var i=0; i<= lineNum; i++) {
        let xLines  = document.createElementNS(svgNS,"line");
        let xPosition = (800 / lineNum) * i;
        xLines.setAttribute('x1', xPosition);
        xLines.setAttribute('y1', y1);
        xLines.setAttribute('x2', xPosition);
        xLines.setAttribute('y2', y2);
        xLines.setAttribute('stroke', 'black');
        mySVG.appendChild(xLines);

       
    }
}

function yLines(timeSpan) {
    let svgNS = "http://www.w3.org/2000/svg";
    let mySVG = document.getElementById('mySVG');
   var x1 = 0;
   var x2 = svgWidth;


   var lineNum = timeSpan / 18;
    for (var i=0; i<= lineNum; i++) {
        let yLine  = document.createElementNS(svgNS,"line");
        let yPosition = (svgHeight / lineNum) * i;
        yLine.setAttribute('x1', x1);
        yLine.setAttribute('y1', yPosition);
        yLine.setAttribute('x2', x2);
        yLine.setAttribute('y2', yPosition);
        yLine.setAttribute('stroke', 'black');
        mySVG.appendChild(yLine);

       
    }
}

yLines(timeSpan);
xLines(timeSpan);

*/

        

