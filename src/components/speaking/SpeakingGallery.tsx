import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

type Photo = {
    src: string;
    alt: string;
    caption?: string;
};

/**
 * Responsive image grid that opens each photo in a native <dialog>-backed
 * lightbox. Using the platform dialog means we get focus trapping, ESC
 * to close, and a clickable backdrop for free.
 */
export function SpeakingGallery({ photos }: { photos: Photo[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    // Sync dialog open/close with state so React owns the truth.
    useEffect(() => {
        const dlg = dialogRef.current;
        if (!dlg) return;
        if (activeIndex !== null && !dlg.open) dlg.showModal();
        if (activeIndex === null && dlg.open) dlg.close();
    }, [activeIndex]);

    // When the user closes the dialog via ESC or backdrop click, sync state.
    useEffect(() => {
        const dlg = dialogRef.current;
        if (!dlg) return;
        const onClose = () => setActiveIndex(null);
        dlg.addEventListener("close", onClose);
        return () => dlg.removeEventListener("close", onClose);
    }, []);

    const close = useCallback(() => setActiveIndex(null), []);
    const next = useCallback(
        () =>
            setActiveIndex((i) =>
                i === null ? null : (i + 1) % photos.length
            ),
        [photos.length]
    );
    const prev = useCallback(
        () =>
            setActiveIndex((i) =>
                i === null
                    ? null
                    : (i - 1 + photos.length) % photos.length
            ),
        [photos.length]
    );

    if (!photos.length) return null;

    const active = activeIndex !== null ? photos[activeIndex] : null;

    return (
        <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {photos.map((p, i) => (
                    <button
                        key={p.src}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className="group relative overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label={`Open photo: ${p.alt}`}
                    >
                        <img
                            src={p.src}
                            alt={p.alt}
                            className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>

            <dialog
                ref={dialogRef}
                className="p-0 m-0 max-w-full max-h-full w-full h-full bg-black/95 backdrop:bg-black/80"
                aria-label="Photo viewer"
            >
                {active && (
                    <div className="relative w-screen h-screen flex items-center justify-center p-4">
                        <button
                            type="button"
                            onClick={close}
                            className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Close photo viewer"
                        >
                            <X className="size-6" />
                        </button>
                        {photos.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={prev}
                                    className="absolute left-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white"
                                    aria-label="Previous photo"
                                >
                                    ‹
                                </button>
                                <button
                                    type="button"
                                    onClick={next}
                                    className="absolute right-4 text-white bg-black/60 hover:bg-black/80 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white"
                                    aria-label="Next photo"
                                >
                                    ›
                                </button>
                            </>
                        )}
                        <figure className="flex flex-col items-center gap-3 max-w-5xl">
                            <img
                                src={active.src}
                                alt={active.alt}
                                className="max-h-[80vh] max-w-full object-contain rounded"
                            />
                            {active.caption && (
                                <figcaption className="text-white/80 text-sm text-center max-w-2xl">
                                    {active.caption}
                                </figcaption>
                            )}
                            {photos.length > 1 && (
                                <div className="text-white/60 text-xs">
                                    {activeIndex! + 1} / {photos.length}
                                </div>
                            )}
                        </figure>
                    </div>
                )}
            </dialog>
        </>
    );
}