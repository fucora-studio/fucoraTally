import Link from "vinext/shims/link";

export default function NavBar() {
    return (
        <div className="flex flex-row justify-between bg-[var(--color-primary1)] p-5">
            <Link href="/tracker"><img src="x" alt="Tally Logo" className="pl-5"/></Link>
            <Link href="/changelog" className="pr-5">Change Log</Link>
        </div>
    )
}