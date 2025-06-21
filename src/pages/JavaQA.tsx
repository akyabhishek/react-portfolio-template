import React from 'react';
import QuestionAnswer from '../components/QuestionAnswer';

function JavaQA() {
  const qaList = [
    {
      question: '1. What is Java?',
      answer:
        'Java is a high-level, object-oriented programming language used to build platform-independent applications.',
    },
    {
      question: '2. Difference between == and .equals() in Java?',
      answer:
        '`==` compares reference (memory address), while `.equals()` compares the actual content if overridden properly.',
      code: `String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false
System.out.println(a.equals(b));  // true`,
    },
    {
      question: '3. What is JVM?',
      answer:
        'JVM (Java Virtual Machine) is an engine that provides a runtime environment to execute Java bytecode.',
    },
    {
      question: '4. Leetcode 2894 Optimal Java Solution?',
      answer:
        'Use arithmetic progression to avoid looping. This reduces time complexity to O(1).',
      code: `public class Solution {
    public int differenceOfSums(int n, int m) {
        int totalSum = n * (n + 1) / 2;
        int count = n / m;
        int divSum = m * count * (count + 1) / 2;
        return totalSum - 2 * divSum;
    }
}`,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Java Interview Question and Answers
      </h1>
      {qaList.map((qa, index) => (
        <QuestionAnswer key={index} {...qa} index={index} />
      ))}
    </div>
  );
}

export default JavaQA;
