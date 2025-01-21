# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-encapsulation-by-building-a-projectile-trajectory-calculator/

# You are going to build a program that calculates and draws the trajectory of a projectile given the angle, speed and height of the throw.
# Start by importing math, you will use it a lot in this project as it has useful methods like math.radians, math.cos, math.sin and others.
# Also create these variables to have the value of the gravitational acceleration and some special symbols that will be useful later (use copy and paste for these).

# GRAVITATIONAL_ACCELERATION = 9.81
# PROJECTILE = "∙"
# x_axis_tick = "T"
# y_axis_tick = "⊣"

# Create a Projectile class with an __init__ method that initializes the class using three arguments: the starting speed, the starting height, and the starting angle of the throw of the projectile, in this order.
# Inside the __init__ method, assign these arguments to three private attributes: __speed, __height, and __angle.
# The angle provided will be in degrees; however, it should be stored internally in radians.
# To achieve this, use the math.radians() function to convert the angle from degrees to radians when assigning it to __angle.
# The use of two underscores before an attribute name triggers name mangling in Python.
# This means the attributes are not directly accessible from outside the class using their given names, and must be accessed with the mangled names like ball._Projectile__height if needed externally.
# This indicates these are intended for internal use only.

# The class variable __slots__ has a special usage in Python classes.
# Declaring __slots__ and assigning it a sequence of strings restricts the creation of attributes to those included in that sequence.
# Also, it prevents the creation of the __dict__ special attribute and it allows for more efficient attribute access.
# You should use the __slots__ variable inside the class to define which attributes the class has: assign to __slots__ a tuple containing 3 strings, each equal to one of the attribute names defined in the __init__.

# The first thing to set up is a method that calculates the displacement of the projectile, which is the horizontal space traveled from the throw to when the projectile touches the ground.
# Create a method __calculate_displacement, which has only self as a parameter, and return the displacement of the projectile.
# Use the following formula to compute the projectile displacement: \[ d = \frac{v \cdot \cos\theta \cdot \left(v\cdot\sin\theta + \sqrt{v^2\sin^2\theta + 2 \cdot g \cdot h}\right)}{g} \]
# In which $d$ is the displacement, $v$ is the starting speed, $\theta$ is the angle and $h$ is the starting height of the projectile.
# For $g$ you can use the GRAVITATIONAL_ACCELERATION variable.

# You should use the methods math.cos() and math.sin() for the trigonometric functions and math.sqrt() to calculate the square root.
# Also you should know that $x^y$ is written as x ** y in python.
# Also $\sin^2\theta$ means that the value resulting from the sine is then squared.
# Remember that with name mangling you need to call the method as _Projectile__calculate_displacement if you want to test, or use it from outside of the class:

# ball = Projectile(10, 3, 45)
# displacement_of_ball = ball._Projectile__calculate_displacement() # 12.6173996009878

# To calculate the coordinates of the trajectory, we will create a method of the Projectile class named __calculate_y_coordinate.
# It should have, other than self, an x parameter.

# \[ y = y_0 + x \tan\theta - \frac{g x^2}{2 v_0^2 \cos^2\theta} \]

# The above is the formula to calculate the vertical position $y$ for any given horizontal position $x$, having the starting angle $\theta$, speed $v_0$ and height $y_0$.
# You will need to use math.tan() and math.cos() and remember that x ** y is the way to write $x^y$, and that the value of $g$ is in the variable GRAVITATIONAL_ACCELERATION.
# Implement the method so that it returns the $y$ coordinate.

# Define a method named calculate_all_coordinates, which calculates the coordinates for all \(x\) values from 0 up to the displacement rounded up (not inclusive), and then returns them as a list of tuples (x, y).
# Then, call the calculate_all_coordinates method on the ball instance and assign the output to a new variable named coordinates.
# You can use math.ceil() to round up a number to the smallest integer greater than or equal to that number.

# We have written the three instance attributes to be private using a leading double underscore.
# Note that these attributes are called private by convention: although they can still be accessed from outside, it is agreed upon to not do that.
# Getters are what can be used to get the values from outside.
# To define a getter, you define a method that returns the value of the desired attribute and give it a @property decorator:

# class Nest:
#     ...
#     @property
#     def number_of_eggs(self):
#         return self.__number_of_eggs

