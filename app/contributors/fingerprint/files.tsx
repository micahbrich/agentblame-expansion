import type { Fingerprint } from "../data";

interface FilesProps {
  files: Fingerprint["files"];
}

export function Files({ files }: FilesProps) {
  const grouped = {
    Tests: files.filter((f) => f.type === "Tests"),
    Utils: files.filter((f) => f.type === "Utils"),
    Core: files.filter((f) => f.type === "Core"),
  };

  return (
    <div className="grid grid-cols-3 gap-4">
      {(["Tests", "Utils", "Core"] as const).map((type) => (
        <div key={type}>
          <h4
            className="text-xs font-medium mb-2"
            style={{ color: "var(--fgColor-muted)" }}
          >
            {type}
          </h4>
          <div className="space-y-1.5">
            {grouped[type].length === 0 ? (
              <div
                className="text-xs py-2"
                style={{ color: "var(--fgColor-muted)" }}
              >
                No files
              </div>
            ) : (
              grouped[type].map((file) => (
                <div
                  key={file.path}
                  className="flex items-center justify-between text-xs py-1.5 px-2 rounded"
                  style={{ backgroundColor: "var(--bgColor-muted)" }}
                >
                  <span className="truncate flex-1 mr-2 font-mono">
                    {file.path}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span style={{ color: "var(--fgColor-muted)" }}>
                      {file.lines}L
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        backgroundColor:
                          file.percent >= 60
                            ? "rgba(245, 158, 11, 0.2)"
                            : file.percent >= 30
                              ? "rgba(245, 158, 11, 0.1)"
                              : "var(--bgColor-neutral-muted)",
                        color:
                          file.percent >= 60
                            ? "var(--fgColor-severe)"
                            : "var(--fgColor-muted)",
                      }}
                    >
                      {file.percent}%
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
