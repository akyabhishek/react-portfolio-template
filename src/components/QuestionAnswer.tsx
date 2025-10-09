import React from "react";

export type QuestionAnswerProps = {
  question: string;
  answer: string;
  index?: number;
  code?: string; // optional
  htmlAnswer?: boolean; // Flag to indicate if answer contains HTML
};

const QuestionAnswer: React.FC<QuestionAnswerProps> = ({
  question,
  answer,
  index = 0,
  code,
  htmlAnswer = false,
}) => {
  return (
    <>
      <div className="mb-4 p-4 tracking-wide">
        <h2 className="text-xl text-emerald-500">
          Q{index + 1}. {question}
        </h2>
        {htmlAnswer ? (
          <div
            className="mt-2 text-gray-800 dark:text-gray-400"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ) : (
          <p className="mt-2 text-gray-800 dark:text-gray-400">{answer}</p>
        )}

        {code && (
          <pre className="mt-4 p-3 rounded text-sm overflow-x-auto bg-gray-100 dark:bg-gray-800">
            <code>{code}</code>
          </pre>
        )}
      </div>
      <hr />
    </>
  );
};

export default QuestionAnswer;
