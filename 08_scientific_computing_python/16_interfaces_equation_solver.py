# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-interfaces-by-building-an-equation-solver/

# An interface is like a blueprint for a class.
# An interface contains a set of methods and properties that a class should implement.
# Unlike other programming languages, Python does not implement interfaces in its core language, but the Python standard library allows you to define interfaces in a simple way.

# ABC stands for Abstract Base Classes.
# The ABC class enables you to turn a regular class into an abstract class, which is a class that acts as a blueprint for concrete classes.

# In order to be recognized as an abstract method, a method should be decorated with the @abstractmethod decorator.
# Modify your import statement to import the abstractmethod decorator and decorate both the solve and analyze methods of the Equation class. This will raise two exceptions.
# Once a class inheriting from ABC has an abstract method, the class cannot be instantiated anymore.
# Therefore, delete the Equation instance to get rid of the error.
# The other error occurs because the LinearEquation class must implement all the abstract methods defined in the interface.
# Make sure to define them inside the LinearEquation class, too. You must not use the abstractmethod decorator in the concrete class.

# An interface doesn't have to define only abstract methods, but it can also implement methods to be inherited by the concrete classes.

# In Python, data types are recognized during runtime (when the code is executed).
# Therefore, you don't have to specify the data type of a variable when you declare it.
# Nonetheless, you can annotate a variable to clarify that it will hold a specific data type with variable: <data type> = value or just variable: <data type>.
# Note that the Python interpreter does not enforce the types used to annotate variables, and normally you'd need external tools to do it.

# The __init_subclass__ method is called whenever the class that defines it is subclassed and it enables to customize the child classes.
# The method takes a parameter named by convention cls (standing for "class"), which represents the new child class.
# The hasattr built-in function takes an object as its first argument and a string representing an attribute name as its second argument.
# It returns a boolean indicating if the object has the specified attribute.

# Each equation object will be instantiated passing as many arguments as the coefficients of the equation, starting from n-th degree of \( x \) down to the zero-th degree, including the possible coefficient with the value of 0.
# For example, LinearEquation(4, 5) would represent the equation \( 4x + 5 = 0 \), with 4 being the coefficient of the first (highest here) degree and 5 the coefficient of the zero-th degree.
# You need to check that the right number of arguments is passed to instantiate the equation object.

# The isinstance() built-in function takes two arguments and returns a Boolean indicating if the object passed as the first argument is an instance of the class passed as the second argument.

# isinstance(7, int) # True

# Another thing you want to check is that every argument is a number.
# The last step of validating the coefficients is checking that the highest degree coefficient is different from zero.
# Remember that the highest degree coefficient should be passed as the first argument when instantiating the object.

# After validating the coefficients, you need to store them in an instance attribute.
# Use a dictionary comprehension to create a dictionary in which the key is the degree of the coefficient and the corresponding value is the coefficient, and assign it to an attribute named coefficients.
# For example, a LinearEquation object instantiated with 2 and 4 should have the following coefficients attribute: {1: 2, 0: 4}, because 2 corresponds to the first degree of x and 4 corresponds to zero-th degree of x.

# The number sign is displayed by default only if negative.
# To change this behaviour, you can write a colon after the expression to be evaluated within the curly braces of your f-string, and specify the option +.
# This will allow you to display the sign both for positive and negative numbers.

# It's time to implement the solve method. Given a linear equation in the form \( ax + b = 0 \), the solution is \(x = -\frac{b}{a}\).
# In linear equations in the form \( ax + b = 0 \), the slope is simply the coefficient \( a \), and the y-intercept is the coefficient \( b \).
# You are going to use the analyze method to provide additional information about the equation.
# Inside the analyze method, unpack the coefficients into the variables slope and intercept.

# Next, create a new class named QuadraticEquation and make it inherit from Equation.
# You'll use this new class to represent quadratic equations, which are second-degree equations having the form $ax^2 + bx + c = 0$.
# The discriminant of a quadratic equation in the form \( ax^2 + bx + c = 0 \), usually indicated by the capital Greek letter delta, is equal to \( Δ = b^2 - 4ac \).

# The sub function from the re module enables you to replace text inside a string based on a regex pattern.

