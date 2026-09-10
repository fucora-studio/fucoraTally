"use client";

import CourseForm from "@/components/CourseForm";
import NavBar from "@/components/Navbar";
import { Assessment, ReturnData } from "@/lib/interface";
import { useState } from "react";


export default function Tracker() {
    // Keep these because your parent display UI relies on them!
    const [courseCode, setCourseCode] = useState("");
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");
    const [data, setData] = useState<ReturnData[] | null>(null);

    // 1. Create a function that maps the variables coming out of the form to your page state
    const handleFormSubmit = (resultData: ReturnData[], formCourse: string, formTerm: string, formLoc: string) => {
        // Append or replace the data (using append logic since your original code did that)
        setData(prevItems => [...(prevItems || []), ...resultData]);
        // Update the textual titles on the page
        setCourseCode(formCourse);
        setTerm(formTerm);
        setLocation(formLoc);
        console.log("Received data:", resultData);
    };

    return (
        <div>
            <NavBar/>
            <div className="flex flex-row">
                <CourseForm onSubmit={handleFormSubmit} />

                <div className="grid grid-cols-1 gap-4 p-5 min-[1442px]:w-[85vw] bg-blue-400 h-screen">
                    {data && data.length > 0 && (
                        <div>
                            {/* Shows the course code and info passed from the child */}
                            <h2 className="text-xl font-bold">{courseCode} (Term {term} - {location}):</h2>
                            <ul> 
                                {data.map((courseData, index) => (
                                    <li key={index} className="bg-white p-2 my-2 rounded text-black">
                                        <p>C{courseData.code} : {courseData.courseName}</p>
                                        <ul>
                                            {courseData.assessment.map((assessment, subIndex) => (
                                                <li key={subIndex}>
                                                    <p>Name: {assessment.name}</p>
                                                    <p>Weight: {assessment.weight}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
