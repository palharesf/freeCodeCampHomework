# Variables are an essential part of Python and any programming language.
# A variable is a name that references or points to an object.
# You can declare a variable by writing the variable name on the left side of the assignment operator = and specifying the value to assign to that variable on the right side of the assignment operator:

# variable_name = value

# Each string character can be referenced by a numerical index.
# The index count starts at zero. So the first character of a string has an index of 0.
# For example, in the string 'Hello World', 'H' is at index 0, 'e' is at index 1, and so on.

# Each character of a string can be accessed by using bracket notation.
# You need to write the variable name followed by square brackets and add the index of the character between the brackets:
# Example:

# text = 'Hello World'
# # r = text[8]

# If we use a negative index, you can look at the string from the end to the beginning.

# text = 'Hello World'
# r = text[-1]

# You can access the number of characters in a string with the built-in len() function.
# Another useful built-in function is type(), which returns the data type of a variable.
# Key aspects of variable naming in Python are:

#     Some words are reserved keywords (e.g. for, while, True). They have a special meaning in Python, so you cannot use them for variable names.
#     Variable names cannot start with a number, and they can only contain alpha-numeric characters or underscores.
#     Variable names are case sensitive, i.e. my_var is different from my_Var and MY_VAR.
#     Finally, it is a common convention to write variable names using snake_case, where each space is replaced by an underscore character and the words are written in lowercase letters.

# You are going to use the .find() method to find the position in the alphabet of each letter in your message.
# A method is similar to a function, but it belongs to an object.

# sentence = 'My brain hurts!'
# sentence.find('r')

# Above, the .find() method is called on sentence (the string to search in), and 'r' (the character to locate) is passed as the argument.
# The sentence.find('r') call will return 4, which is the index of the first occurrence of 'r' in sentence.

# The first kind of cipher you are going to build is called a Caesar cipher.
# Specifically, you will take each letter in your message, find its position in the alphabet, take the letter located after 3 positions in the alphabet, and replace the original letter with the new letter.

# .find() returns the index of the matching character inside the string. If the character is not found, it returns -1.
# You can transform a string into its lowercase equivalent with the .lower() method.

# A loop allows you to systematically go through a sequence of elements and execute actions on each one.
# In this case, you'll employ a for loop. Here's how you can iterate over text:

# for i in text:

# for is the keyword denoting the loop type.
# i is a variable that sequentially takes the value of the elements in text.
# The statement ends with a colon, :.
# The code to execute at each iteration — placed after the : — constitutes the body of the loop. This code must be indented.
# In Python, it is recommended to use 4 spaces per indentation level. This indented level is a code block.

# for i in text:
#     print(i)

# Python relies on indentation to indicate blocks of code.
# A colon at the end of a line is a signal that a new indented block of code will follow.
# So, when no indented block is found after the final colon, the code execution stops and an IndentationError is thrown.
# This code will not show the output and instead raise an IndentationError:

# for i in text:
# print(i)

# The print() function can take multiple arguments, separated by a comma.
# Strings are immutable, which means they cannot be changed once created.
# When you try to change the individual characters of a string, you get a TypeError, which occurs when an object of inappropriate type is used in your code.
# As you can see from the error message, strings do not support item assignment, because they are immutable.
# However, a variable can be reassigned another string:

# message = 'Hello World'
# message = 'Hello there!'
 
#  You can obtain the same effect of a = a + b by using the addition assignment operator:

# a += b

# The addition assignment operator enables you to add a value to a variable and then assign the result to that variable.
# Comparison operators allow you to compare two objects based on their values.
# You can use a comparison operator by placing it between the objects you want to compare.
# They return a Boolean value — namely True or False — depending on the truthfulness of the expression.
# Python has the following comparison operators:

# Operator 	Meaning
# ==    	Equal
# != 	    Not equal
# > 	    Greater than
# < 	    Less than
# >= 	    Greater than or equal to
# <= 	    Less than or equal to

# A conditional statement is composed of the if keyword, a condition, and a colon :.

# if x != 0:
#     print(x)

# In the example above, the condition of the if statement is x != 0.
# The code print(x), inside the if statement body, runs only when the condition evaluates to True (in this example, meaning that x is different from zero).
# A conditional statement can also have an else clause.
# This clause can be added to the end of an if statement to execute alternative code if the condition of the if statement is false:

# if x != 0:
#     print(x)
# else:
#     print('x = 0')

# When the loop reaches the letter Z, the sum index + shift exceeds the last index of the string alphabet.
# Therefore, alphabet[new_index] is trying to use an invalid index, which causes an IndexError to be thrown.
# In this case, the modulo operator (%) can be used to return the remainder of the division between two numbers.
# For example: 5 % 2 is equal to 1, because 5 divided by 2 has a quotient of 2 and a remainder of 1.
# You can also define custom functions like this:

# def function_name():
#     <code>

# A function declaration starts with the def keyword followed by the function name — a valid variable name — and a pair of parentheses.
# The declaration ends with a colon.
# In Python, the scope of a variable determines where that variable can be accessed:
#     Variables defined outside a function have a global scope and they can be accessed from any part of your code.
#     Variables defined inside a function are local to that function and cannot be accessed outside of it.
# To execute, a function needs to be called (or invoked) by appending a pair of parentheses after its name, like this:

# function_name()

# functions can be declared with parameters to introduce versatility and customization:

# def function_name(param_1, param_2):
#     <code>

# Parameters are variables that you can use inside your function.
# A function can be declared with different number of parameters.
# In the example above, param_1 and param_2 are parameters.

text = 'Hello Zaira'
shift = 3

def caesar(message, offset):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    encrypted_text = ''

    for char in message.lower():
        if char == ' ':
            encrypted_text += char
        else:
            index = alphabet.find(char)
            new_index = (index + offset) % len(alphabet)
            encrypted_text += alphabet[new_index]
    print('plain text:', message)
    print('encrypted text:', encrypted_text)

caesar(text, shift)
caesar(text, 13)

# Currently, every single letter is always encrypted with the same letter, depending on the specified offset.
# What if the offset were different for each letter? That would be much more difficult to decrypt.
# This algorithm is referred to as the Vigenère cipher, where the offset for each letter is determined by another text, called the key.


