import { codeToHtml } from "shiki";

interface CodeBlockProps {
  code: string;
  title?: string;
  lang?: string;
}

export async function CodeBlock({ code, title, lang = "tsx" }: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark",
  });

  return (
    <div className="rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
      {title && (
        <div className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-xs font-medium opacity-70 border-b border-neutral-200 dark:border-neutral-700">
          {title}
        </div>
      )}
      <div
        className="text-sm overflow-x-auto [&_pre]:p-4 [&_pre]:m-0 [&_code]:bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

