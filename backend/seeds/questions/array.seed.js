module.exports = [
  {
    customId: "ar101",
    title: "Missing in Array",
    topic: "array",
    difficulty: "Easy",
    description: `
      You are given an array arr[] of size n - 1 that contains distinct integers in the range from 1 to n (inclusive). This array represents a permutation of the integers from 1 to n with one element missing. Your task is to identify and return the missing element.
    `,
    constraints: ["1 ≤ arr.size() ≤ 106", "1 ≤ arr[i] ≤ arr.size() + 1"],
    examples: [
      {
        input: "arr[] = [8, 2, 4, 5, 3, 7, 1]",
        output: "6",
        explanation: "All the numbers from 1 to 8 are present except 6.",
      }
    ],
    testCases: [
      { input: "8 2 4 5 3 7 1", output: "6" }
    ]
  },

  {
    customId: "ar102",
    title: "Sort 0s, 1s and 2s",
    topic: "array",
    difficulty: "Medium",
    description: "Given an array arr[] containing only 0s, 1s, and 2s. Sort the array in ascending order.",
    constraints: ["1 ≤ arr.size() ≤ 106", "0 ≤ arr[i] ≤ 2"],
    examples: [
      {
        input: "arr[] = [0, 1, 2, 0, 1, 2]",
        output: "[0, 0, 1, 1, 2, 2]",
        explanation: "Sorted array.",
      }
    ],
    testCases: [
      { input: "0 1 2 0 1 2", output: "0 0 1 1 2 2" }
    ]
  },

  {
    customId: "ar103",
    title: "Rotate Array",
    topic: "array",
    difficulty: "Medium",
    description: `Rotate array left by d steps.`,
    constraints: ["1 <= arr.size(), d <= 105"],
    examples: [
      {
        input: "arr[] = [1,2,3,4,5], d = 2",
        output: "[3,4,5,1,2]",
        explanation: "Rotated array",
      }
    ],
    testCases: [
      { input: "1 2 3 4 5 2", output: "3 4 5 1 2" }
    ]
  },

  {
    customId: "ar104",
    title: "Smallest Positive Missing",
    topic: "array",
    difficulty: "Medium",
    description: `Find smallest missing positive.`,
    constraints: ["1 ≤ arr.size() ≤ 105"],
    examples: [
      {
        input: "arr[] = [2, -3, 4, 1, 1, 7]",
        output: "3",
        explanation: "Missing is 3",
      }
    ],
    testCases: [
      { input: "2 -3 4 1 1 7", output: "3" }
    ]
  },

  {
    customId: "ar105",
    title: "Triplet Sum in Array",
    topic: "array",
    difficulty: "Medium",
    description: `Check if triplet sum exists.`,
    constraints: ["3 ≤ arr.size() ≤ 5*103"],
    examples: [
      {
        input: "arr[] = [1,4,45,6,10,8], target = 13",
        output: "true",
        explanation: "Triplet exists",
      }
    ],
    testCases: [
      { input: "1 4 45 6 10 8 13", output: "true" }
    ]
  },
];