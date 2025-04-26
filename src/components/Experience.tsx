// Timeline.tsx
import React from 'react';
import { TextAnimate } from './magicui/text-animate';
import { GlowingEffect } from './ui/glowing-effect';

// Define the type for each timeline entry
interface TimelineItemProps {
    title: string;
    company: string;
    description: string;
    from: string;
    to: string;
    logoPath?: string;
}
const calculateDuration = (from: string, to: string): string => {
    const [fromMonth, fromYear] = from.split('/').map(Number);
    const [toMonth, toYear] = to.toLowerCase() === 'present'
        ? [new Date().getMonth() + 1, new Date().getFullYear()]
        : to.split('/').map(Number);

    let totalMonths = (toYear - fromYear) * 12 + (toMonth - fromMonth) + 1; // +1 to include both months
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    const yearText = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthText = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
    return [yearText, monthText].filter(Boolean).join(' ');
};
// Timeline item component
const TimelineItem: React.FC<TimelineItemProps> = ({ title, company, description, from, to, logoPath }) => (
    <div className="relative w-full ">
        <div className="absolute -left-[1.95rem] top-10 transition-none">
            <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-gray-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
        </div>
        <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D]">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
                    <div><div className="flex items-center">
                        <p className="text-xl text-gray-400 mb-1">{company}</p>
                    </div>
                        <h4 className="font-bold text-green-600"><TextAnimate animation="blurInUp" by="character" once >{title}</TextAnimate></h4>
                        <p className="mt-1 max-w-screen-sm text-sm text-gray-500">{description}</p>
                        <span className="mt-1 block text-sm  text-gray-400">
                            {from} — {to} · {calculateDuration(from, to)}
                        </span>
                    </div></div></div></div>
    </div>
);

// Define the type for the array of timeline data
interface TimelineData {
    title: string;
    company: string;
    description: string;
    from: string;
    to: string;
    logoPath?: string;
}

// Static data for the timeline
const timelineData: TimelineData[] = [
    {
        title: 'Programmer Analyst - GN',
        company: 'Cognizant Technology Solutions',
        description: 'Developed and enhanced the ECS backend applicationfor American Airlines, enabling communication between client applications and pilots',
        from: '09/2023',
        to: 'Present',
    },
    {
        title: 'Intern',
        company: 'Cognizant Technology Solutions',
        description: 'Developed RESTful APIs using Java and Spring Boot, integrating MySQL for backend data management.',
        from: '03/2023',
        to: '08/2023',
        logoPath: '/assets/CTSH.png',
    }
];

// Main Timeline component
const ExperienceSection: React.FC = () => (
    <div className="pt-5" id='experience'>
        <h1 className="text-3xl">EXPERIENCE</h1>
        <section className="p-3 md:p-6 bg-gradient-to-b shadow-md max-w-4xl mx-auto transition-colors duration-300">
            <div className="space-y-6 border-l-2 border-dotted pl-6 py-3 rounded-3xl">
                {timelineData.map((item, index) => (
                    <TimelineItem key={index} {...item} />
                ))}
            </div>
        </section>
    </div>
);

export default ExperienceSection;
