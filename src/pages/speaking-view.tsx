import { Link, useParams } from "react-router-dom";
import { useMemo } from "react";
import { Calendar, MapPin, Building2, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SPEAKINGS } from "@/constants/speakings";
import { SpeakingCard, TYPE_META } from "@/components/speaking/SpeakingCard";
import { SpeakingGallery } from "@/components/speaking/SpeakingGallery";
import { SpeakingEvidence } from "@/components/speaking/SpeakingEvidence";
import { HistoricalRecord } from "@/components/speaking/HistoricalRecord";
import Breadcrumb from "@/components/layout/Breadcrumb";
import { useRouteSeo } from "@/seo/useRouteSeo";

const formatDate = (iso: string): string => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
};

const formatDateRange = (start: string, end?: string): string => {
    if (!end || end === start) return formatDate(start);
    const s = new Date(start);
    const e = new Date(end);
    if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return start;
    const sameMonth =
        s.getFullYear() === e.getFullYear() && s.getMonth() === e.getMonth();
    if (sameMonth) {
        return `${s.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
        })} – ${e.getDate()}, ${e.getFullYear()}`;
    }
    return `${formatDate(start)} – ${formatDate(end)}`;
};

export default function SpeakingView() {
    const { slug } = useParams<{ slug: string }>();

    const item = useMemo(
        () => SPEAKINGS.find((s) => s?.slug === slug),
        [slug]
    );

    if (!item) {
        return (
            <div className="container my-16 text-center">
                <h1 className="text-3xl font-bold">Speaking not found</h1>
                <p className="text-muted-foreground mt-2">
                    The talk you're looking for doesn't exist or has been
                    removed.
                </p>
                <Link
                    to="/speaking"
                    className="text-cyan-500 font-bold hover:underline mt-4 inline-block"
                >
                    ← Back to all speaking
                </Link>
            </div>
        );
    }

    // SEO head is wired centrally via ROUTE_META. The hook reads the
    // current route's meta and injects it into the document head.
    useRouteSeo();

    const related = useMemo(
        () =>
            SPEAKINGS.filter(
                (s) => s.slug !== item.slug && s.type === item.type
            ).slice(0, 3),
        [item]
    );

    const Type = TYPE_META[item.type]?.icon;
    const typeLabel = TYPE_META[item.type]?.label ?? item.type;

    return (
        <div className="container">
            {/* Breadcrumb: Home / Speaking / Current Event. The last item
                is the current page and gets aria-current="page". */}
            <Breadcrumb
                items={[
                    { label: "Home", to: "/" },
                    { label: "Speaking", to: "/speaking" },
                    { label: item.title },
                ]}
            />

            {/* Hero */}
            <section className="grid md:grid-cols-2 gap-8 pb-8">
                <div className="relative">
                    <img
                        src={item.cover}
                        alt={item.title}
                        className="w-full h-72 md:h-[28rem] object-cover rounded-xl"
                    />
                    {item.featured && (
                        <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                            Featured
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-3 justify-center">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-cyan-500 uppercase tracking-wider">
                        {Type && <Type className="size-4" />}
                        {typeLabel}
                    </div>
                    <h1 className="text-4xl font-extrabold leading-tight">
                        {item.title}
                    </h1>
                    {item.subtitle && (
                        <p className="text-lg text-muted-foreground">
                            {item.subtitle}
                        </p>
                    )}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags?.map((t: string) => (
                            <span
                                key={t}
                                className="text-xs bg-secondary px-2 py-1 rounded-md"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Metadata table */}
            <section className="pb-8">
                <Card>
                    <CardContent className="p-0">
                        <table className="w-full text-sm">
                            <tbody>
                                <tr className="border-b border-border">
                                    <th className="text-left p-4 font-semibold w-1/3 md:w-1/4 align-top">
                                        <span className="inline-flex items-center gap-2">
                                            <Calendar className="size-4 text-cyan-500" />
                                            Date
                                        </span>
                                    </th>
                                    <td className="p-4">
                                        {formatDateRange(item.date, item.endDate)}
                                    </td>
                                </tr>
                                <tr className="border-b border-border">
                                    <th className="text-left p-4 font-semibold align-top">
                                        <span className="inline-flex items-center gap-2">
                                            <MapPin className="size-4 text-cyan-500" />
                                            Location
                                        </span>
                                    </th>
                                    <td className="p-4">{item.location}</td>
                                </tr>
                                <tr className="border-b border-border">
                                    <th className="text-left p-4 font-semibold align-top">
                                        <span className="inline-flex items-center gap-2">
                                            <Building2 className="size-4 text-cyan-500" />
                                            Host
                                        </span>
                                    </th>
                                    <td className="p-4">
                                        <div className="font-medium">
                                            {item.host}
                                        </div>
                                        {item.role && (
                                            <div className="text-muted-foreground">
                                                {item.role}
                                            </div>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <th className="text-left p-4 font-semibold align-top">
                                        <span className="inline-flex items-center gap-2">
                                            <Tag className="size-4 text-cyan-500" />
                                            Topics
                                        </span>
                                    </th>
                                    <td className="p-4">
                                        <div className="flex flex-wrap gap-2">
                                            {item.topics?.map((t: string) => (
                                                <span
                                                    key={t}
                                                    className="text-xs bg-secondary px-2 py-1 rounded-md"
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </section>

            {/* Summary + interaction. `summary` may be a plain string or a
                JSX element (mirroring how `description` is rendered on the
                project page), so render it directly without a wrapping
                <p> — a <p> cannot legally contain a <div>, and putting a
                JSX object inside a <p> throws "Objects are not valid as a
                React child". */}
            <section className="pb-8 max-w-3xl">
                <h2 className="text-2xl font-bold mb-3">Summary</h2>
                <div className="text-base text-muted-foreground leading-relaxed space-y-3">
                    {item.summary}
                </div>
                {/* `interaction` is an array of strings (one entry per
                    channel of audience engagement). Items may also be
                    JSX — render as a bulleted list to match the visual
                    style of `topics` and `keyTakeaways`. */}
                {Array.isArray(item.interaction) && item.interaction.length > 0 && (
                    <div className="mt-5">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground mb-2">
                            Format & Audience Interaction
                        </h3>
                        <ul className="list-disc pl-6 space-y-1 text-base text-muted-foreground">
                            {item.interaction.map((t: any, i: number) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            {/* Key takeaways */}
            {item.keyTakeaways?.length ? (
                <section className="pb-8">
                    <h2 className="text-2xl font-bold mb-3">Key Takeaways</h2>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        {item.keyTakeaways.map((t: string) => (
                            <li key={t}>{t}</li>
                        ))}
                    </ul>
                </section>
            ) : null}

            {/* Archival admin record (invoice, payment, etc.). Renders
                with data-nosnippet inside the component so search engines
                ignore it. Only shown when the entry opts in. */}
            {item.historicalRecord ? (
                <HistoricalRecord record={item.historicalRecord} />
            ) : null}

            {/* Gallery */}
            {item.photos?.length ? (
                <section className="pb-8">
                    <h2 className="text-2xl font-bold mb-3">Photos</h2>
                    <SpeakingGallery photos={item.photos} />
                </section>
            ) : null}

            {/* Evidence */}
            {item.evidence?.length ? (
                <section className="pb-8">
                    <h2 className="text-2xl font-bold mb-3">Evidence</h2>
                    <SpeakingEvidence items={item.evidence} />
                </section>
            ) : null}

            {/* Related */}
            {related.length ? (
                <section className="pb-8">
                    <h2 className="text-2xl font-bold mb-5">
                        More from this series
                    </h2>
                    <div className="flex flex-wrap justify-center gap-5">
                        {related.map((r) => (
                            <SpeakingCard key={r.slug} item={r} />
                        ))}
                    </div>
                </section>
            ) : null}

            {/* CTA */}
            <section className="pb-16">
                <Card>
                    <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold">
                                Invite me to speak
                            </h3>
                            <p className="text-muted-foreground">
                                Open to conferences, guest lectures, and
                                workshops on web infrastructure, blockchain, and
                                regulated systems.
                            </p>
                        </div>
                        <Button asChild>
                            <a href="/#contact">Get in touch</a>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
