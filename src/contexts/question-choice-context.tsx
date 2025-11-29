import React, { createContext, useContext, useReducer, } from "react";

interface QuestionChoiceState {
  selected: number | undefined;
  submitted: boolean;
  showError: boolean;
}

interface QuestionChoiceAction {
  type: "SELECT" | "SUBMIT" | "RESET";
  index?: number;
}

const QuestionChoiceContext = createContext<{
  state: QuestionChoiceState,
  dispatch: React.Dispatch<QuestionChoiceAction>
} | undefined>(undefined);

const QuestionChoiceIndexContext = createContext<number | undefined>(undefined);

export function QuestionChoiceProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(questionChoiceReducer, {
    selected: undefined,
    submitted: false,
    showError: false
  });

  return (
    <QuestionChoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionChoiceContext.Provider>
  );
}

export function QuestionChoiceIndexProvider({ index, children }: { index: number, children: React.ReactNode }) {
  return (
    <QuestionChoiceIndexContext.Provider value={index}>
      {children}
    </QuestionChoiceIndexContext.Provider>
  );
}

export function useQuestionChoice() {
  const context = useContext(QuestionChoiceContext);
  if (!context) {
    throw new Error("useQuestionChoice must be used inside a QuestionChoiceProvider");
  }
  return context;
}

export function useQuestionChoiceIndex() {
  const index = useContext(QuestionChoiceIndexContext);
  if (index === undefined) {
    throw new Error("useQuestionChoiceIndex must be used inside a QuestionChoiceIndexProvider");
  }
  return index;
}

function questionChoiceReducer(state: QuestionChoiceState, action: QuestionChoiceAction): QuestionChoiceState {
  switch (action.type) {
    case "SELECT":
      return { ...state, selected: action.index, showError: false };
    case "SUBMIT":
      if (state.selected === undefined) {
        return { ...state, showError: true };
      }
      return { ...state, submitted: true, showError: false };
    case "RESET":
      return { selected: undefined, submitted: false, showError: false };
    default:
      return state;
  }
}
