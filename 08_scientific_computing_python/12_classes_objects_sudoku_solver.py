# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-classes-and-objects-by-building-a-sudoku-solver/

# In this project, you will learn about classes and objects by building a sudoku puzzle solver.
# In Python, a class is a blueprint for creating objects.
# Objects created from a class are instances of that class. You can create a class using this syntax:

# class ClassName:
#     pass

# Where class is the keyword required to define the class and ClassName is the name of the class, written by convention in PascalCase.
# A new instance of a class is created by using the function notation, which involves appending a pair of parentheses to the class name.

# The instantiation creates an empty object.
# But classes can have methods, which are like local functions for each instance.
# Within a class, methods are declared as follows:

# class ClassName:
#     def method_name():
#         pass

# In order to be an instance method, a method requires a special parameter, named self by convention.
# This parameter is a reference to the instance of the class and must always be the first parameter.
# To call an instance method, you need to use dot notation:

# instance_name.method_name()

# Where instance_name is the instance or object, and method_name is the method you want to call.

# The instantiation creates an empty object.
# The __init__ method is a special method that allows you to instantiate an object to a customized state.
# When a class implements an __init__ method, __init__ is automatically called upon instantiation.
# Going back to the __init__ method, it requires an additional parameter representing the puzzle to solve.

# An attribute is a variable associated with an object, which is used to store data as regular variables.
# Inside the __init__ method, assign the board parameter (which is passed when creating an instance of the Board class) to an instance attribute board using self.board.
# self.board refers to the board attribute of the instance of the class. It's a variable that belongs to the object created from the Board class.
# You can also use dot notation to access an instance attribute.

# The enumerate built-in function takes an iterable as its argument and returns an enumerate object you can iterate over.
# It provides the count (which by default starts at zero) and the value from the iterable.

# iterable = ['a', 'b', 'c']
# for i, j in enumerate(iterable):
#     print(i, j)

# The loop from the example above would output the tuples 0, a, 1, b, and 2, c.
# You need to locate the empty cell, which is filled with the number zero.

# The .index() method raises a ValueError exception when the value is not found.
# To prevent the program from halting execution, you'll nest this line of code inside a try block.
# The try statement is used to encapsulate code that might raise an exception.
# The except clause, on the other hand, offers alternative code to execute if an exception occurs:

# try:
#     <code>
# except:
#     <code>

# If 0 is found, the method should immediately return a tuple containing the row index and column index of the empty cell.
# If the code inside the try block raises an exception, you want the program to continue running, and the pass statement accomplishes this.
# Although this code works, specifying the exception type after the except keyword is considered good practice.
# Since you know that a ValueError might be raised, leave a space after the except keyword and add ValueError after that.

# Outside the for loop, return None.
# This handles the case in which no empty cell is found, indicating that the sudoku board is completely filled.

# Note that, although find_empty_cell is defined with one parameter, you must not give it a value by passing an argument to the function call, since self is automatically passed in as the object you are calling the method on.

# If num is not in the row, the expression evaluates to True and it means the number is valid for insertion.
# If num is in the row, the expression evaluates to False and insertion would violate the rules.
# To check for column validity, we can use a generator expression that iterates over the range from 0 to 8 (inclusive), and for each row, evaluates whether the number at the specified row and column col on the board is different from num.

# A tuple can be unpacked, meaning that the elements contained in the tuple can be assigned to variables, like this:

# spam = ('lemon', 'curry')
# item1, item2 = spam

# In the example above, item1 would have the value 'lemon' and item2 would have the value 'curry'.

# Next, you'll work on a method that attempts to solve the sudoku in-place, meaning it will modify the existing sudoku board rather than creating a new one.

# The := operator gives you the ability to assign variables in the middle of an expression.
# The syntax is: name := val, where name is the variable name and val is the variable value.
# This construct is formally named assignment expressions, while the := operator is commonly referred to as the walrus operator.
# Since you are going to need the self.find_empty_cell() call more than once, assign it to a variable next_empty by using the walrus operator.
# Then, enclose the assignment between a pair of parentheses.
# In this way, you'll combine the assignment and the conditional check into a single line, making the code more concise.

# If the recursive call returns False, it means the guess led to an unsolvable sudoku.
# So you'll need to restore the cell to be empty and explore another guess.

# When you print your gameboard object, you get something like <__main__.Board object at 0xf3c1c8>, which is the default representation of an object.
# This means that the solve_sudoku function will also give you an output different from what you expect.
# The __str__ method is a special method that is called under the hood when the object is printed using the print() function, or converted into a string using the str() function.

class Board:
    def __init__(self, board):
        self.board = board

    def __str__(self):
        board_str = ''
        for row in self.board:
            row_str = [str(i) if i else '*' for i in row]
            board_str += ' '.join(row_str)
            board_str += '\n'
        return board_str

    def find_empty_cell(self):
        for row, contents in enumerate(self.board):
            try:
                col = contents.index(0)
                return row, col
            except ValueError:
                pass
        return None

    def valid_in_row(self, row, num):
        return num not in self.board[row]

    def valid_in_col(self, col, num):
        return all(self.board[row][col] != num for row in range(9))

    def valid_in_square(self, row, col, num):
        row_start = (row // 3) * 3
        col_start = (col // 3) * 3
        for row_no in range(row_start, row_start + 3):
            for col_no in range(col_start, col_start + 3):
                if self.board[row_no][col_no] == num:
                    return False
        return True

    def is_valid(self, empty, num):
        row, col = empty
        valid_in_row = self.valid_in_row(row, num)
        valid_in_col = self.valid_in_col(col, num)
        valid_in_square = self.valid_in_square(row, col, num)
        return all([valid_in_row, valid_in_col, valid_in_square])

    def solver(self):
        if (next_empty := self.find_empty_cell()) is None:
            return True
        for guess in range(1, 10):
            if self.is_valid(next_empty, guess):
                row, col = next_empty
                self.board[row][col] = guess
                if self.solver():
                    return True
                self.board[row][col] = 0
        return False


def solve_sudoku(board):
    gameboard = Board(board)
    print(f'Puzzle to solve:\n{gameboard}')
    if gameboard.solver():
        print(f'Solved puzzle:\n{gameboard}')
    else:
        print('The provided puzzle is unsolvable.')
    return gameboard


puzzle = [
  [0, 0, 2, 0, 0, 8, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 7, 6, 2],
  [4, 3, 0, 0, 0, 0, 8, 0, 0],
  [0, 5, 0, 0, 3, 0, 0, 9, 0],
  [0, 4, 0, 0, 0, 0, 0, 2, 6],
  [0, 0, 0, 4, 6, 7, 0, 0, 0],
  [0, 8, 6, 7, 0, 4, 0, 0, 0],
  [0, 0, 0, 5, 1, 9, 0, 0, 8],
  [1, 7, 0, 0, 0, 6, 0, 0, 5]
]
solve_sudoku(puzzle)
