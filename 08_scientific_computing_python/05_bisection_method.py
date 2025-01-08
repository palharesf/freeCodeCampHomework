# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-the-bisection-method-by-finding-the-square-root-of-a-number/

# The bisection method is a technique for finding the roots of a real-valued function.
# It works by narrowing down an interval where the square root lies until it converges to a value within a specified tolerance.
# The square_root_bisection function the following parameters:

# square_target: The number for which you want to find the square root.
# tolerance (optional): The acceptable difference between the square of the approximate root value and the actual target value (default is 1e-7).
# The tolerance 1e-7 implies that the solution will be accurate to within 0.0000001 of the true value and is a good default choice that balances accuracy and performance.
# max_iterations (optional): The maximum number of iterations to perform (default is 100). If the method doesn't converge within this limit, you'll assume the solution is not found.

# If the number for which you want to find the square root is negative, the code should raise an error as the square root of a negative number is not defined in real numbers.
# The raise statement allows you to force a specific exception to occur.
# It consists of the raise keyword followed by the exception type, and enables you to provide a custom error message:

# raise ValueError("Invalid value")

# When the code above runs, a ValueError is raised and the message "Invalid value" is shown to the user.
# In Python, the max() function returns the largest of the input values.

# max(1, 2, 3) # Output: 3

# The variables low and high will be used to define the initial interval where the square root lies.
# For your loop, use the range function, which generates a sequence of numbers you can iterate over.
# The syntax is range(start, stop, step), where start is the starting integer (inclusive), stop is the last integer (not inclusive), and step is the difference between a number and the previous one in the sequence.
# Also, use _ as a loop variable. The _ acts as a placeholder and is useful when you need to use a variable but don't actually need its value.
# The abs() function returns the absolute value of a number, which is always positive, regardless of the number sign.
# You will use it to check that the estimated square root is close enough to the actual value.

# In Python, the is keyword checks for object identity.
# It's used to determine if two variables point to the same object in memory.
# In contrast to is, the equality operator (==) determines if the values of two objects are the same, regardless of whether they are the same object in memory.

def square_root_bisection(square_target, tolerance=1e-7, max_iterations=100):
    if square_target < 0:
        raise ValueError('Square root of negative number is not defined in real numbers')
    if square_target == 1:
        root = 1
        print(f'The square root of {square_target} is 1')
    elif square_target == 0:
        root = 0
        print(f'The square root of {square_target} is 0')

    else:
        low = 0
        high = max(1, square_target)
        root = None

        for _ in range(max_iterations):
            mid = (low + high) / 2
            square_mid = mid**2

            if abs(square_mid - square_target) < tolerance:
                root = mid
                break

            elif square_mid < square_target:
                low = mid
            else:
                high = mid

        if root is None:
            print(f"Failed to converge within {max_iterations} iterations.")

        else:
            print(f'The square root of {square_target} is approximately {root}')

    return root


N = 16
square_root_bisection(N)
