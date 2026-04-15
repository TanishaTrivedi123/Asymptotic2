module.exports = [
  {
    customId: "ll101",
    title: "Detect a cycle in Linked List",
    topic: "linked list",
    difficulty: "Medium",
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
        explanation: "There is a cycle in the linked list.",
      }
    ],
    testCases: [
      { input: "3 2 0 -4 1", output: "true" }
    ]
  },

  {
    customId: "ll102",
    title: "Remove Cycle from Linked List",
    topic: "linked list",
    difficulty: "Medium",
    description: "Remove cycle if present.",
    constraints: ["1 ≤ size of linked list ≤ 105"],
    examples: [
      {
        input: "head = 1 -> 3 -> 4, pos = 2",
        output: "true",
        explanation: "Cycle removed",
      }
    ],
    testCases: [
      { input: "1 3 4 2", output: "true" }
    ]
  },

  {
    customId: "ll103",
    title: "Middle of Linked List",
    topic: "linked list",
    difficulty: "Easy",
    description: `Return middle node value.`,
    constraints: ["1 ≤ no. of nodes ≤ 105"],
    examples: [
      {
        input: "head -> 2 -> 4 -> 6 -> 7 -> 5 -> 1 -> NULL",
        output: "7",
        explanation: "Return second middle",
      }
    ],
    testCases: [
      { input: "2 4 6 7 5 1", output: "7" }
    ]
  },

  {
    customId: "ll104",
    title: "Add Number in Linked List",
    topic: "linked list",
    difficulty: "Medium",
    description: `Add two numbers.`,
    constraints: ["1 ≤ nodes ≤ 105"],
    examples: [
      {
        input: "head1: 1 -> 2 -> 3, head2: 9 -> 9 -> 9",
        output: "1 1 2 2",
        explanation: "123 + 999 = 1122",
      }
    ],
    testCases: [
      { input: "1 2 3 9 9 9", output: "1 1 2 2" }
    ]
  },

  {
    customId: "ll105",
    title: "Merge Two Sorted LinkedList",
    topic: "linked list",
    difficulty: "Medium",
    description: "Merge sorted lists.",
    constraints: ["1 ≤ size ≤ 103"],
    examples: [
      {
        input: "head1 -> 5 10 15 40, head2 -> 2 3 20",
        output: "2 3 5 10 15 20 40",
        explanation: "Merged list",
      }
    ],
    testCases: [
      { input: "5 10 15 40 2 3 20", output: "2 3 5 10 15 20 40" }
    ]
  },
];