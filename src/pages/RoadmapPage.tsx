import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";
import { useTheme } from "@/components/theme-provider";
import {
  FiCheckSquare,
  FiChevronDown,
  FiChevronRight,
  FiRotateCcw,
} from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const markdownContent = `
# Deep Dive Roadmap to Switch from Service-Based to Product-Based Company

## 1. **Core Fundamentals**

### DSA (Data Structures & Algorithms)

#### Topics
- **Arrays**: Sorting, Searching, Sliding Window
- **Strings**: Manipulation, Pattern Matching, Anagrams
- **Linked Lists**: Reversal, Cycle Detection, Merging
- **Stacks & Queues**: Implementations, Parentheses Matching
- **Hashing**: Hash Maps, Collision Handling
- **Trees**: Binary Trees, AVL Trees, Binary Search Trees
- **Graphs**: BFS, DFS, Dijkstra's, Topological Sort
- **Dynamic Programming**: Fibonacci, Knapsack, Longest Common Subsequence
- **Greedy Algorithms**: Activity Selection, Huffman Coding
- **Bit Manipulation**: XOR tricks, Set and Clear bits
- **Recursion**: Factorial, Tower of Hanoi

#### Resources
- [Algorithms by Abdul Bari](https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O)
- [DSA by Jenny](https://www.youtube.com/playlist?list=PLdo5W4Nhv31bbKJzrsKfMpo_grxuLl8LU)
- [Striver's A2Z DSA Course](https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz)
- [GeeksforGeeks](https://www.geeksforgeeks.org/)
- [HackerRank](https://www.hackerrank.com)
- [LeetCode](https://leetcode.com/)
- [Codeforces](https://codeforces.com/)

### Time Complexity

#### Topics
- **Big-O Notation**: Worst, Average, Best Case
- **Asymptotic Analysis**: Big-O, Big-Ω, Big-Θ
- **Amortized Time Complexity**: Example with Dynamic Arrays
- **Recursion Complexity**: Divide & Conquer

#### Resources
- [Big-O Cheat Sheet](https://www.bigocheatsheet.com/)

## 2. **Database**

### SQL Fundamentals
- **DDL & DML**: CREATE, ALTER, DROP, INSERT, UPDATE, DELETE
- **Joins**: INNER, LEFT, RIGHT, FULL OUTER, CROSS, Self Joins
- **Indexing**: B-Tree, Hash Index, Composite Index, Covering Index
- **Query Optimization**: EXPLAIN/ANALYZE, Slow Query Logs, Execution Plans
- **Transactions & ACID**: Atomicity, Consistency, Isolation, Durability
- **Normalization**: 1NF, 2NF, 3NF, BCNF, Denormalization tradeoffs
- **Aggregations & Window Functions**: GROUP BY, HAVING, ROW_NUMBER, RANK, PARTITION BY
- **Subqueries & CTEs**: Common Table Expressions, Correlated Subqueries

### NoSQL Databases
- **MongoDB**: Document Model, Aggregation Pipeline, Indexing
- **Redis**: Data Structures, Caching Patterns, Pub/Sub, TTL
- **DynamoDB**: Partition Keys, Sort Keys, GSI, LSI
- **SQL vs NoSQL**: When to use which, CAP Theorem tradeoffs

### Database Design & Scaling
- **Schema Design**: ER Diagrams, Relationships (1:1, 1:N, M:N)
- **Sharding**: Horizontal Partitioning, Shard Keys, Consistent Hashing
- **Replication**: Master-Slave, Master-Master, Read Replicas
- **Connection Pooling**: PgBouncer, HikariCP
- **Database Migrations**: Flyway, Liquibase, Schema Versioning

### Interview Questions

#### Topics
- **Query-Based**: Write SQL for Nth highest salary, duplicate detection, running totals
- **Design-Based**: Design schema for e-commerce, social media, booking system
- **Conceptual**: ACID vs BASE, Isolation Levels, Deadlocks & how to prevent them
- **Performance**: Why is this query slow? Index optimization scenarios
- **Scenario-Based**: Sharding strategy for 1B rows, Read-heavy vs Write-heavy systems

#### Resources
- [LeetCode SQL 50](https://leetcode.com/studyplan/top-sql-50/)
- [HackerRank SQL](https://www.hackerrank.com/domains/sql)
- [PostgreSQL Exercises](https://pgexercises.com/)
- [Use The Index, Luke (Indexing Guide)](https://use-the-index-luke.com/)
- [SQL Complete Course by Apna College](https://youtu.be/hlGoQC332VM?si=JafF_Ty6t2JmO4Ck)
- [Top 65 SQL Interview Questions and Answers](https://youtu.be/-WEpWH1NHGU?si=fRu1G1uhSoPMXjl_)

## 3. **System Design**

### Low-Level Design (LLD)

#### Design Principles
- **SOLID**: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion
- **DRY**: Don't Repeat Yourself
- **KISS**: Keep It Simple, Stupid
- **YAGNI**: You Aren't Gonna Need It
- **Separation of Concerns**: Modular, layered architecture
- **Composition over Inheritance**: Favor object composition

#### Design Patterns
- **Creational**: Singleton, Factory, Abstract Factory, Builder, Prototype
- **Structural**: Adapter, Decorator, Facade, Proxy, Composite, Bridge
- **Behavioral**: Observer, Strategy, Command, State, Template Method, Iterator, Chain of Responsibility

#### Resources
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)
- [Head First Design Patterns](https://www.oreilly.com/library/view/head-first-design/9781492077992/)
- [System Design Primer (GitHub)](https://github.com/donnemartin/system-design-primer)
- [Gaurav Sen - System Design](https://www.youtube.com/playlist?list=PLMCXHnjXnTnvo6alSjVkgxV-VH6EPyvoX)

### High-Level Design (HLD)
- **Scalability**: Horizontal vs Vertical Scaling
- **Load Balancing**: Round-Robin, Least Connections
- **Caching**: Redis, Memcached, Cache Eviction Strategies
- **Database Scaling**: Sharding, Replication
- **CAP Theorem**: Consistency, Availability, Partition Tolerance
- **Database Types**: SQL vs NoSQL, CAP & ACID, eventual consistency
- **Queueing & Message Brokers**: Kafka, RabbitMQ
- **Microservices**: Service Communication, REST, gRPC
- **Fault Tolerance & Resilience**: Circuit Breaker, Retry Mechanism
- **API Gateway**: Rate Limiting, Authentication, Routing

## 4. **Machine Coding**

#### Topics
- **Coding on Whiteboard**: Write code from scratch, no libraries
- **Design Problems**: Design a URL Shortener, Parking Lot System
- **Efficient Code Writing**: Focus on modularity, scalability
- **Optimal Use of Data Structures**: Arrays, Linked Lists, Trees, HashMaps
- **Time Management in Coding Rounds**: Solve problems within 30–45 mins

#### Resources
- [Machine Coding Practice on LeetCode](https://leetcode.com/)
- [GeeksforGeeks Machine Coding Round](https://www.geeksforgeeks.org/what-is-machine-coding-round/)

## 5. **JavaScript (JS)**

#### Topics
- **Basic Syntax**: Variables, Data Types, Operators, Functions
- **ES6 Features**: Arrow Functions, Template Literals, Promises, Async/Await
- **Event Loop & Asynchronous JS**: Callbacks, Promises, Event Queue
- **DOM Manipulation**: Select, Modify, Add Events
- **Closures**: Lexical Scoping, Private Variables
- **Higher-Order Functions**: Map, Reduce, Filter
- **Modules & Imports/Exports**: JavaScript Modules
- **Error Handling**: try-catch, throw

#### Resources
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript (Book)](https://eloquentjavascript.net/)
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 6. **Docker & Containers**

#### Topics
- **Docker Basics**: Images, Containers, Volumes, Networks
- **Docker Commands**: \`docker run\`, \`docker ps\`, \`docker exec\`
- **Docker Compose**: Multi-container applications
- **Docker Networking**: Port Mapping, Bridge Network
- **Dockerfile**: Write a custom Docker image
- **Docker in Production**: CI/CD Integration, Scaling with Docker Swarm/Kubernetes

#### Resources
- [Docker Official Documentation](https://docs.docker.com/)
- [Docker for Beginners](https://www.udemy.com/course/docker-tutorial-for-beginners/)
- [Play with Docker](https://labs.play-with-docker.com/)

## 7. **Cloud Computing**

#### Topics
- **AWS**: EC2, S3, Lambda, CloudWatch, RDS
- **GCP**: Compute Engine, Kubernetes Engine, Cloud Functions
- **Azure**: Virtual Machines, Blob Storage, Azure Functions
- **CI/CD Pipelines**: Jenkins, GitHub Actions, GitLab CI
- **Monitoring & Logging**: Prometheus, Grafana, ELK Stack

#### Resources
- [AWS Free Tier](https://aws.amazon.com/free/)
- [Google Cloud Training](https://cloud.google.com/training)
- [Microsoft Learn](https://learn.microsoft.com/en-us/training/)

## 8. **Networking & Security**

#### Topics
- **HTTP/HTTPS**: Requests, Responses, Status Codes
- **Web Security**: XSS, CSRF, SQL Injection
- **OAuth2.0**: Authorization, Tokens
- **JWT (JSON Web Tokens)**: Authentication & Authorization
- **Encryption**: Symmetric vs Asymmetric, SSL/TLS
- **Rate Limiting**: Protecting APIs with Throttling

#### Resources
- [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
- [FreeCodeCamp - Security](https://www.freecodecamp.org/news/security/)
- [Crypto101](https://crypto101.io/)

## 9. **Testing & Debugging**

#### Topics
- **Unit Testing**: Test individual functions, Mocha, Jest
- **Integration Testing**: Testing interaction between services
- **End-to-End Testing**: Cypress, Selenium
- **Mocking & Stubbing**: Sinon.js
- **Debugging Tools**: Node.js Debugger, Chrome DevTools

#### Resources
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Cypress Docs](https://www.cypress.io/)
- [Mocha Docs](https://mochajs.org/)

## 10. **Soft Skills**

#### Topics
- **Communication**: Clear, Concise, Technical Language
- **Time Management**: Prioritize Learning & Job Responsibilities
- **Problem-Solving**: Break down problems into smaller pieces
- **Leadership**: Take initiative in projects, mentor juniors

#### Resources
- [LinkedIn Learning](https://www.linkedin.com/learning/)
- [Udemy Soft Skills Courses](https://www.udemy.com/)
- [YouTube - Soft Skills](https://www.youtube.com/results?search_query=soft+skills)

## 11. **Interview Preparation**

#### Topics
- **Mock Interviews**: Peer-to-peer or platforms (Pramp, Interviewing.io)
- **Behavioral Interviews**: STAR Method (Situation, Task, Action, Result)
- **System Design Mock**: Whiteboard or online platforms
- **Machine Coding Rounds**: Practice on real-time problems

#### Resources
- [Pramp (Free Mock Interviews)](https://www.pramp.com/)
- [Interviewing.io](https://www.interviewing.io/)
- [Cracking the Coding Interview](https://www.crackingthecodinginterview.com/)

## 12. **Continuous Learning**

#### Topics
- **Git/GitHub**: Version Control, Branching, Merging
- **Contributing to Open Source**: GitHub Repositories, Issues
- **Technical Blogging**: Write about your projects & learning
- **Industry Trends**: Stay updated with AI, Blockchain, Quantum Computing

#### Resources
- [Git Docs](https://git-scm.com/doc)
- [Open Source Guides](https://opensource.guide/)
`;

