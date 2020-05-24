/*************

	CONSTANTS

*******************/
const thirtyDaysMonth=[4,6,9,11];
const thirtyOneDaysMonth=[1,3,5,7,8,10,12];
const femaleAkanNames=['Akosua','Adwoa','Abenaa','Akua','Yaa','Afua','Ama'];
const maleAkanNames=['Kwasi','Kwadwo','Kwabena','Kwaku','Yaw','Kofi','Kwame'];
let currentDate= new Date();
let currentMonth=currentDate.getMonth()+1;
let currentYear=currentDate.getFullYear();
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
		errorDate.innerHTML="Invalid Input. Enter DIGITS ONLY";
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
	numberLength=parseInt(getNumberLength(number));
	switch(checkType){
		case 'date':
		if(numberLength > 0 && numberLength <=2){
			if(parseInt(number) > 0 && parseInt(number) <=31){
				checkStatus=1000;
			}else{
				checkStatus=1003;
			}
		}else{
			checkStatus=1002;
		}
		break;

		case 'month':
		if(numberLength > 0 && numberLength <=2){
			if(parseInt(number) > 0 && parseInt(number) <=12){
				checkStatus=1000;
			}else{
				checkStatus=1003;
			}
		}else{
			checkStatus=1002;
		}
		break;

		case 'year':
		if(numberLength == 4){
			if((parseInt(number) > 0) && (parseInt(number) <=parseInt(currentYear))){
				checkStatus=1000;
			}else{
				checkStatus=1003;
			}
		}else{
			checkStatus=1002;
		}
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

let validateMonth = (birthMonth) => {
	let errorMonth=document.getElementById("monthHelp");
	switch(validateNumber(birthMonth)){
		case 1000:
		clearFormErrorMessages('month');
		checkStatus=checkNumberLimit(birthMonth,'month');
		if(checkStatus == 1000){
			dateMonthStatus=validateDateAndMonth(birthMonth);
			switch(dateMonthStatus){
				case 1000:
				clearFormErrorMessages('month');
				break;	

				case 1004:
				errorMonth.innerHTML="Dates must be at MOST 2 DIGITS ONLY.";
				break;

				case 1005:
				errorMonth.innerHTML="The Month has at MOST 30 DAYS.";
				break;

				case 1006:
				errorMonth.innerHTML="The Month has at MOST 31 DAYS.";
				break;

				case 1007:
				errorMonth.innerHTML="The Month has at MOST 29 DAYS.";
				break;
			}
		}else if(checkStatus == 1002){
			errorMonth.innerHTML="Months must be at MOST 2 DIGITS ONLY.";
		}else if(checkStatus == 1003){
			errorMonth.innerHTML="Months must not be GREATER than 12.";
		}
		break;

		case 1001:
		errorMonth.innerHTML="Invalid Input. Enter DIGITS ONLY";
		break;
	}
}

let validateDateAndMonth = (birthMonth) => {
	let birthDate=document.getElementById("date").value;
	checkStatus=checkNumberLimit(birthDate,'date');
	if(checkStatus == 1000){
		switch(parseInt(birthMonth)){
			case 2:
			if(parseInt(birthDate) > 29){
				dateMonthStatus=1007;
			}else{
				dateMonthStatus=1000;
			}
			break;

			default:
			if(thirtyDaysMonth.includes(parseInt(birthMonth))){
				if(parseInt(birthDate) > 30){
					dateMonthStatus=1005;
				}else{
					dateMonthStatus=1000;
				}
			}else if(thirtyOneDaysMonth.includes(parseInt(birthMonth))){
				if(parseInt(birthDate) > 31){
					dateMonthStatus=1006;
				}else{
					dateMonthStatus=1000;
				}
			}
			break;
		}
	}else{
		dateMonthStatus=1004;
	}
	return dateMonthStatus;
}

let validateYear = (birthYear) => {
	let yearDate=document.getElementById("yearHelp");
	switch(validateNumber(birthYear)){
		case 1000:
		clearFormErrorMessages('year');
		checkStatus=checkNumberLimit(birthYear,'year');
		if(checkStatus == 1000){
			clearFormErrorMessages('year');
		}else if(checkStatus == 1002){
			yearDate.innerHTML="Year MUST BE 4 DIGITS ONLY.";
		}else if(checkStatus == 1003){
			yearDate.innerHTML="Year should not be GREATER than "+currentYear+".";
		}
		break;

		case 1001:
		yearDate.innerHTML="Invalid Input. Enter DIGITS ONLY";
		break;
	}
}