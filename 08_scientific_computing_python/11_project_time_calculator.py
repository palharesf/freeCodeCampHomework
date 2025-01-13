# Exercise link: https://www.freecodecamp.org/learn/scientific-computing-with-python/build-a-time-calculator-project/build-a-time-calculator-project

# Write a function named add_time that takes in two required parameters and one optional parameter:

#     a start time in the 12-hour clock format (ending in AM or PM)
#     a duration time that indicates the number of hours and minutes
#     (optional) a starting day of the week, case insensitive

# The function should add the duration time to the start time and return the result.
# If the result will be the next day, it should show (next day) after the time.
# If the result will be more than one day later, it should show (n days later) after the time, where "n" is the number of days later.
# If the function is given the optional starting day of the week parameter, then the output should display the day of the week of the result.
# The day of the week in the output should appear after the time and before the number of days later.

# Below are some examples of different cases the function should handle.
# Pay close attention to the spacing and punctuation of the results.

# add_time('3:00 PM', '3:10')
# # Returns: 6:10 PM

# add_time('11:30 AM', '2:32', 'Monday')
# # Returns: 2:02 PM, Monday

# add_time('11:43 AM', '00:20')
# # Returns: 12:03 PM

# add_time('10:10 PM', '3:30')
# # Returns: 1:40 AM (next day)

# add_time('11:43 PM', '24:20', 'tueSday')
# # Returns: 12:03 AM, Thursday (2 days later)

# add_time('6:30 PM', '205:12')
# # Returns: 7:42 AM (9 days later)

# Do not import any Python libraries.
# Assume that the start times are valid times.
# The minutes in the duration time will be a whole number less than 60, but the hour can be any whole number.

def add_time(start, duration, starting_day=None):
    new_time = ''
    day_counter = 0
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    if starting_day:
        starting_day = starting_day.capitalize()

    print(f'starting day: {starting_day}')

    start_first_element = start.split(':')
    start_hour = int(start_first_element[0])
    start_second_element = start_first_element[1].split(' ')
    start_min = int(start_second_element[0])
    start_ampm = str(start_second_element[1])

    print(f'start: {start}')

    duration_time = duration.split(':')
    duration_hour = int(duration_time[0])
    duration_min = int(duration_time[1])

    print(f'duration: {duration}')

    new_hour = start_hour + duration_hour
    new_min = start_min + duration_min

    if new_min >= 60:
        new_hour += 1
        new_min -= 60

    day_counter += new_hour // 24
    new_hour %= 24

    if new_hour == 0:
        new_hour = 24

    if new_hour == 12:
        if start_ampm == 'AM':
            start_ampm = 'PM'
        else:
            start_ampm = 'AM'
            day_counter += 1
    else:
        if new_hour > 12:
            new_hour -= 12
            if start_ampm == 'AM':
                start_ampm = 'PM'
            else:
                start_ampm = 'AM'
                day_counter += 1

    new_time = f'{new_hour}:{new_min:02} {start_ampm}'

    if starting_day:
        start_day_index = days.index(starting_day)
        new_day_index = (start_day_index + day_counter) % 7
        new_day = days[new_day_index]
        new_time += f', {new_day}'

    if day_counter == 1:
        new_time += " (next day)"
    elif day_counter > 1:
        new_time += f" ({day_counter} days later)"

    print(f'new_hour: {new_hour}, new_min: {new_min}, new_time: {new_time}\n')

    return new_time


add_time('3:00 PM', '3:10')
add_time('11:30 AM', '2:32', 'Monday')
add_time('11:43 AM', '00:20')
add_time('10:10 PM', '3:30')
add_time('11:43 PM', '24:20', 'tueSday')
add_time('6:30 PM', '205:12')
add_time('3:30 PM', '2:12')
add_time('11:55 AM', '3:12')
add_time('2:59 AM', '24:00')
add_time('11:59 PM', '24:05')
add_time('8:16 PM', '466:02')
add_time('3:30 PM', '2:12', 'Monday')
add_time('2:59 AM', '24:00', 'saturDay')
add_time('11:59 PM', '24:05', 'Wednesday')
add_time('8:16 PM', '466:02', 'tuesday')
