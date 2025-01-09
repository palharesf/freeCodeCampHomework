# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-recursion-by-solving-the-tower-of-hanoi-puzzle/

# In this project, you will solve the mathematical puzzle known as the Tower of Hanoi.
# The puzzle consists of three rods and a number of disks of different diameters.
# The goal of this puzzle is moving the disks from the first rod to the third rod, following specific rules that restrict placing a larger disk on top of a smaller one.
# The puzzle starts with the disks piled up on the first rod, in decreasing size, with the smallest disk on top and the largest disk on the bottom.
# You need to populate your first list with numbers representing the various disk sizes, using the range() function.

# The goal of the Tower of Hanoi is moving all the disks to the last rod. To do that, you must follow three simple rules:

#   You can move only top-most disks
#   You can move only one disk at a time
#   You cannot place larger disks on top of smaller ones

# In the Tower of Hanoi puzzle, you can identify the three rods according to their purpose:

#   The first rod is the source, where all the disks are stacked on top of each other at the beginning of the game.
#   The second rod is an auxiliary rod, and it helps in moving the disks to the target rod.
#   The third rod is the target, where all the disks should be placed in order at the end of the game.

# The allowed disk movements between the rods exhibit a repetitive pattern occurring every three moves.
# For example, movements between rod A and rod C are allowed on the first, the fourth and the seventh move, where the remainder of the division between the move number and 3 is equal to 1.
# Since you are going to use the expression (i + 1) % 3 multiple times, it is convenient to store it in a variable.
# When the remainder of the move number divided by 3 is equal to 2, the movement is allowed between 'A' and 'B' (the source and the auxiliary rods).
# Finally, when the move number divided by 3 has no remainder, the movement is allowed between 'B' and 'C'.
# When target is empty, the disk should be moved necessarily from source to target.
# The other case in which you have to move the disk necessarily from source to target is when the source list is not empty and the last disk in source is lower than the last disk in target.
# The conditionals you wrote previously are only valid for odd numbers of disks.
# If the number of disks is even and the remainder equals 1, the move is allowed between the source rod and the auxiliary rod.
# Add an else clause to print the allowed movement and call make_allowed_move() with the correct arguments.
# Now you need to do the same with your elif statement: put the print() and make_allowed_move() calls inside an if statement to execute when n is odd.


# Solution pre-recursion:

NUMBER_OF_DISKS = 4
number_of_moves = 2 ** NUMBER_OF_DISKS - 1
rods = {
    'A': list(range(NUMBER_OF_DISKS, 0, -1)),
    'B': [],
    'C': []
}


def make_allowed_move(rod1, rod2):
    forward = False
    if not rods[rod2]:
        forward = True
    elif rods[rod1] and rods[rod1][-1] < rods[rod2][-1]:
        forward = True
    if forward:
        print(f'Moving disk {rods[rod1][-1]} from {rod1} to {rod2}')
        rods[rod2].append(rods[rod1].pop())
    else:
        print(f'Moving disk {rods[rod2][-1]} from {rod2} to {rod1}')
        rods[rod1].append(rods[rod2].pop())

    # display our progress
    print(rods, '\n')


def move(n, source, auxiliary, target):
    # display starting configuration
    print(rods, '\n')
    for i in range(number_of_moves):
        remainder = (i + 1) % 3
        if remainder == 1:
            if n % 2 != 0:
                print(f'Move {i + 1} allowed between {source} and {target}')
                make_allowed_move(source, target)
            else:
                print(f'Move {i + 1} allowed between {source} and {auxiliary}')
                make_allowed_move(source, auxiliary)
        elif remainder == 2:
            if n % 2 != 0:
                print(f'Move {i + 1} allowed between {source} and {auxiliary}')
                make_allowed_move(source, auxiliary)
            else:
                print(f'Move {i + 1} allowed between {source} and {target}')
                make_allowed_move(source, target)
        elif remainder == 0:
            print(f'Move {i + 1} allowed between {auxiliary} and {target}')
            make_allowed_move(auxiliary, target)

# initiate call from source A to target C with auxiliary B


move(NUMBER_OF_DISKS, 'A', 'B', 'C')

# That's all for the iterative solution.
# From now on you are going to build a function that makes use of a recursive approach.
# Recursion is when a function calls itself.
# In this case, you are going to use recursion to calculate smaller versions of the same problem.

# To solve the puzzle with recursion, the first thing to do is break the original problem down into smaller sub-problems.
# The final configuration with n disks piled up to the third rod in decreasing order can be obtained by moving:

#     n - 1 disks from the source to the auxiliary rod
#     the largest disk from the source to the target
#     and then the n - 1 disks from the auxiliary rod to the target.

# So, the first thing the move function should do is calling itself with n - 1 as the first argument.
# But if you try to do so without defining a base case, you will get a RecursionError.
# This happens because the function keeps calling itself indefinitely.

# The steps of moving n - 1 disks can be broken down further until only a single disk is considered.
# This will be the first move occurring.
# After the first move occurs, the following moves are generated by the unwinding of the recursive calls.
# Keep in mind that in each recursive step the role played by the rods changes between source, target, and auxiliary.

# At first, the recursive call you have just added deals with the sub-problem of moving n - 1 disks to the second rod.
# For that reason, the target argument corresponds to your second rod, while the auxiliary argument is the third rod.
# Keep in mind that those will keep swapping as the recursion proceeds.

# In a previous step, you wrote the code to move the largest disk of the sub-problem to the target rod.
# Now, all you need to do is add another recursive call to move the n - 1 disks you have already displaced.
# Copy the first recursive call and paste it at the end of the if block.

# Although recursion can sometimes be less easy to understand, it gives you the power to create more concise code.
# In this case, you don't even need to differentiate between even and odd numbers of disks.

NUMBER_OF_DISKS = 5
A = list(range(NUMBER_OF_DISKS, 0, -1))
B = []
C = []


def move(n, source, auxiliary, target):
    if n <= 0:
        return
    # move n - 1 disks from source to auxiliary, so they are out of the way
    move(n - 1, source, target, auxiliary)

    # move the nth disk from source to target
    target.append(source.pop())

    # display our progress
    print(A, B, C, '\n')

    # move the n - 1 disks that we left on auxiliary onto target
    move(n - 1,  auxiliary, source, target)

# initiate call from source A to target C with auxiliary B


move(NUMBER_OF_DISKS, A, B, C)
