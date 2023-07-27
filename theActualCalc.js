let formBoxCounter = 1;
function addFormBox() {
    formBoxCounter++;
    var formBox = document.querySelector('.formBox');
    var newFormBox = formBox.cloneNode(true);
    var inputs = newFormBox.querySelectorAll('input');
    var formBoxNumber = newFormBox.querySelector('.formBoxNumber');
    console.log(inputs);
   
    for(var i=0; i < inputs.length; i++) {
        
        inputs[i].id = inputs[i].id + formBoxCounter;

    }
    formBoxNumber.textContent ='Time period number: ' + formBoxCounter;

    var leftMenu = document.querySelector('.leftMenu');
    leftMenu.appendChild(newFormBox);
    
}

function checkFields() {
    let formBoxes = document.querySelectorAll('.formBox');
    formBoxes.forEach(function(formBox){
        let inputs = formBox.querySelectorAll('input');
        if(Array.from(inputs).every(input => input.value !== ''&& !isNaN(input.value))) {
            console.log('All fileds in a formBox are filled.');
            loanCalc(formBox);
        } else if(Array.from(inputs).every(input => input.value !== '') && Array.from(inputs).some(input => isNaN(input.value))) {
        console.log('All fields in a formBox are filled but not all are numbers.');
       }
    });
}

function loanCalc(formBox) {
    var idF = formBox.querySelector('.formBoxNumber');
    var idNumber = parseInt(idF.textContent.split(':')[1].trim());
    console.log(idNumber);
    console.log('#loan' + idNumber);
    console.log('#r' + idNumber);
    if (idNumber == 1) {
        var d = document.querySelector('#loan').value;
        var ir = document.querySelector('#r').value;
        var p = document.querySelector('#mPayment').value;
    

    } else if (idNumber !== 1) {
        var d = document.querySelector('#loan' + idNumber).value;
        var ir = document.querySelector('#r' + idNumber).value;
        var p = document.querySelector('#mPayment' + idNumber).value;

    }
    console.log(d, ir, p);

}