import { strict as assert } from "node:assert";
import { test } from "node:test";
import {
  cleanText,
  DEFAULT_CLEANER_OPTIONS,
  MAX_TEXT_LENGTH,
  isCleanupEnabled,
} from "./text-cleaner.ts";

test("empty and unchanged text", () => {
  assert.equal(cleanText("").text, "");
  assert.equal(cleanText("Hello, Alex! Order 42 is ready.").changed, false);
  assert.equal(cleanText("   \n\n").text, "");
});

test("targeted invisible cleanup preserves word boundaries and joins soft hyphens", () => {
  const result = cleanText("\ufeffHello\u200bworld, co\u00adoperate.\u200b");
  assert.equal(result.text, "Hello world, cooperate.");
  assert.equal(result.counts.invisible, 4);
  assert.equal(cleanText("hello\u200b\u200bworld").text, "hello world");
});

test("meaningful Unicode and emoji are retained", () => {
  const input =
    "caf\u00e9 a\u0301 \ud83d\udc69\u200d\ud83d\udcbb \u2764\ufe0f \u0645\u06cc\u200c\u0631\u0648\u0645";
  assert.equal(cleanText(input).text, input);
});

test("spaces, CRLF, indentation, paragraphs and Markdown hard breaks", () => {
  assert.equal(
    cleanText("\r\nHello\u00a0\u202fworld.  \r\n\r\n  - Next   item\r\n").text,
    "Hello world.  \n\n  - Next item",
  );
  assert.equal(cleanText("Hello   world\t \nNext").text, "Hello world\nNext");
});

test("code, links, emails and literal HTML are protected", () => {
  const code = "```js\nconst  name = '\u201cAlex\u201d';\n```";
  const input = `${code}\n\nUse \`a  +  b\` and [link](https://example.com/a\u2014b). Email a@example.com. <b>Hi</b>`;
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, punctuation: true }).text,
    input,
  );
});

test("punctuation normalization is enabled by default and preserves numbers", () => {
  const input = "\u201cHello\u201d\u2014it\u2019s 3\u20135\u2026";
  assert.equal(cleanText(input).text, '"Hello"-it\'s 3-5...');
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, punctuation: false }).text,
    input,
  );
  const options = { ...DEFAULT_CLEANER_OPTIONS, punctuation: true };
  assert.equal(cleanText(input, options).text, '"Hello"-it\'s 3-5...');
  assert.equal(
    cleanText(cleanText(input, options).text, options).changed,
    false,
  );
});

test("curly quotes are replaced with straight quotes without an explicit option", () => {
  const result = cleanText("\u201cHello\u201d and it\u2019s ready.");
  assert.equal(result.text, '"Hello" and it\'s ready.');
  assert.equal(result.counts.punctuation, 3);
  assert.equal(cleanText("\u201c").text, '"');
});

test("quote, dash and ellipsis switches work independently", () => {
  const input = "\u201cHello\u201d\u2014ready\u2026";
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, quotes: false }).text,
    "\u201cHello\u201d-ready...",
  );
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, dashes: false }).text,
    '"Hello"\u2014ready...',
  );
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, ellipsis: false }).text,
    '"Hello"-ready\u2026',
  );
});

test("low and reversed quotation marks normalize without changing prime symbols", () => {
  assert.equal(
    cleanText("\u201eLow\u201f \u201aSingle\u201b \u2032prime\u2033").text,
    "\"Low\" 'Single' \u2032prime\u2033",
  );
});

test("word joiners are removed but meaningful emoji joiners remain", () => {
  const result = cleanText("C\u2060D \ud83d\udc69\u200d\ud83d\udcbb");
  assert.equal(result.text, "CD \ud83d\udc69\u200d\ud83d\udcbb");
  assert.equal(result.counts.invisible, 1);
});

