// While your boss, Paula Davis, is working with the client let's do some practice exercises to understand some of the basic practices of coding in JavaScript.

// JavaScript Basics
//  View Explanation & Exercises...
// Part 1: Set up a JavaScript playground
// Since you''ll be learning to write JavaScript for web pages, the best way to experiment is by making a very simple web page that loads and runs some JavaScript. You may find this page useful when testing out ideas in later tasks.

// Create a directory for your code, e.g., playground.
// Inside that directory, create an HTML file, e.g., index.html.
// In the HTML file, put some simple HTML to show some text that will let you know you''re looking at the right file. Be sure to include <!DOCTYPE HTML> at the top.
// Add a script element to this file to load JavaScript from the file main.js. See this example for the syntax. Use the version listed for HTML5.
// In the same directory, create the file main.js.
// In the JavaScript file, add a line into your JavaScript file to print the following text in the console: "Starting javascript...".
// In programming, printing to some console window is often called "logging". Hence the function to use in JavaScript is console.log.
// Open your HTML file in a browser.
// Open the developer console. Is your message there? If not, try reloading the file.
// TIP: If you still don't see the message, check your HTML and JavaScript file for typos. Make sure file names match exactly, including case. Make sure the JavaScript file is in the same directory as the HTML file.

// TIP: As you do the exercises below, keep adding new code to do what each exercise asks for. At the end, you''ll be asked to submit all the JavaScript for mentor feedback.

// Part 2: Writing expressions with variables
// To get started, here are some simple exercises to create and use variables and expressions. Variables are how you store data and results of calculations. Expressions are how you calculate values.

// Exercise 1:

// In your JavaScript file create a variable called myName with your name as the value. Put your name inside string quotes, e.g., "my name". Then add a line of code to print the variable name to the console after the previous message.

var myName = "Harris"
// Save your JavaScript file in your editor. Reload the HTML page in your browser. You should see your name printed. If not, investigate and fix.

console.log(myName)

// Exercise 2:

// Create a variable called age with a number that is your age. Do not use string quotes for numbers.

var myAge = 31;

// Add a line to print that variable in the console. Save the file and reload the page. You should see your name, and your age.

console.log(myAge)

// Exercise 3:

// Create a variable called ignasiAge with a value 32. Create another variable called ageDiff and set it to an expression that calculates your age minus Ignasi''s age. Print the value of ageDiff.
var ignasiAge = 32;
var ageDiff = myAge - ignasiAge
// Save the file and reload the page. You should see your age, and the difference. If you are younger than Ignasi, you should see a negative number.
console.log(ageDiff)
// Part 3: Writing code with conditionals
// Conditionals are forms used programming to tell the computer to do different things, depending on some test, e.g., "if the user is logged in, say "Hi" else say "Please log in."

// The most basic conditional form is the if...then...else.... 

// Exercise 4:

// Write a conditional that compares the variable with your age with the number 21. It should print either "You are older than 21" or "You are not older than 21", appropriately, depending on your age.
if(myAge > 21) console.log("You are older then 21");
else{
    console.log("You are not older then 21")
}
// Save your JavaScript file and reload the page. Make sure you see the correct message. Try changing your age in the JavaScript file to make sure the other message prints when it should.

// Exercise 5:

// Write a conditional that compares your age with Ignasi''s age. This conditional will need to test if you are older, younger, or the same age, and print, appropriately, either "Ignasi is older than you", Ignasi is younger than you", or "You have the same age as Ignasi".

// Save your changes and reload the file.
if(myAge > ignasiAge) console.log("you are older then ignacio") 
else if(myAge == ignasiAge){
    console.log("you are the same age as ignacio")
    console.log("you are the same age as ignacio")
}
else{
    console.log('you are younger then ignacio')
}

// JavaScript Array Functions 
//  View Explanation & Exercises...
// Sorting an Array
// Exercise 1: 

