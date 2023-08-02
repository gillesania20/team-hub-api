import { isValidObjectId } from 'mongoose';
const validateBearerToken = (token) => {
    const regex = new RegExp("^Bearer .{1,}")
    //starts with 'Bearer ' followed by any characters
    let output = false;
    if(typeof token !== 'string'){
        output = false;
    }else{
        output = regex.test(token);
    }
    return output;
}
const validateId = (id) => {
    let output = false;
    if(typeof id === 'string'){
        output = isValidObjectId(id);
    }else{
        output = false;
    }
    return output;
}
const validateUsername = (username) => {
    const regex = new RegExp("[a-zA-Z0-9_]{4,20}");
    //letters a-Z and underscore. minimum 4 characters and maximum 20 characters
    let output = false;
    if(typeof username !== 'string'){
        output = false;
    }else{
        output = regex.test(username);
    }
    return output;
}
const validatePassword = (password) => {
    const regex = new RegExp("^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,20}$");
    //atleast one letter,number, and special character then minimum length is 8 and maximum is 20
    let output = false;
    if(typeof password !== 'string'){
        output = false;
    }else{
        output = regex.test(password);
    }
    return output;
}
const validateBirthday = (birthday) => {
    const minAge = 18;
    const regex = new RegExp("^\\d\\d\\d\\d-\\d\\d-\\d\\d$");
    //year-month-day, format: yyyy-mm-dd
    let output = false;
    let checkRegex = false;
    let parsedDate = null;
    let checkIfNan = false;
    let dateObj = null;
    let currentDateObj = null;
    let yearVal = null;
    let monthVal = null;
    let dayVal = null;
    let currYearVal = null;
    let currMonthVal = null;
    let currDayVal = null;
    let diffInYear = 0;
    if(typeof birthday !== 'string'){
        output = false;
    }else{
        checkRegex = regex.test(birthday);
        if(checkRegex === false){
            output = false;
        }else{
            parsedDate = Date.parse(birthday);
            checkIfNan = isNaN(parsedDate);
            if(checkIfNan === true){
                output = false;
            }else{  
                dateObj = new Date(birthday);
                currentDateObj = new Date();
                yearVal = dateObj.getFullYear();
                monthVal = dateObj.getMonth();
                dayVal = dateObj.getDate();
                currYearVal = currentDateObj.getFullYear();
                currMonthVal = currentDateObj.getMonth();
                currDayVal = currentDateObj.getDate();
                diffInYear = currYearVal - yearVal;
                if(
                    (diffInYear > minAge)
                    || ((diffInYear === minAge)&&(currMonthVal > monthVal))
                    || ((diffInYear === minAge)&&(currMonthVal === monthVal)&&(currDayVal >= dayVal))
                ){
                    output = true;
                }else{
                    output = false;
                }
            }
        }
    }
    return output;
}
const validateTeamName = (name) => {
    const regex = new RegExp("^[a-zA-Z0-9_]{4,20}$")
    //letters, numbers, and underscore only. minimum 4 and maximum 20 characters
    let output = false;
    if(typeof name !== 'string'){
        output = false;
    }else{
        output = regex.test(name);
    }
    return output;
}
export {
    validateBearerToken,
    validateId,
    validateUsername,
    validatePassword,
    validateBirthday,
    validateTeamName
}