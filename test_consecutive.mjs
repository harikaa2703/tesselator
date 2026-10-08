import { dsaSolver } from './src/services/dsaSolver.js';

async function testConsecutive() {
  console.log('--- TEST 1: Question 1 ---');
  const q1 = "Write a program to reverse a linked list";
  const res1 = await dsaSolver.solveProblem(q1, 'college');
  console.log('Result 1 Title:', res1.title);
  console.log('Result 1 Code snippet:', res1.javaCode.slice(0, 80));

  console.log('\n--- TEST 2: Question 2 pasted next ---');
  const q2 = "Given an array of numbers find maximum circular subarray sum";
  const res2 = await dsaSolver.solveProblem(q2, 'college');
  console.log('Result 2 Title:', res2.title);
  console.log('Result 2 Code snippet:', res2.javaCode.slice(0, 80));

  console.log('\n--- TEST 3: Question 3 with Sample Input/Output ---');
  const q3 = "Find the sum of all elements in array.\nSample Input:\n4\n10 20 30 40\nSample Output:\n100";
  const res3 = await dsaSolver.solveProblem(q3, 'college');
  console.log('Result 3 Title:', res3.title);
  console.log('Result 3 Code snippet:', res3.javaCode.slice(0, 80));
}

testConsecutive();
