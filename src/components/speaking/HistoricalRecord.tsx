import type { ReactNode } from "react";

/**
 * Shape mirrors the optional `historicalRecord` field on a speaking entry
 * (see constants/speakings.tsx for the field reference). Kept inline
 * here so the component doesn't depend on the loose `any[]` typing of
 * the constants file.
 */
type HistoricalRecordProps = {
    title: string;
    summary: string;
    invoice: RecordSection;
    payment: RecordSection;
    footnote?: string;
};

type RecordSection = {
    heading: string;
    rows: RecordRow[];
};

type RecordRow = {
    label: string;
    value: string | string[];
    multiline?: boolean;
};

/**
 * Render a single value cell. Strings render inline; arrays split onto
 * separate lines (matches the original `Address` block).
 */
function ValueCell({ value, multiline }: { value: string | string[]; multiline?: boolean }) {
    if (Array.isArray(value)) {
        return (
            <span>
                {value.map((line, i) => (
                    <span key={i} className="block">
                        {line}
                    </span>
                ))}
            </span>
        );
    }
    if (multiline) {
        return (
            <span>
                {value.split("\n").map((line, i) => (
                    <span key={i} className="block">
                        {line}
                    </span>
                ))}
            </span>
        );
    }
    return <span>{value}</span>;
}

/**
 * Archival admin block (e.g. invoice + payment record). Carries
 * `data-nosnippet` on the wrapping section so search engines ignore
 * it — useful for private/business data you want visible to visitors
 * but hidden from SERP snippets.
 */
export function HistoricalRecord({ record }: { record: HistoricalRecordProps }) {
    if (!record) return null;

    return (
        <section
            data-nosnippet
            aria-label="Historical administrative record"
            className="pb-8"
        >
            <div className="mt-8 p-6 rounded-2xl border border-border bg-gradient-to-br from-secondary/40 to-primary/10">
                {/* Header */}
                <div className="mb-5">
                    <span className="inline-block mb-2.5 px-2.5 py-1 rounded-full bg-primary/15 text-xs font-semibold uppercase tracking-wider">
                        Historical Record
                    </span>
                    <h3 className="text-xl font-semibold leading-snug mb-2">
                        {record.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {record.summary}
                    </p>
                </div>

                {/* Invoice + Payment cards */}
                <div className="space-y-4">
                    <RecordCard section={record.invoice} />
                    <RecordCard section={record.payment} />
                </div>

                {/* Footnote */}
                {record.footnote && (
                    <p className="mt-4 text-xs text-muted-foreground/80 leading-relaxed">
                        {record.footnote}
                    </p>
                )}
            </div>
        </section>
    );
}

function RecordCard({ section }: { section: RecordSection }) {
    return (
        <div className="p-5 rounded-xl bg-background/60 border border-border">
            <h4 className="text-sm font-bold mb-3.5">{section.heading}</h4>
            <dl className="grid grid-cols-[minmax(8rem,0.8fr)_minmax(0,2fr)] gap-x-5 gap-y-2.5 text-sm leading-relaxed">
                {section.rows.map((row, i) => (
                    <RecordRowFragment key={i} row={row} />
                ))}
            </dl>
        </div>
    );
}

function RecordRowFragment({ row }: { row: RecordRow }) {
    return (
        <>
            <dt className="font-semibold">{row.label}</dt>
            <dd className="text-muted-foreground">
                <ValueCell value={row.value} multiline={row.multiline} />
            </dd>
        </>
    );
}

// Re-export so other modules can pass a JSX override for the title
// (e.g. embed links) without forking the component.
export type { HistoricalRecordProps };
// Keep ReactNode import alive for downstream type-only consumers.
export type _HistoricalRecordChildren = ReactNode;
