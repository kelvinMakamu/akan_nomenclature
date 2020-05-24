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

/*****************

	UTILITY FUNCTIONS

*********************/
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

		case 'all':
		document.getElementById("dateHelp").innerHTML="";
		document.getElementById("monthHelp").innerHTML="";
		document.getElementById("yearHelp").innerHTML="";
		break;
	}
}

let isLeapYear = (birthYear) => {
	if(parseInt(birthYear) % 100 === 0){
		if(parseInt(birthYear) % 400 === 0){
			validLeapYear=1000;
		}else{
			validLeapYear=1015;
		}
	}else{
		if(parseInt(birthYear) % 4 === 0){
			validLeapYear=1000;
		}else{
			validLeapYear=1015;
		}
	}
	return validLeapYear;
}

let displayFooterContent = (containerClass) =>{
	let content="<center><span>akan nomenclature</span><br/><br/>"+
	"Copyright &copy; "+currentYear+". All Rights Reserved.</center>";
	document.getElementById(containerClass).innerHTML+=content;
}

let clearCheckNameForm = () => {
	clearFormErrorMessages("all");
	document.getElementById('date').value = "";
	document.getElementById('month').value = "";
	document.getElementById('year').value = "";
	let genderChoices = document.getElementsByName("akan-gender");
  for(let counter=0;counter<genderChoices.length;counter++){
    genderChoices[counter].checked = false;
  }
}
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
			validBirthDate = validateBirthDate(birthYear);
			switch(validBirthDate){
				case 1000:
				clearFormErrorMessages('all');
				break;

				case 1008:
				document.getElementById("dateHelp").innerHTML="Dates MUST have at MOST 2 DIGITS";
				break;

				case 1009:
				document.getElementById("dateHelp").innerHTML="Dates MUST NOT be greater than 31 days";
				break;

				case 1010:
				document.getElementById("monthHelp").innerHTML="Months MUST have at MOST 2 DIGITS";
				break;

				case 1011:
				document.getElementById("monthHelp").innerHTML="Months MUST NOT be greater than 12 ALWAYS";
				break;

				case 1012:
				document.getElementById("yearHelp").innerHTML="Years MUST have 4 DIGITS";
				break;

				case 1013:
				document.getElementById("yearHelp").innerHTML="Year MUST NOT be GREATER THAN "+currentYear;
				break;

				case 1014:
				document.getElementById("monthHelp").innerHTML="Invalid Input. February has 28 days since "+
				birthYear+ " is not a LEAP YEAR";
				break;
			}
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

let validateBirthDate = (birthYear) => {
	let birthMonth = document.getElementById("month").value;
	let birthDate = document.getElementById("date").value;
	checkDateStatus=checkNumberLimit(birthDate,'date');
	if(checkDateStatus === 1000){
		checkMonthStatus=checkNumberLimit(birthMonth,'month');
		if(checkMonthStatus === 1000){
			checkYearStatus=checkNumberLimit(birthYear,'year');
			if(checkYearStatus === 1000){
				switch(isLeapYear(birthYear)){
					case 1000:
					yearBirthDateStatus=1000;
					break;

					case 1015:
					if(parseInt(birthMonth) === 2){
						if(parseInt(birthDate) > 28){
							yearBirthDateStatus=1014;//Invalid Input. February has 28 days since not a leap Year
						}else{
							yearBirthDateStatus=1000;
						}
					}else{
						yearBirthDateStatus=1000;
					}	
					break;
				}
			}else if(checkYearStatus === 1002){
				yearBirthDateStatus=1012;//Years 4 DIGITS ONLY
			}else{
				yearBirthDateStatus=1013;//Year <= 2020
			}
		}else if(checkMonthStatus === 1002){
			yearBirthDateStatus=1010;//Months 2 Digits ONlY
		}else{
			yearBirthDateStatus=1011;//Months <=12
		}
	}else if(checkDateStatus === 1002){
		yearBirthDateStatus=1008;//Dates 2 digit only
	}else{
		yearBirthDateStatus=1009;//Dates <=31
	}
	return yearBirthDateStatus;
}

