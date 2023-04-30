/*
EECS 368 Assignment 2
Class that implements a group that is intended to act like a set
with all the set functions
Inputs: none
Outputs: the two groups and the values of all the function calls
on those two groups
Jack Ford
09/19/2022
*/
/*
Class that creates a group and has all the group member methods
to make the group act like a normal mathematical set
*/
class Group { //initializes the group class
    constructor() { //initializes the constructor for the group class
        this.group = []; //initializes the array that the group will be stored in
    }
    /*
    method that adds the given parameter to the group the
    method gets called on
    */
    add(n) { //initializes the add member method
        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            if (n == this.group[i]) { //checks to see if the value is already in the group
                console.log("Can't add"); //prints out that the value can't be added to the group
                return 0; //returns 0 if the value is already in the group so that it doesn't keep checking
            }
        }

        this.group.push(n); //adds the value to the group if it's nowhere else in the group
    }
    /*
    method that deletes the given parameter from the group
    the method gets called on
    */
    delete(n) { //initializes the delete member method
        let count = 0; //initializes a count variable to check if the value has been deleted

        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            if (n == this.group[i]) { //checks to see if the value is the one currently being looked at
                this.group.splice(i, i + 1); //removes the value from the group
                count++; //adds one to the count variable to denote that the value was removed
            }
        }
    
        if (count == 0) { //checks to see if the value was not removed after going through the whole group
            console.log("Can't delete"); //returns that the value couldn't be deleted
        }
    }
    /*
    method that checks to see if the group called on
    has the value passed into the method inside the
    group
    */
    has(n) { //initializes the has member method
        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            if (n == this.group[i]) { //checks to see if the value is in the group
                return true; //returns true
            }
        }

        return false; //returns false
    }
    /*
    returns the union of two groups
    */
    union(other) { //initializes the union member method
        let ans = new Group(); //initializes the return value as a new group
        
        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            ans.add(this.group[i]); //adds all the values of the first group to the return value
        }

        for (let i = 0; i < other.group.length; i++) { //loops through all the values in the other group
            if (!(ans.has(other.group[i]))) { //checks to see if the final answer does not already have the values of the other group
                ans.add(other.group[i]); //adds the values that it doesn't have to the final answer
            }
        }

        return ans; //returns the final answer
    }
    /*
    returns the intersection of two groups
    */
    intersection(other) { //initializes the intersection member method
        let ans = new Group(); //initializes the return value as a new group

        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            for (let j = 0; j < other.group.length; j++) { //loops through all the values in the other group
                if (this.group[i] == other.group[j]) { //checks to see if the values of the first group are equal to the values of the second group
                    ans.add(this.group[i]); //adds all the values that are the same between the two groups to the final answer
                }
            }
        }

        return ans; //returns the final answer
    }
    /*
    returns the difference of two groups
    */
    difference(other) { //initializes the difference member method
        let ans = new Group(); //initializes the return value as a new group

        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            ans.add(this.group[i]); //adds all the values of the first group to the return value
        }

        for (let i = 0; i < other.group.length; i++) { //loops through all the values in the other group
            ans.add(other.group[i]); //adds all the values of the second group to the return value
        }

        for (let i = 0; i < this.group.length; i++) { //loops through all the values in the group
            for (let j = 0; j < other.group.length; j++) { //loops through all the values in the other group
                if (this.group[i] == other.group[j]) { //checks to see if the values of the first group are equal to the values of the second group
                    ans.delete(other.group[j]); //removes all the values that are the same in both groups
                }
            }
        }

        return ans; //returns the final answer
    }
}

//Test Code

let group1 = new Group(); //initializes the first group
let group2 = new Group(); //initializes the second group
group1.add(1); //adds 1 to the first group
group1.add(2); //adds 2 to the first group
group1.add(3); //adds 3 to the first group
console.log(group1); //prints the first group
group2.add(2); //adds 2 to the second group
group2.add(3); //adds 3 to the second group
group2.add(5); //adds 5 to the second group
group2.add(2); //adds 2 to the seconds group
console.log(group2); //prints the second group
console.log(group1.has(5)); //prints the return value of calling 5 to the has method on the first group
console.log(group2.has(3)); //prints the return value of calling 3 to the has method on the second group
console.log(group1.union(group2)); //prints the return value of calling group2 to the union method on the first group
console.log(group1.intersection(group2)); //prints the return value of calling group2 to the intersection method on the first group
console.log(group1.difference(group2)); //prints the return value of calling group2 to the difference method on the first group
group1.delete(1); //deletes 1 from the first group
console.log(group1); //prints the first group
group2.delete(1); //deletes 1 from the second group
console.log(group2); //prints the second group