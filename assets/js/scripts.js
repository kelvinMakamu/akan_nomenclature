/*************

	CONSTANTS

*******************/
const monthNames=['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'];
const thirtyDaysMonth=[4,6,9,11];
const thirtyOneDaysMonth=[1,3,5,7,8,10,12];
const weekDays =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const femaleAkanNames=['Akosua','Adwoa','Abenaa','Akua','Yaa','Afua','Ama'];
const maleAkanNames=['Kwasi','Kwadwo','Kwabwena','Kwaku','Yaw','Kofi','Kwame'];
const notificationPanel='akan-message-panel';
const pattern = /^-?\d+\.?\d*$/;
let currentDate= new Date();
let currentMonth=currentDate.getMonth()+1;
let currentYear=currentDate.getFullYear();

/*****************

	UTILITY FUNCTIONS

*********************/
let validateNumber = (number) => {
	if(pattern.test(number)){
		validStatus=1000;
	}else{
		validStatus=1001;
	}
	return validStatus;
}

let checkNumberLimit = (number,checkType) => {
	if(validateNumber(number) === 1000){
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
	}else{
		checkStatus=1018;
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
		document.getElementById("genderHelp").innerHTML="";
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

let clearCheckNameFormAfterSubmission = () => {
	clearFormErrorMessages("all");
	document.getElementById('date').value = "";
	document.getElementById('month').value = "";
	document.getElementById('year').value = "";
	let genderChoices = document.getElementsByName("akan-gender");
  for(let counter=0;counter<genderChoices.length;counter++){
    genderChoices[counter].checked = false;
  }
}

let clearCheckNameForm = () => {
	clearNotificationPanel();
	clearFormErrorMessages("all");
	document.getElementById('date').value = "";
	document.getElementById('month').value = "";
	document.getElementById('year').value = "";
	let genderChoices = document.getElementsByName("akan-gender");
  for(let counter=0;counter<genderChoices.length;counter++){
    genderChoices[counter].checked = false;
  }
}

let displayNotification = (notificationPanel,alert,message) => {
	let notification ="<div class='alert "+alert+"' role='alert'>"+message+"</div>";
	document.getElementById(notificationPanel).innerHTML+=notification;
}

let clearNotificationPanel = () => {
	document.getElementById('akan-message-panel').innerHTML="";
}

let getMonthName = (monthNumber) => {
	return monthNames[parseInt(monthNumber-1)];
}

let getDayOfWeek = (dayNumber) => {
	return weekDays[parseInt(dayNumber)];
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
		}else if(checkStatus == 1018){
			errorDate.innerHTML="Dates must BE DIGITS ONLY.";
		}else if(checkStatus == 1003){
			errorDate.innerHTML="Dates must not be GREATER than 31.";
		}
		break;

		case 1001:
		errorDate.innerHTML="Enter DIGITS ONLY";
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
				monthStatus=1000;
				break;	

				case 1004:
				errorMonth.innerHTML="Dates must be at MOST 2 DIGITS.";
				monthStatus=1004;
				break;

				case 1005:
				errorMonth.innerHTML="The Month has at MOST 30 DAYS.";
				monthStatus=1005;
				break;

				case 1006:
				errorMonth.innerHTML="The Month has at MOST 31 DAYS.";
				monthStatus=1006;
				break;

				case 1007:
				errorMonth.innerHTML="The Month has at MOST 29 DAYS.";
				monthStatus=1007;
				break;

				case 1017:
				errorMonth.innerHTML="The Month has at MOST 28 DAYS.";
				monthStatus=1017;
				break;

				case 1018:
				errorMonth.innerHTML="Enter DIGITS ONlY.";
				monthStatus=1018;
				break;
			}
		}else if(checkStatus == 1002){
			errorMonth.innerHTML="Months must be at MOST 2 DIGITS.";
			monthStatus=1002;
		}else if(checkStatus == 1018){
			errorMonth.innerHTML="Months must be DIGITS ONLY.";
			monthStatus=1018;
		}else if(checkStatus == 1003){
			errorMonth.innerHTML="Months must not be GREATER than 12.";
			monthStatus=1003;
		}
		break;

		case 1001:
		errorMonth.innerHTML="Enter DIGITS ONLY";
		monthStatus=1001;
		break;
	}
	return monthStatus;
}

