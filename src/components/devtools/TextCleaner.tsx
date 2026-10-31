import { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Info,
} from "lucide-react";
import { FiClipboard, FiCopy } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import {
  cleanText,
  DEFAULT_CLEANER_OPTIONS,
  MAX_TEXT_LENGTH,
  isCleanupEnabled,
  type CleanerOptions,
  type CleanerResult,
} from "@/lib/text-cleaner";

const controls: {
  key: keyof CleanerOptions;
  label: string;
  description: string;
}[] = [
  {
    key: "invisible",
    label: "Invisible characters",
    description:
      "Removes byte-order marks, soft hyphens and word joiners. Zero-width spaces between words become regular spaces. Meaningful emoji joiners and non-joining characters are preserved.",
  },
  {
    key: "nonBreakingSpaces",
    label: "Convert non-breaking spaces",
    description:
      "Converts regular and narrow non-breaking spaces into ordinary spaces so prose can wrap normally.",
  },
  {
    key: "quotes",
    label: "Normalize quotes",
    description:
      "Replaces smart, low and reversed quotation marks with straight quotes and apostrophes. It keeps the quotation marks rather than deleting them.",
  },
  {
    key: "dashes",
    label: "Normalize dashes",
    description:
      "Converts en dashes and em dashes into the standard hyphen (-). Other numeric signs and symbols stay unchanged.",
  },
  {
    key: "ellipsis",
    label: "Convert ellipsis",
    description:
      "Replaces the single ellipsis character with three ordinary periods (...).",
  },
  {
    key: "trailingWhitespace",
    label: "Remove trailing whitespace",
    description:
      "Removes extra spaces and tabs at line endings. Two-space Markdown line breaks are preserved unless full Markdown removal is enabled.",
  },
  {
    key: "asterisks",
    label: "Remove asterisks (*)",
    description:
      "Deletes asterisks from eligible text without removing other Markdown. Off by default: asterisks may be meaningful in formulas or prose.",
  },
  {
    key: "headings",
    label: "Remove Markdown headings",
    description:
      "Removes leading Markdown heading markers (# through ######) while keeping the heading text. Hashtags and underline-style headings are not removed. Off by default.",
  },
  {
    key: "lookalikes",
    label: "Convert lookalike characters",
    description:
      "Uses a character-mapping library to replace supported Greek and Cyrillic lookalikes with Latin letters. Accented Latin letters remain unchanged. Off by default: this can alter legitimate Greek or Cyrillic writing.",
  },
  {
    key: "unicode",
    label: "Normalize Unicode forms",
    description:
      "Applies NFKC compatibility normalization, for example fullwidth letters become ordinary letters and the fi ligature becomes two letters. It is not ASCII transliteration and does not convert Cyrillic or Greek lookalikes. Off by default: compatibility distinctions can be meaningful.",
  },
  {
    key: "whitespace",
    label: "Extra whitespace",
    description:
      "Collapses repeated spaces within prose, normalizes line endings and removes exterior blank lines. Paragraph breaks and list indentation remain. Non-breaking-space and trailing-space rules can be controlled independently.",
  },
  {
    key: "preserveCode",
    label: "Preserve code",
    description:
      "Keeps fenced code blocks and inline code untouched by character cleanup. Enabled by default. Disable it only when you intentionally want to normalize a pasted code snippet. Link destinations and literal HTML remain protected.",
  },
  {
    key: "markdown",
    label: "Remove Markdown",
    description:
      "Converts standard Markdown to plain text, including emphasis, headings, lists, block quotes and code fences. Code bodies, image descriptions and link destinations are kept. Off by default. This is broader than the selective heading and asterisk options.",
  },
];

function wordCount(text: string): number {
  return text.trim() ? text.trim().split(/\s+/u).length : 0;
}

