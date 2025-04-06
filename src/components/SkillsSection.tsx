import {
    SiTypescript,
    SiJavascript,
    SiSpringboot,
    SiReact,
    SiNextdotjs,
    SiTailwindcss,
    SiFigma,
    SiDocker,
    SiGooglecloud,
    SiGithubactions,
    SiGit,
    SiPostman,
    SiIntellijidea,
    SiLangchain,
    SiPython,
    SiYaml,
    SiNodedotjs,
    SiHtml5,
    SiCss3,
    SiAxios,
    SiSwagger,
    SiApachemaven,
    SiFirebase,
    SiGradle,
    SiTensorflow,
    SiSelenium,
    SiMysql,
    SiVercel,
    SiAndroidstudio,
    SiVite
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { BsFiletypeXml } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
import { GoCopilot } from "react-icons/go";
import { CardSpotlight } from "./ui/card-spotlight";



const iconMap: Record<string, JSX.Element> = {
    Java: <FaJava />,
    TypeScript: <SiTypescript />,
    JavaScript: <SiJavascript />,
    "Spring Boot": <SiSpringboot />,
    React: <SiReact />,
    "Next.js": <SiNextdotjs />,
    "Tailwind CSS": <SiTailwindcss />,
    Figma: <SiFigma />,
    Docker: <SiDocker />,
    GCP: <SiGooglecloud />,
    "GitHub Actions": <SiGithubactions />,
    LangChain: <SiLangchain />,
    Git: <SiGit />,
    Postman: <SiPostman />,
    VSCode: <VscVscode />,
    IntelliJ: <SiIntellijidea />,
    Python: <SiPython />,
    YAML: <SiYaml />,
    XML: <BsFiletypeXml />,
    "Node.js": <SiNodedotjs />,
    HTML: <SiHtml5 />,
    CSS: <SiCss3 />,
    Axios: <SiAxios />,
    Swagger: <SiSwagger />,
    Maven: <SiApachemaven />,
    Gradle: <SiGradle />,
    "Firebase Realtime Database": <SiFirebase />,
    "TensorFlow": <SiTensorflow />,
    Selenium: <SiSelenium />,
    MySQL: <SiMysql />,
    "SQL Server": <DiMsqlServer />,
    Vercel: <SiVercel />,
    "Android Studio": <SiAndroidstudio />,
    Vite: <SiVite />,
    "GitHub Copilot": <GoCopilot />
};
const randomGradient = () => {
    const colors = [
        ['from-pink-500', 'to-yellow-500'],
        ['from-green-400', 'to-blue-500'],
        ['from-indigo-500', 'to-purple-500'],
        ['from-red-500', 'to-orange-500'],
        ['from-teal-500', 'to-cyan-500'],
        ['from-purple-500', 'to-pink-500'],
        ['from-blue-400', 'to-indigo-600'],
        ['from-yellow-400', 'to-green-600'],
        ['from-indigo-300', 'to-teal-500'],
        ['from-fuchsia-500', 'to-pink-500'],
    ];

    // Randomly pick a gradient
    const randomIndex = Math.floor(Math.random() * colors.length);
    return `hover:bg-gradient-to-r ${colors[randomIndex].join(' ')}`;
};

const skills = [
    {
        category: "Languages",
        items: ["Java", "TypeScript", "JavaScript", "Python"]
    },
    {
        category: "Frameworks",
        items: ["Spring Boot", "React", "Node.js"]
    },
    {
        category: "AI / Automation",
        items: ["ChatGPT", "GitHub Copilot", "Playwright", "Selenium"]
    },
    {
        category: "Databases",
        items: ["MySQL", "SQL Server", "Firebase Realtime Database"]
    },
    {
        category: "DevOps",
        items: ["GitHub Actions", "GCP", "Vercel"]
    },
    {
        category: "Libraries",
        items: ["Axios", "Lombok", "TensorFlow", "HeroUI", "Rest Assured"]
    },
    {
        category: "UI/UX",
        items: ["HTML", "CSS", "Tailwind CSS"]
    },

    {
        category: "Markup & Config",
        items: ["YAML", "XML"]
    }, {
        category: "Tools",
        items: ["Git", "Postman", "VSCode", "IntelliJ", "Swagger", "Maven", "Gradle", "Android Studio", "Vite"]
    },
];

export default function SkillsSection() {
    return (
        <section className="p-6 md:p-12 bg-gradient-to-b shadow-md max-w-4xl mx-auto transition-colors duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, idx) => (
                    <CardSpotlight
                        key={idx}
                        className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm hover:shadow-md transition-colors"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 relative z-20">{skill.category}</h3>
                        <ul className="flex flex-wrap gap-2">
                            {skill.items.map((item, i) => (
                                <li
                                    key={i}
                                    className={`relative z-20 flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors duration-300 bg-slate-100 dark:bg-gray-700 text-slate-800 dark:text-gray-200 ${randomGradient()}`}       >
                                    <span className="text-lg">{iconMap[item] ?? ""}</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </CardSpotlight>
                ))}
            </div>
        </section>
    );
}

