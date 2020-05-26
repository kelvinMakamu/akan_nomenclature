# Akan Names
## Brief Description
Akan names are derived from Ghanian culture. Frequently in Ghana, children are given their first name as a 'day name' which corresponds to the day in the week they were born.<br><br>
This application derives a user's Akan Name depending on the user's date of birth and gender.<br><br>
The application calculates the day of the week an individual was born from the date of birth, and then derives an Akan name depending on the day of week and gender as shown below:<br>

DAY OF WEEK | FEMALE   | MALE
------------| ---------| -------
SUNDAY      | Akosua   | Kwasi
MONDAY      | Adwoa    | Kwadwo
TUESDAY     | Abenaa   | Kwabena
WEDNESDAY   | Akua     | Kwaku
THURSDAY    | Yaa      | Yaw
FRIDAY      | Afua     | Kofi
SATURDAY    | Ama      | Kwame

## Authors
* [kelvinMakamu](https://github.com/kelvinMakamu)
## Set Up Instructions
To start using this project:
* `git clone https://github.com/kelvinMakamu/akan_nomenclature.git`
* `cd akan_nomenclature`
* `atom . `*for ATOM*
* `sublime .` *for SUBLIME*
* `code . `*for Visual Studio Code*
## Behavior Driven Development (BDD)
The application has the following specifications:<br><br>
Behaviour   | Input Example  | Output Example
------------| -------------  | --------------
It checks if date input is empty      | BLANK   | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks if month input is empty       | BLANK    | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks if year input is empty      | BLANK   | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks if gender is not selected  | BLANK   | Failed to derive akan name. Please select your gender
It checks if date is not a digit    | 1s or ssss      | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks if month is not a digit      | 1s or ssss     | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks if year is not a digit   | 1s or ssss     | Failed to derive akan name. Please provide date of birth in DIGITS ONLY.
It checks date is greater than 31  | 45      | Failed to derive akan name. Dates MUST NOT be greater than 31 days.
It checks month is greater than 12   | 15    | Failed to derive akan name. Months MUST NOT be GREATER THAN 12.
It checks if year is more than 4 digits  | 20209      | Failed to derive akan name. Years MUST have 4 DIGITS.
It checks if year is less than 4 digits  | 202      | Failed to derive akan name. Years MUST have 4 DIGITS.
It checks if month is greater than 2 digits   |123     | Failed to derive akan name. Months MUST have at MOST 2 DIGITS.
It checks if date is greater than 2 digits   | 321    | Failed to derive akan name. Dates MUST have at MOST 2 DIGITS
It checks if year is greater than 2020, current year   | 2030     | Failed to derive akan name. Birth date cannot be in the future.
It checks if month of Feb (2) has input date greater than 29   | 30      | Failed to derive akan name. The month has at MOST 29 DAYS.
It checks if a 30-day month has an input date greater than 30  | 31     | Failed to derive akan name. The month has at MOST 30 DAYS.
It checks if year is not a Leap Year, and the month of Feb(2), has 29 as the date input  | Date:29<br>Year:2019 | Failed to derive akan name. Feb (02) has 28 days since 2019 is not a leap year
It checks if birth date provided is in the future   | Date:29<br>Month: 12<br> Year: 2020      | Failed to derive akan name. Birth date cannot be in the future.
It checks if month and year provided is in the future   | Month: 7 <br>Year: 2020   | Failed to derive akan name. Birth date cannot be in the future.
It returns the day of the week from the date of birth provided   | Date:26<br>Month: 5<br> Year: 2020     | Tuesday
It returns the Akan Name when date of birth and gender values are provided  |  Gender: Male<br>Date:26<br>Month: 5<br> Year: 2020 | Gender: MALE<br>Birth Day: Tuesday<br>Birth Date: 26-May-2020<br>Your Akan Name is : Kwabena
## Technologies Used
* HTML5
* CSS3
* Bootstrap
* JS
* GIT
## Live Website
* [Akan-Names](https://kelvinmakamu.github.io/akan_nomenclature/)
## Contact Info
* [Kelvin Makamu](mailto:profmakamu@gmail.com?subject=[GitHub]%20Private%20and%20Confidential)
## License And Copyright Info
MIT License

Copyright (c) 2020 Makamu Akan-Names

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.