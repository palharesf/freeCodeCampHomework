# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/build-an-arithmetic-formatter-project/build-an-arithmetic-formatter-project

# Students in primary school often arrange arithmetic problems vertically to make them easier to solve. For example, "235 + 52" becomes:

#   235
# +  52
# -----

# Finish the arithmetic_arranger function that receives a list of strings which are arithmetic problems, and returns the problems arranged vertically and side-by-side.
# The function should optionally take a second argument. When the second argument is set to True, the answers should be displayed.

# Function Call:

# arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])

# Output:

#    32      3801      45      123
# + 698    -    2    + 43    +  49
# -----    ------    ----    -----

# Function Call:

# arithmetic_arranger(["32 + 8", "1 - 3801", "9999 + 9999", "523 - 49"], True)

# Output:

#   32         1      9999      523
# +  8    - 3801    + 9999    -  49
# ----    ------    ------    -----
#   40     -3800     19998      474

# Rules

# The function will return the correct conversion if the supplied problems are properly formatted, otherwise, it will return a string that describes an error that is meaningful to the user.

#     Situations that will return an error:
#         If there are too many problems supplied to the function. The limit is five, anything more will return: 'Error: Too many problems.'
#         The appropriate operators the function will accept are addition and subtraction. Multiplication and division will return an error.
#         Other operators not mentioned in this bullet point will not need to be tested. The error returned will be: "Error: Operator must be '+' or '-'."
#         Each number (operand) should only contain digits. Otherwise, the function will return: 'Error: Numbers must only contain digits.'
#         Each operand (aka number on each side of the operator) has a max of four digits in width. Otherwise, the error string returned will be: 'Error: Numbers cannot be more than four digits.'
#     If the user supplied the correct format of problems, the conversion you return will follow these rules:
#         There should be a single space between the operator and the longest of the two operands, the operator will be on the same line as the second operand, both operands will be in the same order as provided (the first will be the top one and the second will be the bottom).
#         Numbers should be right-aligned.
#         There should be four spaces between each problem.
#         There should be dashes at the bottom of each problem. The dashes should run along the entire length of each problem individually. (The example above shows what this should look like.)

def arithmetic_arranger(problems, show_answers=False):
    if len(problems) > 5:
        return "Error: Too many problems."
    elif any([p.split()[1] in ['*', '%', '/'] for p in problems]):
        return "Error: Operator must be '+' or '-'."
    elif any([not p.split()[0].isdigit() or not p.split()[2].isdigit() for p in problems]):
        return "Error: Numbers must only contain digits."
    elif any([len(p.split()[0]) > 4 or len(p.split()[2]) > 4 for p in problems]):
        return "Error: Numbers cannot be more than four digits."
    else:
        
        return problems


print(f'\n{arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])}')
