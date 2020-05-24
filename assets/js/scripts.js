/*************

	VALIDATIONS

*******************/
let validateDate = (birthDate) => {
	let errorDate=document.getElementById("dateHelp");
	switch(validateNumber(birthDate)){
		case 1000:
		clearFormErrorMessages('date');
		checkStatus=checkNumberLimit(birthDate,'date');
		if(checkStatus == 1000){
			clearFormErrorMessages('date');
		}else if(checkStatus == 1002){
			errorDate.innerHTML="Dates must be at MOST 2 DIGITS ONLY.";
		}else if(checkStatus == 1003){
			errorDate.innerHTML="Dates must not be GREATER than 31.";
		}
		break;

		case 1001:
		errorDate.innerHTML="Invalid. Enter DIGITS ONLY";
		break;
	}
}

let validateNumber = (number) => {
	if(/^\d+$/.test(number)){
		validStatus=1000;
	}else{
		validStatus=1001;
	}
	return validStatus;
}

let checkNumberLimit = (number,checkType) => {
	numberLength=getNumberLength(number);
	switch(checkType){
		case 'date':
		if(numberLength > 0 && numberLength <=2){
			if(number > 0 && number <=31){
				checkStatus=1000;
			}else{
				checkStatus=1003;
			}
		}else{
			checkStatus=1002;
		}
		break;

		case 'month':
		break;

		case 'year':
		break;
	}
	return checkStatus;
}

let getNumberLength = (number) => {
	return number.toString().length;
}

let clearFormErrorMessages= (errorType) => {
	switch(errorType){
		case 'date':
		document.getElementById("dateHelp").innerHTML="";
		break;

		case 'month':
		document.getElementById("monthHelp").innerHTML="";
		break;

		case 'year':
		document.getElementById("yearHelp").innerHTML="";
		break;
	}
}