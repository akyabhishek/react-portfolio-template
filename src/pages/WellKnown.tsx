import { useLocation } from "react-router-dom";

const wellKnownResponses: Record<string, object> = {
  "security.txt": {
    contact: "mailto:nice-try@youre-not-a-hacker.com",
    encryption: "We use ROT13. Twice. For extra security.",
    acknowledgments: "Thanks for snooping around, detective.",
    policy: "Don't hack us. We'll cry.",
    hiring: "Yes, but not you. You're checking .well-known files for fun.",
  },
  "assetlinks.json": [
    {
      relation: ["delegate_permission/common.judge_you"],
      target: {
        namespace: "curiosity",
        package_name: "com.why.are.you.here",
        sha256_cert_fingerprints: ["GO:DO:SO:ME:TH:IN:G:PR:OD:UC:TI:VE"],
      },
    },
  ],
  "openid-configuration": {
    issuer: "https://trust-issues.dev",
    authorization_endpoint: "/go-away",
    token_endpoint: "/you-wish",
    userinfo_endpoint: "/none-of-your-business",
    scopes_supported: ["nostalgia", "regret", "existential_dread"],
    response: "Why are you even reading this?",
  },
  "apple-app-site-association": {
    applinks: {
      apps: [],
      details: [
        {
          appID: "NICE.TRY.buddy",
          paths: ["/you-thought", "/lol-no", "/go-home"],
        },
      ],
    },
    webcredentials: { apps: ["com.apple.disappointment"] },
  },
  "change-password": {
    message: "Your password is already 'password123', isn't it?",
    suggestion: "Try 'password124'. Nobody will ever guess that.",
    actual_advice: "Please use a password manager. Seriously.",
  },
};

const honeypotResponses: Record<string, { header: string; content: string }> = {
  ".env": {
    header: "# .env - Totally Real Secrets",
    content: `DB_HOST=localhost
DB_USER=admin
DB_PASSWORD=nice_try_buddy
SECRET_KEY=you_really_thought_huh
AWS_ACCESS_KEY=AKIA_LOL_NO_WAY
AWS_SECRET_KEY=keep/dreaming/pal/this/isnt/real
STRIPE_KEY=sk_live_hahahaha_no
ADMIN_EMAIL=your-mom@example.com
JWT_SECRET=i-hide-my-secrets-better-than-you-hide-your-intentions
REDIS_URL=redis://go-away:6379
NODE_ENV=production_of_disappointment`,
  },
  ".git/config": {
    header: "# Git Config - Very Legit",
    content: `[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    autocrlf = input
[remote "origin"]
    url = https://github.com/nice-try/you-thought.git
    fetch = +refs/heads/go-away:refs/remotes/origin/go-away
[branch "main"]
    remote = none-of-your-business
    merge = refs/heads/touch-grass
[user]
    name = Not Your Concern
    email = stop-snooping@get-a-hobby.dev`,
  },
  "wp-admin": {
    header: "// WordPress Admin Panel",
    content: `{
  "status": "lol",
  "message": "This isn't WordPress. It never was.",
  "suggestion": "Did the React source code not give it away?",
  "wordpress_version": "none.zero.never",
  "plugins_installed": ["delusion", "false-hope", "wasted-time"],
  "admin_password": "it's-a-react-app-bro"
}`,
  },
  "phpinfo.php": {
    header: "// PHP Info - Definitely Real",
    content: `{
  "php_version": "lol.no.php.here",
  "system": "This is a React SPA. There is no PHP.",
  "server_api": "Vite, not Apache. Surprise!",
  "loaded_extensions": ["disappointment", "wasted_bandwidth"],
  "error": "The only thing broken here is your assumptions.",
  "suggestion": "Try 'view source' next time. It's JavaScript all the way down."
}`,
  },
  "server-status": {
    header: "// Apache Server Status",
    content: `{
  "server": "Not Apache. Not even close.",
  "uptime": "longer than your attention span",
  "total_requests": "just yours, and it was pointless",
  "idle_workers": "they quit after seeing this request",
  "cpu_usage": "0.001% — that's how little effort this took",
  "status": "judging you silently"
}`,
  },
  ".DS_Store": {
    header: "# macOS Directory Store",
    content: `Found it! Here's what's inside:
    
00000000  00 00 00 01 42 75 64 31  LOL..JK..THIS..
00000008  00 00 10 00 00 00 08 00  IS..NOT..A..MAC
00000010  00 00 00 00 00 00 00 00  NICE..TRY..THO.

Translation: There's nothing here. This is hosted on the cloud.
You really thought a .DS_Store would be publicly accessible? Cute.`,
  },
  "config.yml": {
    header: "# config.yml - Super Secret Configuration",
    content: `app:
  name: "None of Your Business"
  version: "mind.your.own"
  environment: "hostile (to snoopers)"

database:
  host: "go-away.internal"
  port: 5432
  password: "wouldn't-you-like-to-know"

secrets:
  api_key: "FAKE-KEY-stop-trying"
  jwt_secret: "this-is-a-react-spa-there-is-no-backend-config-here"
  
message: "You're probing a static site. Think about that."`,
  },
  debug: {
    header: "// Debug Endpoint",
    content: `{
  "debug_mode": false,
  "error": "The only bug here is you.",
  "stack_trace": [
    "at YouThought.findSecrets(delusion.js:1)",
    "at Bot.probe(script-kiddie.js:42)",
    "at Reality.check(disappointment.js:404)"
  ],
  "recommendation": "Have you tried turning yourself off and on again?",
  "logs": "All I see is someone wasting their Friday night."
}`,
  },
  actuator: {
    header: "// Spring Boot Actuator",
    content: `{
  "status": "UP (unlike your hacking career)",
  "framework": "React, not Spring Boot. Read the room.",
  "health": {
    "status": "Healthier than your life choices",
    "details": {
      "brain": { "status": "NOT_FOUND" },
      "common_sense": { "status": "DOWN" },
      "free_time": { "status": "WASTED" }
    }
  },
  "beans": "The only beans here are the ones I spilled laughing at this request."
}`,
  },
};