# The decorator changes the method into a property, meaning that the method is not called like a regular method, but it's used like an attribute:

# n = Nest()
# print(n.number_of_eggs)

# In the example above, the private attribute __number of eggs is accessed through the number_of_eggs property of n.

# Once you have the getters, you can write the setters, which allow you to set the value of an attribute in an indirect manner.
# Following the example of the last step, a setter would be written as:

# class Nest:
#     ...
#     @number_of_eggs.setter
#     def number_of_eggs(self, new_value):
#         self.__number_of_eggs = new_value

# Same as the getter, a setter is not called like a method but used like an attribute:

# nest = Nest()
# nest.number_of_eggs = 12

# This way of writing calls the setter and set the new value.

# The __str__ method refers to the attributes of the class directly, but now that you have created the getters it is better to use those to obtain those values.
# It's good practice to give a representation to the class by using the __repr__ special method.
# While the __str__ method returns a readable string representation that's intended to be user friendly, __repr__ is intended for programmers.
# Often __repr__ provides a string that can be used to recreate the object.

# Going back to the projectile trajectory calculator, now you'll create a new class that accepts a list of coordinates and creates the trajectory drawing.
# Create a new class Graph, which should be instantiated with a private attribute __coordinates where the list of coordinates is stored.
# Declare the __slots__ class variable and define the __init__ and __repr__ special methods.

# Create a method create_coordinates_table, then at the end of the code print graph.create_coordinates_table()).
# The method should use the __coordinates property and return a string containing all the coordinates.
# In it,  x and y have always the same position, the values for x are always integers, and the values for y are always rounded to two decimal places:

#   x      y
#   0   3.00
#   1   3.90
#   2   4.61
#   3   5.12
#   4   5.43
#   5   5.55
#   6   5.47
#   7   5.19
#   8   4.72
#   9   4.05
#  10   3.19
#  11   2.13
#  12   0.87

# The table should start with a newline character and end with a newline character.

# Now it's time for the graph.
# Create a method create_trajectory and replace the last print call at the bottom of your code with print(graph.create_trajectory()).
# As the first step of this new method, make a local copy of the coordinates but where all the values are rounded to integers.
# Save this new version of the coordinates in a variable named rounded_coords, and return this variable.

# Now that you have the rounded coordinates, find the maximum value between all the x coordinates and the maximum value between all the y coordinates.
# These max values will be the number of rows and columns in the graph.
# Save the first in a new variable named x_max and the second in a variable named y_max.

# Now that you have x_max and y_max you can use these as number of rows and columns to start building the graph structure.
# Create a list of lists where the external list contains y_max +1 lists, each with inside x_max +1 elements, where each element is a string containing a single space.
# Save this list of lists in a variable named matrix_list and return this value.
# matrix_list should look like this:

# [
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
# ]

# matrix_list is a list of lists, each element has an (x, y) coordinate.
# Use the list of coordinates in rounded_coords to change the elements in matrix_list at the coordinates in the list to the symbol in the PROJECTILE variable.
# Remember that a coordinates graph has the (0, 0) in the bottom left corner.

# [
#     [" ", " ", " ", " ", " ", "∙", " ", " ", " ", " ", " ", " ", " "],
#     [" ", " ", "∙", "∙", "∙", " ", "∙", "∙", "∙", " ", " ", " ", " "],
#     [" ", "∙", " ", " ", " ", " ", " ", " ", " ", "∙", " ", " ", " "],
#     ["∙", " ", " ", " ", " ", " ", " ", " ", " ", " ", "∙", " ", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "∙", " "],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "∙"],
#     [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
# ]

# You have a list of lists of strings. Join the inner lists to have a list of strings.
# It should look like this:

# [
#     "     ∙       ",
#     "  ∙∙∙ ∙∙∙    ",
#     " ∙       ∙   ",
#     "∙         ∙  ",
#     "           ∙ ",
#     "            ∙",
#     "             ",
# ]

# Add the x and y axes to the graph to obtain the following output:

# [
#     "⊣     ∙       ",
#     "⊣  ∙∙∙ ∙∙∙    ",
#     "⊣ ∙       ∙   ",
#     "⊣∙         ∙  ",
#     "⊣           ∙ ",
#     "⊣            ∙",
#     "⊣             ",
#     " TTTTTTTTTTTTT",
# ]