export default function TextCleaner() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [options, setOptions] = useState<CleanerOptions>({
    ...DEFAULT_CLEANER_OPTIONS,
  });
  const [result, setResult] = useState<CleanerResult | null>(null);
  const [error, setError] = useState("");
  const overLimit = input.length > MAX_TEXT_LENGTH;

  function invalidate() {
    setOutput("");
    setResult(null);
    setError("");
  }

  function updateCleanedText(nextInput: string, nextOptions: CleanerOptions) {
    if (!nextInput) {
      invalidate();
      return;
    }
    try {
      const cleaned = cleanText(nextInput, nextOptions);
      setOutput(cleaned.text);
      setResult(cleaned);
      setError("");
    } catch (failure) {
      invalidate();
      setError(
        failure instanceof Error
          ? failure.message
          : "Unable to clean this text.",
      );
    }
  }

  function handleClean() {
    updateCleanedText(input, options);
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      updateCleanedText(text, options);
      toast({ title: "Pasted from clipboard", duration: 3000 });
    } catch {
      toast({
        title: "Unable to paste",
        description:
          "Clipboard access was denied. Paste directly into the text field.",
        variant: "destructive",
      });
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(output);
      toast({ title: "Cleaned text copied", duration: 2500 });
    } catch {
      toast({
        title: "Unable to copy",
        description: "Clipboard access was denied.",
        variant: "destructive",
      });
    }
  }

  function handleReset() {
    setInput("");
    setOptions({ ...DEFAULT_CLEANER_OPTIONS });
    invalidate();
  }

  return (
    <TooltipProvider>
      <section className="mx-auto max-w-screen-xl space-y-6 p-4 sm:p-6">
        <header className="flex items-start justify-between gap-3 border-b pb-4">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold">AI Text Cleaner</h1>
            <Badge variant="secondary" className="gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Browser only
            </Badge>
          </div>
          <Dialog>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    aria-label="About AI Text Cleaner"
                  >
                    <Info className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>About AI Text Cleaner</TooltipContent>
            </Tooltip>
            <DialogContent className="max-h-[85dvh] w-[calc(100vw-2rem)] max-w-2xl overflow-y-auto rounded-lg">
              <DialogHeader className="pr-6 text-left">
                <DialogTitle className="leading-6 tracking-normal">
                  About AI Text Cleaner
                </DialogTitle>
                <DialogDescription>
                  Formatting cleanup for pasted text, with a separate option for
                  every rule.
                </DialogDescription>
              </DialogHeader>
              <dl className="space-y-4">
                {controls.map(({ key, label, description }) => (
                  <div key={key}>
                    <dt className="text-sm font-semibold">{label}</dt>
                    <dd className="mt-1 text-sm leading-6 text-muted-foreground">
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="space-y-3 border-t pt-4 text-sm leading-6 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Privacy:</strong> Your
                  pasted text is processed in this browser. This tool does not
                  upload or save it.
                </p>
                <p>
                  <strong className="text-foreground">Limits:</strong> Input is
                  limited to {MAX_TEXT_LENGTH.toLocaleString()} characters. This
                  tool changes formatting, not sentence meaning, and cannot
                  guarantee an AI-detector result. Review the editable output
                  before using it.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label
                htmlFor="cleaner-input"
                className="text-base font-semibold"
              >
                Original text
              </Label>
              <span
                className={`text-xs tabular-nums ${overLimit ? "text-destructive" : "text-muted-foreground"}`}
              >
                {input.length.toLocaleString()} /{" "}
                {MAX_TEXT_LENGTH.toLocaleString()}
              </span>
            </div>
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1 z-10 h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                    onClick={handlePaste}
                    aria-label="Paste from clipboard"
                  >
                    <FiClipboard size={16} aria-hidden="true" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">Paste from clipboard</TooltipContent>
              </Tooltip>
              <Textarea
                id="cleaner-input"
                value={input}
                onChange={(event) => {
                  const nextInput = event.target.value;
                  setInput(nextInput);
                  updateCleanedText(nextInput, options);
                }}
                placeholder="Paste text..."
                spellCheck={false}
                aria-invalid={overLimit}
                aria-describedby={
                  overLimit ? "cleaner-error" : "cleaner-input-count"
                }
                className="h-80 min-h-64 resize-y whitespace-pre-wrap break-words pr-10 text-sm leading-6 sm:h-96"
              />
            </div>
            <p
              id="cleaner-input-count"
              className="text-xs text-muted-foreground"
            >
              {wordCount(input).toLocaleString()} words
            </p>
          </div>
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Label
                htmlFor="cleaner-output"
                className="text-base font-semibold"
              >
                Cleaned text
              </Label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {output.length.toLocaleString()} characters
              </span>
            </div>
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="absolute right-1 top-1 z-10 inline-flex">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                      onClick={handleCopy}
                      disabled={!output}
                      aria-label="Copy cleaned text"
                    >
                      <FiCopy size={16} aria-hidden="true" />
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top">Copy to clipboard</TooltipContent>
              </Tooltip>
              <Textarea
                id="cleaner-output"
                value={output}
                onChange={(event) => setOutput(event.target.value)}
                spellCheck={false}
                aria-describedby="cleaner-output-count"
                className="h-80 min-h-64 resize-y whitespace-pre-wrap break-words pr-10 text-sm leading-6 sm:h-96"
              />
            </div>
            <p
              id="cleaner-output-count"
              className="text-xs text-muted-foreground"
            >
              {wordCount(output).toLocaleString()} words
            </p>
          </div>
        </div>

        {(error || overLimit) && (
          <Alert variant="destructive" id="cleaner-error">
            <AlertDescription>
              {error ||
                `Text must be ${MAX_TEXT_LENGTH.toLocaleString()} characters or fewer.`}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={handleClean} disabled={!input || overLimit}>
              <Sparkles className="mr-2 h-4 w-4" aria-hidden="true" />
              Clean text
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal
                    className="mr-2 h-4 w-4"
                    aria-hidden="true"
                  />
                  Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="max-h-[var(--radix-dropdown-menu-content-available-height)] w-72 max-w-[calc(100vw-2rem)] overflow-y-auto"
                aria-label="Cleanup options"
              >
                {controls.map(({ key, label }) => (
                  <DropdownMenuCheckboxItem
                    key={key}
                    checked={isCleanupEnabled(options, key)}
                    onSelect={(event) => event.preventDefault()}
                    onCheckedChange={(checked) => {
                      const nextOptions = { ...options, [key]: checked };
                      setOptions(nextOptions);
                      updateCleanedText(input, nextOptions);
                    }}
                  >
                    {label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleReset}
                  aria-label="Reset text and options"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reset text and options</TooltipContent>
            </Tooltip>
          </div>
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-5 flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground"
          >
            {result &&
              (output !== result.text ? (
                "Output edited"
              ) : !result.changed ? (
                "No changes needed"
              ) : (
                <>
                  <span>{result.counts.invisible} invisible characters</span>
                  <span>{result.counts.whitespace} spacing changes</span>
                  <span>{result.counts.punctuation} punctuation changes</span>
                  {result.counts.asterisks > 0 && (
                    <span>{result.counts.asterisks} asterisks removed</span>
                  )}
                  {result.counts.headings > 0 && (
                    <span>{result.counts.headings} headings cleaned</span>
                  )}
                  {result.counts.lookalikes > 0 && (
                    <span>{result.counts.lookalikes} lookalikes converted</span>
                  )}
                  {result.counts.unicode > 0 && (
                    <span>
                      {result.counts.unicode} Unicode groups normalized
                    </span>
                  )}
                  {options.markdown && (
                    <span>{result.counts.markdown} Markdown elements</span>
                  )}
                </>
              ))}
          </div>
        </div>
      </section>
    </TooltipProvider>
  );
}
