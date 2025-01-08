# https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-regular-expressions-by-building-a-password-generator/

# A Python module is a file containing code designed to perform specific tasks.
# The Python standard library contains many modules that you can import and use in your code.
# You can achieve this by using the import statement followed by the name of the module. For example:
# You can access the utilities defined inside the imported module through the dot notation.
# The dot notation works by appending a dot followed by the utility name to the module name.
# For example, here's how to access the ascii_lowercase constant:

# import string

# print(string.ascii_lowercase)
# # Output: abcdefghijklmnopqrstuvwxyz

# It is a common convention to place import statements at the top of your code.
# And additionally, in case of multiple import statements, sort them in alphabetical order to improve readability.

# The random module contains a pseudo-random number generator.
# Most of its functionalities depend on the random() function, which returns a floating point number in the range between 0.0 (inclusive) and 1.0 (exclusive).
# The choice() function from the random module takes a sequence and returns a random item of the sequence.

# Every time the code runs, you should see a random character from the all_characters string.
# This is exactly what you want to achieve to create a random password.
# However, the algorithm on which random relies makes the generated pseudo-random numbers predictable.
# Therefore, although the random module is suitable for the most common applications, it cannot be used for cryptographic purposes, due to its deterministic nature.
# Although the effect might seem equal to random.choice(), secrets ensure you the most secure source of randomness that your operating system can provide.

# A standalone single underscore is used to represent a value you don't care or that won't be used in your code. Your iteration variable (i) is not actually used.

# A tuple is another built-in data structure in Python.
# Tuples are very much like lists, but they are defined with parentheses (), instead of square brackets.
# Also, tuples are immutable, unlike lists.

# my_tuple = ('larch', 1, True)

# Your constraints list is going to store tuples.
# The first item of each tuple will be a constraint parameter.

# The re module allows you to use regular expressions in your code.
# A regular expression, or regex, is a pattern used to match a specific combination of characters inside a string.
# It is a valid alternative to if/else conditional statements when you need to match or find patterns inside a string for validation purposes, character replacement, and others.
# The compile() function from the re module compiles the string passed as the argument into a regular expression object that can be used by other re methods.
# The search() function from the re module analyzes the string passed as the argument looking for the first place where the regex pattern matches the string.
# In your pattern, you can add a quantifier after a character to specify how many times that character should be repeated.
# For example, the + quantifier means it should repeat one or more times.

# To check that the generated password meets the required features, you are going to use the findall() function from the re module.
# It's similar to search but it returns a list with all the occurrences of the matched pattern.

# A character class is indicated by square brackets and matches one character among those specified between the brackets.
# For example, ma[dnt] matches either mad, man, or mat.
# Character classes also allow you to indicate a range of characters to match.
# You need to specify the starting and the ending characters separated by an hyphen, -.
# Characters follow the Unicode order.

# The caret, ^, placed at the beginning of the character class, matches all the characters except those specified in the class.
# The dot character is a wildcard that matches any character in a string — except for a newline character by default.
# If you need to match a character that has a special meaning in the pattern, such as . or +, you can escape it by prepending a backslash character, \.
# For example, this matches a literal plus sign: \+.

# Python provides a particular type of string called raw string.
# Raw strings are prefixed with a r.
# The key distinction from regular strings lies in how they handle the backslash character: in raw strings, backslashes are treated as literal characters rather than escape characters.
# When writing regular expressions, using raw strings is a good practice, since they can usually contain a lot of \ characters.

# The character class \d is a shorthand for [0-9].
# In a character class, you can combine multiple ranges by writing one range after another inside the square brackets (without any additional characters).
# For example: [a-d3-6] is the combination of [a-d] and [3-6].
# In the same way the [0-9] class is equivalent to \d, the [^0-9] class is equivalent to \D.
# Alphanumeric characters can be matched with \w and non-alphanumeric characters can be matched with \W.
# Since the underscore character is a valid character for variable names, it is included in the \w character class (equivalent to [a-zA-Z0-9_]), which can be conveniently used to match variable names.
# Therefore, the \W character class is equivalent to [^a-zA-Z0-9_] with the underscore character that is not matched.
# For this reason you cannot use it to match all your special characters.

# all() is a built-in Python function that returns True if all the elements inside a given iterable evaluate to True. Otherwise, it returns False.

# Having all([expression for i in iterable]), means that a new list is created by evaluating expression for each i in iterable.
# After the all() function iterates over the newly created list, the list is deleted automatically, since it is no longer needed.
# Memory can be saved by using a generator expression.
# Generator expressions follow the syntax of list comprehensions but they use parentheses instead of square brackets.

# You can call a function using keyword arguments, that is writing the parameter name explicitly followed by the assignment operator and the value.
# For example:

# def add(x, y):
#     return x + y

# add(x=1, y=7) # 8

# As long as all the arguments in a function call are keyword arguments, the order of the arguments doesn't matter.
# When you combine default arguments with keyword arguments, you are able to explicitly pass fewer arguments than those required by the function.
# The arguments that are not explicitly passed to the function call will take their default values.

# Finally, put the last two lines of your code inside an if statement that execute when __name__ == '__main__'.
# In this way, your code won't run when imported as a module.
# Otherwise, it will call generate_password() and print the generated password.

import re
import secrets
import string


def generate_password(length=16, nums=1, special_chars=1, uppercase=1, lowercase=1):

    # Define the possible characters for the password
    letters = string.ascii_letters
    digits = string.digits
    symbols = string.punctuation

    # Combine all characters
    all_characters = letters + digits + symbols

    while True:
        password = ''
        # Generate password
        for _ in range(length):
            password += secrets.choice(all_characters)

        constraints = [
            (nums, r'\d'),
            (special_chars, fr'[{symbols}]'),
            (uppercase, r'[A-Z]'),
            (lowercase, r'[a-z]')
        ]

        # Check constraints
        if all(
            constraint <= len(re.findall(pattern, password))
            for constraint, pattern in constraints
        ):
            break

    return password


if __name__ == '__main__':
    new_password = generate_password()
    print('Generated password:', new_password)
