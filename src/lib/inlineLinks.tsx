import { Link } from "react-router-dom";

/**
 * Render a string with inline markdown links: `[label](url)`.
 * Internal URLs (starting with "/" or "#") become <Link>, externals open in new tab.
 */
export const renderInlineLinks = (text: string, keyPrefix = "il") => {
  const parts: (string | JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  let i = 0;
  const linkClass =
    "text-qit-coral underline underline-offset-2 hover:text-qit-coral/80";
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const [, label, url] = match;
    const isInternal = url.startsWith("/") || url.startsWith("#");
    parts.push(
      isInternal ? (
        <Link key={`${keyPrefix}-${i}`} to={url} className={linkClass}>
          {label}
        </Link>
      ) : (
        <a
          key={`${keyPrefix}-${i}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {label}
        </a>
      )
    );
    lastIndex = match.index + match[0].length;
    i++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};
