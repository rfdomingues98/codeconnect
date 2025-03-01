import { db } from "../client";
import {
  Challenges,
  ChallengeTags,
  OutputTests,
  PerformanceTests,
  Tags,
  User
} from "../schema";

// Function to seed the database with challenges
export async function seedChallenges() {
  console.log("Seeding challenges...");

  // Create a default author if not exists
  const [author] = await db.insert(User).values({
    name: "Challenge Admin",
    email: "admin@codeconnect.dev",
  }).returning({ id: User.id }).onConflictDoNothing();

  const authorId = author?.id;

  // Create tags
  const tagsData = [
    { name: "Arrays", description: "Problems involving array manipulation" },
    { name: "Strings", description: "String manipulation and pattern matching" },
    { name: "Algorithms", description: "Classic algorithmic problems" },
    { name: "Data Structures", description: "Problems focused on data structures" },
    { name: "Math", description: "Mathematical problems and calculations" },
    { name: "Recursion", description: "Problems best solved with recursive approaches" },
    { name: "Dynamic Programming", description: "Optimization problems using dynamic programming" },
    { name: "Sorting", description: "Sorting algorithms and techniques" },
    { name: "Searching", description: "Search algorithms and techniques" },
    { name: "Beginner", description: "Suitable for beginners" },
    { name: "Interview", description: "Common in coding interviews" },
  ];

  // Insert tags and get their IDs
  const tagIds = [];
  for (const tagData of tagsData) {
    const [tag] = await db.insert(Tags).values(tagData).returning({ id: Tags.id }).onConflictDoNothing();
    if (tag) {
      tagIds.push(tag.id);
    }
  }

  // Define challenges
  const challenges = [
    {
      slug: "two-sum",
      title: "Two Sum",
      description: `
# Two Sum

## Problem Description
Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

## Examples

**Example 1:**
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

## Constraints
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.

## Follow-up
Can you come up with an algorithm that is less than O(n²) time complexity?
      `,
      initialCode: `// JavaScript/TypeScript
function twoSum(nums, target) {
    // Your code here
}

// Python
# def two_sum(nums, target):
#     # Your code here
#     pass

// Java
// public int[] twoSum(int[] nums, int target) {
//     // Your code here
// }

// C#
// public int[] TwoSum(int[] nums, int target) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[0], tagIds[2], tagIds[9], tagIds[10]], // Arrays, Algorithms, Beginner, Interview
      outputTests: [
        {
          code: `const result = twoSum([2,7,11,15], 9);`,
          expectedOutput: `[0,1]`
        },
        {
          code: `const result = twoSum([3,2,4], 6);`,
          expectedOutput: `[1,2]`
        },
        {
          code: `const result = twoSum([3,3], 6);`,
          expectedOutput: `[0,1]`
        },
        {
          code: `const result = twoSum([1,2,3,4,5], 9);`,
          expectedOutput: `[3,4]`
        }
      ],
      performanceTests: [
        {
          code: `const arr = Array.from({length: 1000}, (_, i) => i);
const result = twoSum(arr, 1997);`,
          executionTime: "50ms"
        }
      ]
    },
    {
      slug: "palindrome-check",
      title: "Palindrome Check",
      description: `
# Palindrome Check

## Problem Description
Write a function that checks if a given string is a palindrome. A palindrome is a string that reads the same backward as forward, ignoring case, punctuation, and spaces.

For example, "A man, a plan, a canal: Panama" is a palindrome.

## Examples

**Example 1:**
\`\`\`
Input: "racecar"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: "A man, a plan, a canal: Panama"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: "hello"
Output: false
\`\`\`

## Constraints
- The input string will only contain printable ASCII characters.
- The input string length will not exceed 10^5 characters.

## Approach
Consider how to handle spaces, punctuation, and case sensitivity. You may want to preprocess the string before checking if it's a palindrome.
      `,
      initialCode: `// JavaScript/TypeScript
function isPalindrome(s) {
    // Your code here
}

// Python
# def is_palindrome(s):
#     # Your code here
#     pass

// Java
// public boolean isPalindrome(String s) {
//     // Your code here
// }

// C#
// public bool IsPalindrome(string s) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:20:00", // 20 minutes
      tags: [tagIds[1], tagIds[9]], // Strings, Beginner
      outputTests: [
        {
          code: `const result = isPalindrome("racecar");`,
          expectedOutput: `true`
        },
        {
          code: `const result = isPalindrome("A man, a plan, a canal: Panama");`,
          expectedOutput: `true`
        },
        {
          code: `const result = isPalindrome("hello");`,
          expectedOutput: `false`
        },
        {
          code: `const result = isPalindrome("Was it a car or a cat I saw?");`,
          expectedOutput: `true`
        }
      ],
      performanceTests: [
        {
          code: `const longPalindrome = "a".repeat(50000) + "b" + "a".repeat(50000);
const result = isPalindrome(longPalindrome);`,
          executionTime: "100ms"
        }
      ]
    },
    {
      slug: "fibonacci-sequence",
      title: "Fibonacci Sequence",
      description: `
# Fibonacci Sequence

## Problem Description
Write a function to generate the nth Fibonacci number.

The Fibonacci sequence is defined as:
- F(0) = 0
- F(1) = 1
- F(n) = F(n-1) + F(n-2) for n > 1

## Examples

**Example 1:**
\`\`\`
Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2
\`\`\`

**Example 3:**
\`\`\`
Input: n = 10
Output: 55
\`\`\`

## Constraints
- 0 <= n <= 45
- The answer is guaranteed to fit in a 32-bit integer.

## Follow-up
Can you implement a solution with O(n) time complexity and O(1) space complexity?
      `,
      initialCode: `// JavaScript/TypeScript
function fibonacci(n) {
    // Your code here
}

// Python
# def fibonacci(n):
#     # Your code here
#     pass

// Java
// public int fibonacci(int n) {
//     // Your code here
// }

// C#
// public int Fibonacci(int n) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:25:00", // 25 minutes
      tags: [tagIds[4], tagIds[5], tagIds[6], tagIds[9]], // Math, Recursion, Dynamic Programming, Beginner
      outputTests: [
        {
          code: `const result = fibonacci(0);`,
          expectedOutput: `0`
        },
        {
          code: `const result = fibonacci(1);`,
          expectedOutput: `1`
        },
        {
          code: `const result = fibonacci(2);`,
          expectedOutput: `1`
        },
        {
          code: `const result = fibonacci(10);`,
          expectedOutput: `55`
        },
        {
          code: `const result = fibonacci(20);`,
          expectedOutput: `6765`
        }
      ],
      performanceTests: [
        {
          code: `const result = fibonacci(40);`,
          executionTime: "100ms"
        }
      ]
    },
    {
      slug: "merge-sorted-arrays",
      title: "Merge Sorted Arrays",
      description: `
# Merge Sorted Arrays

## Problem Description
Given two sorted arrays \`nums1\` and \`nums2\`, merge them into a single sorted array.

## Examples

**Example 1:**
\`\`\`
Input: nums1 = [1,3,5], nums2 = [2,4,6]
Output: [1,2,3,4,5,6]
\`\`\`

**Example 2:**
\`\`\`
Input: nums1 = [1,2,3], nums2 = [4,5,6]
Output: [1,2,3,4,5,6]
\`\`\`

**Example 3:**
\`\`\`
Input: nums1 = [], nums2 = [1]
Output: [1]
\`\`\`

## Constraints
- The arrays \`nums1\` and \`nums2\` are sorted in non-decreasing order.
- The combined length of both arrays will not exceed 10^6.

## Approach
Think about how to merge the arrays efficiently without using extra space (if possible).
      `,
      initialCode: `// JavaScript/TypeScript
function mergeSortedArrays(nums1, nums2) {
    // Your code here
}

// Python
# def merge_sorted_arrays(nums1, nums2):
#     # Your code here
#     pass

// Java
// public int[] mergeSortedArrays(int[] nums1, int[] nums2) {
//     // Your code here
// }

// C#
// public int[] MergeSortedArrays(int[] nums1, int[] nums2) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[0], tagIds[2], tagIds[7]], // Arrays, Algorithms, Sorting
      outputTests: [
        {
          code: `const result = mergeSortedArrays([1,3,5], [2,4,6]);`,
          expectedOutput: `[1,2,3,4,5,6]`
        },
        {
          code: `const result = mergeSortedArrays([1,2,3], [4,5,6]);`,
          expectedOutput: `[1,2,3,4,5,6]`
        },
        {
          code: `const result = mergeSortedArrays([], [1]);`,
          expectedOutput: `[1]`
        },
        {
          code: `const result = mergeSortedArrays([2], [1]);`,
          expectedOutput: `[1,2]`
        }
      ],
      performanceTests: [
        {
          code: `const arr1 = Array.from({length: 10000}, (_, i) => i * 2);
const arr2 = Array.from({length: 10000}, (_, i) => i * 2 + 1);
const result = mergeSortedArrays(arr1, arr2);`,
          executionTime: "150ms"
        }
      ]
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      description: `
# Binary Search

## Problem Description
Implement a binary search algorithm to find a target value in a sorted array.

Your function should return the index of the target if found, or -1 if the target is not in the array.

## Examples

**Example 1:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1
\`\`\`

## Constraints
- The array will have at most 10^4 elements.
- The array is sorted in ascending order.
- All values in the array are unique.
- -10^4 <= target <= 10^4

## Approach
Remember that binary search has O(log n) time complexity, which is much better than linear search for large arrays.
      `,
      initialCode: `// JavaScript/TypeScript
function binarySearch(nums, target) {
    // Your code here
}

// Python
# def binary_search(nums, target):
#     # Your code here
#     pass

// Java
// public int binarySearch(int[] nums, int target) {
//     // Your code here
// }

// C#
// public int BinarySearch(int[] nums, int target) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[0], tagIds[2], tagIds[8], tagIds[10]], // Arrays, Algorithms, Searching, Interview
      outputTests: [
        {
          code: `const result = binarySearch([-1,0,3,5,9,12], 9);`,
          expectedOutput: `4`
        },
        {
          code: `const result = binarySearch([-1,0,3,5,9,12], 2);`,
          expectedOutput: `-1`
        },
        {
          code: `const result = binarySearch([1,2,3,4,5], 1);`,
          expectedOutput: `0`
        },
        {
          code: `const result = binarySearch([1,2,3,4,5], 5);`,
          expectedOutput: `4`
        }
      ],
      performanceTests: [
        {
          code: `const arr = Array.from({length: 1000000}, (_, i) => i);
const result = binarySearch(arr, 999999);`,
          executionTime: "10ms"
        }
      ]
    },
    {
      slug: "reverse-linked-list",
      title: "Reverse Linked List",
      description: `
# Reverse Linked List

## Problem Description
Given the head of a singly linked list, reverse the list and return the reversed list's head.

For this challenge, we'll represent the linked list using arrays where each element is [value, next_index]. The head of the list is always at index 0.

## Examples

**Example 1:**
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

**Example 2:**
\`\`\`
Input: head = [1,2]
Output: [2,1]
\`\`\`

**Example 3:**
\`\`\`
Input: head = []
Output: []
\`\`\`

## Constraints
- The number of nodes in the list is in the range [0, 5000].
- -5000 <= Node.val <= 5000

## Approach
Consider both iterative and recursive approaches to this problem.
      `,
      initialCode: `// JavaScript/TypeScript
// For simplicity, we'll define the ListNode class for you
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

function reverseList(head) {
    // Your code here
}

// Python
# # For simplicity, we'll define the ListNode class for you
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
# 
# def reverse_list(head):
#     # Your code here
#     pass

// Java
// // For simplicity, we'll define the ListNode class for you
// public class ListNode {
//     int val;
//     ListNode next;
//     ListNode() {}
//     ListNode(int val) { this.val = val; }
//     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
// }
// 
// public ListNode reverseList(ListNode head) {
//     // Your code here
// }

// C#
// // For simplicity, we'll define the ListNode class for you
// public class ListNode {
//     public int val;
//     public ListNode next;
//     public ListNode(int val=0, ListNode next=null) {
//         this.val = val;
//         this.next = next;
//     }
// }
// 
// public ListNode ReverseList(ListNode head) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:35:00", // 35 minutes
      tags: [tagIds[3], tagIds[5], tagIds[10]], // Data Structures, Recursion, Interview
      outputTests: [
        {
          code: `
// Helper function to create a linked list from array
function createLinkedList(arr) {
    if (arr.length === 0) return null;
    let head = new ListNode(arr[0]);
    let current = head;
    for (let i = 1; i < arr.length; i++) {
        current.next = new ListNode(arr[i]);
        current = current.next;
    }
    return head;
}

// Helper function to convert linked list to array
function linkedListToArray(head) {
    const result = [];
    let current = head;
    while (current) {
        result.push(current.val);
        current = current.next;
    }
    return result;
}

const head = createLinkedList([1,2,3,4,5]);
const reversed = reverseList(head);
const result = linkedListToArray(reversed);`,
          expectedOutput: `[5,4,3,2,1]`
        },
        {
          code: `
const head = createLinkedList([1,2]);
const reversed = reverseList(head);
const result = linkedListToArray(reversed);`,
          expectedOutput: `[2,1]`
        },
        {
          code: `
const head = createLinkedList([]);
const reversed = reverseList(head);
const result = linkedListToArray(reversed);`,
          expectedOutput: `[]`
        }
      ],
      performanceTests: [
        {
          code: `
const arr = Array.from({length: 1000}, (_, i) => i);
const head = createLinkedList(arr);
const reversed = reverseList(head);`,
          executionTime: "50ms"
        }
      ]
    },
    {
      slug: "valid-parentheses",
      title: "Valid Parentheses",
      description: `
# Valid Parentheses

## Problem Description
Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

## Examples

**Example 1:**
\`\`\`
Input: s = "()"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: s = "()[]{}"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: s = "(]"
Output: false
\`\`\`

**Example 4:**
\`\`\`
Input: s = "([)]"
Output: false
\`\`\`

**Example 5:**
\`\`\`
Input: s = "{[]}"
Output: true
\`\`\`

## Constraints
- 1 <= s.length <= 10^4
- \`s\` consists of parentheses only '()[]{}'.

## Approach
Consider using a stack data structure to keep track of opening brackets.
      `,
      initialCode: `// JavaScript/TypeScript
function isValid(s) {
    // Your code here
}

// Python
# def is_valid(s):
#     # Your code here
#     pass

// Java
// public boolean isValid(String s) {
//     // Your code here
// }

// C#
// public bool IsValid(string s) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:25:00", // 25 minutes
      tags: [tagIds[1], tagIds[3], tagIds[10]], // Strings, Data Structures, Interview
      outputTests: [
        {
          code: `const result = isValid("()");`,
          expectedOutput: `true`
        },
        {
          code: `const result = isValid("()[]{}");`,
          expectedOutput: `true`
        },
        {
          code: `const result = isValid("(]");`,
          expectedOutput: `false`
        },
        {
          code: `const result = isValid("([)]");`,
          expectedOutput: `false`
        },
        {
          code: `const result = isValid("{[]}");`,
          expectedOutput: `true`
        }
      ],
      performanceTests: [
        {
          code: `const s = "(".repeat(10000) + ")".repeat(10000);
const result = isValid(s);`,
          executionTime: "100ms"
        }
      ]
    },
    {
      slug: "longest-common-subsequence",
      title: "Longest Common Subsequence",
      description: `
# Longest Common Subsequence

## Problem Description
Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".

A common subsequence of two strings is a subsequence that is common to both strings.

## Examples

**Example 1:**
\`\`\`
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.
\`\`\`

**Example 2:**
\`\`\`
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.
\`\`\`

**Example 3:**
\`\`\`
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.
\`\`\`

## Constraints
- 1 <= text1.length, text2.length <= 1000
- text1 and text2 consist of only lowercase English characters.

## Approach
This is a classic dynamic programming problem. Consider how to build up the solution from smaller subproblems.
      `,
      initialCode: `// JavaScript/TypeScript
function longestCommonSubsequence(text1, text2) {
    // Your code here
}

// Python
# def longest_common_subsequence(text1, text2):
#     # Your code here
#     pass

// Java
// public int longestCommonSubsequence(String text1, String text2) {
//     // Your code here
// }

// C#
// public int LongestCommonSubsequence(string text1, string text2) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "hard",
      duration: "00:45:00", // 45 minutes
      tags: [tagIds[1], tagIds[6], tagIds[10]], // Strings, Dynamic Programming, Interview
      outputTests: [
        {
          code: `const result = longestCommonSubsequence("abcde", "ace");`,
          expectedOutput: `3`
        },
        {
          code: `const result = longestCommonSubsequence("abc", "abc");`,
          expectedOutput: `3`
        },
        {
          code: `const result = longestCommonSubsequence("abc", "def");`,
          expectedOutput: `0`
        },
        {
          code: `const result = longestCommonSubsequence("bsbininm", "jmjkbkjkv");`,
          expectedOutput: `1`
        }
      ],
      performanceTests: [
        {
          code: `const text1 = "a".repeat(500) + "b".repeat(500);
const text2 = "b".repeat(500) + "a".repeat(500);
const result = longestCommonSubsequence(text1, text2);`,
          executionTime: "500ms"
        }
      ]
    },
    {
      slug: "balanced-binary-tree",
      title: "Balanced Binary Tree",
      description: `
# Balanced Binary Tree

## Problem Description
Given a binary tree, determine if it is height-balanced.

A height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differs by more than 1.

## Examples

**Example 1:**
\`\`\`
Input: root = [3,9,20,null,null,15,7]
Output: true
Explanation: 
The tree looks like:
    3
   / \\
  9  20
    /  \\
   15   7
The depth of the left subtree (with root 9) is 1.
The depth of the right subtree (with root 20) is 2.
The difference is 1, which is not more than 1, so the tree is balanced.
\`\`\`

**Example 2:**
\`\`\`
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Explanation: 
The tree looks like:
       1
      / \\
     2   2
    / \\
   3   3
  / \\
 4   4
The depth of the left subtree (with root 2) is 3.
The depth of the right subtree (with root 2) is 1.
The difference is 2, which is more than 1, so the tree is not balanced.
\`\`\`

## Constraints
- The number of nodes in the tree is in the range $[0, 5000]$.
- $-10^4 <= Node.val <= 10^4$

## Approach
Consider using a recursive approach to check the balance of each subtree.
      `,
      initialCode: `// JavaScript/TypeScript
// Definition for a binary tree node
class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function isBalanced(root) {
    // Your code here
}

// Python
# # Definition for a binary tree node
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
#
# def is_balanced(root):
#     # Your code here
#     pass

// Java
// // Definition for a binary tree node
// public class TreeNode {
//     int val;
//     TreeNode left;
//     TreeNode right;
//     TreeNode() {}
//     TreeNode(int val) { this.val = val; }
//     TreeNode(int val, TreeNode left, TreeNode right) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }
//
// public boolean isBalanced(TreeNode root) {
//     // Your code here
// }

// C#
// // Definition for a binary tree node
// public class TreeNode {
//     public int val;
//     public TreeNode left;
//     public TreeNode right;
//     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
//         this.val = val;
//         this.left = left;
//         this.right = right;
//     }
// }
//
// public bool IsBalanced(TreeNode root) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:35:00", // 35 minutes
      tags: [tagIds[3], tagIds[5], tagIds[10]], // Data Structures, Recursion, Interview
      outputTests: [
        {
          code: `
// Helper function to create a binary tree from array
function createBinaryTree(arr) {
    if (!arr.length) return null;
    
    const root = new TreeNode(arr[0]);
    const queue = [root];
    let i = 1;
    
    while (queue.length && i < arr.length) {
        const node = queue.shift();
        
        // Left child
        if (i < arr.length && arr[i] !== null) {
            node.left = new TreeNode(arr[i]);
            queue.push(node.left);
        }
        i++;
        
        // Right child
        if (i < arr.length && arr[i] !== null) {
            node.right = new TreeNode(arr[i]);
            queue.push(node.right);
        }
        i++;
    }
    
    return root;
}

const root1 = createBinaryTree([3,9,20,null,null,15,7]);
const result1 = isBalanced(root1);`,
          expectedOutput: `true`
        },
        {
          code: `
const root2 = createBinaryTree([1,2,2,3,3,null,null,4,4]);
const result2 = isBalanced(root2);`,
          expectedOutput: `false`
        },
        {
          code: `
const root3 = createBinaryTree([]);
const result3 = isBalanced(root3);`,
          expectedOutput: `true`
        },
        {
          code: `
const root4 = createBinaryTree([1,2,3,4,5,6,null,8]);
const result4 = isBalanced(root4);`,
          expectedOutput: `true`
        }
      ],
      performanceTests: [
        {
          code: `
// Create a deep but balanced tree
function createDeepBalancedTree(depth) {
    if (depth === 0) return null;
    return new TreeNode(
        1,
        createDeepBalancedTree(depth - 1),
        createDeepBalancedTree(depth - 1)
    );
}

const deepTree = createDeepBalancedTree(10);
const result = isBalanced(deepTree);`,
          executionTime: "100ms"
        }
      ]
    },
    {
      slug: "group-anagrams",
      title: "Group Anagrams",
      description: `
# Group Anagrams

## Problem Description
Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Examples

**Example 1:**
\`\`\`
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
\`\`\`

**Example 2:**
\`\`\`
Input: strs = [""]
Output: [[""]]
\`\`\`

**Example 3:**
\`\`\`
Input: strs = ["a"]
Output: [["a"]]
\`\`\`

## Constraints
- 1 <= strs.length <= 10^4
- 0 <= strs[i].length <= 100
- \`strs[i]\` consists of lowercase English letters.

## Approach
Consider how to identify anagrams efficiently. One approach is to sort each string and use the sorted string as a key to group anagrams.
      `,
      initialCode: `// JavaScript/TypeScript
function groupAnagrams(strs) {
    // Your code here
}

// Python
# def group_anagrams(strs):
#     # Your code here
#     pass

// Java
// public List<List<String>> groupAnagrams(String[] strs) {
//     // Your code here
// }

// C#
// public IList<IList<string>> GroupAnagrams(string[] strs) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[1], tagIds[2], tagIds[10]], // Strings, Algorithms, Interview
      outputTests: [
        {
          code: `
const result = groupAnagrams(["eat","tea","tan","ate","nat","bat"]);
// Sort each inner array to ensure consistent order for comparison
const sortedResult = result.map(arr => [...arr].sort()).sort((a, b) => a[0].localeCompare(b[0]));
const expectedOutput = [["bat"],["nat","tan"],["ate","eat","tea"]].map(arr => [...arr].sort()).sort((a, b) => a[0].localeCompare(b[0]));
const isEqual = JSON.stringify(sortedResult) === JSON.stringify(expectedOutput);`,
          expectedOutput: `true`
        },
        {
          code: `
const result = groupAnagrams([""]);
const isEqual = JSON.stringify(result) === JSON.stringify([[""]]);`,
          expectedOutput: `true`
        },
        {
          code: `
const result = groupAnagrams(["a"]);
const isEqual = JSON.stringify(result) === JSON.stringify([["a"]]);`,
          expectedOutput: `true`
        }
      ],
      performanceTests: [
        {
          code: `
// Generate a large array of anagrams
const largeInput = [];
for (let i = 0; i < 1000; i++) {
    const str = "abcdefghij".split('').sort(() => 0.5 - Math.random()).join('');
    largeInput.push(str);
}
const result = groupAnagrams(largeInput);`,
          executionTime: "200ms"
        }
      ]
    },
    {
      slug: "maximum-subarray",
      title: "Maximum Subarray",
      description: `
# Maximum Subarray

## Problem Description
Given an integer array \`nums\`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

## Examples

**Example 1:**
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [1]
Output: 1
\`\`\`

**Example 3:**
\`\`\`
Input: nums = [5,4,-1,7,8]
Output: 23
\`\`\`

## Constraints
- 1 <= nums.length <= 10^5
- -10^4 <= nums[i] <= 10^4

## Follow-up
If you've figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
      `,
      initialCode: `// JavaScript/TypeScript
function maxSubArray(nums) {
    // Your code here
}

// Python
# def max_sub_array(nums):
#     # Your code here
#     pass

// Java
// public int maxSubArray(int[] nums) {
//     // Your code here
// }

// C#
// public int MaxSubArray(int[] nums) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:25:00", // 25 minutes
      tags: [tagIds[0], tagIds[2], tagIds[6], tagIds[9]], // Arrays, Algorithms, Dynamic Programming, Beginner
      outputTests: [
        {
          code: `const result = maxSubArray([-2,1,-3,4,-1,2,1,-5,4]);`,
          expectedOutput: `6`
        },
        {
          code: `const result = maxSubArray([1]);`,
          expectedOutput: `1`
        },
        {
          code: `const result = maxSubArray([5,4,-1,7,8]);`,
          expectedOutput: `23`
        },
        {
          code: `const result = maxSubArray([-1]);`,
          expectedOutput: `-1`
        }
      ],
      performanceTests: [
        {
          code: `
// Generate a large array
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 200) - 100);
const result = maxSubArray(largeArray);`,
          executionTime: "50ms"
        }
      ]
    },
    {
      slug: "climbing-stairs",
      title: "Climbing Stairs",
      description: `
# Climbing Stairs

## Problem Description
You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Examples

**Example 1:**
\`\`\`
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
\`\`\`

**Example 2:**
\`\`\`
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
\`\`\`

## Constraints
- 1 <= n <= 45

## Approach
This problem can be solved using dynamic programming. Think about how to build the solution from smaller subproblems.
      `,
      initialCode: `// JavaScript/TypeScript
function climbStairs(n) {
    // Your code here
}

// Python
# def climb_stairs(n):
#     # Your code here
#     pass

// Java
// public int climbStairs(int n) {
//     // Your code here
// }

// C#
// public int ClimbStairs(int n) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:20:00", // 20 minutes
      tags: [tagIds[4], tagIds[6], tagIds[9]], // Math, Dynamic Programming, Beginner
      outputTests: [
        {
          code: `const result = climbStairs(2);`,
          expectedOutput: `2`
        },
        {
          code: `const result = climbStairs(3);`,
          expectedOutput: `3`
        },
        {
          code: `const result = climbStairs(4);`,
          expectedOutput: `5`
        },
        {
          code: `const result = climbStairs(5);`,
          expectedOutput: `8`
        }
      ],
      performanceTests: [
        {
          code: `const result = climbStairs(45);`,
          executionTime: "10ms"
        }
      ]
    },
    {
      slug: "lru-cache",
      title: "LRU Cache",
      description: `
# LRU Cache

## Problem Description
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
- \`int get(int key)\` Return the value of the key if the key exists, otherwise return -1.
- \`void put(int key, int value)\` Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions \`get\` and \`put\` must each run in O(1) average time complexity.

## Examples

**Example 1:**
\`\`\`
Input:
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output:
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation:
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
\`\`\`

## Constraints
- 1 <= capacity <= 3000
- 0 <= key <= 10^4
- 0 <= value <= 10^5
- At most 2 * 10^5 calls will be made to get and put.

## Approach
Consider using a combination of a hash map and a doubly linked list to achieve O(1) time complexity for both operations.
      `,
      initialCode: `// JavaScript/TypeScript
class LRUCache {
    constructor(capacity) {
        // Your code here
    }
    
    get(key) {
        // Your code here
    }
    
    put(key, value) {
        // Your code here
    }
}

// Python
# class LRUCache:
#     def __init__(self, capacity):
#         # Your code here
#         pass
#     
#     def get(self, key):
#         # Your code here
#         pass
#     
#     def put(self, key, value):
#         # Your code here
#         pass

// Java
// class LRUCache {
//     public LRUCache(int capacity) {
//         // Your code here
//     }
//     
//     public int get(int key) {
//         // Your code here
//     }
//     
//     public void put(int key, int value) {
//         // Your code here
//     }
// }

// C#
// public class LRUCache {
//     public LRUCache(int capacity) {
//         // Your code here
//     }
//     
//     public int Get(int key) {
//         // Your code here
//     }
//     
//     public void Put(int key, int value) {
//         // Your code here
//     }
// }
`,
      authorId,
      difficulty: "hard",
      duration: "00:45:00", // 45 minutes
      tags: [tagIds[3], tagIds[2], tagIds[10]], // Data Structures, Algorithms, Interview
      outputTests: [
        {
          code: `
const lRUCache = new LRUCache(2);
lRUCache.put(1, 1);
lRUCache.put(2, 2);
const res1 = lRUCache.get(1);
lRUCache.put(3, 3);
const res2 = lRUCache.get(2);
lRUCache.put(4, 4);
const res3 = lRUCache.get(1);
const res4 = lRUCache.get(3);
const res5 = lRUCache.get(4);
const result = [res1, res2, res3, res4, res5];`,
          expectedOutput: `[1,-1,-1,3,4]`
        },
        {
          code: `
const cache = new LRUCache(1);
cache.put(1, 1);
cache.put(2, 2);
const res = cache.get(1);`,
          expectedOutput: `-1`
        },
        {
          code: `
const cache = new LRUCache(3);
cache.put(1, 1);
cache.put(2, 2);
cache.put(3, 3);
cache.put(4, 4);
const res1 = cache.get(4);
const res2 = cache.get(3);
const res3 = cache.get(2);
const res4 = cache.get(1);
const result = [res1, res2, res3, res4];`,
          expectedOutput: `[4,3,2,-1]`
        }
      ],
      performanceTests: [
        {
          code: `
const cache = new LRUCache(100);
for (let i = 0; i < 1000; i++) {
    const val = Math.floor(Math.random() * 10000) - 5000;
    cache.put(i, val);
    if (i % 3 === 0) cache.get(i);
    if (i % 5 === 0 && i > 0) cache.pop();
    if (i % 7 === 0) cache.top();
}`,
          executionTime: "500ms"
        }
      ]
    },
    {
      slug: "word-search",
      title: "Word Search",
      description: `
# Word Search

## Problem Description
Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.

## Examples

**Example 1:**
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
\`\`\`

**Example 2:**
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
\`\`\`

**Example 3:**
\`\`\`
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
\`\`\`

## Constraints
- \`m == board.length\`
- \`n == board[i].length\`
- \`1 <= m, n <= 6\`
- \`1 <= word.length <= 15\`
- \`board\` and \`word\` consists of only lowercase and uppercase English letters.

## Approach
Consider using backtracking to explore all possible paths in the grid.
      `,
      initialCode: `// JavaScript/TypeScript
function exist(board, word) {
    // Your code here
}

// Python
# def exist(board, word):
#     # Your code here
#     pass

// Java
// public boolean exist(char[][] board, String word) {
//     // Your code here
// }

// C#
// public bool Exist(char[][] board, string word) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:40:00", // 40 minutes
      tags: [tagIds[0], tagIds[1], tagIds[5], tagIds[10]], // Arrays, Strings, Recursion, Interview
      outputTests: [
        {
          code: `const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const result = exist(board, "ABCCED");`,
          expectedOutput: `true`
        },
        {
          code: `const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const result = exist(board, "SEE");`,
          expectedOutput: `true`
        },
        {
          code: `const board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]];
