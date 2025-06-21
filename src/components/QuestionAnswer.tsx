import React from 'react';

type QuestionAnswerProps = {
  question: string;
  answer: string;
  index:number;
  code?: string; // optional
};

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({ question, answer,index, code }) => {
  return (
    <div className="mb-6 p-4 tracking-wide">
      <h2 className="text-xl font-bold text-emerald-500">{question}</h2>
      <p className="mt-2 text-gray-800">{answer}</p>

      {code && (
        <pre className="mt-4 p-3 rounded text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
};

export default QuestionAnswer;
