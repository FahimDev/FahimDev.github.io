import { EVIDENCE_ICONS } from "@/constants/speakings";
import { Link2, ExternalLink } from "lucide-react";

type EvidenceItem = {
    label: string;
    url: string;
    icon?: string; // key into EVIDENCE_ICONS
    description?: string;
};

/**
 * Tiles of external proof: slides, recording, transcript, press coverage.
 * If the entry has no icon key, fall back to a generic link icon so the
 * row never renders empty.
 */
export function SpeakingEvidence({ items }: { items: EvidenceItem[] }) {
    if (!items?.length) return null;

    return (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map((ev) => {
                const Icon = (ev.icon && EVIDENCE_ICONS[ev.icon]) || Link2;
                return (
                    <li key={ev.url}>
                        <a
                            href={ev.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 rounded-lg border border-border bg-background hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <Icon className="size-5 text-cyan-500 shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm flex items-center gap-1">
                                    {ev.label}
                                    <ExternalLink className="size-3 text-muted-foreground" />
                                </div>
                                {ev.description && (
                                    <div className="text-xs text-muted-foreground line-clamp-2">
                                        {ev.description}
                                    </div>
                                )}
                            </div>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}