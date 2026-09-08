"use client"

import NavBar from "@/components/Navbar";
import { useState } from "react";

export default function Tracker() {
    const [courseCode, setCourseCode] = useState("");
    const [term, setTerm] = useState("");
    const [location, setLocation] = useState("");

    return (
        <NavBar/>

    )
}