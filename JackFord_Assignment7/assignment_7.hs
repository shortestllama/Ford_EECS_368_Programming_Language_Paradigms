{-
EECS 368 Assignment 7
Creates and runs the game of nim
Inputs: rows and number of stars to
remove
Outputs: the current state of the game
Jack Ford
12/7/2022
-}

import Data.Char

next :: Int -> Int
next 1 = 2 --if next is 1, set it to 2
next 2 = 1 --if next is 2, set it to 1

type Board = [Int]

initial :: Board
initial = [5,4,3,2,1] --the initial state of the board

finished :: Board -> Bool
finished = all (== 0) --checks to see if all the values on the board are 0

valid :: Board -> Int -> Int -> Bool
valid board row num = board !! (row-1) >= num --checks to see if the amount of stars at the given row is greater than or equal to the requested amount of stars

move :: Board -> Int -> Int -> Board
move board row num = [update r n | (r,n) <- zip [1..] board] --changes the board to show the new amount of stars for the given row
   where update r n = if r == row then n-num else n --makes the list equal to n-num if it is the requested row, otherwise, just keeps it the same

putRow :: Int -> Int -> IO ()
putRow row num = do putStr (show row) --prints the row number
                    putStr ": " --prints a colon
                    putStrLn (concat (replicate num "* ")) --prints the amount of stars in the row
 
putBoard :: Board -> IO ()
putBoard [a,b,c,d,e] = do putRow 1 a --puts a stars in row 1
                          putRow 2 b --puts b stars in row 2
                          putRow 3 c --puts c stars in row 3
                          putRow 4 d --puts d stars in row 4
                          putRow 5 e --puts e stars in row 5

getDigit :: String -> IO Int
getDigit prompt = do putStr prompt --prints the prompt
                     x <- getChar --gets a character from the user and stores it in x
                     newline --prints a new line
                     if isDigit x then --checks to see if the given character is a digit
                        return (digitToInt x) --returns the given character as an int
                     else
                        do putStrLn "ERROR: Invalid digit" --prints an error
                           getDigit prompt --calls itself

newline :: IO ()
newline = putChar '\n' --makes a new line

play :: Board -> Int -> IO ()
play board player =
   do newline --prints a new line
      putBoard board --prints the board
      if finished board then --checks to see if the board has all 0s
         do newline --prints a new line
            putStr "Player " --prints player
            putStr (show (next player)) --prints the player number
            putStrLn " wins!!" --prints wins
      else  
         do newline --prints a new line
            putStr "Player " --prints player
            putStrLn (show player) --prints the player number
            row <- getDigit "Enter a row number: " --stores the digit returned from the function in the variable row
            num <- getDigit "Stars to remove: " --stores the digit returned from the function in the variable num
            if valid board row num then --checks to see if the numbers given for the move are valid
               play (move board row num) (next player) --calls itself with the new board and next player
            else
               do newline --prints a new line
                  putStrLn "ERROR: Invalid move" --prints an error
                  play board player --calls itself

nim :: IO ()
nim = play initial 1 --starts the game with the initial board and player one

main = nim --calls the start game function