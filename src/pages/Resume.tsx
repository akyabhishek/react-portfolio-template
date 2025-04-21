import ResumeButton from "@/components/DownloadResumeBtn";


const Resume = () => {
    const pdfUrl = "/ABHISHEK_KUMAR_YADAV_RESUME_2025.pdf";

    return (
        <div className="flex flex-col items-center mt-10 ">

            <iframe
                src={pdfUrl}
                title="PDF Viewer"
                className="w-full min-h-screen rounded shadow "
                style={{ border: "none" }}
            />
            <ResumeButton/>
        </div>
    );
};

export default Resume;
