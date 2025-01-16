# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-special-methods-by-building-a-vector-space/

# A vector is an object that has a length (or magnitude) and a direction and it cannot be expressed by a single number.
# In physics, vectors are commonly used to represent forces, velocities, accelerations, and other quantities.
# A vector can be defined by two coordinates, x and y, in the Euclidean plane.
# The distance between the origin of the axes and the point (x, y) will be its length, or norm.
# And the vector direction will point towards (x, y).

# Python offers various methods that include both a leading and trailing double underscore in their names.
# You may already be familiar with some, such as __init__ and __str__.
# These methods, which follow the __<name>__ naming pattern, are referred to as special methods, magic methods, or dunder (which stands for double underscore) methods.
# Defining special methods in a class affects the behavior of that class.
# They are called under the hood in specific situations (e.g. __init__ during instantiation, __str__ when the object is printed or passed to str()).
# In this project, you are going to learn some of the most commonly used special methods.

# The length of a vector $\mathbf{a}$, or norm, is typically indicated as $\| \mathbf{a} \|$.
# It can be calculated as the square root of the sum of its squared components: \[ \| \mathbf{a} \| = \sqrt{a_1^2 + a_2^2 + \ldots + a_n^2} \]

# Inside the Vector class, declare an empty __str__ method to implement a readable string representation.
# Remember to give it a self parameter.
# Pay attention to not print v1 until __str__ returns a string, otherwise you'll get a TypeError, because __str__ must always return a string.

# A vector can have a number n of dimensions (components).
# So far, you created a 2-dimensional vector.
# You want to be able to represent vectors with a different number of dimensions without rewriting the necessary code for each specific case.
# For that, you will use inheritance.

# Inheritance enables you to define a class from an existing one.
# The new class, called child, inherits all the methods and properties of the existing class, called parent.

# class Tree:
#     def sprout(self):
#         print('Making new leaves!')

# class Oak(Tree):
#     pass

# Oak().sprout() # Output: Making new leaves!

# In the example above, the child class Oak inherits from Tree and inherits the sprout method from the parent class Tree.

# You could assign each i parameter to self.i as you did before.
# Although in this case you have few lines to repeat, one way to avoid this repetition is using the super() function.
# super() enables you to refer implicitly to the parent class: super().__init__(x, y) calls the __init__ method of the parent class.

# In Python, you can enforce the use of keyword-only arguments by adding a * as an additional argument to the function or method signature.
# Modify both __init__ methods by adding a * as the second parameter (after self).
# Every parameter placed after that will require the use of a keyword argument in the function/method call.
# This means that you need to modify the super().__init__(x, y) call, too. Do it by giving x the value x, and y the value y.

# Every object in Python has a special attribute named __dict__, which is a dictionary that stores the object attributes.
# __dict__ contains the values of your instance attributes.
# Instead of explicitly adding the squares of self.x and self.y, you are going to iterate over the values stored in __dict__ to calculate the value of the norm.

# The norm() method is returning the correct values, but there's still something you can improve: readability.
# The vars() built-in function takes an object as its argument and returns the __dict__ attribute of that object.

# When you need to dynamically access some attributes starting from a string input, the built-in getattr() function is what you need.
# It takes an object as its first argument, and a string containing the attribute name as its second attribute.

# While the __str__ method returns a human-readable string representation of an object, the __repr__ method is supposed to return the string needed to instantiate the object.

# Since the method should return the string to instantiate the object for R2Vector as well as R3Vector when inherited, you cannot build the string specifying the class name.
# You can access the name of a class with __class__.__name__.

# The __getattribute__ method is called under the hood any time you try to access an instance attribute.
# If the attribute is not found at the instance level, the method will search for it at the class level, and eventually in parent classes.
# __getattr__ is another special method that plays a role in accessing attributes.
# The default implementation of __getattribute__ is to raise an AttributeError when the requested attribute is not an instance attribute or it is not present in the class tree.
# In that case, __getattr__ is called if defined by the class.
# You can consider it as a sort of fallback when the usual attribute accessing procedure fails.
# As you can see from the output, although you defined __getattr__ in your class, this method is not called yet.
# This happens because the default attribute access occurs through __getattribute__.
# Therefore, you can see the attribute value printed on the terminal.

# To create a vector space, you need to define how vectors should behave in several cases. Vectors can be added, forming a new vector.
# The special method __add__ can be implemented to override what happens by default when two objects are added together using the + operator.

# In Python, NotImplemented is a special value used to indicate that an operation is not implemented for a specific case.
# NotImplemented does not raise an exception immediately.
# Instead, it signals to ask to the other operand how to perform the operation.
# If the request cannot be satisfied, a TypeError is returned by default.

# When adding two vectors, each component of one vector is added to the same component of the other vector.
# For example, adding (1, 2) and (2, 4) generates a third vector (3, 6), where 3 is the sum of 1 and 2 and 6 is the sum of 2 and 4.
# The kwargs dictionary will contain the key-value pairs needed to instantiate a new vector of the same class of the two vectors added together.

# You can unpack a dictionary into keyword arguments by using the ** operator:

# def spam(a, b):
#     return a + b
# my_dict = {a: 11, b: 4}
# spam(**my_dict) # 15

