// Assignment Code
var generateBtn = document.querySelector("#generate");

//Criteria and methods for determining password
var passwordCriteria = {
  length: 7,
  lower_case: false,
  upper_case: false,
  numbers: false,
  sp_char: false,

  minCriteria: function(){ //used to check whether a user declined all the prompts
    if(!this.lower_case && !this.upper_case && !this.numbers && !this.sp_char) {
      return false;
    } else {
      return true;
    }
  }, // randomly determines how many of each tru criteria is used
  getCharCounts: function() {
    var count = 0;
    var CharCounts = [];
    var len_track = this.length;
    console.log("len_track = " + len_track);

    if(this.lower_case){
      CharCounts.push({name: "lower",count:0});
      count++;
    };
    if(this.upper_case){
      CharCounts.push({name: "upper",count:0});
      count++;
    };
    if(this.numbers){
      CharCounts.push({name: "number",count:0});
      count++;
    };
    if(this.sp_char){
      CharCounts.push({name: "special",count:0});
      count++;
    }

    for (var i = 0; i < count; i++){
      if(i === count-1){
        CharCounts[i].count = len_track; //sets remaining count on the last object
      } else {
        var t = Math.floor(Math.random() * len_track * .7);
        if(t > this.length/2){t = Math.round(t/2)};
        CharCounts[i].count = t;
        len_track -= t;
        console.log("i = " + i + " and len_track = " +  len_track);
      }
    }

    CharCounts.forEach(function (arrayItem){ // makes sure there's no count = 0 on the objects, if there is it calls the .getCharCounts() again
      if(arrayItem.count < 1){
        console.log("One of the counts was 0, trying again.");

        CharCounts = passwordCriteria.getCharCounts();
      }
    });

    return CharCounts;

  }
};


//contains the available special chartacters and offsets
//contains methods for randomly generating characters
var passwordHelper = {
  sp_chars: ["?","/","-","*","#","@","$"],
  alpha_offset: 97,
  getAlpha: function(upper){
    if(upper){
      return String.fromCharCode(Math.floor(Math.random() * 26 + this.alpha_offset)).toUpperCase();
    }
    else { return String.fromCharCode(Math.random() * 26 + this.alpha_offset);
    }
  },

  getNumber: function(){
    return Math.floor(Math.random() * 10);
  },

  getSpChar: function(){
    return this.sp_chars[Math.floor(Math.random() * (this.sp_chars.length))];
  }
};

var scramble = function(charArray){
  for(var i = charArray.length-1; i > 0; i--){
    var x = Math.floor(Math.random() * i);
    var y = charArray[i];
    charArray[i] = charArray[x];
    charArray[x] = y;
  }

  var password = charArray.join('');

  return password;
};

//console.log(passwordCriteria);

var generatePassword = function() { //prompt for user's password specifications
  while(isNaN(passwordCriteria.length) || passwordCriteria.length < 8 || passwordCriteria.length > 128){
    passwordCriteria.length = window.prompt("How long would you like your password to be? Choose a number between 8 and 128.");
  }

  while(!passwordCriteria.minCriteria()){
    window.alert("Passwords must use at least one of the criteria. You will be asked these questions again if you click cancel, to all");
    passwordCriteria.lower_case = window.confirm("Would you like to use lower case letters?");
    passwordCriteria.upper_case = window.confirm("Woudl you like to use upper case letters?");
    passwordCriteria.numbers = window.confirm("Would you like to include numbers?");
    passwordCriteria.sp_char = window.confirm("Would you like to use special characters? ex. ?,/,-,*,#,@,$");
  }

  var characterCount = passwordCriteria.getCharCounts(); //chooses how many of each character type is used in password based off of options and password length

  var password = []; //generates random characters, iterates character count object and pushes characters in to new, empty password array

  characterCount.forEach(function(object){
    switch(object.name){
      case "lower":
        for(var i = 0;i < object.count;i++){
          password.push(passwordHelper.getAlpha(false));
        }
        break;
      case "upper":
        for(var i = 0;i < object.count;i++){
          password.push(passwordHelper.getAlpha(true));
        }
        break;
      case "number":
        for(var i = 0;i < object.count;i++){
          password.push(passwordHelper.getNumber());
        }
        break;
      default:
        for(var i = 0;i < object.count;i++){
          password.push(passwordHelper.getSpChar());
        }
    }
  });
//pushes all characters in to array and randomizes it
  return scramble(password);

};

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
//for funsies
generateBtn.addEventListener("click", console.log("Hello there!"))
generateBtn.addEventListener("click", console.log("General Kenobi!"))