const fallbackResponse = {
  status: "418 I'm a teapot",
  message: "You really thought you'd find something useful here?",
  suggestion: "Maybe go touch grass instead of probing .well-known endpoints.",
  fun_fact: "This endpoint exists solely to waste the time of people like you.",
  next_steps: [
    "Close this tab",
    "Question your life choices",
    "Go build something",
  ],
};

export default function WellKnown() {
  const location = useLocation();
  const pathname = location.pathname;

  // Check honeypot paths first
  const honeypotKey = Object.keys(honeypotResponses).find(
    (key) => pathname === `/${key}` || pathname === `/${key}/`,
  );

  if (honeypotKey) {
    const { header, content } = honeypotResponses[honeypotKey];
    return (
      <div className="min-h-screen bg-[#1e1e1e] p-4 sm:p-8 font-mono text-sm">
        <pre className="whitespace-pre-wrap break-words max-w-3xl mx-auto">
          <span className="text-gray-500">
            {"// GET " + pathname + "\n"}
            {"// 200 OK\n"}
            {"// X-Powered-By: Sarcasm/2.0\n\n"}
          </span>
          <span className="text-yellow-400">{header}</span>
          {"\n\n"}
          <span className="text-green-400">{content}</span>
        </pre>
      </div>
    );
  }

  // .well-known paths
  const wellKnownPath = pathname
    .replace("/.well-known/", "")
    .replace("/.well-known", "");
  const data = wellKnownResponses[wellKnownPath] || fallbackResponse;

  return (
    <div className="min-h-screen bg-[#1e1e1e] p-4 sm:p-8 font-mono text-sm">
      <pre className="text-green-400 whitespace-pre-wrap break-words max-w-3xl mx-auto">
        <span className="text-gray-500">
          {"// GET /.well-known/" + (wellKnownPath || "???") + "\n"}
          {"// 200 OK\n"}
          {"// Content-Type: application/json; charset=sarcasm\n\n"}
        </span>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
