import { TracingBeam } from "@/components/ui/tracing-beam";
import { Separator } from "@/components/ui/separator";

export default function Resume(): JSX.Element {
  return (
    <>
      <TracingBeam className="px-6 pb-20">
        <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-4 space-x-3 pt-4">
          {/* Resume Card */}
          <div className="w-full max-w-4xl bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6">
            {/* Header Section: Name & Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-neutral-800 dark:text-white">
                Abhishek Kumar Yadav
              </h1>
              <p className="text-xl text-neutral-600 dark:text-neutral-300">
                Programmer Analyst
              </p>
              <div className="text-sm mt-2 space-x-3 text-gray-600">
                <a href="tel:+918299837402">
                  <i className="fas fa-phone"></i> 8299837402
                </a>
                <a href="mailto:aky.abhishekkumaryadav@gmail.com">
                  <i className="fas fa-envelope"></i>{" "}
                  aky.abhishekkumaryadav@gmail.com
                </a>
                <a href="https://www.linkedin.com/in/abhishekkumaryadav/">
                  <i className="fab fa-linkedin"></i> abhishekkumaryadav
                </a>
                <a href="https://github.com/akyabhishek">
                  <i className="fab fa-github"></i> akyabhishek
                </a>
              </div>
            </div>
            <Separator className="my-4" />

            {/* <!-- Professional Experience Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">
                Professional Experience
              </h2>

              {/* <!-- Job 1 --> */}
              <div className="mb-6">
                <h3 className="text-xl ">Cognizant Technology Solutions</h3>
                <p className="text-sm text-gray-600">
                  Programmer Analyst | 09/2023 - Present | Noida, Uttar Pradesh
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm font-extralight">
                  <li>
                    Developed and enhanced the ECS backend application for
                    American Airlines, enabling communication between client
                    applications and pilots.
                  </li>
                  <li>
                    Implemented admin functionality, pilot lookup, and a two-way
                    communication feature using Java, Spring Boot, Spring
                    Security, Spring Data JPA, SQL Server.
                  </li>
                </ul>
              </div>

              {/* <!-- Job 2 --> */}
              <div className="mb-6">
                <h3 className="text-xl">
                  <a href="https://drive.google.com/file/d/1chx1EAJndKB7hpMLHfJhsF7MmpMw5_Fp/view?usp=drive_link">
                    Cognizant Technology Solutions
                  </a>
                </h3>
                <p className="text-sm text-gray-600">
                  Intern | 03/2023 - 08/2023 | Noida, Uttar Pradesh
                </p>
                <ul className="list-disc pl-5 mt-2 text-sm">
                  <li>
                    Developed RESTful APIs using Java and Spring Boot,
                    integrating MySQL for backend data management.
                  </li>
                  <li>
                    Implemented microservices architecture to enhance modularity
                    and scalability of the application.
                  </li>
                  <li>
                    Gained proficiency in Java, Spring Boot, Spring Security,
                    Spring Data JPA, MySQL, ReactJS, and microservices during
                    the internship.
                  </li>
                  <li>
                    Won the{" "}
                    <a
                      href="https://drive.google.com/file/d/1dNchxiCpY9UvcTJby7On_2tAzeMZUEal/view?usp=drive_link"
                      className="text-blue-600"
                    >
                      GenC Super Squad award
                    </a>
                    .
                  </li>
                </ul>
              </div>
            </section>

            {/* <!-- Personal Projects Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Personal Projects</h2>

              <div className="mb-6">
                <h3 className="text-xl">
                  <a
                    href="https://github.com/akyabhishek/Bhraman"
                    className="text-blue-600"
                  >
                    Bhraman - Android App
                  </a>
                </h3>
                <p className="text-sm text-gray-600">
                  An AR app for students to scan 2D images of Indian culture and
                  heritage, presenting real-time 3D augmented models.
                </p>
                <p className="mt-2">
                  <strong>Technologies Used:</strong> Java, XML, TensorFlow,
                  Python, Firebase, Android Studio
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Developed Java-based backend with Firebase for database
                    management and authentication.
                  </li>
                  <li>
                    Implemented TensorFlow-based CNN algorithm for image
                    scanning in the machine learning model.
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.nbytech.edorbit"
                    className="text-blue-600"
                  >
                    edorbit - Android App
                  </a>
                </h3>
                <p className="text-sm text-gray-600">
                  To visualize educational content with the help of cutting-edge
                  technologies.
                </p>
                <p className="mt-2">
                  <strong>Technologies Used:</strong> Android Studio, Java, XML,
                  Firebase
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>
                    Created app's backend using Firebase as NoSQL Realtime DB
                    for efficient data handling.
                  </li>
                  <li>
                    Designed XML layouts with Material Design for enhanced UI.
                  </li>
                </ul>
              </div>
            </section>

            {/* <!-- Technical Skills Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">
                Technical Skills and Interests
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Languages:</strong> Java, TypeScript, JavaScript,
                    Python, HTML, CSS
                  </p>
                  <p>
                    <strong>Frameworks:</strong> Spring Core, Spring Boot,
                    Spring Security, Spring Data JPA, Node.js
                  </p>
                  <p>
                    <strong>Libraries:</strong> ReactJS, Tailwind, Axios,
                    Lombok, TensorFlow
                  </p>
                  <p>
                    <strong>Databases:</strong> MySQL, SQL Server, Firebase
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Tools:</strong> Git, GitHub, GitHub Actions,
                    Swagger, Maven, Gradle, Android Studio, IntelliJ, VS Code,
                    Vite
                  </p>
                  <p>
                    <strong>Cloud Services:</strong> Google Cloud (Cloud SQL,
                    Cloud Storage, App Engine), Vercel
                  </p>
                  <p>
                    <strong>Soft Skills:</strong> Problem-Solving,
                    Communication, Team player
                  </p>
                  <p>
                    <strong>Areas of Interest:</strong> Programming, Web
                    Development, Machine Learning
                  </p>
                </div>
              </div>
            </section>

            {/* <!-- Achievements Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Achievements</h2>

              <div className="mb-6">
                <p>
                  <strong>
                    150+ Problems Solved, 50 Days Badge, Feb Badge
                  </strong>{" "}
                  <a
                    href="https://leetcode.com/mrabk121/"
                    className="text-blue-600"
                  >
                    Leetcode
                  </a>{" "}
                  - 2024
                </p>
              </div>
              <div className="mb-6">
                <p>
                  <strong>Best Academic Project Award (2019 - 2023)</strong>{" "}
                  <a
                    href="https://drive.google.com/file/d/1QvwWHfBMd7lhCty6nPicp3VrSjPCE4nE/view?usp=drive_link"
                    className="text-blue-600"
                  >
                    SRMCEM
                  </a>{" "}
                  - 2023
                </p>
              </div>
              <div className="mb-6">
                <p>
                  <strong>Grand Finalist</strong>{" "}
                  <a
                    href="https://www.linkedin.com/posts/abhishekkumaryadav_sih2022-ministryofeducation-ministryofculture-activity-6971838432453046272-0L-h?utm_source=share&utm_medium=member_desktop"
                    className="text-blue-600"
                  >
                    Smart Indian Hackathon
                  </a>{" "}
                  - 2022
                </p>
              </div>
            </section>

            {/* <!-- Education Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Education</h2>

              <div className="mb-6">
                <h3 className="text-xl font-semibold">
                  Shri Ramswaroop Memorial College of Engineering and Management
                </h3>
                <p className="text-sm text-gray-600">
                  Bachelor of Technology - CSE | CGPA: 8.33/10 | 2023
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold">
                  Hewett Polytechnic Lucknow
                </h3>
                <p className="text-sm text-gray-600">
                  Diploma in Information Technology | Percentage: 75% | 2019
                </p>
              </div>
            </section>

            {/* <!-- Certificates Section --> */}
            <section className="my-10">
              <h2 className="text-2xl font-bold mb-4">Certifications</h2>

              <ul className="list-disc pl-5">
                <li>
                  <a
                    href="https://drive.google.com/file/d/1OhJbdhYn1LhzN6_tnD4ks6ZzCDVHrGjr/view?usp=drive_link"
                    className="text-blue-600"
                  >
                    Advanced Data Structures in Java - Udemy
                  </a>{" "}
                  - 2024
                </li>
                <li>
                  <a
                    href="https://drive.google.com/file/d/1yfZ7h8oYsfLhH5hOqZW8tr2tmr60h4sy/view?usp=drive_link"
                    className="text-blue-600"
                  >
                    Java Programming - Coursera
                  </a>{" "}
                  - 2023
                </li>
                <li>
                  <a
                    href="https://www.udemy.com/certificate/UC-47c5ff68-0ed1-42d8-b501-902b503dc382/"
                    className="text-blue-600"
                  >
                    Building Java Microservices with Spring Boot and Spring
                    Cloud - Udemy
                  </a>{" "}
                  - 2023
                </li>
              </ul>
            </section>
          </div>
        </div>
      </TracingBeam>
    </>
  );
}
