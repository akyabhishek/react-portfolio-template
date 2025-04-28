import React from "react";
import {CodeBlock} from "./ui/code-block";


export default function CodeQuote() {
    const code = `// The Journey of a Developer
function cultivateGrowth<T extends Developer>(person: T): Promise<Success> {
  return new Promise((resolve) => {
    while (person.isLearning) {
      const challenges = person.facing.obstacles;
      
      if (challenges.length > 0) {
        challenges.forEach(challenge => {
          const solution = person.solve(challenge);
          person.wisdom += solution.learnings;
        });
        
        person.skills.enhance();
        person.perspective.broaden();
      }
      
      // Even small progress compounds over time
      person.growth = person.consistency * person.persistence;
    }
    
    // True success isn't measured by the destination, 
    // but by who you become on the journey
    resolve({
      achievement: person.accomplishments,
      fulfillment: person.growth,
      impact: person.contributions.toWorld
    });
  });
} `;
    return (
      <div className="pt-10 mb-10">
          <h1 className="text-3xl my-5">Developer's Journey Algorithm</h1>
          
        <div>
            <CodeBlock
                language="tsx"
                filename="DevJourneyAlgo.tsx"
                code={code}
            />

        </div>

</div>
    );
}