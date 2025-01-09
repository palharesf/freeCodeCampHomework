# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-algorithm-design-by-building-a-shortest-path-algorithm/

# So far, you have already met different data types:

#     Immutable data types, such as integers, strings, tuples, and Booleans.
#     Mutable data types, such as lists, and dictionaries.

# A dictionary is identified by a pair of curly braces, {}.
# Dictionaries store data in the form of key-value pairs. A key is separated from the correspondent value by a colon. And each key-value pair is separated from the following pair by a comma:

# my_dict = {
#     'name': 'Michael',
#     'occupation': 'Lumberjack'
# }

# Keys must be unique within a dictionary and they can be only immutable data types.
# This means you cannot use a list or another dictionary as keys.
# You can access the data stored in a dictionary through its keys:

# my_dict = {
#     'name': 'Michael',
#     'occupation': 'Lumberjack'
# }

# my_dict['name'] # 'Michael'

# To add a new key-value pair after declaring a dictionary, you can indicate the key in the same way you would access an existing key, and set the value of the new key by using the assignment operator:

# my_dict = {
#     'name': 'Michael',
#     'occupation': 'Lumberjack'
# }

# my_dict['country'] = 'Canada'

# To iterate over the keys of a dictionary, you can simply put the dictionary into a for loop.
# The code below would print each key in the dictionary dict:

# for i in dict:
#    print(i)

# If you want to iterate over the values of the dictionary keys, one way is to use the .values() method.
# Finally, if you want to be able to go through the key-value pairs, you can use the .items() method.
# As you can see from the output, .items() creates a data structures that stores each key-value pair in a distinct tuple.
# To iterate over the elements in those tuples you can add a second loop variable:

# for i, j in dict.items():
#     print(i, j)

# You can remove a key-value pair from a dictionary by using the del keyword:

# my_dict = {
#     'name': 'Michael',
#     'occupation': 'Lumberjack'
# }

# del my_dict['occupation']

copper = {
    'species': 'guinea pig',
    'age': 2
}
copper['food'] = 'hay'
copper['species'] = 'Cavia porcellus'
del copper['age']

for i, j in copper.items():
    print(i, j)

# A graph can be used to represent two points in the space, A and B, connected by a path.
# A graph like this will be made of two nodes connected by an edge.
# A graph is called a weighted graph when its edges are associated with weights, representing a distance, time or other quantitative value.
# In your case, these weights will be the distances between each node, or point in space.
# To represent a weighted graph you can modify your dictionary, using a list of tuples for each value.
# The first element in the tuple will be the connected node, and the second element will be an integer number indicating the distance.

# The shortest path alghoritm will start at a specified node.
# Then it will explore the graph to find the shortest path between the starting node, or source, and all the other nodes.
# To keep track of the visited nodes, you need a list of all the nodes in the graph. Once a node is visited, it will be removed from that list.
# While the algorithm explores the graph, it should keep track of the currently known shortest distance between the starting node and the other nodes.
# The distance from the starting node is zero, because the algorithm begins its assessment right from there.
# At the beginning, all the other nodes in the graph are considered to be at infinite distance from the source node, because the distance has not been determined yet.
# To assign an infinite value to the node in the distances dictionary, we can use the float() function with the string 'inf' as argument to generate a floating point number representing the positive infinity.

# The list() type constructor enables you to build a list from an iterable.
# With a dictionary comprehension, you can create a dictionary starting from an existing dictionary:

# {key: val for key in dict}

# In the example above, val is the value that key will have in the new dictionary, and dict is the existing dictionary.
# Dictionary comprehensions support conditional if/else syntax too:

# {key: val_1 if condition else val_2 for key in dict}

# In the example above, dict is the existing dictionary.
# When condition evaluates to True, key will have the value val_1 , otherwise val_2.

# Since the algorithm begins its assessment from the starting node, after creating the paths dictionary, you need to add the starting node to its own list in the paths dictionary.
# Your function is going to explore all the nodes connected to the starting node.
# It will calculate the shortest paths for all of them.
# Then, it will remove the starting node from the unvisited nodes.
# Next, the closest neighbor node will be visited and the process will be repeated until all the nodes are visited.

# min() takes also a keyword-only argument.
# Passing a function as an additional argument to min(), you can modify the way the list items are compared.
# Once the distance to a node is set inside the distances dictionary, you need to keep track of the path to that node, too.
# If the distance for the node in the processed tuple has been updated, the last item in its path is the node itself.

# The .extend() method, allows you to add elements from an iterable to the end of a list:

# my_list = ['larch', 'birch']
# tree_list = ['fir', 'redwood', 'pine']
# my_list.extend(tree_list)
# print(my_list) # Output: ['larch', 'birch', 'fir', 'redwood', 'pine']

# The .remove() method removes from a list the first matching element that is passed as the argument:

# my_list = ['larch', 1, True, 1]
# my_list.remove(1)
# print(my_list) # Output: ['larch', True, 1]

