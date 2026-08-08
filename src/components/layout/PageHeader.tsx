import { ChevronsLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PrimaryNav from "./PrimaryNav";

/**
 * Shared header row for top-level list pages (Projects, Speaking, Blog).
 *
 * Layout (desktop):
 *
 *   <<  {title}                       Home | Blog | Contact
 *
 * The chevron is a real <Link to={backTo}>, not a click handler. Its
 * accessible name is the `backLabel` so screen-reader users hear the
 * destination, not just a decorative arrow.
 *
 * On narrow screens the right-side nav wraps below the title — we never
 * compress labels until they overlap, and we never introduce a hamburger
 * menu for three items.
 */
interface Props {
    title: string;
    backTo?: string;
    backLabel?: string;
    /** Right-side override. Defaults to the shared Primary nav. */
    nav?: React.ReactNode;
}

export default function PageHeader({
    title,
    backTo = "/",
    backLabel = "Back to home",
    nav,
}: Props) {
    return (
        <div className="container">
            <div className="flex flex-wrap gap-5 items-center justify-between my-7">
                <div className="flex gap-5 items-center">
                    <Link
                        to={backTo}
                        aria-label={backLabel}
                        className="inline-flex items-center focus-visible:outline-none focus-visible:text-cyan-500 rounded"
                    >
                        <ChevronsLeft
                            className="size-14"
                            aria-hidden="true"
                        />
                    </Link>
                    <h1 className="text-4xl font-extrabold">{title}</h1>
                </div>
                {nav ?? <PrimaryNav variant="header" />}
            </div>
        </div>
    );
}