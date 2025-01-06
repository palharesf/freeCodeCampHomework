# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-lambda-functions-by-building-an-expense-tracker/

# Unlike numbers and strings, a list is a data type that works as a container for other values:

# example_list = [1, 2, 3, 4]
# empty_list = []

# The list is characterized by the square brackets around all the values, and a comma between the values, like: ["A", "happy", "list"].
# If the list does not contain any values, then it is an empty list: [].
# A list can contain different data types: [1, "Up", ["Down", "Twice"]].
# That includes all possible data types. It can also contain another list!
# To add items to a list, you can write them between the square brackets, separating the values with commas.

# Python has a handful of list methods. Such as methods for adding or removing list items.
# You can add an item to the end of a list using the append() method. For example:

# example_list = [4, 5, 6]
# example_list.append(7)
# print(example_list) >>> [4, 5, 6, 7]

# You can also access a single element to get its value.
# Lists are zero-indexed like strings are. That means that the first element is at index 0, the second element is at index 1 and so on.
# To access an element you use bracket notation. For example, example_list[1] is accessing the element at index 1, the second element, of example_list.

# Python lists are mutable which means that the value of the list items can be changed.
# You can change the value of an element using the bracket notation.

# example_list = [4, 5, 6, 7]
# example_list[1] = 'oh'

# This will make example_list have value of [4, 'oh', 6, 7].

# The insert method can add an element at any position in a list.
# The first argument is the position at which the element has to be added, and the second argument is the element to add.
# For example, here's how to add a new element in the third position of example_list:

# example_list = [4, 5, 6, 7]
# example_list.insert(2, 5.5)
# print(example_list) # [4, 5, 5.5, 6, 7]

# The pop() method can be used to remove an element from a list. By default, it removes the last element of the list.
# You can pass an index as the argument to the method, and it will remove the element at the given index.

# fruits_list = ["cherry", "lemon", "tomato", "apple", "orange"]
# fruits_list.pop(2)
# print(fruits_list) # ["cherry", "lemon", "apple", "orange"]

# In this case, fruits_list.pop(2) removes the element at index 2 of the list.

#A dictionary is another built-in data type in Python.
# A dictionary is a collection of data in the form of key-value pairs.
# Dictionaries are defined with curly braces ({}) and they contain key-value pairs separated by commas.
# Each key is followed by a colon (:) and the value:

# {'amount': 50.0, 'category': 'Food'}

# In the example above, 'amount' and 'category' are keys, and 50.0 and 'Food' are their corresponding values.

# In Python, an important thing to know is that the same type of quote used to define a string cannot be used inside it.
# For example, the string 'I'm a string!' is not valid. To use the single quote inside that string you should either:

#     Escape the quote by prepending a backlash to it: 'I\'m a string!'
#     Or use double quotes to define the string: "I'm a string!" (preferred).

# You can access values in a dictionary through its keys.
# You need to use bracket notation and include the key between the square brackets:

# my_dict = {'amount': 50.0, 'category': 'Food'}
# my_dict['amount'] # 50.0

# Lambda functions are brief, anonymous functions in Python, ideal for simple, one-time tasks.
# They are defined by the lambda keyword, and they use the following syntax:

# lambda x: expr

# In the example above, x represents a parameter to be used in the expression expr, and it acts just like any parameter in a traditional function.
# expr is the expression that gets evaluated and returned when the lambda function is called.

# Lambda functions can be valuably combined with the map() function, which executes a specified function for each element in a collection of objects, such as a list:

# map(lambda x: x * 2, [1, 2, 3])

# The function to execute is passed as the first argument, and the iterable is passed as the second argument.
# The result of the example above would be [2, 4, 6], where each item in the list passed to map() has been doubled by the action of the lambda function.
# You should see something like <map object at 0xd273a8> printed on the console, which is the string representation of the map object returned by map().
# To obtain a readable output you need to turn the map object into a list.
# Do it by passing the map() call as the argument to the list() function.

# test = lambda x: x * 2
# print(list(map(test, [2, 3, 5, 8])))

# The sum() function returns the sum of the items in the iterable which is passed as its argument. 

# The filter() function allows you to select items from an iterable, such as a list, based on the output of a function:

# filter(my_function, my_list)

# filter() takes a function as its first argument and an iterable as its second argument.
# It returns an iterator, which is a special object that enables you to iterate over the elements of a collection, like a list.
# The result of the example above is an iterator containing the elements of my_list for which my_function returns True.

# A while loop is another kind of loop that runs a portion of code as long as a specified condition is True.
# The loop terminates when the condition becomes False:

# while condition:
#     <code>

# The input() function takes a user input and it returns the user input in the form of a string.
# The float() function takes a string or an integer number as argument and returns a floating point number.
# To list all expenses, you can use an elif clause after an if statement.
# The elif checks additional conditions and only works following an if statement.

def add_expense(expenses, amount, category):
    expenses.append({'amount': amount, 'category': category})


def print_expenses(expenses):
    for expense in expenses:
        print(f'Amount: {expense["amount"]}, Category: {expense["category"]}')


def total_expenses(expenses):
    return sum(map(lambda expense: expense['amount'], expenses))


def filter_expenses_by_category(expenses, category):
    return filter(lambda expense: expense['category'] == category, expenses)


def main():
    expenses = []
    while True:
        print('\nExpense Tracker')
        print('1. Add an expense')
        print('2. List all expenses')
        print('3. Show total expenses')
        print('4. Filter expenses by category')
        print('5. Exit')

        choice = input('Enter your choice: ')

        if choice == '1':
            amount = float(input('Enter amount: '))
            category = input('Enter category: ')
            add_expense(expenses, amount, category)

        elif choice == '2':
            print('\nAll Expenses:')
            print_expenses(expenses)

        elif choice == '3':
            print('\nTotal Expenses: ', total_expenses(expenses))

        elif choice == '4':
            category = input('Enter category to filter: ')
            print(f'\nExpenses for {category}:')
            expenses_from_category = filter_expenses_by_category(expenses, category)
            print_expenses(expenses_from_category)

        elif choice == '5':
            print('Exiting the program.')
            break


main()
