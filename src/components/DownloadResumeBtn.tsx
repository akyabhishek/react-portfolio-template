import { HoverBorderGradient } from "./ui/hover-border-gradient";

export default function ResumeButton() {
    const pdfUrl = "/ABHISHEK_KUMAR_YADAV_RESUME_2025.pdf";
    return (
        <a
            href={pdfUrl}
            download
        >
            {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#A7F3D0_0%,#10B981_50%,#A7F3D0_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                    Download Resume
                </span>
            </button> */}
            <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="dark:bg-black bg-white text-black dark:text-white flex items-center"
            >
                <span>Download Resume</span>
            </HoverBorderGradient>

        </a>
    );
}