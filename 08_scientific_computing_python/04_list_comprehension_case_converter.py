# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-list-comprehension-by-building-a-case-converter-program/

# In this project, you are going to build a program that takes a camelCase or PascalCase formatted string as input and converts that to a snake_case formatted string using two approaches.
# First, you'll use a for loop and then list comprehension to achieve the same results.
# You'll see how list comprehension can make your code more concise.

# In both camel case and pascal case, uppercase characters mark the beginning of new words.
# To convert the input string to snake case, you will need to check if the characters in the input string are uppercase.
# You can use the .isupper() string method to check if a character is uppercase.
# This method returns True if the character is uppercase and False if it is not.

# Inside the if statement body, you need to convert any uppercase character to lowercase and prepend an underscore to this lowercase character.
# Use the .lower() string method to convert uppercase characters to lowercase characters.

# By this point, the variable snake_cased_char_list holds the list of converted characters.
# To combine these characters into a single string, you can utilize the .join() method.
# The join method works by concatenating each element of a list into a string, separated by a designated string, known as the separator.

# result_string = ''.join(characters)

# The example above joins together the elements of the characters list into a single string where each element is concatenated together using an empty string as the separator.

# In pascal case, strings begin with a capital letter.
# After converting all the characters to lowercase and adding an underscore to them, there's a chance of having an extra underscore at the start of your string.
# The easiest way to fix this is by using the .strip() string method, which removes from a string any leading or trailing characters among a set of characters passed as its argument.

# original_string = "_example_string_"
# clean_string = original_string.strip('_')

# The strip() method is applied to original_string.
# This removes any leading and trailing underscore.
# The result of the example above would be the string 'example_string'.

def convert_to_snake_case(pascal_or_camel_cased_string):
    snake_cased_char_list = []
    for char in pascal_or_camel_cased_string:
        if char.isupper():
            converted_character = '_' + char.lower()
            snake_cased_char_list.append(converted_character)
        else:
            snake_cased_char_list.append(char)
    snake_cased_string = ''.join(snake_cased_char_list)
    clean_snake_cased_string = snake_cased_string.strip('_')

    return clean_snake_cased_string


def main():
    print(convert_to_snake_case('aLongAndComplexString'))


main()

# Method calls can be chained together, which means that the result of one method call can be used as the object for another method call.

# words_list = ['hello', 'world', 'this', 'is', 'chained', 'methods']
# result = ' '.join(words_list).upper()

# In the example above, the .upper() method is chained to ' '.join(words_list), therefore .upper() is called on the result of the .join() call.

# In Python, a list comprehension is a construct that allows you to generate a new list by applying an expression to each item in an existing iterable and optionally filtering items with a condition.
# Apart from being briefer, list comprehensions often run faster.
# A basic list comprehension consists of an expression followed by a for clause:

# spam = [i * 2 for i in iterable]

# The above uses the variable i to iterate over iterable.
# Each elements of the resulting list is obtained by evaluating the expression i * 2 at the current iteration.
# List comprehensions accept conditional statements, to evaluate the provided expression only if certain conditions are met:

# spam = [i * 2 for i in iterable if i > 0]

# As you can see from the output, the list of characters generated from pascal_or_camel_cased_string has been joined.
# Since the expression inside the list comprehension is evaluated for each character, the result is a lowercase string with all the characters separated by an underscore.
# Still, the final result is not exactly what you want to achieve.
# You need to execute a different expression for the characters filtered out by the if clause.
# You'll use an else clause for that:

# spam = [i * 2 if i > 0 else -1 for i in iterable]

# Note that, differently from the if clause, the if/else construct must be placed between the expression and the for keyword.


def convert_to_snake_case2(pascal_or_camel_cased_string):

    snake_cased_char_list = [
        '_' + char.lower() if char.isupper()
        else char
        for char in pascal_or_camel_cased_string
    ]

    return ''.join(snake_cased_char_list).strip('_')


def main():
    print(convert_to_snake_case2('IAmAPascalCasedString'))


main()