test("link labels and surrounding URL quotes normalize without altering destinations", () => {
  assert.equal(
    cleanText("[\u201cLink\u201d](https://example.com/a\u2014b)").text,
    '["Link"](https://example.com/a\u2014b)',
  );
  assert.equal(
    cleanText("\u201chttps://example.com\u201d").text,
    '"https://example.com"',
  );
});

test("code normalization requires explicitly disabling code preservation", () => {
  const input =
    "`\u201cCode\u201d`\n\n```js\nconst value = \u201cHello\u201d;\n```";
  assert.equal(cleanText(input).text, input);
  assert.equal(
    cleanText(input, { ...DEFAULT_CLEANER_OPTIONS, preserveCode: false }).text,
    '`"Code"`\n\n```js\nconst value = "Hello";\n```',
  );
});

test("each cleanup option can be disabled", () => {
  const input = "\ufeffHello\u00a0  world\u2026";
  assert.equal(
    cleanText(input, {
      whitespace: false,
      invisible: false,
      punctuation: false,
      markdown: false,
    }).text,
    input,
  );
  assert.equal(
    cleanText("A\u00a0B", { ...DEFAULT_CLEANER_OPTIONS, whitespace: false })
      .text,
    "A\u00a0B",
  );
  assert.equal(
    cleanText("A\u200bB", { ...DEFAULT_CLEANER_OPTIONS, invisible: false })
      .text,
    "A\u200bB",
  );
});

test("Markdown conversion retains code, links, image descriptions and raw HTML", () => {
  const input =
    "# Hello **Alex**\n\n- One\n- Two\n\n> Quote\n\n```js\nconst  value = 42;\n```\n\nUse `a  +  b` and [site](https://example.com).\n\n![Photo](https://example.com/photo.jpg)\n\n<div>Literal HTML</div>";
  const result = cleanText(input, {
    ...DEFAULT_CLEANER_OPTIONS,
    markdown: true,
  });
  assert.equal(
    result.text,
    "Hello Alex\n\nOne\n\nTwo\n\nQuote\n\nconst  value = 42;\n\nUse a  +  b and site (https://example.com).\n\nPhoto (https://example.com/photo.jpg)\n\n<div>Literal HTML</div>",
  );
  assert.ok(result.counts.markdown > 0);
});

test("reference links and unsupported table text retain their content", () => {
  const options = { ...DEFAULT_CLEANER_OPTIONS, markdown: true };
  assert.equal(
    cleanText("[Example][id]\n\n[id]: https://example.com", options).text,
    "Example (https://example.com)",
  );
  const table = "| Name | Value |\n| --- | --- |\n| Alex | 42 |";
  assert.equal(cleanText(table, options).text, table);
});

test("code-only Markdown reports changes and unfinished code keeps its trailing newlines", () => {
  const result = cleanText("```js\nconst  value = 42;\n```", {
    ...DEFAULT_CLEANER_OPTIONS,
    markdown: true,
  });
  assert.equal(result.counts.markdown, 1);
  assert.equal(result.text, "const  value = 42;");
  const unfinished = "```js\nconst  value = 42;\n\n";
  assert.equal(cleanText(unfinished).text, unfinished);
});

test("limit rejects without truncation; cleanup is deterministic", () => {
  assert.equal(
    cleanText("a".repeat(MAX_TEXT_LENGTH)).text.length,
    MAX_TEXT_LENGTH,
  );
  assert.throws(() => cleanText("a".repeat(MAX_TEXT_LENGTH + 1)), /10,000/);
  const result = cleanText("\ufeffHello\u00a0   world.\n\n");
  assert.equal(cleanText(result.text).changed, false);
});

