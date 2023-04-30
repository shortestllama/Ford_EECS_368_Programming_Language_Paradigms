{-
EECS 368 Assignment 6
Creates 5 different functions primarily
using list comprehensions
Inputs: none
Outputs: the results of the test calls
on the five functions
Jack Ford
11/14/2022
-}

import Prelude hiding (replicate) --excludes replicate from the prelude

replicate x val = [val | x <- [1..x]] --function that returns a list of the value x many times using a list comprehension

factors n = [n' | n' <- [1..(n - 1)], n `mod` n' == 0] --function that returns a list of factors of a given number using a list comprehension

perfects n = [n | n <- [1..n], n == sum (factors n)] --function that returns a list of the perfect numbers from 1 to n using a list comprehension

find key table = [snd x | x <- table, key == fst x] --function that returns a list of the values in a given table that correspond to a given key using a list comprehension

positions n xs = find n (zip xs [0..((length xs) - 1)]) --function that returns a list of the positions of a given value in a list

scalarproduct xs ys = sum [fst x * snd x | x <- zip xs ys] --function that returns the scalar product or dot product of two lists using a list comprehension

main = do --initialization of the main function
    print (replicate 3 True) --example for replicate
    print (replicate 5 "test code") --prints the test for the replicate function
    print (perfects 500) --example for perfects
    print (perfects 9000) --prints the test for the perfects function
    print (find 'b' [('a',1),('b',2),('c',3),('b',4)]) --example for find
    print (find 'c' [('a',1),('b',2),('c',3),('b',4),('c',25)]) --prints the test for the find function
    print (positions 0 [1,0,0,1,0,1,1,0]) --example for positions
    print (positions 1 [1,0,0,1,0,1,1,0]) --prints the test for the positions function
    print (scalarproduct [1,2,3] [4,5,6]) --example for scalarproduct
    print (scalarproduct [-1,2,3] [-4,-5,6]) --prints the test for the scalarproduct function