# verse = 'Always look on the bright side of life'
# spam = re.sub('bright', 'spam', verse)
# spam == 'Always look on the spam side of life' # True

# It takes three arguments: the regex pattern to match, the replacement, and the string on which you want to perform the replacement.
# In a regex pattern, a lookaround is an assertion that matches a certain pattern without consuming characters in the string.

# One kind of lookaround is the lookbehind, which can be either positive or negative.
# They are denoted by (?<=...) and (?<!...), respectively.

# spam = 'black back bat'
# re.sub('(?<=l)a', 'o', spam) == 'block back bat' # True
# re.sub('(?<!l)a', 'o', spam) == 'black bock bot' # True

# In the example above, the pattern (?<=l)a contains a positive lookbehind, which is used to match the a character only when preceded by an l.
# In the last line of the example, the pattern (?<!l)a contains a negative lookbehind, which is used to match the a character only if it is not preceded by an l.
# Note how, in both cases, the character contained in the lookbehind is not consumed.
# Another kind of lookaround assertion is the lookahead.
# Positive and negative lookahead are denoted by (?=...) and (?!...), respectively.
# They are used to match a pattern if followed by a certain sequence of characters, which is not consumed:

# spam = 'black back bat'
# re.sub('a(?=t)', 'o', spam) == 'black back bot' # True
# re.sub('a(?!t)', 'o', spam) == 'block bock bat' # True

# In the example above, the pattern a(?=t) contains a positive lookahead, which is used to match the a character only when followed by a t.
# In the last line of the example, the pattern a(?!t) contains a negative lookahead, which is used to match the a character only if not followed by a t.
# Again, in both cases, the character contained in the lookahead is not consumed.

# In general, it is good practice to make the same methods from different classes return the same type of data.
# The solve method from the QuadraticEquation class returns a list, because quadratic equations can have two roots.
# Although linear equations have a single real solution, modify the solve method within the LinearEquation class to return a list containing the root, so that the solve methods from different classes return the same type of data.

# The graph of any quadratic equation has a parabolic shape.
# The \( x \) coordinate of the vertex of the parabola can be found at \( x = - \frac{b}{2a} \).
# From the analyze method, return the dictionary containing two keys, 'x', and 'y', and the corresponding values of the vertex \( x \) and \( y \) coordinates, respectively.

# When the second-degree coefficient is positive, the parabola has a minimum point and opens upward, or it is called concave upwards.
# Instead, when the second-degree coefficient is negative, the parabola has a maximum point and opens downward, or it is called concave downwards.
# Declare a concavity variable and assign it either the string 'upwards' or 'downwards', depending on the concavity of the parabola.
# Also, declare a variable named min_max and assign it either the string 'min' or 'max', depending on if the vertex is a minimum or a maximum, respectively.

# An interesting feature of f-strings is the capability of forcing the output to be right/left-aligned, or centered.
# After the expression to be evaluated is inside the curly braces, you need to write a colon followed by an alignment option and a number representing the width, that is the number of characters in which you want to arrange the text.
# You use < to left-align, > to right-align, ^ to center.

# f'{"Hello World":>20}'

# Printing the string from the example above would result in right-aligned text arranged in a space of 20 characters.
# Between the colon and the alignment option, you can specify a fill character, which will be used to fill the space around the text within the specified width.

# Another feature of f-strings enables you to convert the content of the replacement field (the curly braces) into a string by using a ! followed by the conversion type s.
# For example, f'{obj!s}' converts obj into a string and it is equivalent to f'{str(obj)}'.

# Structural pattern matching is a Python construct that enables matching a pattern with a subject value, which is specified after the match keyword:

# match value:
#     case x:
#         <code>
#     case y:
#         <code>

# Each pattern is specified after the case statement.
# If the match is positive, the code inside the case block is run.

# f-strings also enable you to set a specific precision to your numerical data by using the .nf format specifier, where n is the number of decimal digits to display.

# The structural pattern matching enables you to verify that the subject has a specific structure.
# In addition to that, it binds names in the pattern to elements of the subject. For example:

# match my_list:
#     case [a]:
#         print(a)
#     case [a, b]:
#         print(a, b)

