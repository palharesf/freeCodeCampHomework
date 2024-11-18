# Nth Fibonacci number
def fib(n):
    """Return the nth Fibonacci number using a naive recursive approach."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return fib(n-1) + fib(n-2)
