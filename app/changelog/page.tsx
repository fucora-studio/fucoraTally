import HorizontalLine from "@/components/HorizontalLine"
import NavBar from "@/components/Navbar"
import ChangeLog from "@/lib/ChangeLog"

export default function changeLog() {
    return(
        <div>
            <NavBar/>
            <div className="h-screen flex justify-center mt-5 overflow-x-hidden bg-yellow-600">
                <h1 className="text-3xl">Change Log</h1>
                <HorizontalLine/>
                {/* {ChangeLog.map((log, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="text-xl font-bold">{log.version}</h2>
                        <ul className="list-disc list-inside">
                            {log.content.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))} */}
            </div>
        </div>
    )
}