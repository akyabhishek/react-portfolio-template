import {
    SiAndroidstudio,
    SiApachemaven,
    SiAxios,
    SiCss3,
    SiDocker,
    SiFigma,
    SiFirebase,
    SiGit,
    SiGithub,
    SiGithubactions,
    SiGooglecloud,
    SiGradle,
    SiHtml5,
    SiIntellijidea,
    SiJavascript,
    SiLangchain,
    SiMysql,
    SiNextdotjs,
    SiNodedotjs,
    SiPostman,
    SiPython,
    SiReact,
    SiSelenium,
    SiSpringboot,
    SiSwagger,
    SiTailwindcss,
    SiTensorflow,
    SiTypescript,
    SiVercel,
    SiVite,
    SiYaml
} from "react-icons/si";
import {FaJava} from "react-icons/fa";
import {VscVscode} from "react-icons/vsc";
import {BsFiletypeXml} from "react-icons/bs";
import {DiMsqlServer} from "react-icons/di";
import {GoCopilot} from "react-icons/go";
import {CardSpotlight} from "./ui/card-spotlight";


const iconMap: Record<string, JSX.Element> = {
    Java: <FaJava />,
    TypeScript: <SiTypescript />,
    JavaScript: <SiJavascript />,
    "Spring Boot": <SiSpringboot />,
    ReactJs: <SiReact />,
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
    "GitHub Copilot": <GoCopilot />,
    "GitHub": <SiGithub />
    
};
const randomGradient = () => {
    const colors = [
        ['from-slate-700', 'to-slate-900'],
        ['from-indigo-700', 'to-indigo-900'],
        ['from-blue-700', 'to-blue-900'],
        ['from-emerald-700', 'to-emerald-900'],
        ['from-teal-600', 'to-cyan-900'],
        ['from-purple-700', 'to-fuchsia-900'],
        ['from-zinc-700', 'to-neutral-900'],
        ['from-amber-700', 'to-orange-900'],
        ['from-rose-700', 'to-pink-900'],
        ['from-green-700', 'to-lime-900'],
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
        items: ["Spring Boot", "ReactJs", "Node.js"]
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
        items: ["Git", "GitHub","Postman", "VSCode", "IntelliJ", "Swagger", "Maven", "Gradle", "Android Studio", "Vite"]
    },
];

export default function SkillsSection() {
    return (
        <div className="pt-5" id='skills'>
            <h1 className="text-3xl">SKILLS</h1>
            <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    {skills.map((skill, idx) => (
                        <CardSpotlight
                            key={idx}
                            className=" p-4 rounded-md shadow-sm hover:shadow-lg duration-500 ease-in-out transition-all"
                        >
                            <h3 className="text-xl  mb-3 text-grey-700 dark:text-gray-100 relative z-20">{skill.category}</h3>
                            <ul className="flex flex-wrap gap-2">
                                {skill.items.map((item, i) => (
                                    <li
                                        key={i}
                                        className={`relative z-20 flex items-center gap-2 px-3 py-1 rounded-full text-sm transition-colors ease-in-out duration-300 bg-slate-100 dark:bg-zinc-900 text-slate-900 hover:text-slate-100 dark:text-gray-200 ${randomGradient()}`}       >
                                        <span className="text-lg">{iconMap[item] ?? ""}</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardSpotlight>
                    ))}
                </div>
            </section></div>
    );
}

