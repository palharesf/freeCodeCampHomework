# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/learn-tree-traversal-by-building-a-binary-search-tree/

# In this project, you are going to create a Binary Search Tree (BST).
# A BST is a data structure in which each node has at most two children, with the left child containing values less than the parent node and the right child containing values greater than the parent node.
# This allows for efficient searching and sorting operations.

# The root attribute represents the root node of the binary search tree.
# Since this is the constructor when a new BinarySearchTree object is created, it starts with an empty tree, so the root attribute is set to None.

# Next, you need to define a mechanism to insert nodes in the tree.
# For that, you need to define an _insert method, which is a helper function and would be used by the actual insert method later on.
# This method is recursive, meaning it calls itself to traverse the tree until the appropriate location for the new node is found.

# You need to check if the node parameter is None.
# If it is, this means that the method has reached a leaf node or an empty spot in the tree where the new node should be inserted.
# Now you need to recursively traverse the tree and insert the values using the principle for binary trees:

#   Values smaller than the key are placed in the left subtree
#   Values greater than the key are placed in the right subtree

# If key < node.key evaluates to True, then the new node should be placed in the left subtree.

# The insert method will be called by the user.
# In addition to the self parameter, it will also need a key parameter.
# This parameter will be the key value to insert into the binary search tree.

# Now, inside the insert method, you need to call the helper method _insert() that we defined earlier.
# Here, _insert has encapsulated the implementation of the insertion logic.
# This is useful for recursion and for keeping the implementation details hidden from the user.

# Now you are going to define a base case for the recursive search.
# Write an if statement that checks two conditions:

#   If node is None: This indicates that the search has reached the end of a branch without finding the key.
#   If node.key == key: This means that the key has been found in the current node.

# Write another if statement that checks if the target key is less than the key of the current node.

# If the second if statement is not True, it means that the target key is greater than or equal to the current node key.
# In a binary search tree, if the target key is greater than the current node's key, the search continues in the right subtree.

# Inside the search method, delete pass and call the helper method _search with the following arguments.

#   self.root: This is the root of the binary search tree. The search starts from the root.
#   key: This is the value that the user wants to find in the binary search tree.

# You can create an instance of a class in Python like this:

# object_name = ClassName()

# Note that, your search returns something like 80: <__main__.TreeNode object at 0x108b3e0>.
# This is the default string representation when printing an instance of a class.
# To change that to print a useful value, define another method named __str__ in the TreeNode class.
# It takes a single argument self.
# After defining __str__ you'll get an exception in the console because the __str__ method doesn't return anything yet.
# You'll work on the method body in the next step.
# In the body of the __str__ method, delete pass and return the result of calling the str() function with self.key as the argument.
# This is the attribute of the current node object that stores the value associated with the node.
# After returning the result, you should see the exception disappear from the console and the output should now display the value of the key associated with the node.

# The next step is to work on the deletion of nodes. For that, you would follow the same approach by first defining a helper method and then the actual method.

# Inside the else block, replace pass with an if statement to check if the left child of the current node is None.
# When node.left is None, there is no left child. Therefore, return the right child from the new if block as a replacement.
# Below the if statement, add an elif clause to check if the right child of the current node (node.right) is None.
# If the previous condition is met, it means there is no right child. So, return the left child of the current node from the elif block as a replacement.
# If neither one of the previous conditions is met, it means the node has both left and right children.

# To choose the successor, you need to find the minimum value in the right subtree. The smallest value will be the in-order successor of the current node.
# To find the smallest value in the right subtree, you need to iterate through the left children of the given node until you reach the leftmost (smallest) node in the subtree.
# To do this, write a while loop that runs when node.left is not None and move pass inside the while block.
# This condition checks if there is a left child.
# As long as there is a left child, the loop continues and there is a smaller value to be found.

# Once the leftmost node is found (that is, when node.left becomes None), the loop exits.
# After the while loop, return the key of the leftmost node, which represents the minimum value in the given subtree.
# With this, you are able to get the value that will replace the node after it is deleted.

# After finding the minimum value, you will need to recursively delete the node with the minimum value from the right subtree.
# This step ensures that the node with the minimum value is removed from the tree while maintaining the binary search tree (BST) property.

# Now, you'll work on traversing the tree based on the in-order traversal method.
# In-order traversal is a depth-first binary tree traversal algorithm that visits the left subtree, the current node, and then the right subtree.
# Define the _inorder_traversal method within the BinarySearchTree class and give it three parameters: self, node and result.
# Where node is the current node being considered during the traversal and result is the list to which the keys are appended in sorted order.

# The inorder_traversal method is responsible for performing an in-order traversal of the binary search tree.
# It returns the keys of the nodes in sorted order.
# It will use the helper method _inorder_traversal to achieve this.

# Within the inorder_traversal method, start the in-order traversal by calling the helper method _inorder_traversal and pass the BST root and the result list as the arguments.
# This will start the traversal from the root of the binary search tree (self.root), and the result list will be passed to accumulate the keys during the traversal.


class TreeNode:

    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

    def __str__(self):
        return str(self.key)


class BinarySearchTree:

    def __init__(self):
        self.root = None

    def _insert(self, node, key):
        if node is None:
            return TreeNode(key)

        if key < node.key:
            node.left = self._insert(node.left, key)
        elif key > node.key:

            node.right = self._insert(node.right, key)
        return node

    def insert(self, key):
        self.root = self._insert(self.root, key)

    def _search(self, node, key):
        if node is None or node.key == key:
            return node
        if key < node.key:
            return self._search(node.left, key)
        return self._search(node.right, key)

    def search(self, key):
        return self._search(self.root, key)

    def _delete(self, node, key):
        if node is None:
            return node
        if key < node.key:
            node.left = self._delete(node.left, key)
        elif key > node.key:
            node.right = self._delete(node.right, key)
        else:
            if node.left is None:
                return node.right
            elif node.right is None:
                return node.left

            node.key = self._min_value(node.right)
            node.right = self._delete(node.right, node.key)

        return node

    def delete(self, key):
        self.root = self._delete(self.root, key)

    def _min_value(self, node):
        while node.left is not None:
            node = node.left
        return node.key

    def _inorder_traversal(self, node, result):
        if node:
            self._inorder_traversal(node.left, result)
            result.append(node.key)
            self._inorder_traversal(node.right, result)

    def inorder_traversal(self):
        result = []
        self._inorder_traversal(self.root, result)
        return result


bst = BinarySearchTree()
nodes = [50, 30, 20, 40, 70, 60, 80]

for node in nodes:
    bst.insert(node)

print('Search for 80:', bst.search(80))

print("Inorder traversal:", bst.inorder_traversal())

bst.delete(40)

print("Search for 40:", bst.search(40))

print("Inorder traversal after deleting 40:", bst.inorder_traversal())
