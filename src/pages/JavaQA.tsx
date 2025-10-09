import React from "react";
import QuestionAnswer from "../components/QuestionAnswer";
import { qaList } from "@/config/qaData";

function JavaQA() {
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