// Create an array with all the names of your class (including mentors).  Sort the array alphabetically. 
// Print the first element of the array in the console.  
//Print the last element of the array in the console.  Print all the elements of the array in the console.  Use a "for" loop.//
let array = ['Daniella', 'Kazu', 'Jorge', 'Ignacio', 'Gonzalo']
let sorted = array.sort();
console.log(sorted)
console.log(sorted[sorted.length - 1])
for(let i = 0; i < sorted.length; i ++){
    console.log(sorted[i])
}
// Save the file and reload the page. You should see the first element of the sorted array, the last element of the sorted array, and a list of all the elements in order in the array in the console.

// Looping Over an Array
// Exercise 2: 

// Create an array with all the ages of the students in your class.  
//Iterate the array using a while loop, and then print every age in the console.  
//Add a conditional inside the while loop to only print even numbers.  Change the loop to use a "for" loop instead of a "while" loop.
let ages = [20,34,22,25,27,29]

let counter = 0
while( counter != ages.length ){
    if(ages[counter] % 2 == 0){
        console.log(ages[counter])
    }
    counter ++;
}

for(let i = 0; i < ages.length; i++){
    if(ages[i] % 2 == 0){
        console.log(ages[i])
    }

}
// Save your changes to your JavaScript file. Reload the HTML page in your browser. You should see every age printed, then only the even numbers printed.  If not, investigate and fix.

// Functions that Use Arrays
// For the following exercises, you cannot sort your array. Be sure your solution works for any array that it is passed!

// Exercise 3: 

// Write a function which receives an array as a parameter and prints the lowest number in the array to the console.

const lowest = array =>{
    let low = array[0]
    for(let i = 0; i < array.length; i ++){
        if(array[i] < low){
            low = array[i]
        }
    }
    console.log(low, 'low')

}

function lowest2(array){
    let low = array[0]
    for(let i = 0; i < array.length; i ++){
        if(array[i] < low){
            low = array[i]
        }
    }
    return low 

}

console.log(lowest2(ages))
console.log(lowest(ages))

// Save the changes to your JavaScript file. 
//Reload the HTML page in your browser. You should see the lowest number in the array printed in the console.  If not, investigate and fix.

// Exercise 4: 

// Write a function which receives an array as a parameter and prints the biggest number in the array to the console.

const highest = array =>{
    let high = array[0]
    for(let i = 0; i < array.length; i ++){
        if(array[i] > high){
            high = array[i]
        }
    }
    console.log(high, 'high')

}

highest(ages)

// Save the changes to your JavaScript file. Reload the HTML page in your browser. 
//You should see the biggest number in the array printed in the console.  If not, investigate and fix.

// Exercise 5: 

// Write a function which receives two parameters, an array and an index.  
//The function will print the value of the element at the given position (one-based) to the console.

// For example, given the following array and index, the function will print '6'.  

var printarray = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100];
 var index = 1;
// Save the changes to your JavaScript file and check your browser console. 
// You should see the number at the correct index printed in the console.  If not, investigate and fix.

const printIndex = (array, index) => {
    console.log(array[index])
}
printIndex(printarray,index)






// Exercise 6: 

// Write a function which receives an array and only prints the values that repeat.  

// For example, given the following array and index, the function will print '6,23,33,100'.
var repeatArray = [3,6,67,6,23,11,100,8,93,0,17,24,7,1,33,45,28,33,23,12,99,100]; 
// Save the changes to your JavaScript file. Reload the HTML page in your browser. 
//You should see an array of the repeated numbers printed in the console.  If not, investigate and fix.

// Exercise 7: 

const arraySort = (array) => {
    let arrayRet = [];
    for(let i = 0; i < array.length; i ++){
        for(let j = i + 1; j < array.length; j++){
            if(array[i] == array[j]){
                arrayRet.push(array[i])
            }
        }
    }
    console.log(arrayRet)
}

arraySort(repeatArray)



// Write a simple JavaScript function to join all elements of the following array into a string. 

var myColor = ["Red", "Green", "White", "Black"];
// Save the changes to your JavaScript file. Reload the HTML page in your browser.
// You should see the following in your console:

// "Red", "Green", "White", "Black"

//  If not, investigate and fix. 
const joiner = (array) =>{

console.log(array.join());

}


joiner(myColor)

// JavaScript String Functions
//  View Explanation & Exercises...
// Exercise 1: 

