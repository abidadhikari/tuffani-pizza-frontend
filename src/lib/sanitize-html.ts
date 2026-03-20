export function sanitizeHtml(html?: string | null) {
  if (!html) return "";

  // Basic hardening against script execution in CMS-driven HTML.
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?>[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/\son\w+\s*=\s*"[^"]*"/gi, "")
    .replace(/\son\w+\s*=\s*'[^']*'/gi, "")
    .replace(/\son\w+\s*=\s*[^\s>]+/gi, "")
    .replace(/\s(href|src)\s*=\s*"\s*javascript:[^"]*"/gi, "")
    .replace(/\s(href|src)\s*=\s*'\s*javascript:[^']*'/gi, "")
    .replace(/\s(href|src)\s*=\s*"\s*vbscript:[^"]*"/gi, "")
    .replace(/\s(href|src)\s*=\s*'\s*vbscript:[^']*'/gi, "");
}
