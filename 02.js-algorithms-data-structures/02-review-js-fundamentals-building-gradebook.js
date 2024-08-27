// Exercise permalink: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/review-js-fundamentals-by-building-a-gradebook-app/step-1

function getAverage(scores) {
  let sum = 0;
  for (const score of scores) {
    sum += score;
  }
  return sum / scores.length;
}

function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

// Function relying in truthy and falsy states

function hasPassingGrade(score) {
  return getGrade(score) !== "F";
}

function studentMsg(totalScores, studentScore) {
  let message = "";
  if (studentScore >= 60) {
    message = "Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) +". You passed the course.";
    return message;
  }
  else {
    message = "Class average: " + getAverage(totalScores) + ". Your grade: " + getGrade(studentScore) +". You failed the course.";
    return message;
  }
}

// Test to check whether the functions work

console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));

