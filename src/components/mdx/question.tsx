import React, { isValidElement } from "react";
import { Check, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuestionChoice, QuestionChoiceIndexProvider, useQuestionChoiceIndex, QuestionChoiceProvider } from "@/contexts/question-choice-context";

import { cn } from "@/lib/utils";

export function Question({ children }: { children: React.ReactNode }) {
  return (
    <QuestionChoiceProvider>
      <div className="w-full flex flex-col items-center rounded-lg border mt-8 mx-auto px-4 pt-0 pb-4 md:px-8 md:pb-8">
        {children}
      </div>
    </QuestionChoiceProvider>
  );
}

export function QuestionDescription({ children }: { children: React.ReactNode }) {
  return <span className="[&_p]:text-center">{children}</span>;
}

export function QuestionChoices({ children }: { children: React.ReactNode }) {
  const validChildren = React.Children.toArray(children)
    .filter(React.isValidElement) as React.ReactElement<{ children: React.ReactNode, correct?: boolean }>[];

  const { state, dispatch } = useQuestionChoice();

  const selectedChild = typeof state.selected === "number" ? validChildren[state.selected] : undefined;
  const correct = selectedChild?.props.correct === true;

  const answerContent = React.Children.toArray(selectedChild?.props.children).filter(
    (child) =>
      !(React.isValidElement(child) && child.type === QuestionChoiceExplanation)
  );

  const explanation = React.Children.toArray(selectedChild?.props.children || []).find((child) =>
      React.isValidElement(child) && child.type === QuestionChoiceExplanation
  );

  return (
    <div className="w-full">
      {!state.submitted ? (
        <>
          <div className="space-y-2">
            {validChildren.map((child, i) => (
              <QuestionChoiceIndexProvider key={i} index={i}>
                {child}
              </QuestionChoiceIndexProvider>
            ))}
          </div>
          <div className="mt-4 flex w-full justify-end md:mt-6">
            <Button className="duration-300" onClick={() => dispatch({ type: "SUBMIT" })}>Submit</Button>
          </div>
        </>
      ) : (
        <>
          <div className="w-full border rounded p-4 bg-background md:p-8 space-y-4">
            <span className="[&_p]:text-center [&_p]:text-foreground [&_code]:text-foreground flex gap-2 justify-center items-center [&_figure]:min-w-0 [&_pre]:max-w-full [&_pre]:overflow-x-auto">
              {answerContent}
            </span>
            {correct ? (
              <div className="flex flex-row gap-2 text-sm justify-center items-center text-accent">
                <Check className="w-5 h-5" />
                Correct
              </div>
            ) : (
                <div className="flex flex-row gap-2 text-sm justify-center items-center text-destructive">
                  <X className="w-5 h-5" />
                  Incorrect
                </div>
              )}
            {explanation && (
              <div className="[&_p]:text-center [&_p]:text-sm">
                {explanation}
              </div>
            )}
          </div>
          {!correct && (
            <div className="w-full mt-4 flex justify-center items-center">
              <Button variant="outline" className="!bg-background !border-border duration-300" onClick={() => dispatch({ type: "RESET" })}>Try again</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function QuestionChoice({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useQuestionChoice();

  const index = useQuestionChoiceIndex();
  const isSelected = state.selected === index;

  return (
    <button 
      className={cn(
        "w-full text-left px-4 border rounded-lg bg-background transition-colors cursor-pointer [&:has(pre)]:p-0",
        isSelected ? "border-foreground [&_p]:text-foreground [&_code]:text-foreground" : ""
      )}
      onClick={() => dispatch({ type: "SELECT", index })}
    >
      <span className="w-full text-left">
        {React.Children.map(children, (child) => {
          if (isValidElement(child) && child.type === QuestionChoiceExplanation) {
            return null;
          } else {
            return child;
          }
        })}
      </span>
    </button>
  );
}

export function QuestionChoiceExplanation({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