const result = exist(board, "ABCB");`,
          expectedOutput: `false`
        },
        {
          code: `const board = [["A"]];
const result = exist(board, "A");`,
          expectedOutput: `true`
        }
      ],
      performanceTests: [
        {
          code: `const largeBoard = Array(6).fill(0).map(() => Array(6).fill(0).map(() => String.fromCharCode(65 + Math.floor(Math.random() * 26)))));
const result = exist(largeBoard, "ABCDEF");`,
          executionTime: "200ms"
        }
      ]
    },
    {
      slug: "number-of-islands",
      title: "Number of Islands",
      description: `
# Number of Islands

## Problem Description
Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

## Examples

**Example 1:**
\`\`\`
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
\`\`\`

**Example 2:**
\`\`\`
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
\`\`\`

## Constraints
- \`m == grid.length\`
- \`n == grid[i].length\`
- \`1 <= m, n <= 300\`
- \`grid[i][j]\` is '0' or '1'.

## Approach
Consider using depth-first search (DFS) or breadth-first search (BFS) to explore connected land cells.
      `,
      initialCode: `// JavaScript/TypeScript
function numIslands(grid) {
    // Your code here
}

// Python
# def num_islands(grid):
#     # Your code here
#     pass

// Java
// public int numIslands(char[][] grid) {
//     // Your code here
// }

// C#
// public int NumIslands(char[][] grid) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:35:00", // 35 minutes
      tags: [tagIds[0], tagIds[3], tagIds[5], tagIds[10]], // Arrays, Data Structures, Recursion, Interview
      outputTests: [
        {
          code: `const grid1 = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
];
const result1 = numIslands(grid1);`,
          expectedOutput: `1`
        },
        {
          code: `const grid2 = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
];
const result2 = numIslands(grid2);`,
          expectedOutput: `3`
        },
        {
          code: `const grid3 = [["1"]];
