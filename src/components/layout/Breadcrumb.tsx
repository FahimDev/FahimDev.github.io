import { Link } from "react-router-dom";

export interface BreadcrumbItem {
    label: string;
    /** Absolute path. When omitted, the item is rendered as the current page. */
    to?: string;
}

/**
 * Semantic breadcrumb: <nav aria-label="Breadcrumb"><ol>…</ol></nav>.
 *
 * The last item is always the current page — its <li> gets
 * aria-current="page" and is rendered as text (no <a>), matching the
 * HTML5 "current page indicator" pattern.
 *
 * Visual: small uppercase monospace, cyan separators, no decoration on
 * the current item. Pure hierarchy, not a UX widget.
 */
export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="Breadcrumb" className="container">
            <ol className="flex flex-wrap items-center gap-2 my-5 text-xs uppercase tracking-wider font-mono">
                {items.map((item, idx) => {
                    const isLast = idx === items.length - 1;
                    return (
                        <li
                            key={`${item.label}-${idx}`}
                            className="flex items-center gap-2"
                        >
                            {isLast || !item.to ? (
                                <span
                                    aria-current="page"
                                    className="text-muted-foreground"
                                >
                                    {item.label}
                                </span>
                            ) : (
                                <Link
                                    to={item.to}
                                    className="text-foreground hover:text-cyan-500 focus-visible:text-cyan-500 focus-visible:outline-none"
                                >
                                    {item.label}
                                </Link>
                            )}
                            {!isLast && (
                                <span
                                    aria-hidden="true"
                                    className="text-border"
                                >
                                    /
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}