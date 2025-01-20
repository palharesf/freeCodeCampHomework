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