const result3 = numIslands(grid3);`,
          expectedOutput: `1`
        },
        {
          code: `const grid4 = [["0"]];
const result4 = numIslands(grid4);`,
          expectedOutput: `0`
        }
      ],
      performanceTests: [
        {
          code: `const largeGrid = Array(100).fill(0).map(() => Array(100).fill(0).map(() => Math.random() > 0.7 ? "1" : "0"));
const result = numIslands(largeGrid);`,
          executionTime: "300ms"
        }
      ]
    },
    {
      slug: "coin-change",
      title: "Coin Change",
      description: `
# Coin Change

## Problem Description
You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

## Examples

**Example 1:**
\`\`\`
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
\`\`\`

**Example 2:**
\`\`\`
Input: coins = [2], amount = 3
Output: -1
\`\`\`

**Example 3:**
\`\`\`
Input: coins = [1], amount = 0
Output: 0
\`\`\`

## Constraints
- \`1 <= coins.length <= 12\`
- \`1 <= coins[i] <= 2^31 - 1\`
- \`0 <= amount <= 10^4\`

## Approach
This is a classic dynamic programming problem. Consider building up solutions for smaller amounts.
      `,
      initialCode: `// JavaScript/TypeScript
function coinChange(coins, amount) {
    // Your code here
}

// Python
# def coin_change(coins, amount):
#     # Your code here
#     pass

// Java
// public int coinChange(int[] coins, int amount) {
//     // Your code here
// }

// C#
// public int CoinChange(int[] coins, int amount) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:35:00", // 35 minutes
      tags: [tagIds[0], tagIds[6], tagIds[10]], // Arrays, Dynamic Programming, Interview
      outputTests: [
        {
          code: `const result = coinChange([1,2,5], 11);`,
          expectedOutput: `3`
        },
        {
          code: `const result = coinChange([2], 3);`,
          expectedOutput: `-1`
        },
        {
          code: `const result = coinChange([1], 0);`,
          expectedOutput: `0`
        },
        {
          code: `const result = coinChange([1,3,4,5], 7);`,
          expectedOutput: `2`
        }
      ],
      performanceTests: [
        {
          code: `const result = coinChange([1,2,5,10,20,50,100,200], 9999);`,
          executionTime: "150ms"
        }
      ]
    },
    {
      slug: "rotate-image",
      title: "Rotate Image",
      description: `
