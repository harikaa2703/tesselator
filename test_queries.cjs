// Test queries against the actual data in leetcodeTrainingData, kmitDAAData, and dsaSolver logic
const fs = require('fs');

const trainingDataText = fs.readFileSync('./src/data/leetcodeTrainingData.ts', 'utf-8');
const kmitDataText = fs.readFileSync('./src/data/kmitDAAData.ts', 'utf-8');

// Parse LEETCODE_TRAINED_DATA
const problems = [];
const blocks = trainingDataText.split(/\{\s*id:\s*'/);
for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = block.match(/^([^']+)'/);
  const nameMatch = block.match(/name:\s*'([^']+)'/);
  const aliasesMatch = block.match(/aliases:\s*\[([\s\S]*?)\]/);
  const javaCollegeMatch = block.match(/javaCollege:\s*`([\s\S]*?)`/);
  
  if (idMatch && nameMatch && aliasesMatch) {
    const id = idMatch[1];
    const name = nameMatch[1];
    const aliases = aliasesMatch[1].split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '').toLowerCase()).filter(Boolean);
    problems.push({ id, name, aliases, code: javaCollegeMatch ? javaCollegeMatch[1].trim() : '' });
  }
}

// College assignments match function
function matchCollege(q) {
  if (q.includes('consecutive present') || (q.includes('attendance') && (q.includes('recursion') || q.includes('student') || q.includes('present') || q.includes('2026') || q.includes('program')))) {
    return { id: 'kmit-att-01', name: '05_10_2026 Attendance program (Recursive Consecutive Present)' };
  }
  if (q.includes('ap47') || (q.includes('generalized') && q.includes('abbreviation')) || (q.includes('encrypt') && q.includes('word'))) {
    return { id: 'kmit-ap47-encrypt', name: 'U3_DAA_Backtracking_AP47_Encrypt' };
  }
  if (q.includes('ap46') || q.includes('gray code') || (q.includes('bit') && q.includes('difference'))) {
    return { id: 'kmit-ap46-difference', name: 'U3_DAA_Backtracking_AP46_Difference' };
  }
  if (q.includes('ap50') || q.includes('brace expansion') || (q.includes('curly') && q.includes('braces')) || (q.includes('exam') && q.includes('question'))) {
    return { id: 'kmit-ap50-exam-selection', name: 'U3_DAA_Backtracking_AP50_Exam Question Selection' };
  }
  if (q.includes('n-queen') || q.includes('n queen') || (q.includes('chessboard') && q.includes('queen'))) {
    return { id: 'kmit-nqueens', name: 'U3_DAA_N_Queens_Problem' };
  }
  if (q.includes('max area of island') || (q.includes('max') && q.includes('island'))) {
    return { id: 'kmit-max-area-island', name: 'U3_DAA_BFS_Max_Area_Of_Island' };
  }
  if (q.includes('climbing stairs') || q.includes('climb stairs') || q.includes('staircase') || (q.includes('steps') && q.includes('climb'))) {
    return { id: 'kmit-climbing-stairs', name: 'U1_DAA_Recursion_Climbing_Stairs' };
  }
  return null;
}

const testQueries = [
  'Given attendance records of N students, verify present status and compute total consecutive present students using recursion. Constraints: 1 <= N <= 1000 Attendance string consists of P, A, L',
  'There is only one repeated number in nums, return this repeated number. You must solve the problem without modifying the array nums and using only constant extra space. Example 1: Input: nums = [1,3,4,2,2] Output: 2',
  'two sum: Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
  'longest common prefix: Write a function to find the longest common prefix string amongst an array of strings.',
  'Given a string s containing just the characters brackets, determine if valid',
  'find maximum subarray sum with contiguous elements',
  'find combinations of numbers from 1 to n that sum to m',
  'Write a function to generate the generalized abbreviations (encrypted forms) of a given word using recursive backtracking.',
  'An n-bit gray code sequence is a sequence of 2^n integers where adjacent numbers differ by exactly one bit in binary representation.',
  'Arrange N queens on an N x N chessboard such that no two queens attack each other',
  'You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps.',
  'Return the maximum area of an island in grid. If no island, return 0.',
  'Fewest number of coins that you need to make up that amount',
  'Check if the given number is prime',
  'Reverse the given string'
];

console.log(`Parsed ${problems.length} trained problems.`);

testQueries.forEach((q, idx) => {
  const qLower = q.toLowerCase();
  
  // 1. College Match First
  const coll = matchCollege(qLower);
  if (coll) {
    console.log(`Query #${idx + 1}: ${q.substring(0, 45)}...`);
    console.log(`  -> [COLLEGE MATCH]: [${coll.id}] ${coll.name}`);
    return;
  }

  // 2. Trained LeetCode
  let matched = null;
  let maxLen = 0;
  for (const p of problems) {
    for (const a of p.aliases) {
      if (qLower.includes(a) && a.length > maxLen) {
        maxLen = a.length;
        matched = p;
      }
    }
  }

  console.log(`Query #${idx + 1}: ${q.substring(0, 45)}...`);
  if (matched) {
    console.log(`  -> [TRAINED MATCH]: [${matched.id}] ${matched.name} (alias len ${maxLen})`);
  } else {
    // 3. Synthesizer Check
    if (qLower.includes('prime')) {
      console.log(`  -> [SYNTHESIZER MATCH]: Prime Number Verification`);
    } else if (qLower.includes('reverse string') || qLower.includes('reverse the')) {
      console.log(`  -> [SYNTHESIZER MATCH]: Reverse String`);
    } else {
      console.log(`  -> NO MATCH!`);
    }
  }
});
