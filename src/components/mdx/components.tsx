import React from "react";

import { Link } from "./link";
import { Image } from "./image";
import { LinkedHeading } from "./linked-heading";
import { Question, QuestionChoice, QuestionChoiceExplanation, QuestionChoices, QuestionDescription } from "./question";
import { MiniCollapsible, MiniCollapsibleContent, MiniCollapsibleTrigger } from "./mini-collapsible";

export const components = {
  h1: (props: React.ComponentProps<"h1">) => <h1 className="text-4xl font-bold text-foreground font-serif" {...props} />,
  h2: (props: React.ComponentProps<"h2">) => <LinkedHeading level="h2" className="text-2xl font-bold text-foreground font-serif" {...props} />,
  h3: (props: React.ComponentProps<"h3">) => <LinkedHeading level="h3" className="text-xl font-bold text-foreground font-serif" {...props} />,
  h4: (props: React.ComponentProps<"h4">) => <LinkedHeading level="h4" className="text-base font-bold text-foreground font-serif" {...props} />,
  p: (props: React.ComponentProps<"p">) => <p className="text-base text-muted-foreground leading-relaxed" {...props} />,

  strong: (props: React.ComponentProps<"strong">) => <strong className="text-foreground/70 font-bold" {...props} />,

  ol: (props: React.ComponentProps<"ol">) => <ol className="mt-0" {...props} />,
  ul: (props: React.ComponentProps<"ul">) => <ul className="mt-0" {...props} />,
  li: (props: React.ComponentProps<"li">) => <li className="text-muted-foreground" {...props} />,

  code: (props: React.ComponentProps<"code">) => {
    const isInline = typeof props.children === 'string' && !props.className;
    return isInline ? (
      <code className="text-muted-foreground bg-code-background p-1 rounded-md before:content-none after:content-none" {...props} />
    ) : <code {...props} />;
  },

  Image,
  Link,

  Question,
  QuestionDescription,
  QuestionChoices,
  QuestionChoice,
  QuestionChoiceExplanation,

  MiniCollapsible,
  MiniCollapsibleTrigger,
  MiniCollapsibleContent
};

