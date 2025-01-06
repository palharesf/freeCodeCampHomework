# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-how-to-work-with-numbers-and-strings-by-implementing-the-luhn-algorithm/

# The Luhn Algorithm is a formula to validate a variety of identification numbers.
# Python comes with built-in classes that can help us with string manipulation. One of them is the str class.
# It has a method called maketrans that can help us create a translation table. This table can be used to replace characters in a string:

# str.maketrans({'t': 'c', 'l': 'b'})

# The above, when called on a string, will replace all t characters with c and all l characters with b.
# Defining the translation does not in itself translate the string.
# The translate method must be called on the string to be translated with the translation table as an argument:

# my_string = "tamperlot"
# translation_table = str.maketrans({'t': 'c', 'l': 'b'})
# translated_string = my_string.translate(translation_table)

# The Luhn algorithm is as follows:

#     From the right to left, double the value of every second digit; if the product is greater than 9, sum the digits of the products.
#     Take the sum of all the digits.
#     If the sum of all the digits is a multiple of 10, then the number is valid; else it is not valid.

# Assume an example of an account number "7992739871" that will have a check digit added, making it of the form 7992739871x:

# Account number      7   9  9  2  7  3  9   8  7  1  x
# Double every other  7  18  9  4  7  6  9  16  7  2  x
# Sum 2-char digits   7   9  9  4  7  6  9   7  7  2  x

# You have accessed elements (characters) of a string before, using the index operator [].
# You can also use the index operator to access a range of characters in a string with string[start:stop:step]:

# my_string = 'camperbot'
# my_string[0:6] == 'camper' # True
# my_string[0:6:3] == 'cp' # True

# Where start is the starting index (inclusive), stop is the ending index (exclusive), and step is the amount of characters to skip over.
# If not specified, step is default to 1.
# We can reverse the order of the digits in the last four digits of card_number by using a slice with a step of -1.
# Either a negative or positive indices can be used for the start and end.
# Just as the step is optional, a start at 0 and an end at the end of the slice are optional:
# 
# my_string = 'camperbot'
# camperbot = my_string[::]

# card_number_reversed = card_number[::-1]

# Currently, your script throws a TypeError because you are trying to add a string to an integer.
# You can fix this by converting the digit variable to an integer before adding it to sum_of_odd_digits, using the built-in int function:

# my_string = '123'
# my_int = int(my_string)

# Part of the algorithm is to double every second digit, starting from the right.
# If the result of doubling the number is greater than or equal to 10, add the two digits together.
# For example, if the digit is 6, double it to get 12. Add 1 and 2 together to get 3.
# You can do this by using integer division to get the first digit and the modulus operator (%) to get the second digit:

# my_number = 12
# first_digit = my_number // 10
# second_digit = my_number % 10

# Integer division results in the quotient of the division, rounded down to the nearest integer.

def verify_card_number(card_number):
    sum_of_odd_digits = 0
    card_number_reversed = card_number[::-1]
    odd_digits = card_number_reversed[::2]

    for digit in odd_digits:
        sum_of_odd_digits += int(digit)

    sum_of_even_digits = 0
    even_digits = card_number_reversed[1::2]
    for digit in even_digits:
        number = int(digit) * 2
        if number >= 10:
            number = (number // 10) + (number % 10)
        sum_of_even_digits += number
    total = sum_of_odd_digits + sum_of_even_digits
    return total % 10 == 0


def main():
    card_number = '4111-1111-4555-1142'
    card_translation = str.maketrans({'-': '', ' ': ''})
    translated_card_number = card_number.translate(card_translation)

    if verify_card_number(translated_card_number):
        print('VALID!')
    else:
        print('INVALID!')


main()
