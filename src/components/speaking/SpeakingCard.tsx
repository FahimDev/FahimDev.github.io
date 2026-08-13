import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Mic2, GraduationCap, Wrench, Users, Video, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

// Shared between archive (small grid card) and detail (none yet, but kept
// here so the type metadata lives in one place). Same map that drive
// the detail page's type pill.
const TYPE_META: Record<string, { label: string; icon: any }> = {
    conference: { label: "Conference", icon: Mic2 },
    "guest-lecture": { label: "Guest Lecture", icon: GraduationCap },
    workshop: { label: "Workshop", icon: Wrench },
    panel: { label: "Panel", icon: Users },
    "live-teaching": { label: "Live Teaching", icon: Video },
    "industry-talk": { label: "Industry Talk", icon: Briefcase },
};

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

/**
 * Small grid card used on the archive page. Intentionally minimal —
 * the detail page already has the full prose.
 */
export function SpeakingCard({ item }: { item: any }) {
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

/**
 * Large featured card. Used once at the top of the archive page when a
 * speaking entry is flagged featured, otherwise the most recent entry
 * is promoted automatically.
 */
export function SpeakingFeatured({ item }: { item: any }) {
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
                    <h2 className="text-3xl font-bold leading-tight">
                        {item.title}
                    </h2>
                    <p className="text-base text-muted-foreground">
                        {item.subtitle}
                    </p>
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

export { TYPE_META };