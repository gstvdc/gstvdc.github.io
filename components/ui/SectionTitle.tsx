import Split from "./Split";

export default function SectionTitle({
  eyebrow,
  title,
  text,
  eyebrowClass = "section-eyebrow-mono",
}: {
  eyebrow: string;
  title: string;
  text: string;
  eyebrowClass?: string;
}) {
  return (
    <div className="container section-title" data-reveal>
      <span className={eyebrowClass}>{eyebrow}</span>
      <Split text={title} />
      <p>{text}</p>
    </div>
  );
}