// Write a JavaScript function that reverses a number. For example, if x = 32443 then the output should be 34423.
let x = 32443



const reverse = (n) =>{
    
    let digit;
    let result = 0;
    
   
    while( n ){
        digit = n % 10                  
        result = (result * 10) + digit 
        n = n/10|0                     
    }  
  
     console.log(result)

}

reverse(x);

// Save your JavaScript file and reload the page. Make sure you see the correct output.  If not, investigate and fix.

// Exercise 2: 

// Write a JavaScript function that returns a string in alphabetical order. For example, 
//if x = 'webmaster' then the output should be 'abeemrstw'.  Punctuation and numbers aren't passed in the string.

const stringReverse = (string) =>{

let stringArray = string.split('')
console.log(stringArray.sort().join(''))

}
stringReverse('webmaster')


// Save your JavaScript file and reload the page. Make sure you see the correct output.  If not, investigate and fix.

// Exercise 3: 

// Write a JavaScript function that converts the first letter of every word to uppercase. For example,
// if
 x = "prince of persia" //then the output should be "Prince Of Persia".


const splitter = (string) =>{

    let array = string.split('')
    array[0] = array[0].toUpperCase();
    for(let i = 0; i < array.length; i ++){
        if(array[i] == ' '){
            array[i + 1] = array[i + 1].toUpperCase()
            console.log(array[i + 1])
        }

    }
    console.log(array.join(''))


}

splitter(x)

// Save your JavaScript file and reload the page. Make sure you see the correct output.  If not, investigate and fix.

// Exercise 4: 

// Write a JavaScript function that finds the longest word in a phrase. For example, 
//if 
x = "Web Development Tutorial"
//, then the output should be "Development".


const longestWord = (string) =>{

    let arraybox = []
    array = string.split('')
    let box = [];
    for(let i = 0; i < array.length; i ++){

        if(array[i] != ' '){
            box.push(array[i])
        }else{
            arraybox.push(box.join(''));
            box = [];
        }
    }
    arraybox.push(box.join(''));

    let word = arraybox[0]    
    for(let i = 1; i < arraybox.length; i++){
        if(word.length < arraybox[i].length){
        word = arraybox[i]
    }
    }
    console.log(word)
}
longestWord(x)



// Save your JavaScript file and reload the page. Make sure you see the correct output.  If not, investigate and fix.



// Extra: More Functions Exercises (optional)
//  View More Exercises
// Exercise 1: 

// Write a JavaScript function that returns nothing and has no parameters. 
//This function should print the result of multiply two number (the numbers that you want). 

// Exercise 2: 

// Write a JavaScript function with no parameters. 
//This function should return the result of multiply two number (the numbers that you want), and in your main program, you should print the result.  

// Exercise 3:

// Write a JavaScript function two parameters. 
//These parameters are the numbers that have to be multiplied. The function should return the result of multiply both numbers (the numbers that you want), and in your main program, you should print the result. Test the function with 3 examples.

// Exercise 4:

// Write a function that determines the type of a triangle given the length of its three sides.

// Exercise 5:

// Write a function that receives as a parameter an array of characters and replaces all a by a '1'. e.g.: casa → c1s1

// Exercise 6:

// Write two functions. The first one should return the sum of all the elements of
// an array and the second one should return the smallest number in the array. Print  the result in the main program.

// Exercise 7:

// Write a function that adds the even numbers of an array. For example,
// the array: 1 2 8 3 2 would result in the sum of 2 + 8 + 2, since they are even numbers. Return the result and print it in the main program.

// Exercise 8:

// Write a function that adds the even positions of an array. For example, 
//the array: 1 2 8 3 2 3 4 would result in the sum of 8 + 2 + 4 since they 
//are even positions of the array(position 2,4,6). Return the result and print it in the main program.

// Exercise 9:

// Write a function that by sending a number as parameter, tells you all the even numbers previous to it. For example, if you send to the function the number 9, it should print 2,4,6,8.

// Exercise 10:

// Write a function that by sending two numbers as parameters, it tells you the odd numbers between these. For instance, if you send it the numbers  1 and the 13 as parameters, it should print 1,3,5,7,9,11,13.