test("non-breaking-space conversion and trailing-space removal work independently", () => {
  const options = {
    ...DEFAULT_CLEANER_OPTIONS,
    whitespace: false,
    nonBreakingSpaces: true,
    trailingWhitespace: true,
  };
  const result = cleanText("A\u00a0\u202fB   C\t\nD  ", options);
  assert.equal(result.text, "A  B   C\nD");
  assert.equal(result.counts.nonBreakingSpaces, 2);
  assert.equal(result.counts.trailingWhitespace, 2);
  assert.equal(
    cleanText("A\u00a0B", {
      ...DEFAULT_CLEANER_OPTIONS,
      nonBreakingSpaces: false,
    }).text,
    "A\u00a0B",
  );
  assert.equal(
    cleanText("A   ", { ...DEFAULT_CLEANER_OPTIONS, trailingWhitespace: false })
      .text,
    "A   ",
  );
});

test("selective asterisk removal preserves other Markdown, URLs and protected code", () => {
  const input = "# Heading **bold** *item*\n\n`a * b` https://example.com/a*b";
  const result = cleanText(input, {
    ...DEFAULT_CLEANER_OPTIONS,
    asterisks: true,
  });
  assert.equal(
    result.text,
    "# Heading bold item\n\n`a * b` https://example.com/a*b",
  );
  assert.equal(result.counts.asterisks, 6);
  assert.equal(cleanText("**bold**").text, "**bold**");
});

test("selective headings strip only ATX syntax without removing hashtags or code", () => {
  const input =
    "# Title\n\n###### Deep\n\n#hashtag\n\nTitle\n=====\n\n```md\n# Code\n```";
  const result = cleanText(input, {
    ...DEFAULT_CLEANER_OPTIONS,
    headings: true,
  });
  assert.equal(
    result.text,
    "Title\n\nDeep\n\n#hashtag\n\nTitle\n=====\n\n```md\n# Code\n```",
  );
  assert.equal(result.counts.headings, 2);
  assert.equal(cleanText("# Title").text, "# Title");
});

test("NFKC is opt-in, composes accents, normalizes compatibility forms and keeps emoji", () => {
  const input =
    "\uff28\uff45\uff4c\uff4c\uff4f \ufb01 \ud835\udc07\ud835\udc1e\ud835\udc25\ud835\udc25\ud835\udc28 a\u0301 \ud83d\udc69\u200d\ud83d\udcbb";
  assert.equal(cleanText(input).text, input);
  const result = cleanText(input, {
    ...DEFAULT_CLEANER_OPTIONS,
    unicode: true,
  });
  assert.equal(
    result.text,
    "Hello fi Hello \u00e1 \ud83d\udc69\u200d\ud83d\udcbb",
  );
  assert.ok(result.counts.unicode > 0);
  assert.equal(
    cleanText(result.text, { ...DEFAULT_CLEANER_OPTIONS, unicode: true })
      .changed,
    false,
  );
});

test("lookalike conversion is opt-in and does not transliterate accented Latin text", () => {
  const input = "\u0420\u0430yp\u0430l \u03a1ay\u03a1al caf\u00e9";
  assert.equal(cleanText(input).text, input);
  const result = cleanText(input, {
    ...DEFAULT_CLEANER_OPTIONS,
    lookalikes: true,
  });
  assert.equal(result.text, "Paypal PayPal caf\u00e9");
  assert.equal(result.counts.lookalikes, 5);
});

test("new normalization rules leave code and link destinations untouched", () => {
  const input =
    "`\uff28 **a** \u0430` [\uff28\u0430](https://example.com/\uff28\u0430)";
  assert.equal(
    cleanText(input, {
      ...DEFAULT_CLEANER_OPTIONS,
      unicode: true,
      lookalikes: true,
      asterisks: true,
    }).text,
    "`\uff28 **a** \u0430` [Ha](https://example.com/\uff28\u0430)",
  );
});

test("option defaults reflect inherited spacing and punctuation controls", () => {
  assert.equal(isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "quotes"), true);
  assert.equal(
    isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "nonBreakingSpaces"),
    true,
  );
  assert.equal(
    isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "trailingWhitespace"),
    true,
  );
  assert.equal(isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "asterisks"), false);
  assert.equal(isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "lookalikes"), false);
  assert.equal(isCleanupEnabled(DEFAULT_CLEANER_OPTIONS, "unicode"), false);
});
