import { ReturnData } from "@/lib/interface";

export default function CourseCard( { input }: { input: ReturnData } ) {
    return (
        <div className="bg-[var(--color-primary2)] rounded-lg p-4 flex flex-col">
                <h2>{input.code} : {input.courseName} </h2>
            
            <ul>
                {input.assessment.map((a, i) => (
                    <li key={i}>
                        <strong>{a.name}</strong> - Weight: {a.weight}
                    </li>
                ))}
            </ul>
        </div>
    )
}