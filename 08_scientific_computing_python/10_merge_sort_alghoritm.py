# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-data-structures-by-building-the-merge-sort-algorithm/

# In this project, you'll learn data structures by building the merge sort algorithm.
# This is a sorting algorithm that uses the divide-and-conquer principle to sort collections of data.
# That is, it 'divides' a collection into smaller sub-parts, and 'conquers' the sub-parts by sorting them independently, then merges the sorted sub-parts.

# The merge sort algorithm mainly performs three actions:

#     Divide an unsorted sequence of items into sub-parts
#     Sort the items in the sub-parts
#     Merge the sorted sub-parts

# The above happens recursively until the sub-parts are merged into the complete sorted sequence.
# Let's start by dividing the sequence.
# We can use the integer divison to find the middle point of the input array, then slice it around the middle point.
# Now that you've divided the array list into two separate lists, you'll keep dividing each list until every element stands alone in its own list.
# A list with a single number is always sorted.
# You can recursively call merge_sort again.

# To then sort the lists, we can compare elements on both lists, and merge the smaller element to the main list.
# We are going to do this comparison for all the indexes in left_part and right_part.
# Inside the function, we can create a while loop that compares an element in left_part to an element in right_part, and merges the smaller element to the main array list.

# The if and else statements you created in the previous steps will assign elements to the sorted array.
# Each element assigned to the sorted array takes up an index in the list.
# So you have to keep moving to the next index without an element.

# The while loop you created compares one element from left_part with another in right_part, then adds the smaller element to the main array list.
# It will continue this operation until there are no elements left to be compared.
# But left_part may still have elements left while right_part has none, and vice versa.

# Before testing the merge_sort() function, you need to create a base case that stops the function execution when the length of array is less than or equal to 1.
# This base case will stop the recursion call.
# Without it, the merge sort operation would continue to run even when the list has been sorted or has no element in it.

# You can use the __name__ variable to determine if a Python script is being run as the main program or if it is being imported as a module (code written in another Python file).
# If the value of __name__ is set to '__main__', it implies that the current script is the main program, and not a module.
# In this project, you'll use the current script as the main program.

def merge_sort(array):
    if len(array) <= 1:
        return

    middle_point = len(array) // 2
    left_part = array[:middle_point]
    right_part = array[middle_point:]

    merge_sort(left_part)
    merge_sort(right_part)

    left_array_index = 0
    right_array_index = 0
    sorted_index = 0

    while left_array_index < len(left_part) and right_array_index < len(right_part):
        if left_part[left_array_index] < right_part[right_array_index]:
            array[sorted_index] = left_part[left_array_index]
            left_array_index += 1
        else:
            array[sorted_index] = right_part[right_array_index]
            right_array_index += 1
        sorted_index += 1

    while left_array_index < len(left_part):
        array[sorted_index] = left_part[left_array_index]
        left_array_index += 1
        sorted_index += 1

    while right_array_index < len(right_part):
        array[sorted_index] = right_part[right_array_index]
        right_array_index += 1
        sorted_index += 1


if __name__ == '__main__':
    numbers = [4, 10, 6, 14, 2, 1, 8, 5]
    print('Unsorted array: ')
    print(numbers)
    merge_sort(numbers)
    print("Sorted array: " + str(numbers))
