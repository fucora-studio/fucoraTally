"use client"

import NavBar from "@/components/Navbar";
import { Assessment, error } from "@/lib/interface";
import { useState } from "react";

export default function Tracker() {
    const [courseCode, setCourseCode] = useState("");
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");
    const [data, setData] = useState<Assessment[] | null> (null);
    const [error, setError] = useState<error>({ error: false, message: "" });

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        // e.preventDefault();  
        try{
            const res = await fetch("/api/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ courseCode, term, location })
            });
            const result:Assessment[] = await res.json();
            setData(result);
        } catch (e) {
            console.error("Error encountered:", e);
            const errorMessage = e instanceof Error ? e.message : String(e);
            setError({error:true, message: errorMessage});
        }
    }

    return (
        <div>
            <NavBar/>
            <form className="flex flex-col justify-start p-5 min-[1442px]:w-[15vw]" onSubmit={handleSubmit}>
                <p>CourseCode:</p>
                <input required type="text" placeholder="AAAA1111" value={courseCode} onChange={(e) => setCourseCode(e.target.value.toUpperCase())} />

                <p>Term:</p>
                <input required type="text" placeholder="1" value={term} onChange={(e) => setTerm(e.target.value)} />

                <p>Location:</p>
                <div className="flex flex-row justify-between">
                    <button type="button" onClick={(e) => setLocation("Kensington")}>Kensington</button>
                    <button type="button" onClick={(e) => setLocation("Paddington")}>Paddington</button>
                </div>

                <button type="submit">Submit</button>
            </form>

            {error && <p className="text-red-500">Error fetching data: {error.message}</p>}
            {data && data.length > 0 && (
                <div>
                    <h2>{courseCode}:</h2>
                    <ul> 
                        {data.map((assessment, index) => (
                            <li key={index}>
                                <p>Name: {assessment.name}</p>
                                <p>Weight: {assessment.weight}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}