const transformer = new Transformer();

// ── Progress tracking helpers ──────────────────────────────────────────────────

interface ProgressSection {
  section: string;
  topics: string[];
}

function parseProgressTopics(md: string): ProgressSection[] {
  const sections: ProgressSection[] = [];
  let currentSection = "";

  for (const line of md.split("\n")) {
    const h2 = line.match(/^##\s+\d+\.\s+\*\*(.+?)\*\*/);
    if (h2) {
      currentSection = h2[1].trim();
      sections.push({ section: currentSection, topics: [] });
      continue;
    }
    // Skip resource links (start with `- [`)
    if (line.match(/^-\s+\[/)) continue;
    // Collect topic bullets
    if (sections.length > 0 && line.startsWith("- ")) {
      const topic = line
        .replace(/^-\s+/, "")
        .replace(/\*\*/g, "")
        .replace(/`[^`]+`/g, (m) => m.slice(1, -1))
        .replace(/:.*/, "")
        .trim();
      if (topic) sections[sections.length - 1].topics.push(topic);
    }
  }
  return sections.filter((s) => s.topics.length > 0);
}

const PROGRESS_SECTIONS = parseProgressTopics(markdownContent);
const ALL_TOPICS = PROGRESS_SECTIONS.flatMap((s) =>
  s.topics.map((t) => `${s.section}::${t}`),
);
const STORAGE_KEY = "roadmap-progress";

// ── Progress Panel UI ─────────────────────────────────────────────────────────

function ProgressPanel({
  open,
  onOpenChange,
  checked,
  onToggle,
  onReset,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  checked: Set<string>;
  onToggle: (key: string) => void;
  onReset: () => void;
}) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    () => new Set(PROGRESS_SECTIONS.map((s) => s.section)),
  );
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const totalDone = checked.size;
  const totalAll = ALL_TOPICS.length;
  const pct = Math.round((totalDone / totalAll) * 100);

  const toggleSection = (s: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 p-0 flex flex-col gap-0">
        {/* Header */}
        <SheetHeader className="px-4 py-3 border-b flex-row items-center justify-between space-y-0 pr-12">
          <SheetTitle className="flex items-center gap-2 text-sm">
            <FiCheckSquare className="text-emerald-500" size={16} />
            Progress Tracker
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground shrink-0"
            onClick={() => setResetDialogOpen(true)}
            title="Reset all progress"
          >
            <FiRotateCcw size={13} />
          </Button>
        </SheetHeader>

        {/* Reset confirmation dialog */}
        <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
          <DialogContent className="max-w-xs">
            <DialogHeader>
              <DialogTitle>Reset Progress?</DialogTitle>
              <DialogDescription>
                This will clear all your checked topics. This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  onReset();
                  setResetDialogOpen(false);
                }}
              >
                Reset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Overall progress */}
        <div className="px-4 py-3 border-b space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">
              {totalDone} / {totalAll} topics completed
            </span>
            <Badge
              variant="outline"
              className="text-xs text-emerald-500 border-emerald-500/30 bg-emerald-500/10"
            >
              {pct}%
            </Badge>
          </div>
          <Progress value={pct} className="h-2 [&>*]:bg-emerald-500" />
        </div>

        {/* Sections */}
        <ScrollArea className="flex-1">
          {PROGRESS_SECTIONS.map((sec, i) => {
            const secDone = sec.topics.filter((t) =>
              checked.has(`${sec.section}::${t}`),
            ).length;
            const isOpen = openSections.has(sec.section);

            return (
              <div key={sec.section}>
                {i > 0 && <Separator />}
                <button
                  onClick={() => toggleSection(sec.section)}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-muted/60 transition-colors text-left"
                >
                  <span className="text-xs font-semibold truncate pr-2">
                    {sec.section}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge variant="secondary" className="text-xs h-5 px-1.5">
                      {secDone}/{sec.topics.length}
                    </Badge>
                    {isOpen ? (
                      <FiChevronDown size={12} />
                    ) : (
                      <FiChevronRight size={12} />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="pb-1 px-2">
                    {sec.topics.map((topic) => {
                      const key = `${sec.section}::${topic}`;
                      const done = checked.has(key);
                      return (
                        <div
                          key={key}
                          className="flex items-start gap-2.5 px-2 py-1.5 rounded-md hover:bg-muted/60 transition-colors"
                        >
                          <Checkbox
                            id={key}
                            checked={done}
                            onCheckedChange={() => onToggle(key)}
                            className="mt-0.5 shrink-0 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                          />
                          <Label
                            htmlFor={key}
                            className={`text-xs leading-relaxed cursor-pointer transition-colors ${
                              done
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {topic}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function RoadmapPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const { theme, setTheme } = useTheme();
  const [panelOpen, setPanelOpen] = useState(false);
  const [checked, setChecked] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved) as string[]) : new Set();
    } catch {
      return new Set();
    }
  });

  // Persist to localStorage whenever checked changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...checked]));
  }, [checked]);

  const handleToggle = useCallback((key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleReset = useCallback(() => {
    setChecked(new Set());
  }, []);

  const totalPct = useMemo(
    () => Math.round((checked.size / ALL_TOPICS.length) * 100),
    [checked],
  );

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const renderToolbar = useCallback((mm: Markmap, wrapper: HTMLElement) => {
    if (toolbarRef.current) return;
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    const el = toolbar.render() as HTMLElement;
    el.setAttribute(
      "style",
      "position:absolute;bottom:20px;right:20px;z-index:10",
    );
    wrapper.appendChild(el);
    toolbarRef.current = el as HTMLDivElement;
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const { root } = transformer.transform(markdownContent);

    if (mmRef.current) {
      mmRef.current.setData(root);
      mmRef.current.fit();
      return;
    }

    const mm = Markmap.create(
      svg,
      {
        autoFit: false,
        duration: 300,
        maxWidth: 400,
      },
      root,
    );
    mmRef.current = mm;

    // Fit once on initial render only
    setTimeout(() => mm.fit(), 100);

    const wrapper = svg.parentElement;
    if (wrapper) {
      renderToolbar(mm, wrapper);
    }

    // Make all links open in a new tab
    const observer = new MutationObserver(() => {
      svg.querySelectorAll("a").forEach((a) => {
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
    });
    observer.observe(svg, { childList: true, subtree: true });
    // Also apply to any already-rendered links
    svg.querySelectorAll("a").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });

    return () => {
      observer.disconnect();
      if (toolbarRef.current) {
        toolbarRef.current.remove();
        toolbarRef.current = null;
      }
      mm.destroy();
      mmRef.current = null;
    };
  }, [renderToolbar]);

  // Sync markmap CSS variables with app theme
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (isDark) {
      svg.style.setProperty("--markmap-text-color", "#e4e4e7");
      svg.style.setProperty("--markmap-circle-open-bg", "#27272a");
      svg.style.setProperty("--markmap-code-bg", "#27272a");
      svg.style.setProperty("--markmap-code-color", "#d4d4d8");
      svg.style.setProperty("--markmap-highlight-bg", "#854d0e");
      svg.style.setProperty("--markmap-a-color", "#60a5fa");
      svg.style.setProperty("--markmap-a-hover-color", "#93bbfd");
    } else {
      svg.style.removeProperty("--markmap-text-color");
      svg.style.removeProperty("--markmap-circle-open-bg");
      svg.style.removeProperty("--markmap-code-bg");
      svg.style.removeProperty("--markmap-code-color");
      svg.style.removeProperty("--markmap-highlight-bg");
      svg.style.removeProperty("--markmap-a-color");
      svg.style.removeProperty("--markmap-a-hover-color");
    }
  }, [isDark]);

  // Sync markmap-dark class on documentElement with app theme,
  // and observe toolbar's toggle to update app theme
  useEffect(() => {
    const el = document.documentElement;
    if (isDark) {
      el.classList.add("markmap-dark");
    } else {
      el.classList.remove("markmap-dark");
    }

    // Watch for toolbar toggling the class
    const observer = new MutationObserver(() => {
      const hasDark = el.classList.contains("markmap-dark");
      if (hasDark && !isDark) {
        setTheme("dark");
      } else if (!hasDark && isDark) {
        setTheme("light");
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      el.classList.remove("markmap-dark");
    };
  }, [isDark, setTheme]);

  return (
    <div
      className={`relative w-full h-screen bg-background ${isDark ? "markmap-dark" : ""}`}
    >
      <svg ref={svgRef} className="w-full h-full" />

      {/* Floating progress button — bottom-left */}
      <button
        onClick={() => setPanelOpen((o) => !o)}
        title="Open progress tracker"
        className="absolute bottom-5 left-5 z-20 group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-background border border-border shadow-lg hover:shadow-xl hover:border-emerald-500/40 transition-all duration-200"
      >
        {/* Circular progress ring */}
        <div className="relative shrink-0 w-9 h-9">
          <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-muted-foreground/20"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * 15}`}
              strokeDashoffset={`${2 * Math.PI * 15 * (1 - totalPct / 100)}`}
              strokeLinecap="round"
              className="text-emerald-500 transition-all duration-500"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-500">
            {totalPct}%
          </span>
        </div>
        {/* Text */}
        <div className="flex flex-col items-start">
          <span className="text-xs font-semibold leading-tight group-hover:text-emerald-500 transition-colors">
            Track Progress
          </span>
          <span className="text-[10px] text-muted-foreground leading-tight">
            {checked.size} / {ALL_TOPICS.length} done
          </span>
        </div>
      </button>

      {/* Progress panel */}
      <ProgressPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        checked={checked}
        onToggle={handleToggle}
        onReset={handleReset}
      />
    </div>
  );
}
