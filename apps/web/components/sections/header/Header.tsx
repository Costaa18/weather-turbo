import { ModeToggle } from "../../ui/toggle-mode";

export default function Header() {
    return (
        <>
            <header className="flex items-center justify-between p-4 border-b-2 border-text-foreground mb-4">
                <h1 className="text-2xl font-bold">Weather App</h1>

                <ModeToggle />
            </header>
        </>
    )
}