# Rotate Image

## Problem Description
You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.

## Examples

**Example 1:**
\`\`\`
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]
\`\`\`

**Example 2:**
\`\`\`
Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
\`\`\`

## Constraints
- \`n == matrix.length == matrix[i].length\`
- \`1 <= n <= 20\`
- \`-1000 <= matrix[i][j] <= 1000\`

## Approach
Consider how to perform the rotation in-place. One approach is to transpose the matrix and then reverse each row.
      `,
      initialCode: `// JavaScript/TypeScript
function rotate(matrix) {
    // Your code here
}

// Python
# def rotate(matrix):
#     # Your code here
#     pass

// Java
// public void rotate(int[][] matrix) {
//     // Your code here
// }

// C#
// public void Rotate(int[][] matrix) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[0], tagIds[4], tagIds[10]], // Arrays, Math, Interview
      outputTests: [
        {
          code: `const matrix1 = [[1,2,3],[4,5,6],[7,8,9]];
rotate(matrix1);
const result1 = JSON.stringify(matrix1);`,
          expectedOutput: `[[7,4,1],[8,5,2],[9,6,3]]`
        },
        {
          code: `const matrix2 = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]];
rotate(matrix2);
const result2 = JSON.stringify(matrix2);`,
          expectedOutput: `[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]`
        },
        {
          code: `const matrix3 = [[1]];
