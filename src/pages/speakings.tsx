import { ChevronsLeft } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SPEAKINGS } from "@/constants/speakings";
import {
    SpeakingCard,
    SpeakingFeatured,
} from "@/components/speaking/SpeakingCard";

const ALL_TYPES = [
    "all",
    "live-teaching",
    "conference",
    "guest-lecture",
    "panel",
    "workshop",
] as const;

const TYPE_LABELS: Record<string, string> = {
    all: "All",
    "live-teaching": "Live Teaching",
    conference: "Conference",
    "guest-lecture": "Guest Lecture",
    panel: "Panel",
    workshop: "Workshop",
};

const yearOf = (iso: string): number => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? 0 : d.getFullYear();
};

export default function Speakings() {
    const [activeType, setActiveType] =
        useState<(typeof ALL_TYPES)[number]>("all");

    // Newest first.
    const sorted = useMemo(
        () =>
            [...SPEAKINGS].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            ),
        []
    );

    const filtered = useMemo(
        () =>
            activeType === "all"
                ? sorted
                : sorted.filter((s) => s.type === activeType),
        [sorted, activeType]
    );

    const featured = filtered.find((s) => s.featured) ?? filtered[0] ?? null;
    const rest = filtered.filter((s) => s !== featured);

    // Group the remaining entries by year (descending).
    const grouped = useMemo(() => {
        const buckets = new Map<number, any[]>();
        for (const s of rest) {
            const y = yearOf(s.date);
            if (!buckets.has(y)) buckets.set(y, []);
            buckets.get(y)!.push(s);
        }
        return [...buckets.entries()].sort((a, b) => b[0] - a[0]);
    }, [rest]);

    return (
        <div>
            <div className="container">
                <div className="flex gap-5 items-center my-7">
                    <Link to="/">
                        <ChevronsLeft className="size-14" />
                    </Link>
                    <h1 className="text-4xl font-extrabold">Speaking</h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl mb-7">
                    Conferences, guest lectures, workshops, panels, and live
                    teaching. Each entry links to the recorded session, the
                    slide deck, and any related work.
                </p>
            </div>

            {/* Type filter chips */}
            <section className="container pb-6">
                <div
                    className="flex flex-wrap gap-2"
                    role="tablist"
                    aria-label="Filter by speaking type"
                >
                    {ALL_TYPES.map((t) => {
                        const isActive = activeType === t;
                        return (
                            <button
                                key={t}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => setActiveType(t)}
                                className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                    isActive
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background text-foreground border-border hover:bg-secondary"
                                }`}
                            >
                                {TYPE_LABELS[t] ?? t}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Featured card */}
            {featured && (
                <section className="pb-10">
                    <div className="container">
                        <SpeakingFeatured item={featured} />
                    </div>
                </section>
            )}

            {/* Year-grouped grid */}
            <section className="pb-10">
                <div className="container space-y-10">
                    {grouped.length === 0 && (
                        <p className="text-muted-foreground">
                            No speaking engagements yet for this filter.
                        </p>
                    )}
                    {grouped.map(([year, items]) => (
                        <div key={year}>
                            <h2 className="text-2xl font-bold mb-5">{year}</h2>
                            <div className="flex flex-wrap justify-center gap-5">
                                {items.map((s, idx) => (
                                    <SpeakingCard
                                        key={s.slug ?? idx}
                                        item={s}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
