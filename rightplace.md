# RightPlace

This is a simple game to guess the correct order of a letter sequence. For a game of the default size 5, the game starts with a shuffled sequence of 5 letters (`A` through `E`) and shows an initial guess `ABCDE` together with how many letters are in the correct position.

```
   1   2   3   4   5
 +---+---+---+---+---+
 | A | B | C | D | E |   Correct: 2
 +---+---+---+---+---+
                         Swap which two positions?
```

Based on that information, the player can swap two letters each time by specifying their positions. After each guess, the game will show an updated status. The game will end when the player puts the letters back in the correct order.

```
   1   2   3   4   5
 +---+---+---+---+---+
 | A | B | C | D | E |   Correct: 2
 +---+---+---+---+---+
                         Swap which two positions? 2 4

   1   2   3   4   5
 +---+---+---+---+---+
 | A | D | C | B | E |   Correct: 1
 +---+---+---+---+---+
                         Swap which two positions? 3 5
  .
  .
  .

   1   2   3   4   5
 +---+---+---+---+---+
 | A | B | D | E | C |   Correct: 5
 +---+---+---+---+---+

Yay! Successful after 7 swap(s).
```

The player can make the game easier or more difficult by specifying a different size of the game. For example, to guess a sequence of `4` letters instead, we can do the following.

```
  $ rightplace 4
```

