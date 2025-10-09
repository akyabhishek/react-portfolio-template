import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";

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
    <Card className="mb-6 transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold leading-relaxed text-foreground">
          <div className="flex items-start gap-3">
            <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 font-semibold text-sm border border-emerald-200 dark:border-emerald-800">
              Q{index + 1}
            </span>
            <span className="flex-1">{question}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {htmlAnswer ? (
            <div
              className="text-muted-foreground leading-relaxed prose prose-sm dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">{answer}</p>
          )}

          {code && (
            <div className="mt-4">
              <CodeBlock language="java" filename="Example.java" code={code} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionAnswer;