let validateDateAndMonth = (birthMonth) => {
	let birthDate=parseInt(document.getElementById("date").value);
	let birthYear=parseInt(document.getElementById("year").value);
	checkStatus=checkNumberLimit(birthDate,'date');
	if(checkStatus == 1000){
		switch(parseInt(birthMonth)){
			case 2:
			if(isLeapYear(birthYear) === 1000){
				if(birthDate > 29){
					dateMonthStatus=1007;
				}else{
					dateMonthStatus=1000;
				}
			}else{
				if(birthDate > 28){
					dateMonthStatus=1017;
				}else{
					dateMonthStatus=1000;
				}
			}
			break;

			default:
			if(thirtyDaysMonth.includes(parseInt(birthMonth))){
				if(birthDate > 30){
					dateMonthStatus=1005;
				}else{
					dateMonthStatus=1000;
				}
			}else if(thirtyOneDaysMonth.includes(parseInt(birthMonth))){
				if(birthDate > 31){
					dateMonthStatus=1006;
				}else{
					dateMonthStatus=1000;
				}
			}
			break;
		}
	}else if(checkStatus === 1018){
		dateMonthStatus=1018;
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
				document.getElementById("monthHelp").innerHTML="Feb(02) has 28 days since "+
				birthYear+ " is not a LEAP YEAR";
				break;

				case 1016:
				document.getElementById("monthHelp").innerHTML="Feb(02) has 29 days since "+
				birthYear+ " is a LEAP YEAR";
				break;

				case 1018:
				document.getElementById("monthHelp").innerHTML="ENTER DIGITS ONLY";
				break;
			}
		}else if(checkStatus == 1018){
			yearDate.innerHTML="Year MUST BE DIGITS ONLY.";
		}else if(checkStatus == 1002){
			yearDate.innerHTML="Year MUST BE 4 DIGITS ONLY.";
		}else if(checkStatus == 1003){
			yearDate.innerHTML="Year should not be GREATER than "+currentYear+".";
		}
		break;

		case 1001:
		yearDate.innerHTML="Enter DIGITS ONLY";
		break;

		case 1018:
		yearDate.innerHTML="Enter DIGITS ONLY";
		break;
	}
}

