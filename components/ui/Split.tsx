import type { ElementType } from "react";

/** Renders text as masked words so CSS can slide them up when `.rv-in` is set. */
export default function Split({
  as: Tag = "h2",
  text,
  className = "",
}: {
  as?: ElementType;
  text: string;
  className?: string;
}) {
  const words = text.trim().split(/\s+/);
  return (
    <Tag className={`rv ${className}`.trim()} aria-label={text}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="rv-mask" aria-hidden="true">
            <span className="rv-word" style={{ transitionDelay: `${i * 55}ms` }}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
