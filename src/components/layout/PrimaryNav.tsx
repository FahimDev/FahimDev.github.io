import { Link, NavLink } from "react-router-dom";

/**
 * Site-wide top-level navigation. Three deterministic destinations:
 *   Home    → /
 *   Blog    → /blogs   (canonical blog route; visible label stays singular)
 *   Contact → /#contact (homepage section anchor)
 *
 * Every destination is a real anchor (React Router renders <a href> for
 * both <Link> and <NavLink>). No click handlers, no history.back().
 *
 * aria-current="page" is applied to the entry whose path matches the
 * current location, so screen readers announce the active page without
 * relying on visual treatment alone (color contrast is not the only
 * signal).
 *
 * `variant` controls the surrounding chrome:
 *   - "bar"      → inline pipe-separated row that fits inside the
 *                  MacBox browser-window title bar (current homepage look)
 *   - "header"   → standalone row that sits above the page <h1> on
 *                  list pages, with the same separators and spacing
 */
interface Props {
    variant?: "bar" | "header";
    className?: string;
}

const linkBase =
    "text-base font-bold transition-colors hover:text-cyan-500 focus-visible:text-cyan-500 focus-visible:outline-none";

export default function PrimaryNav({ variant = "bar", className = "" }: Props) {
    // Visual treatment is identical between variants. The only difference
    // is layout: bar keeps the leading pipe-style separator that already
    // exists in the MacBox title bar; header uses a small horizontal
    // gutter so it can stand alone above an <h1>.
    const rowClass =
        variant === "header"
            ? `flex items-center gap-3 ${className}`
            : `flex gap-2 ${className}`;

    return (
        <nav aria-label="Primary" className={rowClass}>
            <NavLink
                to="/"
                end
                aria-current={undefined}
                className={({ isActive }) =>
                    `${linkBase} ${isActive ? "text-cyan-500" : ""}`
                }
            >
                {({ isActive }) => (
                    <span
                        {...(isActive ? { "aria-current": "page" as const } : {})}
                    >
                        Home
                    </span>
                )}
            </NavLink>

            {variant === "bar" && (
                <span aria-hidden="true" className="font-bold">
                    |
                </span>
            )}
            {variant === "header" && (
                <span aria-hidden="true" className="text-border">
                    |
                </span>
            )}

            <NavLink
                to="/blogs"
                className={({ isActive }) =>
                    `${linkBase} ${isActive ? "text-cyan-500" : ""}`
                }
            >
                {({ isActive }) => (
                    <span
                        {...(isActive ? { "aria-current": "page" as const } : {})}
                    >
                        Blog
                    </span>
                )}
            </NavLink>

            {variant === "bar" && (
                <span aria-hidden="true" className="font-bold">
                    |
                </span>
            )}
            {variant === "header" && (
                <span aria-hidden="true" className="text-border">
                    |
                </span>
            )}

            <Link to="/#contact" className={linkBase}>
                Contact
            </Link>
        </nav>
    );
}