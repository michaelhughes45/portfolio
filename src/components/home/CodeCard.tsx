import type { CodeField, CodeValue } from "@/config/site";

interface CodeCardProps {
  fileName: string;
  variable: string;
  fields: CodeField[];
  projectCount: number;
}

function Str({ children }: { children: string }) {
  return <span className="text-code-string">&quot;{children}&quot;</span>;
}

function Value({ value, projectCount }: { value: CodeValue; projectCount: number }) {
  if (typeof value === "string") return <Str>{value}</Str>;
  if (typeof value === "boolean") return <span className="text-code-literal">{String(value)}</span>;
  if (Array.isArray(value)) {
    return (
      <>
        [
        {value.map((item, i) => (
          <span key={item}>
            {i > 0 && ", "}
            <Str>{item}</Str>
          </span>
        ))}
        ]
      </>
    );
  }
  return <span className="text-code-literal">{projectCount}</span>;
}

/** Dark editor card in the hero. Real text, so it can be selected and read by screen readers. */
export function CodeCard({ fileName, variable, fields, projectCount }: CodeCardProps) {
  return (
    <div className="min-w-0 overflow-hidden rounded-[16px] border border-code-border bg-code shadow-soft min-[900px]:rotate-[1.2deg]">
      <div className="flex items-center gap-[7px] border-b border-code-divider px-3.5 py-3">
        <span aria-hidden="true" className="size-[11px] rounded-full bg-dot-red" />
        <span aria-hidden="true" className="size-[11px] rounded-full bg-dot-yellow" />
        <span aria-hidden="true" className="size-[11px] rounded-full bg-dot-green" />
        <span className="ml-2.5 font-mono text-[12.5px] font-medium text-code-muted">{fileName}</span>
      </div>
      <pre
        tabIndex={0}
        role="region"
        aria-label={`${fileName}: a summary of my stack`}
        className="overflow-x-auto px-[22px] pt-5 pb-6 font-mono text-[13px] leading-[1.75] font-medium text-code-text outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:ring-inset sm:text-sm"
      >
        <span className="text-code-keyword">const</span> <span className="text-code-variable">{variable}</span>{" "}
        <span className="text-code-punctuation">=</span> {"{\n"}
        {fields.map(({ key, value, comment }) => (
          <span key={key}>
            {"  "}
            {key}: <Value value={value} projectCount={projectCount} />,
            {comment && <span className="text-code-comment italic"> {`// ${comment}`}</span>}
            {"\n"}
          </span>
        ))}
        {"};"}
      </pre>
    </div>
  );
}
