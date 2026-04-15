module.exports = [
  {
    customId: "in101",
    title: "Two Sum - Pair with Given Sum",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given an array arr[] of integers and another integer target. 
    Determine if there exist two distinct indices such that the sum of their elements is equal to the target.
    `,
    constraints: ["1 ≤ arr.size ≤ 105", "-105 ≤ arr[i] ≤ 105", "-2*105 ≤ target ≤ 2*105"],
    examples: [
      {
        input: "arr[] = [0, -1, 2, -3, 1], target = -2",
        output: "true",
        explanation: "arr[3] + arr[4] = -3 + 1 = -2",
      }
    ],
    testCases: [
      { input: "0, -1, 2, -3, 1", output: "true" }
    ]
  },

  {
    customId: "in102",
    title: "First Occurrence in Sorted",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given a sorted array arr[] and an integer k, find the position(0-based indexing) at which k is present in the array using binary search. If k doesn't exist in arr[] return -1. 

    Note: If multiple occurrences are there, please return the smallest index.
    `,
    constraints: ["1 ≤ arr.size() ≤ 105", "1 ≤ arr[i] ≤ 106", "1 ≤ k ≤ 106"],
    examples: [
      {
        input: "arr[] = [0, -1, 2, -3, 1], k = 4",
        output: "3",
        explanation: "4 appears at index 3.",
      }
    ],
    testCases: [
      { input: "0, -1, 2, -3, 1", output: "3" }
    ]
  },

  {
    customId: "in103",
    title: "Power Set",
    topic: "innovixus",
    difficulty: "Medium",
    description: `Given a string s of length n, find all the possible non-empty subsequences of the string s in lexicographically-sorted order.
    
    Your Task:
    You don't need to read input or print anything. Your task is to complete the function AllPossibleStrings() which takes a string s as the input parameter and returns a list of all possible subsequences (non-empty) that can be formed from s in lexicographically sorted order.

    Expected Time Complexity: O( n*2n  )
    Expected Space Complexity: O( n * 2n )
    `,
    constraints: ["1 <= n <= 16", "s constitutes of lower case english alphabets"],
    examples: [
      {
        input: "s = \"abc\"",
        output: "a ab abc ac b bc c",
        explanation: "There are a total 7 number of subsequences possible for the given string, and they are mentioned above in lexicographically sorted order.",
      }
    ],
    testCases: [
      { input: "\"abc\"", output: "a ab abc ac b bc c" }
    ]
  }
];