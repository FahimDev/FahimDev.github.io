import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { SPEAKINGS } from "@/constants/speakings";
import { ChevronsLeft, Mic2, GraduationCap, Wrench, Users, Video } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// Type icon mapping. Drive the small pill on every card so the user can
// scan the archive at a glance.
const TYPE_META: Record<string, { label: string; icon: any }> = {
    conference: { label: "Conference", icon: Mic2 },
    "guest-lecture": { label: "Guest Lecture", icon: GraduationCap },
    workshop: { label: "Workshop", icon: Wrench },
    panel: { label: "Panel", icon: Users },
    "live-teaching": { label: "Live Teaching", icon: Video },
};

const ALL_TYPES = [
    "all",
    "live-teaching",
    "conference",
    "guest-lecture",
    "panel",
    "workshop",
] as const;

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const yearOf = (iso: string): number => {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? 0 : d.getFullYear();
};

export default function Speakings() {
    const [activeType, setActiveType] = useState<(typeof ALL_TYPES)[number]>("all");

    // Sorted newest-first by date.
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
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by speaking type">
                    {ALL_TYPES.map((t) => {
                        const isActive = activeType === t;
                        const label = t === "all" ? "All" : TYPE_META[t]?.label ?? t;
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
                                {label}
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Featured card */}
            {featured && (
                <section className="pb-10">
                    <div className="container">
                        <FeaturedCard item={featured} />
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
                                    <SpeakingCardItem key={s.slug ?? idx} item={s} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function FeaturedCard({ item }: { item: any }) {
    const Type = TYPE_META[item.type]?.icon ?? Mic2;
    const typeLabel = TYPE_META[item.type]?.label ?? item.type;
    return (
        <Card className="bg-background rounded-xl overflow-hidden border-2 border-primary/20">
            <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                    <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-72 md:h-full object-cover"
                    />
                    <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        <Type className="size-3" />
                        {typeLabel}
                    </span>
                </div>
                <div className="p-6 flex flex-col gap-3 justify-center">
                    <div className="text-sm text-muted-foreground">
                        {formatDate(item.date)}
                        {item.endDate && item.endDate !== item.date
                            ? ` — ${formatDate(item.endDate)}`
                            : ""}{" "}
                        · {item.location}
                    </div>
                    <h2 className="text-3xl font-bold leading-tight">{item.title}</h2>
                    <p className="text-base text-muted-foreground">{item.subtitle}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {item.tags?.map((t: string) => (
                            <span
                                key={t}
                                className="text-xs bg-secondary px-2 py-1 rounded-md"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                    <Link
                        to={`/speaking/${item.slug}`}
                        className="text-cyan-500 font-bold hover:underline mt-2"
                    >
                        Read full recap →
                    </Link>
                </div>
            </div>
        </Card>
    );
}

function SpeakingCardItem({ item }: { item: any }) {
    const Type = TYPE_META[item.type]?.icon ?? Mic2;
    const typeLabel = TYPE_META[item.type]?.label ?? item.type;
    return (
        <Card className="bg-background rounded-xl h-[22rem] flex flex-col justify-between w-80 relative">
            <div className="relative">
                <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-44 rounded-t-xl object-cover"
                />
                <span className="absolute top-2 left-2 inline-flex items-center gap-1 bg-black/70 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    <Type className="size-3" />
                    {typeLabel}
                </span>
            </div>
            <CardContent className="flex flex-col gap-1 pt-6">
                <div className="text-xs text-muted-foreground">
                    {formatDate(item.date)} · {item.location}
                </div>
                <h3 className="text-lg font-bold leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.subtitle}
                </p>
            </CardContent>
            <CardFooter>
                <Link
                    to={`/speaking/${item.slug}`}
                    className="text-sm text-cyan-500 font-bold hover:underline"
                >
                    Read more
                </Link>
            </CardFooter>
        </Card>
    );
}