rotate(matrix3);
const result3 = JSON.stringify(matrix3);`,
          expectedOutput: `[[1]]`
        }
      ],
      performanceTests: [
        {
          code: `const largeMatrix = Array(20).fill(0).map(() => Array(20).fill(0).map(() => Math.floor(Math.random() * 1000)));
rotate(largeMatrix);`,
          executionTime: "50ms"
        }
      ]
    },
    {
      slug: "implement-trie",
      title: "Implement Trie (Prefix Tree)",
      description: `
# Implement Trie (Prefix Tree)

## Problem Description
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

- \`Trie()\` Initializes the trie object.
- \`void insert(String word)\` Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.

## Examples

**Example 1:**
\`\`\`
Input:
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output:
[null, null, true, false, true, null, true]

Explanation:
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
\`\`\`

## Constraints
- \`1 <= word.length, prefix.length <= 2000\`
- \`word\` and \`prefix\` consist only of lowercase English letters.
- At most \`3 * 10^4\` calls in total will be made to \`insert\`, \`search\`, and \`startsWith\`.

## Approach
Consider how to efficiently store and search for strings in a tree-like structure.
      `,
      initialCode: `// JavaScript/TypeScript
class Trie {
    constructor() {
        // Your code here
    }
    
    insert(word) {
        // Your code here
    }
    
    search(word) {
        // Your code here
    }
    
    startsWith(prefix) {
        // Your code here
    }
}

// Python
# class Trie:
#     def __init__(self):
#         # Your code here
#         pass
#     
#     def insert(self, word):
#         # Your code here
#         pass
#     
#     def search(self, word):
#         # Your code here
#         pass
#     
#     def starts_with(self, prefix):
#         # Your code here
#         pass

// Java
// class Trie {
//     public Trie() {
//         // Your code here
//     }
//     
//     public void insert(String word) {
//         // Your code here
//     }
//     
//     public boolean search(String word) {
//         // Your code here
//     }
//     
//     public boolean startsWith(String prefix) {
//         // Your code here
//     }
// }

// C#
// public class Trie {
//     public Trie() {
//         // Your code here
//     }
//     
//     public void Insert(string word) {
//         // Your code here
//     }
//     
//     public bool Search(string word) {
//         // Your code here
//     }
//     
//     public bool StartsWith(string prefix) {
//         // Your code here
//     }
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:40:00", // 40 minutes
      tags: [tagIds[3], tagIds[1], tagIds[10]], // Data Structures, Strings, Interview
      outputTests: [
        {
          code: `const trie = new Trie();
