import { useEffect, useRef, useCallback } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import { Toolbar } from "markmap-toolbar";
import "markmap-toolbar/dist/style.css";

const markdownContent = `
# Deep Dive Roadmap to Switch from Service-Based to Product-Based Company

## 1. **Core Fundamentals**

### DSA (Data Structures & Algorithms)

#### Topics
- **Arrays**: Sorting, Searching, Sliding Window
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

export default function RoadmapPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const mmRef = useRef<Markmap | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);

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
        autoFit: true,
        duration: 300,
        maxWidth: 400,
      },
      root,
    );
    mmRef.current = mm;

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

  return (
    <div className="relative w-full h-screen bg-background">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
}
