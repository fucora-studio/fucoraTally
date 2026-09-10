"use client";

import CourseForm from "@/components/CourseForm";
import NavBar from "@/components/Navbar";
import CourseCard from "@/components/TrackerCard/CourseCard";
import DummyData from "@/lib/dump";
import { Assessment, ReturnData } from "@/lib/interface";
import { useState } from "react";


export default function Tracker() {
    // Keep these because your parent display UI relies on them!
    const [datas, setData] = useState<ReturnData[] | null>(DummyData);

    // 1. Create a function that maps the variables coming out of the form to your page state
    const handleFormSubmit = (resultData: ReturnData, formCourse: string, formTerm: string, formLoc: string) => {
        // Append or replace the data (using append logic since your original code did that)
        setData(prevItems => [...(prevItems || []), resultData]);
        // Update the textual titles on the page
        console.log("Received data:", resultData);  
    };

    return (
        <div>
            <NavBar/>
            <div className="flex flex-row">
                <CourseForm onSubmit={handleFormSubmit} />

                <div className="grid grid-cols-3 gap-4 p-5 min-[1442px]:w-[85vw] h-screen">
                    {datas != null && datas.map((data, index) =>
                        <div key={index}>
                            <CourseCard input={data}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