let selectedGender = () => {
	if(document.getElementById('akan-gender-female').checked){ 
    genderSelected="female";
  }else if(document.getElementById('akan-gender-male').checked){ 
    genderSelected="male";  
  }else{
  	genderSelected="none";
  } 
  return genderSelected.toUpperCase();
}

let validateCheckNameForm = () => {
	let birthYear = document.getElementById("year").value;
	clearFormErrorMessages('all');
	switch(selectedGender()){
		case 'NONE':
		document.getElementById("genderHelp").innerHTML="Please select a gender...";
		isFormValid=1100;
		break;

		default:
		switch(validateBirthDate(birthYear)){
			case 1000:
				clearFormErrorMessages('all');
				isFormValid=1000;
				break;

				case 1008:
				document.getElementById("dateHelp").innerHTML="Dates MUST have at MOST 2 DIGITS";
				isFormValid=1008;
				break;

				case 1009:
				document.getElementById("dateHelp").innerHTML="Dates MUST NOT be greater than 31 days";
				isFormValid=1009;
				break;

				case 1010:
				document.getElementById("monthHelp").innerHTML="Months MUST have at MOST 2 DIGITS";
				isFormValid=1010;
				break;

				case 1011:
				document.getElementById("monthHelp").innerHTML="Months MUST NOT be greater than 12 ALWAYS";
				isFormValid=1011;
				break;

				case 1012:
				document.getElementById("yearHelp").innerHTML="Years MUST have 4 DIGITS";
				isFormValid=1012;
				break;

				case 1013:
				document.getElementById("yearHelp").innerHTML="Year MUST NOT be GREATER THAN "+currentYear;
				isFormValid=1013;
				break;

				case 1014:
				document.getElementById("monthHelp").innerHTML="Invalid Input. February has 28 days since "+
				birthYear+ " is not a LEAP YEAR";
				isFormValid=1014;
				break;
		}
		break;
	}
	return isFormValid;
}

/************************

	DERIVE AKAN NAMES

*****************************/
let caculateWeekDay = (birthDate, birthMonth, birthYear) => {
	if(birthMonth >= 3){
    birthMonth -= 2;
  }else{
    birthMonth += 10;
  }

  if((birthMonth == 11) || (birthMonth == 12)){
  	birthYear--;
  } 

  let centuryDigits = parseInt(birthYear / 100);
  let yearDigits = birthYear % 100;

  let dayOfWeek = 0;  
  dayOfWeek += parseInt(birthDate);
  dayOfWeek += parseInt((13 / 5) * birthMonth - 0.2);
  dayOfWeek += parseInt(yearDigits);
  dayOfWeek += parseInt(yearDigits / 4);
  dayOfWeek += parseInt(centuryDigits / 4);
  dayOfWeek -= parseInt(2 * centuryDigits);
  dayOfWeek %= 7;

  if(birthYear >= 1700 && birthYear <= 1751) {
    dayOfWeek -= 3;
  }else{
    if(birthYear <= 1699){
    	dayOfWeek -= 4;
    } 
  }

  if(dayOfWeek < 0){
  	dayOfWeek += 7;
  } 

  return dayOfWeek;
}

let deriveAkanName = (gender,weekDay) => {
	switch(gender){
		case 'MALE':
		akanName=maleAkanNames[weekDay];
		break;

		case 'FEMALE':
		akanName=femaleAkanNames[weekDay];
		break;

		case 'NONE':
		akanName=1111;
		break;
	}
	return akanName;
}

let submitAndDeriveAkanName = () => {
	switch(validateCheckNameForm()){
		case 1000:
		birthYear = parseInt(document.getElementById("year").value);
		birthMonth = parseInt(document.getElementById("month").value);
		birthDate = parseInt(document.getElementById("date").value);
		gender=selectedGender();
		dayOfWeek=caculateWeekDay(birthDate,birthMonth,birthYear);
		akanName=deriveAkanName(gender,dayOfWeek);
		alert(akanName);
		break;
	}
}
