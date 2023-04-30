/*
EECS 368 Assignment 1
JavaScript code for the first three coding problems in the book
Inputs: none
Outputs: solutions to looping a triangle, fizzbuzz, and n-by-n grid
Jack Ford
09/07/2022
*/
/*
for loop that prints out an x
for the number of the line that it's on
*/
console.log("Looping a triangle") //prints out the title of the problem

let line = "x" //initializes the variable line as a string of x
for (let i = 0; i < 10; i++) { //initializes the for loop to run 10 times
    console.log(line) //prints out the variable line
    line += "x" //adds an x to the variable line
}

/*
prints out the numbers 1 to 100 and if the
number is divisible by 4, prints that it is
divisible by 4, if it's divisible by 7, prints
that it's divisible by 7, but not 4, and if
it's divisible by 4 and 7 prints that it's
divisible by both 4 and 7
*/
console.log("FizzBuzz") //prints out the title of the problem

for (let i = 1; i <= 100; i++) { //initializes the for loop to run 100 times
    if (i % 4 == 0 && i % 7 == 0) { //checks if the number is divisible by 4 and 7
        console.log("Divisible by both 4 and 7") //prints out that the number is divisible by both 4 and 7
    }

    else if (i % 4 == 0) { //checks if the number is divisible by 4
        console.log("Divisible by 4") //prints out that the number is divisible by 4
    }

    else if (i % 7 == 0) { //checks if the number is divisible by 7
        console.log("Divisible by 7, but not 4") //prints out that the number is divisible by 7, but not 4
    }

    else { //if nothing else runs
        console.log(i) //prints out the number
    }
}

/*
prints out an n-by-n grid for a given number n, where
the grid is comprised of spaces and stars with each line
alternating spaces and stars and the odd numbered lines
starting with spaces and even numbered lines starting with
stars
*/
console.log("n-by-n Grid") //prints out the title of the problem

const loop = function(s) { //initializes the function that prints out the n-by-n grid for the given size s
    let sol = "" //initializes the solution to an empty string

    for (let i = 0; i < s; i++) { //initializes the first for loop for each line in the grid
        for (let j = 0; j < s; j++) { //initializes the second for loop that loops through each line
            if (i % 2 == 0) { //checks if the given line is even
                if (j % 2 == 0) { //checks if the given column in the given line is even
                    sol += " " //adds a space to the solution
                }

                else { //if the given column in the given line is odd
                    sol += "*" //adds a star to the solution
                }
            }

            else { //if the given line is odd
                if (j % 2 == 0) { //checks if the given column in the given line is even
                    sol += "*" //adds a star to the solution
                }

                else { //if the given column in the given line is odd
                    sol += " " //adds a space to the solution
                }
            }

            if (j == s - 1) { //checks if the given column in the given line is the last column
                if (i != s - 1) { //checks if the given line is not the last line
                    sol += "\n" //adds a newline to the string
                }
            }
        }
    }

    return sol //returns the string
}

var size = 8 //initializes the variable size to 8
console.log("size = " + size) //prints out the size of the grid
console.log(loop(size)) //prints out the call to the function that returns a string for an n-by-n grid of size 8
size = 14 //changes the value of size to 14
console.log("size = " + size) //prints out the size of the grid
console.log(loop(size)) //prints out the call to the function that returns a string for an n-by-n grid of size 14