from abc import ABC, abstractmethod
import re


class Equation(ABC):
    degree: int
    type: str

    def __init__(self, *args):
        if (self.degree + 1) != len(args):
            raise TypeError(
                f"'Equation' object takes {self.degree + 1} positional arguments but {len(args)} were given"
            )
        if any(not isinstance(arg, (int, float)) for arg in args):
            raise TypeError("Coefficients must be of type 'int' or 'float'")
        if args[0] == 0:
            raise ValueError("Highest degree coefficient must be different from zero")
        self.coefficients = {(len(args) - n - 1): arg for n, arg in enumerate(args)}

    def __init_subclass__(cls):
        if not hasattr(cls, "degree"):
            raise AttributeError(
                f"Cannot create '{cls.__name__}' class: missing required attribute 'degree'"
            )
        if not hasattr(cls, "type"):
            raise AttributeError(
                f"Cannot create '{cls.__name__}' class: missing required attribute 'type'"
            )

    def __str__(self):
        terms = []
        for n, coefficient in self.coefficients.items():
            if not coefficient:
                continue
            if n == 0:
                terms.append(f'{coefficient:+}')
            elif n == 1:
                terms.append(f'{coefficient:+}x')
            else:
                terms.append(f"{coefficient:+}x**{n}")
        equation_string = ' '.join(terms) + ' = 0'
        return re.sub(r"(?<!\d)1(?=x)", "", equation_string.strip("+"))

    @abstractmethod
    def solve(self):
        pass

    @abstractmethod
    def analyze(self):
        pass


class LinearEquation(Equation):
    degree = 1
    type = 'Linear Equation'

    def solve(self):
        a, b = self.coefficients.values()
        x = -b / a
        return [x]

    def analyze(self):
        slope, intercept = self.coefficients.values()
        return {'slope': slope, 'intercept': intercept}


class QuadraticEquation(Equation):
    degree = 2
    type = 'Quadratic Equation'

    def __init__(self, *args):
        super().__init__(*args)
        a, b, c = self.coefficients.values()
        self.delta = b**2 - 4 * a * c

    def solve(self):
        if self.delta < 0:
            return []
        a, b, _ = self.coefficients.values()
        x1 = (-b + (self.delta) ** 0.5) / (2 * a)
        x2 = (-b - (self.delta) ** 0.5) / (2 * a)
        if self.delta == 0:
            return [x1]

        return [x1, x2]

    def analyze(self):
        a, b, c = self.coefficients.values()
        x = -b / (2 * a)
        y = a * x**2 + b * x + c
        if a > 0:
            concavity = 'upwards'
            min_max = 'min'
        else:
            concavity = 'downwards'
            min_max = 'max'
        return {'x': x, 'y': y, 'min_max': min_max, 'concavity': concavity}


def solver(equation):
    if not isinstance(equation, Equation):
        raise TypeError("Argument must be an Equation object")

    output_string = f'\n{equation.type:-^24}'
    output_string += f'\n\n{equation!s:^24}\n\n'
    output_string += f'{"Solutions":-^24}\n\n'
    results = equation.solve()
    match results:
        case []:
            result_list = ['No real roots']
        case [x]:
            result_list = [f'x = {x:+.3f}']
        case [x1, x2]:
            result_list = [f'x1 = {x1:+.3f}', f'x2 = {x2:+.3f}']
    for result in result_list:
        output_string += f'{result:^24}\n'
    output_string += f'\n{"Details":-^24}\n\n'
    details = equation.analyze()
    match details:
        case {'slope': slope, 'intercept': intercept}:
            details_list = [f'slope = {slope:>16.3f}', f'y-intercept = {intercept:>10.3f}']
        case {'x': x, 'y': y, 'min_max': min_max, 'concavity': concavity}:
            coord = f'({x:.3f}, {y:.3f})'
            details_list = [f'concavity = {concavity:>12}', f'{min_max} = {coord:>18}']
    for detail in details_list:
        output_string += f'{detail}\n'
    return output_string


lin_eq = LinearEquation(2, 3)
quadr_eq = QuadraticEquation(1, 2, 1)
print(solver(quadr_eq))
