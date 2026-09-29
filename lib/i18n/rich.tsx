import { Fragment, type ReactNode } from "react";

/** Turns "a <strong>b</strong> <em>c</em>" from the dictionaries into React nodes. */
export function rich(text: string): ReactNode {
  return text.split(/(<strong>.*?<\/strong>|<em>.*?<\/em>)/g).map((part, i) => {
    const strong = part.match(/^<strong>(.*)<\/strong>$/);
    if (strong) return <strong key={i}>{strong[1]}</strong>;
    const em = part.match(/^<em>(.*)<\/em>$/);
    if (em) return <em key={i}>{em[1]}</em>;
    return <Fragment key={i}>{part}</Fragment>;
  });
}