trie.insert("apple");
const res1 = trie.search("apple");
const res2 = trie.search("app");
const res3 = trie.startsWith("app");
trie.insert("app");
const res4 = trie.search("app");
const result = [res1, res2, res3, res4];`,
          expectedOutput: `[true,false,true,true]`
        },
        {
          code: `const trie = new Trie();
trie.insert("hello");
const res1 = trie.search("hell");
const res2 = trie.search("helloa");
const res3 = trie.search("hello");
const res4 = trie.startsWith("hell");
const result = [res1, res2, res3, res4];`,
          expectedOutput: `[false,false,true,true]`
        }
      ],
      performanceTests: [
        {
          code: `const trie = new Trie();
const words = [];
for (let i = 0; i < 1000; i++) {
    const length = 5 + Math.floor(Math.random() * 10);
    let word = '';
    for (let j = 0; j < length; j++) {
        word += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    words.push(word);
    trie.insert(word);
}
let count = 0;
for (const word of words) {
    if (trie.search(word)) count++;
    if (trie.startsWith(word.substring(0, 3))) count++;
}`,
          executionTime: "300ms"
        }
      ]
    },
    {
      slug: "merge-intervals",
      title: "Merge Intervals",
      description: `
# Merge Intervals

## Problem Description
Given an array of \`intervals\` where \`intervals[i] = [starti, endi]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Examples

**Example 1:**
\`\`\`
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
\`\`\`

**Example 2:**
\`\`\`
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
\`\`\`

## Constraints
- \`1 <= intervals.length <= 10^4\`
- \`intervals[i].length == 2\`
- \`0 <= starti <= endi <= 10^4\`

## Approach
Consider sorting the intervals by their start times before merging them.
      `,
      initialCode: `// JavaScript/TypeScript
function merge(intervals) {
    // Your code here
}

// Python
# def merge(intervals):
#     # Your code here
#     pass

// Java
// public int[][] merge(int[][] intervals) {
//     // Your code here
// }

// C#
// public int[][] Merge(int[][] intervals) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[0], tagIds[7], tagIds[10]], // Arrays, Sorting, Interview
      outputTests: [
        {
          code: `const result = merge([[1,3],[2,6],[8,10],[15,18]]);`,
          expectedOutput: `[[1,6],[8,10],[15,18]]`
        },
        {
          code: `const result = merge([[1,4],[4,5]]);`,
          expectedOutput: `[[1,5]]`
        },
        {
          code: `const result = merge([[1,4],[0,4]]);`,
          expectedOutput: `[[0,4]]`
        },
        {
          code: `const result = merge([[1,4],[2,3]]);`,
          expectedOutput: `[[1,4]]`
        }
      ],
      performanceTests: [
        {
          code: `const largeIntervals = Array(1000).fill(0).map(() => {
    const start = Math.floor(Math.random() * 10000);
    return [start, start + Math.floor(Math.random() * 100) + 1];
});
const result = merge(largeIntervals);`,
          executionTime: "100ms"
        }
      ]
    },
    {
      slug: "min-stack",
      title: "Min Stack",
      description: `
# Min Stack

## Problem Description
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the \`MinStack\` class:

- \`MinStack()\` initializes the stack object.
- \`void push(int val)\` pushes the element \`val\` onto the stack.
- \`void pop()\` removes the element on the top of the stack.
- \`int top()\` gets the top element of the stack.
- \`int getMin()\` retrieves the minimum element in the stack.

You must implement a solution with \`O(1)\` time complexity for each function.

## Examples

**Example 1:**
\`\`\`
Input:
["MinStack","push","push","getMin","pop","top"]
[[],[-2],[0],[-3],[],[],[]]
Output:
[null,null,null,-3,null,0]

Explanation:
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
\`\`\`

## Constraints
- \`-2^31 <= val <= 2^31 - 1\`
- Methods \`pop\`, \`top\`, and \`getMin\` operations will always be called on non-empty stacks.
- At most \`3 * 10^4\` calls will be made to \`push\`, \`pop\`, \`top\`, and \`getMin\`.

## Approach
Consider how to keep track of the minimum value at each step without having to scan the entire stack.
      `,
      initialCode: `// JavaScript/TypeScript
class MinStack {
    constructor() {
        // Your code here
    }
    
    push(val) {
        // Your code here
    }
    
    pop() {
        // Your code here
    }
    
    top() {
        // Your code here
    }
    
    getMin() {
        // Your code here
    }
}

// Python
# class MinStack:
#     def __init__(self):
#         # Your code here
#         pass
#     
#     def push(self, val):
#         # Your code here
#         pass
#     
#     def pop(self):
#         # Your code here
#         pass
#     
#     def top(self):
#         # Your code here
#         pass
#     
#     def get_min(self):
#         # Your code here
#         pass

// Java
// class MinStack {
//     public MinStack() {
//         // Your code here
//     }
//     
//     public void push(int val) {
//         // Your code here
//     }
//     
//     public void pop() {
//         // Your code here
//     }
//     
//     public int top() {
//         // Your code here
//     }
//     
//     public int getMin() {
//         // Your code here
//     }
// }

// C#
// public class MinStack {
//     public MinStack() {
//         // Your code here
//     }
//     
//     public void Push(int val) {
//         // Your code here
//     }
//     
//     public void Pop() {
//         // Your code here
//     }
//     
//     public int Top() {
//         // Your code here
//     }
//     
//     public int GetMin() {
//         // Your code here
//     }
// }
`,
      authorId,
      difficulty: "easy",
      duration: "00:30:00", // 30 minutes
      tags: [tagIds[3], tagIds[10]], // Data Structures, Interview
      outputTests: [
        {
          code: `const minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
const min1 = minStack.getMin();
minStack.pop();
const top = minStack.top();
const min2 = minStack.getMin();
const result = [min1, top, min2];`,
          expectedOutput: `[-3,0,-2]`
        },
        {
          code: `const minStack = new MinStack();
minStack.push(5);
minStack.push(7);
minStack.push(5);
const top1 = minStack.top();
minStack.pop();
const min1 = minStack.getMin();
minStack.pop();
const min2 = minStack.getMin();
const result = [top1, min1, min2];`,
          expectedOutput: `[5,5,5]`
        }
      ],
      performanceTests: [
        {
          code: `const minStack = new MinStack();
for (let i = 0; i < 10000; i++) {
    const val = Math.floor(Math.random() * 10000) - 5000;
    minStack.push(val);
    if (i % 3 === 0) minStack.getMin();
    if (i % 5 === 0 && i > 0) minStack.pop();
    if (i % 7 === 0) minStack.top();
}`,
          executionTime: "200ms"
        }
      ]
    },
    {
      slug: "product-of-array-except-self",
      title: "Product of Array Except Self",
      description: `
# Product of Array Except Self

## Problem Description
Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.

You must write an algorithm running in \`O(n)\` time and without using the division operation.

## Examples

**Example 1:**
\`\`\`
Input: nums = [1,2,3,4]
Output: [24,12,8,6]
\`\`\`

**Example 2:**
\`\`\`
Input: nums = [-1,1,0,-3,3]
Output: [0,0,9,0,0]
\`\`\`

## Constraints
- \`2 <= nums.length <= 10^5\`
- \`-30 <= nums[i] <= 30\`
- The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.

## Follow up
Can you solve the problem in \`O(1)\` extra space complexity? (The output array does not count as extra space for space complexity analysis.)
      `,
      initialCode: `// JavaScript/TypeScript
function productExceptSelf(nums) {
    // Your code here
}

// Python
# def product_except_self(nums):
#     # Your code here
#     pass

// Java
// public int[] productExceptSelf(int[] nums) {
//     // Your code here
// }

// C#
// public int[] ProductExceptSelf(int[] nums) {
//     // Your code here
// }
`,
      authorId,
      difficulty: "medium",
      duration: "00:35:00", // 35 minutes
      tags: [tagIds[0], tagIds[4], tagIds[10]], // Arrays, Math, Interview
      outputTests: [
        {
          code: `const result = productExceptSelf([1,2,3,4]);`,
          expectedOutput: `[24,12,8,6]`
        },
        {
          code: `const result = productExceptSelf([-1,1,0,-3,3]);`,
          expectedOutput: `[0,0,9,0,0]`
        },
        {
          code: `const result = productExceptSelf([1,2]);`,
          expectedOutput: `[2,1]`
        }
      ],
      performanceTests: [
        {
          code: `const largeArray = Array(100000).fill(0).map(() => Math.floor(Math.random() * 10) + 1);
const result = productExceptSelf(largeArray);`,
          executionTime: "100ms"
        }
      ]
    }
  ];

  // Insert challenges
  for (const challenge of challenges) {
    const { tags: tagIds, outputTests, performanceTests, ...challengeData } = challenge;

    // Insert challenge and get its ID
    const [insertedChallenge] = await db.insert(Challenges).values({
      ...challengeData,
      difficulty: challengeData.difficulty as "easy" | "medium" | "hard",
    }).returning({ id: Challenges.id });

    if (!insertedChallenge) continue;

    const challengeId = insertedChallenge.id;

    // Insert challenge tags
    if (tagIds.length > 0) {
      for (const tagId of tagIds) {
        if (tagId) {
          await db.insert(ChallengeTags).values({
            challengeId,
            tagId
          }).onConflictDoNothing();
        }
      }
    }

    // Insert output tests
    if (outputTests.length > 0) {
      for (const test of outputTests) {
        await db.insert(OutputTests).values({
          challengeId,
          code: test.code,
          expectedOutput: test.expectedOutput
        });
      }
    }

    // Insert performance tests
    if (performanceTests.length > 0) {
      for (const test of performanceTests) {
        await db.insert(PerformanceTests).values({
          challengeId,
          code: test.code,
          executionTime: test.executionTime
        });
      }
    }
  }

  console.log("Challenges seeded successfully!");
} 