# In the same way __add__ is called under the hood when two objects are added together, the __sub__ method is called implicitly in case of subtraction.
# The vector resulting from the subtraction of one vector from another is obtained by calculating the difference of each of their components.
# For example, subtracting (2, 4) from (7, 3) generates a third vector (5, -1), where 5 is the difference between 7 and 2 and -1 is the difference between 3 and 4.

# The special method __mul__ can be implemented to specify what should happen when the current instance is multiplied by another object.
# Vectors can be multiplied by a scalar, i.e. a number that multiplies each single component.
# The result of scalar multiplication is a vector with the same orientation as the original vector but a different magnitude.
# Implement the scalar multiplication by checking if other is either an int or a float.
# If it is, return a new instance of the current class that has each component of the starting vector multiplied by other.
# This will be the vector resulting from the scalar multiplication.
# Make sure the methods can be applied to compute the scalar multiplication of vectors with any number of dimensions.

# A vector can be multiplied by another vector, too. This operation is called dot product, or scalar product.
# The scalar product between two vectors $\mathbf{a}$ and $\mathbf{b}$ is indicated as:

# \( \mathbf{a} \cdot \mathbf{b} = a_1 \cdot b_1 + a_2 \cdot b_2 + \ldots + a_n \cdot b_n = \sum_{i=1}^{n} a_i \cdot b_i \)

# Where each component of $\mathbf{a}$ is multiplied by the correspondent component of $\mathbf{b}$, and all the products are summed together, resulting in a number.
# In case other is not an integer, a floating point number, or another instance of the current class, no product can be computed.

# The __eq__ method can be implemented to specify what should happen in case the comparison operator (==) is used to compare an object with something else.
# You want to compare two vectors, only when they belong to the same class.
# To compare two vectors, you are going to check that each component of the first vector is equal to the same component of the second vector.

# The __ne__ method is called under the hood when the != operator is used.
# The __lt__ method is called under the hood when the < operator is used to compare an object with something else.
# The __gt__ method is called under the hood when the > operator is used to compare an object with something else.
# There are still two possible comparisons to implement.
# The __le__ method is called when the <= operator is used to compare two objects.
# The last method you need is __ge__, which is called when the >= is used to compare two objects.

# The cross product, or vector product, is defined between 3-dimensional vectors and results in a third vector perpendicular to both of them.
# The R3Vector class inherits from R2Vector, meaning it has access to all the methods and properties defined in R2Vector.
# A child class can implement additional features.
# You already saw a way to change the implementation of a method. Now, you are going to give the child class R3Vector a new method instead.
# The cross product between two 3D vectors \( \mathbf{a} \) and \( \mathbf{b} \) can be computed as it follows:

# \[ \mathbf{a} \times \mathbf{b} = \begin{pmatrix} a_yb_z - a_zb_y \\ a_zb_x - a_xb_z \\ a_xb_y - a_yb_x \end{pmatrix} \]

# Where the resulting vector is represented as a column vector.

class R2Vector:
    def __init__(self, *, x, y):
        self.x = x
        self.y = y

    def norm(self):
        return sum(val**2 for val in vars(self).values())**0.5

    def __str__(self):
        return str(tuple(getattr(self, i) for i in vars(self)))

    def __repr__(self):
        arg_list = [f'{key}={val}' for key, val in vars(self).items()]
        args = ', '.join(arg_list)
        return f'{self.__class__.__name__}({args})'

    def __add__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        kwargs = {i: getattr(self, i) + getattr(other, i) for i in vars(self)}
        return self.__class__(**kwargs)

    def __sub__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        kwargs = {i: getattr(self, i) - getattr(other, i) for i in vars(self)}
        return self.__class__(**kwargs)

    def __mul__(self, other):
        if isinstance(other, (int, float)):
            kwargs = {i: getattr(self, i) * other for i in vars(self)}
            return self.__class__(**kwargs)
        elif isinstance(other, self.__class__):
            args = [getattr(self, i) * getattr(other, i) for i in vars(self)]
            return sum(args)
        return NotImplemented

    def __eq__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        return all(getattr(self, i) == getattr(other, i) for i in vars(self))

    def __ne__(self, other):
        return not self == other

    def __lt__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        return self.norm() < other.norm()

    def __gt__(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        return self.norm() > other.norm()

    def __le__(self, other):
        return not self > other

    def __ge__(self, other):
        return not self < other


class R3Vector(R2Vector):
    def __init__(self, *, x, y, z):
        super().__init__(x=x, y=y)
        self.z = z

    def cross(self, other):
        if not isinstance(other, self.__class__):
            return NotImplemented
        kwargs = {
            'x': self.y * other.z - self.z * other.y,
            'y': self.z * other.x - self.x * other.z,
            'z': self.x * other.y - self.y * other.x
        }

        return self.__class__(**kwargs)


v1 = R3Vector(x=2, y=3, z=1)
v2 = R3Vector(x=0.5, y=1.25, z=2)
print(f'v1 = {v1}')
print(f'v2 = {v2}')
v3 = v1 + v2
print(f'v1 + v2 = {v3}')
v4 = v1 - v2
print(f'v1 - v2 = {v4}')
v5 = v1 * v2
print(f'v1 * v2 = {v5}')
v6 = v1.cross(v2)
print(f'v1 x v2 = {v6}')