let validateBirthDate = (birthYear) => {
	let birthMonth = parseInt(document.getElementById("month").value);
	let birthDate = parseInt(document.getElementById("date").value);
	checkDateStatus=checkNumberLimit(birthDate,'date');
	if(checkDateStatus === 1000){
		checkMonthStatus=checkNumberLimit(birthMonth,'month');
		if(checkMonthStatus === 1000){
			//Validate Month
			validMonthStatus=validateMonth(birthMonth);
			if(validMonthStatus === 1000){
				checkYearStatus=checkNumberLimit(birthYear,'year');
				if(checkYearStatus === 1000){
					switch(isLeapYear(birthYear)){
						case 1000:
						if(birthMonth === 2){
							if(birthDate > 29){
								yearBirthDateStatus=1016;//Feb(02) has 29 days since not a leap Year
							}else{
								yearBirthDateStatus=1000;
							}
						}else{
							yearBirthDateStatus=1000;
						}	
						break;

						case 1015:
						if(birthMonth === 2){
							if(birthDate > 28){
								yearBirthDateStatus=1014;//Feb(02) has 28 days since not a leap Year
							}else{
								yearBirthDateStatus=1000;
							}
						}else{
							yearBirthDateStatus=1000;
						}	
						break;
					}
				}else if(checkYearStatus === 1018){
					yearBirthDateStatus=1018;//DIGITS ONLY
				}else if(checkYearStatus === 1002){
					yearBirthDateStatus=1012;//Years 4 DIGITS ONLY
				}else{
					yearBirthDateStatus=1013;//Year <= 2020
				}
			}else{
				yearBirthDateStatus=validMonthStatus;
			}
		}else if(checkMonthStatus === 1002){
			yearBirthDateStatus=1010;//Months 2 Digits ONlY
		}else if(checkMonthStatus === 1018){
			yearBirthDateStatus=1018;//Digits ONlY
		}else{
			yearBirthDateStatus=1011;//Months <=12
		}
	}else if(checkDateStatus === 1002){
		yearBirthDateStatus=1008;//Dates 2 digit only
	}else if(checkDateStatus === 1018){
		yearBirthDateStatus=1018//Digits ONlY
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

				case 1001:
				document.getElementById("monthHelp").innerHTML="Enter DIGITS ONLY.";
				isFormValid=1001;
				break;

				case 1002:
				document.getElementById("monthHelp").innerHTML="Months MUST have at MOST 2 DIGITS";
				isFormValid=1002;
				break;

				case 1003:
				document.getElementById("monthHelp").innerHTML="Months MUST NOT be GREATER THAN 12";
				isFormValid=1003;
				break;

				case 1004:
				document.getElementById("dateHelp").innerHTML="Dates MUST have at MOST 2 DIGITS";
				isFormValid=1004;
				break;

				case 1005:
				document.getElementById("monthHelp").innerHTML="The month has at MOST 30 DAYS";
				isFormValid=1005;
				break;

				case 1006:
				document.getElementById("monthHelp").innerHTML="The month has at MOST 31 DAYS";
				isFormValid=1006;
				break;

				case 1007:
				document.getElementById("monthHelp").innerHTML="The month has at MOST 29 DAYS";
				isFormValid=1007;
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
				document.getElementById("monthHelp").innerHTML="Feb(02) has 28 days since "+
				birthYear+ " is not a LEAP YEAR";
				isFormValid=1014;
				break;

				case 1016:
				document.getElementById("monthHelp").innerHTML="Feb(02) has 29 days since "+
				birthYear+ " is a LEAP YEAR";
				isFormValid=1016;
				break;

				case 1017:
				document.getElementById("monthHelp").innerHTML="Feb(02) has 28 days since "+
				birthYear+ " is a NOT LEAP YEAR";
				isFormValid=1017;
				break;

				case 1018:
				document.getElementById("monthHelp").innerHTML="ENTER DIGITS ONLY";
				isFormValid=1018;
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
	clearNotificationPanel();
	birthYear = parseInt(document.getElementById("year").value);
	birthMonth = parseInt(document.getElementById("month").value);
	birthDate = parseInt(document.getElementById("date").value);
	if(validateNumber(birthYear) === 1000 && validateNumber(birthMonth) === 1000 && validateNumber(birthDate) === 1000){
		gender=selectedGender();
		switch(validateCheckNameForm()){
			case 1000:
			dayOfWeek=caculateWeekDay(birthDate,birthMonth,birthYear);
			akanName=deriveAkanName(gender,dayOfWeek);
			if(akanName == 1111){
				alert='alert-danger';
				message="<p>Failed to derive akan name. Please select your gender...</p>";
			}else{
				alert='alert-success';
				message="<p>Gender: "+gender+"<br/>Birth Day: "+getDayOfWeek(dayOfWeek)+"<br/>Birth Date: "+birthDate+"-"+getMonthName(birthMonth)+"-"+birthYear
				+"<br/>Your Akan Name is : <strong>"+akanName +"</strong></p>";
				clearCheckNameFormAfterSubmission();
			}
			break;

			case 1001:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Enter DIGITS ONLY.</p>";
			break;

			case 1002:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Months MUST have at MOST 2 DIGITS.</p>";
			break;

			case 1003:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Months MUST NOT be GREATER THAN 12.</p>";
			break;

			case 1004:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Dates MUST have at MOST 2 DIGITS.</p>";
			break;

			case 1005:
			alert='alert-danger';
			message="<p>Failed to derive akan name. The month has at MOST 30 DAYS.</p>";
			break;

			case 1006:
			alert='alert-danger';
			message="<p>Failed to derive akan name. The month has at MOST 31 DAYS.</p>";
			break;

			case 1007:
			alert='alert-danger';
			message="<p>Failed to derive akan name. The month has at MOST 29 DAYS.</p>";
			break;

			case 1008:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Dates MUST have at MOST 2 DIGITS.</p>";
			break;

			case 1009:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Dates MUST NOT be greater than 31 days.</p>";
			break;

			case 1010:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Months MUST have at MOST 2 DIGITS.</p>";
			break;

			case 1011:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Months MUST NOT be greater than 12 ALWAYS.</p>";
			break;

			case 1012:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Years MUST have 4 DIGITS.</p>";
			break;

			case 1013:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Year MUST NOT be GREATER THAN "+currentYear+"</p>";
			break;

			case 1014:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Feb(02) has 28 days since  "+birthYear+" is not a leap year</p>";
			break;

			case 1016:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Feb(02) has 29 days since  "+birthYear+" is a leap year</p>";
			break;

			case 1017:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Feb(02) has 28 days since  "+birthYear+" is not a leap year</p>";
			break;

			case 1018:
			alert='alert-danger';
			message="<p>Failed to derive akan name. PLease provide date of birth in DIGITS ONLY.</p>";
			break;

			case 1100:
			alert='alert-danger';
			message="<p>Failed to derive akan name. Please select your gender</p>";
			break;
		}
	}else{
		alert='alert-danger';
		message="<p>Failed to derive akan name. PLease provide date of birth in DIGITS ONLY.</p>";	
	}
	displayNotification(notificationPanel,alert,message);
}