# The symbols are available as x_axis_tick and y_axis_tick.
# Finally, make the final output a multiline string. It should start with a newline character and end with a newline character.

# ⊣     ∙
# ⊣  ∙∙∙ ∙∙∙
# ⊣ ∙       ∙
# ⊣∙         ∙
# ⊣           ∙
# ⊣            ∙
# ⊣
#  TTTTTTTTTTTTT

# Now to conclude, modify the code you wrote outside the classes, and incorporate it into a little utility function called projectile_helper.
# It will take in the desired values for speed, height and angle and prints to the terminal in sequence, the details of the projectile, the table of coordinates and the graph of the trajectory.

import math

GRAVITATIONAL_ACCELERATION = 9.81
PROJECTILE = "∙"
x_axis_tick = "T"
y_axis_tick = "⊣"


class Projectile:
    __slots__ = ('__speed', '__height', '__angle')

    def __init__(self, speed, height, angle):
        self.__speed = speed
        self.__height = height
        self.__angle = math.radians(angle)

    def __str__(self):
        return f'''
Projectile details:
speed: {self.speed} m/s
height: {self.height} m
angle: {self.angle}°
displacement: {round(self.__calculate_displacement(), 1)} m
'''

    def __calculate_displacement(self):
        horizontal_component = self.__speed * math.cos(self.__angle)
        vertical_component = self.__speed * math.sin(self.__angle)
        squared_component = vertical_component**2
        gh_component = 2 * GRAVITATIONAL_ACCELERATION * self.__height
        sqrt_component = math.sqrt(squared_component + gh_component)

        return horizontal_component * (vertical_component + sqrt_component) / GRAVITATIONAL_ACCELERATION

    def __calculate_y_coordinate(self, x):
        height_component = self.__height
        angle_component = math.tan(self.__angle) * x
        acceleration_component = GRAVITATIONAL_ACCELERATION * x ** 2 / (
                2 * self.__speed ** 2 * math.cos(self.__angle) ** 2)
        y_coordinate = height_component + angle_component - acceleration_component

        return y_coordinate

    def calculate_all_coordinates(self):
        return [
            (x, self.__calculate_y_coordinate(x))
            for x in range(math.ceil(self.__calculate_displacement()))
        ]

    @property
    def height(self):
        return self.__height

    @property
    def angle(self):
        return round(math.degrees(self.__angle))

    @property
    def speed(self):
        return self.__speed

    @height.setter
    def height(self, n):
        self.__height = n

    @angle.setter
    def angle(self, n):
        self.__angle = math.radians(n)

    @speed.setter
    def speed(self, s):
        self.__speed = s

    def __repr__(self):
        return f'{self.__class__}({self.speed}, {self.height}, {self.angle})'


class Graph:
    __slots__ = ('__coordinates')

    def __init__(self, coord):
        self.__coordinates = coord

    def __repr__(self):
        return f"Graph({self.__coordinates})"

    def create_coordinates_table(self):
        table = '\n  x      y\n'
        for x, y in self.__coordinates:
            table += f'{x:>3}{y:>7.2f}\n'

        return table

    def create_trajectory(self):

        rounded_coords = [(round(x), round(y)) for x, y in self.__coordinates]

        x_max = max(rounded_coords, key=lambda i: i[0])[0]
        y_max = max(rounded_coords, key=lambda j: j[1])[1]

        matrix_list = [[" " for _ in range(x_max + 1)] for _ in range(y_max + 1)]

        for x, y in rounded_coords:
            matrix_list[-1 - y][x] = PROJECTILE

        matrix = ["".join(line) for line in matrix_list]

        matrix_axes = [y_axis_tick + row for row in matrix]
        matrix_axes.append(" " + x_axis_tick * (len(matrix[0])))

        graph = "\n" + "\n".join(matrix_axes) + "\n"

        return graph


def projectile_helper(speed, height, angle):
    ball = Projectile(speed, height, angle)
    print(ball)
    coordinates = ball.calculate_all_coordinates()
    graph = Graph(coordinates)
    print(graph.create_coordinates_table())
    print(graph.create_trajectory())


projectile_helper(10, 3, 45)
