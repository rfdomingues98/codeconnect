import { db } from "../client";
import {
  ChallengeLanguages,
  Challenges,
  ChallengeTags,
  OutputTests,
  PerformanceTests,
  ProgrammingLanguages,
  Tags,
  User
} from "../schema";

/**
 * Seed function for programming languages, tags, and challenges with language-specific implementations
 */
export async function seedWithLanguages() {
  console.log("Seeding programming languages, tags, and challenges...");

  // Create a default author if not exists
  const [author] = await db.insert(User).values({
    name: "Challenge Admin",
    email: "admin@codeconnect.dev",
  }).returning({ id: User.id }).onConflictDoNothing();

  const authorId = author?.id;

  // Create programming languages
  const languagesData = [
    {
      slug: "typescript",
      name: "TypeScript",
      version: "5.0.0",
      description: "TypeScript is a strongly typed programming language that builds on JavaScript.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg"
    },
    {
      slug: "python",
      name: "Python",
      version: "3.11.0",
      description: "Python is an interpreted, high-level, general-purpose programming language.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
    },
    {
      slug: "go",
      name: "Go",
      version: "1.20.0",
      description: "Go is a statically typed, compiled programming language designed at Google.",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg"
    }
  ];

  // Insert languages and get their IDs
  const languageIds: Record<string, string> = {};
  for (const langData of languagesData) {
    const [language] = await db.insert(ProgrammingLanguages).values(langData).returning({ id: ProgrammingLanguages.id, slug: ProgrammingLanguages.slug }).onConflictDoNothing();
    if (language) {
      languageIds[language.slug] = language.id;
    }
  }

  // Create tags (only 8 as requested)
  const tagsData = [
    { slug: "arrays", name: "Arrays", description: "Problems involving array manipulation" },
    { slug: "strings", name: "Strings", description: "String manipulation and pattern matching" },
    { slug: "algorithms", name: "Algorithms", description: "Classic algorithmic problems" },
    { slug: "data-structures", name: "Data Structures", description: "Problems focused on data structures" },
    { slug: "math", name: "Math", description: "Mathematical problems and calculations" },
    { slug: "recursion", name: "Recursion", description: "Problems best solved with recursive approaches" },
    { slug: "dynamic-programming", name: "Dynamic Programming", description: "Optimization problems using dynamic programming" },
    { slug: "interview", name: "Interview", description: "Common in coding interviews" }
  ];

  // Insert tags and get their IDs
  const tagIds: Record<string, string> = {};
  for (const tagData of tagsData) {
    const [tag] = await db.insert(Tags).values(tagData).returning({ id: Tags.id, slug: Tags.slug }).onConflictDoNothing();
    if (tag) {
      tagIds[tag.slug] = tag.id;
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
      authorId,
      difficulty: "easy" as const,
      duration: "00:30:00", // 30 minutes
      tags: ["arrays", "algorithms", "interview"],
      languageImplementations: {
        typescript: {
          initialCode: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
  return [];
}`,
          outputTests: [
            {
              code: `const result = twoSum([2,7,11,15], 9);`,
              expectedOutput: `[0,1]`
            },
            {
              code: `const result = twoSum([3,2,4], 6);`,
              expectedOutput: `[1,2]`
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
        python: {
          initialCode: `def two_sum(nums, target):
    # Your code here
    return []`,
          outputTests: [
            {
              code: `result = two_sum([2,7,11,15], 9)`,
              expectedOutput: `[0, 1]`
            },
            {
              code: `result = two_sum([3,2,4], 6)`,
              expectedOutput: `[1, 2]`
            }
          ],
          performanceTests: [
            {
              code: `arr = list(range(1000))
result = two_sum(arr, 1997)`,
              executionTime: "50ms"
            }
          ]
        },
        go: {
          initialCode: `package main

func twoSum(nums []int, target int) []int {
    // Your code here
    return []int{}
}`,
          outputTests: [
            {
              code: `result := twoSum([]int{2,7,11,15}, 9)`,
              expectedOutput: `[]int{0, 1}`
            },
            {
              code: `result := twoSum([]int{3,2,4}, 6)`,
              expectedOutput: `[]int{1, 2}`
            }
          ],
          performanceTests: [
            {
              code: `arr := make([]int, 1000)
for i := range arr {
    arr[i] = i
}
result := twoSum(arr, 1997)`,
              executionTime: "50ms"
            }
          ]
        }
      }
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
      authorId,
      difficulty: "easy" as const,
      duration: "00:20:00", // 20 minutes
      tags: ["strings", "algorithms"],
      languageImplementations: {
        typescript: {
          initialCode: `function isPalindrome(s: string): boolean {
  // Your code here
  return false;
}`,
          outputTests: [
            {
              code: `const result = isPalindrome("racecar");`,
              expectedOutput: `true`
            },
            {
              code: `const result = isPalindrome("A man, a plan, a canal: Panama");`,
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
        python: {
          initialCode: `def is_palindrome(s):
    # Your code here
    return False`,
          outputTests: [
            {
              code: `result = is_palindrome("racecar")`,
              expectedOutput: `True`
            },
            {
              code: `result = is_palindrome("A man, a plan, a canal: Panama")`,
              expectedOutput: `True`
            }
          ],
          performanceTests: [
            {
              code: `long_palindrome = "a" * 50000 + "b" + "a" * 50000
result = is_palindrome(long_palindrome)`,
              executionTime: "100ms"
            }
          ]
        },
        go: {
          initialCode: `package main

func isPalindrome(s string) bool {
    // Your code here
    return false
}`,
          outputTests: [
            {
              code: `result := isPalindrome("racecar")`,
              expectedOutput: `true`
            },
            {
              code: `result := isPalindrome("A man, a plan, a canal: Panama")`,
              expectedOutput: `true`
            }
          ],
          performanceTests: [
            {
              code: `longPalindrome := strings.Repeat("a", 50000) + "b" + strings.Repeat("a", 50000)
result := isPalindrome(longPalindrome)`,
              executionTime: "100ms"
            }
          ]
        }
      }
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
Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3
\`\`\`

## Constraints
- 0 <= n <= 30
- The answer is guaranteed to fit in a 32-bit integer.

## Follow-up
Can you implement a solution with O(n) time complexity? What about O(log n)?
      `,
      authorId,
      difficulty: "easy" as const,
      duration: "00:25:00", // 25 minutes
      tags: ["recursion", "dynamic-programming", "math"],
      languageImplementations: {
        typescript: {
          initialCode: `function fibonacci(n: number): number {
  // Your code here
  return 0;
}`,
          outputTests: [
            {
              code: `const result = fibonacci(2);`,
              expectedOutput: `1`
            },
            {
              code: `const result = fibonacci(5);`,
              expectedOutput: `5`
            }
          ],
          performanceTests: [
            {
              code: `const result = fibonacci(30);`,
              executionTime: "50ms"
            }
          ]
        },
        python: {
          initialCode: `def fibonacci(n):
    # Your code here
    return 0`,
          outputTests: [
            {
              code: `result = fibonacci(2)`,
              expectedOutput: `1`
            },
            {
              code: `result = fibonacci(5)`,
              expectedOutput: `5`
            }
          ],
          performanceTests: [
            {
              code: `result = fibonacci(30)`,
              executionTime: "50ms"
            }
          ]
        },
        go: {
          initialCode: `package main

func fibonacci(n int) int {
    // Your code here
    return 0
}`,
          outputTests: [
            {
              code: `result := fibonacci(2)`,
              expectedOutput: `1`
            },
            {
              code: `result := fibonacci(5)`,
              expectedOutput: `5`
            }
          ],
          performanceTests: [
            {
              code: `result := fibonacci(30)`,
              executionTime: "50ms"
            }
          ]
        }
      }
    },
    {
      slug: "reverse-linked-list",
      title: "Reverse Linked List",
      description: `
# Reverse Linked List

## Problem Description
Given the head of a singly linked list, reverse the list, and return the reversed list.

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
- The number of nodes in the list is the range [0, 5000].
- -5000 <= Node.val <= 5000

## Follow-up
A linked list can also be reversed iteratively or recursively. Could you implement both?
      `,
      authorId,
      difficulty: "medium" as const,
      duration: "00:35:00", // 35 minutes
      tags: ["data-structures", "algorithms", "interview"],
      languageImplementations: {
        typescript: {
          initialCode: `// Definition for singly-linked list.
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // Your code here
  return null;
}`,
          outputTests: [
            {
              code: `function createList(arr) {
  if (arr.length === 0) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

function listToArray(head) {
  const result = [];
  let current = head;
  while (current) {
    result.push(current.val);
    current = current.next;
  }
  return result;
}

const list = createList([1, 2, 3, 4, 5]);
const reversed = reverseList(list);
const result = listToArray(reversed);`,
              expectedOutput: `[5, 4, 3, 2, 1]`
            }
          ],
          performanceTests: [
            {
              code: `function createLongList(n) {
  if (n === 0) return null;
  let head = new ListNode(1);
  let current = head;
  for (let i = 2; i <= n; i++) {
    current.next = new ListNode(i);
    current = current.next;
  }
  return head;
}

const longList = createLongList(1000);
const reversed = reverseList(longList);`,
              executionTime: "50ms"
            }
          ]
        },
        python: {
          initialCode: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    # Your code here
    return None`,
          outputTests: [
            {
              code: `def create_list(arr):
    if not arr:
        return None
    head = ListNode(arr[0])
    current = head
    for i in range(1, len(arr)):
        current.next = ListNode(arr[i])
        current = current.next
    return head

def list_to_array(head):
    result = []
    current = head
    while current:
        result.append(current.val)
        current = current.next
    return result

list_head = create_list([1, 2, 3, 4, 5])
reversed_head = reverse_list(list_head)
result = list_to_array(reversed_head)`,
              expectedOutput: `[5, 4, 3, 2, 1]`
            }
          ],
          performanceTests: [
            {
              code: `def create_long_list(n):
    if n == 0:
        return None
    head = ListNode(1)
    current = head
    for i in range(2, n+1):
        current.next = ListNode(i)
        current = current.next
    return head

long_list = create_long_list(1000)
reversed_head = reverse_list(long_list)`,
              executionTime: "50ms"
            }
          ]
        },
        go: {
          initialCode: `package main

// Definition for singly-linked list.
type ListNode struct {
    Val int
    Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
    // Your code here
    return nil
}`,
          outputTests: [
            {
              code: `func createList(arr []int) *ListNode {
    if len(arr) == 0 {
        return nil
    }
    head := &ListNode{Val: arr[0]}
    current := head
    for i := 1; i < len(arr); i++ {
        current.Next = &ListNode{Val: arr[i]}
        current = current.Next
    }
    return head
}

func listToArray(head *ListNode) []int {
    result := []int{}
    current := head
    for current != nil {
        result = append(result, current.Val)
        current = current.Next
    }
    return result
}

list := createList([]int{1, 2, 3, 4, 5})
reversed := reverseList(list)
result := listToArray(reversed)`,
              expectedOutput: `[]int{5, 4, 3, 2, 1}`
            }
          ],
          performanceTests: [
            {
              code: `func createLongList(n int) *ListNode {
    if n == 0 {
        return nil
    }
    head := &ListNode{Val: 1}
    current := head
    for i := 2; i <= n; i++ {
        current.Next = &ListNode{Val: i}
        current = current.Next
    }
    return head
}

longList := createLongList(1000)
reversed := reverseList(longList)`,
              executionTime: "50ms"
            }
          ]
        }
      }
    },
    {
      slug: "binary-search",
      title: "Binary Search",
      description: `
# Binary Search

## Problem Description
Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.

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
- 1 <= nums.length <= 10^4
- -10^4 < nums[i], target < 10^4
- All the integers in nums are unique.
- nums is sorted in ascending order.
      `,
      authorId,
      difficulty: "easy" as const,
      duration: "00:25:00", // 25 minutes
      tags: ["algorithms", "arrays", "interview"],
      languageImplementations: {
        typescript: {
          initialCode: `function search(nums: number[], target: number): number {
  // Your code here
  return -1;
}`,
          outputTests: [
            {
              code: `const result = search([-1,0,3,5,9,12], 9);`,
              expectedOutput: `4`
            },
            {
              code: `const result = search([-1,0,3,5,9,12], 2);`,
              expectedOutput: `-1`
            }
          ],
          performanceTests: [
            {
              code: `const arr = Array.from({length: 10000}, (_, i) => i);
const result = search(arr, 9999);`,
              executionTime: "10ms"
            }
          ]
        },
        python: {
          initialCode: `def search(nums, target):
    # Your code here
    return -1`,
          outputTests: [
            {
              code: `result = search([-1,0,3,5,9,12], 9)`,
              expectedOutput: `4`
            },
            {
              code: `result = search([-1,0,3,5,9,12], 2)`,
              expectedOutput: `-1`
            }
          ],
          performanceTests: [
            {
              code: `arr = list(range(10000))
result = search(arr, 9999)`,
              executionTime: "10ms"
            }
          ]
        },
        go: {
          initialCode: `package main

func search(nums []int, target int) int {
    // Your code here
    return -1
}`,
          outputTests: [
            {
              code: `result := search([]int{-1,0,3,5,9,12}, 9)`,
              expectedOutput: `4`
            },
            {
              code: `result := search([]int{-1,0,3,5,9,12}, 2)`,
              expectedOutput: `-1`
            }
          ],
          performanceTests: [
            {
              code: `arr := make([]int, 10000)
for i := range arr {
    arr[i] = i
}
result := search(arr, 9999)`,
              executionTime: "10ms"
            }
          ]
        }
      }
    }
  ];

  // Insert challenges and their language-specific implementations
  for (const challenge of challenges) {
    // Extract tags and language implementations
    const { tags: tagSlugs, languageImplementations, ...challengeData } = challenge;

    // Insert the challenge
    const [insertedChallenge] = await db.insert(Challenges).values(challengeData).returning({ id: Challenges.id }).onConflictDoNothing();

    if (insertedChallenge) {
      const challengeId = insertedChallenge.id;

      // Add tags to the challenge
      for (const tagSlug of tagSlugs) {
        if (tagIds[tagSlug]) {
          await db.insert(ChallengeTags).values({
            challengeId,
            tagId: tagIds[tagSlug]
          }).onConflictDoNothing();
        }
      }

      // Add language-specific implementations
      for (const [langSlug, implementation] of Object.entries(languageImplementations)) {
        const languageId = languageIds[langSlug];
        if (!languageId) continue;

        // Add initial code for this language
        await db.insert(ChallengeLanguages).values({
          challengeId,
          languageId,
          initialCode: implementation.initialCode
        }).onConflictDoNothing();

        // Add output tests for this language
        for (const test of implementation.outputTests) {
          await db.insert(OutputTests).values({
            challengeId,
            languageId,
            code: test.code,
            expectedOutput: test.expectedOutput
          }).onConflictDoNothing();
        }

        // Add performance tests for this language
        for (const test of implementation.performanceTests) {
          await db.insert(PerformanceTests).values({
            challengeId,
            languageId,
            code: test.code,
            executionTime: test.executionTime
          }).onConflictDoNothing();
        }
      }
    }
  }

  console.log("Seeding completed successfully!");
}