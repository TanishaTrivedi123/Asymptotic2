module.exports = [
  {
    customId: "in101",
    title: "Find Numbers with Even Number of Digits",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given an array nums of integers, return how many of them contain an even number of digits.
    `,
    constraints: ["1 <= nums.length <= 500", "1 <= nums[i] <= 105"],
    examples: [
      {
        input: "nums = [12,345,2,6,7896]",
        output: "2",
        explanation: `
        12 contains 2 digits (even number of digits). 
        345 contains 3 digits (odd number of digits). 
        2 contains 1 digit (odd number of digits). 
        6 contains 1 digit (odd number of digits). 
        7896 contains 4 digits (even number of digits). 
        Therefore only 12 and 7896 contain an even number of digits.
        `,
      }
    ],
    testCases: [
      { input: "12,345,2,6,7896", output: "2" }
    ]
  },

  {
    customId: "in102",
    title: "Merge Sorted Array",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

    Merge nums1 and nums2 into a single array sorted in non-decreasing order.

    The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

    Can you come up with an algorithm that runs in O(m + n) time?
    `,
    constraints: ["nums1.length == m + n", "nums2.length == n", "0 <= m", "n <= 200", "1 <= m + n <= 200", "-109 <= nums1[i], nums2[j] <= 109"],
    examples: [
      {
        input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
        output: "[1,2,2,3,5,6]",
        explanation: "The arrays we are merging are [1,2,3] and [2,5,6].The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.",
      }
    ],
    testCases: [
      { input: "1,2,3,0,0,0", output: "3" }
    ]
  },

  {
    customId: "in103",
    title: "Ceil in a Sorted Array",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given a sorted array arr[] and an integer x, find the index (0-based) of the smallest element in arr[] that is greater than or equal to x. This element is called the ceil of x. If such an element does not exist, return -1.

    Note: In case of multiple occurrences of ceil of x, return the index of the first occurrence.
    `,
    constraints: ["1 ≤ arr.size() ≤ 106", "1 ≤ arr[i] ≤ 106", "0 ≤ x ≤ arr[n-1]"],
    examples: [
      {
        input: "arr[] = [1, 2, 8, 10, 11, 12, 19], x = 5",
        output: "2",
        explanation: "Smallest number greater than 5 is 8, whose index is 2.",
      }
    ],
    testCases: [
      { input: "1, 2, 8, 10, 11, 12, 19", output: "2" }
    ]
  },

  {
    customId: "in104",
    title: "Linked List Cycle",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given head, the head of a linked list, determine if the linked list has a cycle in it.

    There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

    Return true if there is a cycle in the linked list. Otherwise, return false.
    `,
    constraints: ["The number of the nodes in the list is in the range [0, 104].", "-105 <= Node.val <= 105", "pos is -1 or a valid index in the linked-list."],
    examples: [
      {
        input: "head = [3,2,0,-4], pos = 1",
        output: "true",
        explanation: "There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).",
      }
    ],
    testCases: [
      { input: "3,2,0,-4", output: "true" }
    ]
  },

  {
    customId: "in105",
    title: "Valid Parentheses",
    topic: "innovixus",
    difficulty: "Easy",
    description: `
    Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

    An input string is valid if:

    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    3. Every close bracket has a corresponding open bracket of the same type.
    `,
    constraints: ["1 <= s.length <= 104", "s consists of parentheses only '()[]{}'."],
    examples: [
      {
        input: "()[]{}",
        output: "true",
      }
    ],
    testCases: [
      { input: "()[]{}", output: "true" }
    ]
  }
];