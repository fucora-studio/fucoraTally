"use client";
import { Assessment, error, ReturnData } from "@/lib/interface";
import { useState } from "react";

// Make sure this interface has 4 parameters, matching what Tracker passes it!
interface CourseFormProps {
    onSubmit: (resultData: ReturnData[], courseCode: string, term: string, location: string) => void;
}

export default function CourseForm({ onSubmit }: CourseFormProps) {
    const [courseCode, setCourseCode] = useState("");
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");
    const [data, setData] = useState<ReturnData[] | null> (null);
    const [locOpt, setLocOpt] = useState<number>(0);
    const [error, setError] = useState<error>({ error: false, message: "" });

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        try{
            console.log("Submitting with:", { courseCode, term, location });
            const res = await fetch("/api/getData", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ courseCode, term, location })
            });
            const result:ReturnData[] = await res.json();
            console.log("Received data:", result);
            onSubmit(result, courseCode, term, location); 
        } catch (e) {
            console.error("Error encountered:", e);
            const errorMessage = e instanceof Error ? e.message : String(e);
            setError({error:true, message: errorMessage});
        }
    }

    return (
        <div>
            <div className="flex flex-col justify-start p-5 min-[1442px]:w-[18vw] bg-gray-500 h-screen">
                <form className="flex flex-col justify-start p-5 min-[1442px]:w-[15vw]" onSubmit={handleSubmit}>
                    <p>CourseCode:</p>
                    <input required type="text" placeholder="AAAA1111"
                        className="border-3px-solid-black rounded-md p-1"
                        value={courseCode} 
                        onChange={(e) => setCourseCode(e.target.value.toUpperCase())}
                    />
    
                    <p>Term:</p>
                    <input required type="text" placeholder="1" value={term} onChange={(e) => setTerm(e.target.value)} />
    
                    <p>Location:</p>
                    <div className="flex flex-row justify-between w-full">
                        <button type="button" 
                            className={`rounded-lg text-white p-2 active:bg-blue-700 ${locOpt == 1? "bg-blue-700" : "bg-blue-500 "}`}
                            onClick={() => {
                                setLocation("Kensington");
                                setLocOpt(1);
                            }}>
                            Kensington
                        </button>
                        <button type="button" 
                                className={`rounded-lg text-white p-2 active:bg-blue-700 ${locOpt == 2? "bg-blue-700" : "bg-blue-500 "}`}
                                onClick={() => {
                                    setLocation("Paddington");
                                    setLocOpt(2);
                                }}>
                            Paddington
                        </button>
                    </div>
    
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-3 px-4 rounded-md">
                        Submit
                    </button>
                </form>
                {error.error && <p className="text-red-500">Error fetching data: {error.message}</p>}
            </div>
        </div>
    )
}