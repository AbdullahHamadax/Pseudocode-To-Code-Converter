import Prism from "prismjs";
import "prismjs/components/prism-python";

// 1. Define our custom "Pseudocode" grammar
Prism.languages.pseudocode = {
  comment: { pattern: /#.*/, lookbehind: true },
  string: { pattern: /".*?"/, greedy: true },
  keyword:
    /\b(create a function|called|with parameter|set|to list of|for each|in|if|is greater than|then|print|otherwise|return)\b/,
  boolean: /\b(true|false)\b/,
  number: /\b\d+\b/,
  operator: /[=+\-*/]/,
  // Fixed line below: removed the unnecessary '\' before '['
  punctuation: /[.,:;(){}[\]]/,
};

export const highlightCode = (
  code: string,
  language: "pseudocode" | "python"
) => {
  const grammar =
    language === "pseudocode"
      ? Prism.languages.pseudocode
      : Prism.languages.python;
  return Prism.highlight(code, grammar, language);
};
