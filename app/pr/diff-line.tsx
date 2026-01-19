import { codeToHtml } from "shiki";
import { DiffLine as DiffLineData } from "./data";
import { Icons } from "../icons";

function getLang(path: string): string {
  const ext = path.split(".").pop();
  const map: Record<string, string> = {
    ts: "typescript",
    tsx: "tsx",
    js: "javascript",
    jsx: "jsx",
    md: "markdown",
    json: "json",
    css: "css",
    html: "html",
  };
  return map[ext || ""] || "text";
}

interface Props {
  line: DiffLineData;
  path: string;
}

export async function DiffLine({ line, path }: Props) {
  const lang = getLang(path);

  // Highlight just the content (without +/- prefix)
  const html = await codeToHtml(line.content || " ", {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: "light",
  });

  // Strip the <pre><code> wrapper, keep just the inner span
  const inner = html
    .replace(/<pre[^>]*><code[^>]*>/, "")
    .replace(/<\/code><\/pre>/, "");

  return (
    <div
      className="flex group"
      style={{
        backgroundColor:
          line.type === "addition"
            ? "var(--diffBlob-addition-bgColor-line, #dafbe1)"
            : line.type === "deletion"
            ? "var(--diffBlob-deletion-bgColor-line, #ffebe9)"
            : "transparent",
      }}
    >
      {/* Old line number */}
      <div
        className="w-12 px-2 py-0.5 text-right select-none"
        style={{
          backgroundColor:
            line.type === "addition"
              ? "var(--diffBlob-addition-bgColor-num, #aceebb)"
              : line.type === "deletion"
              ? "var(--diffBlob-deletion-bgColor-num, #ffcecb)"
              : "var(--bgColor-muted, #f6f8fa)",
          color: "var(--fgColor-muted, #656d76)",
        }}
      >
        {line.old || ""}
      </div>

      {/* New line number with orange border for AI */}
      <div
        className="w-12 px-2 py-0.5 text-right select-none cursor-help"
        style={{
          backgroundColor:
            line.type === "addition"
              ? "var(--diffBlob-addition-bgColor-num, #aceebb)"
              : line.type === "deletion"
              ? "var(--diffBlob-deletion-bgColor-num, #ffcecb)"
              : "var(--bgColor-muted, #f6f8fa)",
          color: "var(--fgColor-muted, #656d76)",
          boxShadow: line.ai ? "inset 4px 0 0 0 #A93000" : "none",
        }}
        title={
          line.ai ? `AI Generated (${line.provider} - ${line.model})` : undefined
        }
      >
        {line.new || ""}
      </div>

      {/* Code content - highlighted */}
      <div className="flex-1 px-2 py-0.5 font-mono text-xs whitespace-pre">
        <span>
          {line.type === "addition" && "+ "}
          {line.type === "deletion" && "- "}
        </span>
        <span className="shiki" dangerouslySetInnerHTML={{ __html: inner }} />
      </div>

      {/* Comment button on hover */}
      <div className="w-8 flex items-center justify-center opacity-0 group-hover:opacity-100">
        <button
          className="p-0.5 rounded"
          style={{
            backgroundColor: "#238636",
            color: "#ffffff",
          }}
        >
          {Icons.plus}
        </button>
      </div>
    </div>
  );
}
