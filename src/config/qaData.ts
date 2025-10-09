import { QuestionAnswerProps } from "@/components/QuestionAnswer";

export const qaList: QuestionAnswerProps[] = [
  {
    question: "What is Java?",
    answer:
      "Java is a high-level, object-oriented programming language used to build platform-independent applications.",
  },
  {
    question: "Difference between == and .equals() in Java?",
    answer:
      "`==` compares reference (memory address), while `.equals()` compares the actual content if overridden properly.",
    code: `String a = new String("hello");
String b = new String("hello");

System.out.println(a == b);       // false
System.out.println(a.equals(b));  // true`,
  },
  {
    question: "What is JVM?",
    answer:
      "JVM (Java Virtual Machine) is an engine that provides a runtime environment to execute Java bytecode.",
  },
  {
    question: "Why is the main method public and static in Java?",
    answer:
      "The main method is public so that it can be called by the Java Virtual Machine (JVM) from outside the class. It is static so that it can be invoked without creating an instance of the class. This allows the JVM to call the main method directly to start the program.",
  },
  {
    question: "Can we override the main method in Java?",
    answer:
      "You can define another main() method in a subclass with the same signature, but that’s not overriding — it’s method hiding.<br/>" +
      "You can declare another main() in a subclass. But it doesn’t override the parent’s main() because main() is static.<br/><br/>" +
      "If you run java Parent → prints Parent main <br/>" +
      "If you run java Child → prints Child main <br/>" +
      "<b>In short:</b> You can hide the main method, but not override it.",
    htmlAnswer: true,
    code: `class Parent {
    public static void main(String[] args) {
        System.out.println("Parent main");
    }
}

class Child extends Parent {
    public static void main(String[] args) {
        System.out.println("Child main");
    }
}
`,
  },
  {
    question: "Why should we not serialize data in a .txt file in Java?",
    answer:
      "Don’t serialize data in a .txt file because Java serialization is binary, not readable, fragile to class changes, insecure if from untrusted sources, and not portable. Use JSON/XML for text files instead.",
  },
  {
    question: "What is transient keyword in Java?",
    htmlAnswer: true,
    answer:
      "The transient keyword in Java is used to indicate that a field should not be serialized. When an object is serialized, transient fields are ignored and not included in the serialized representation. " +
      "This is useful for sensitive data or fields that can be derived and do not need to be persisted." +
      "<br/><br/> <b>Use case:</b> Sensitive data or temporary fields." +
      "<br/> Here, password won’t be saved during serialization.",

    code: `class User implements Serializable {
    String name;
    transient String password; // won't be serialized
}
`,
  },
  {
    question: "How does garbage collection work in Java?",
    htmlAnswer: true,
    answer:
      "Java’s Garbage Collector automatically frees memory used by objects that are no longer reachable in the program, so you don’t have to manually manage memory." +
      "<br/><br/><b>How it works:</b><br/><br/>" +
      "<b>Mark phase</b> → GC identifies objects that are still reachable from root references (e.g., local variables, static fields).<br/>" +
      "<b>Sweep phase</b> → GC removes objects that aren't reachable.<br/>" +
      "<b>Compact phase (optional)</b> → GC defragments memory to avoid fragmentation.<br/>" +
      "<br/>You can’t force GC — calling System.gc() is just a suggestion to JVM.",
  },
  {
    question: "Do finalize have any role in Garbage Collection?",
    htmlAnswer: true,
    answer:
      "Yes, finalize() is called by the garbage collector before destroying an object, but it's deprecated and unreliable." +
      "<br/>Simple Example:",
    code: `class Resource {
    @Override
    protected void finalize() throws Throwable {
        System.out.println("finalize() called - cleaning up");
        super.finalize();
    }
}

public class Main {
    public static void main(String[] args) {
        Resource r = new Resource();
        r = null; // Make object eligible for GC
        System.gc(); // Request GC (not guaranteed to run)
        
        // finalize() may or may not be called
    }
}`,
  },
  {
    question: "What algorithm JVM uses for Garbage Collection?",
    answer: "",
  },
];
