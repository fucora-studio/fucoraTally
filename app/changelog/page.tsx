import NavBar from "@/components/Navbar"

export default function changeLog() {
    return(
        <div>
            <NavBar/>
            <div className="h-screen flex justify-center mt-5 overflow-x-hidden bg-yellow-600">
                <h1 className="text-3xl">Change Log</h1>
            </div>
        </div>
    )
}