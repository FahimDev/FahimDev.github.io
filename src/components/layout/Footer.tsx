export default function Footer() {
    return (
        // id="contact" is the stable target for the global Primary nav's
        // "Contact" link. The footer is rendered on every page, so the
        // anchor is reachable from any route without a dedicated page.
        <footer
            id="contact"
            className="text-center p-6 text-base border-t"
        >
            Developed &amp; Designed by{" "}
            <a
                className="text-cyan-500 hover:underline"
                href="https://github.com/antonin686"
            >
                Antonin Islam
            </a>{" "}
            ·{" "}
            <a
                className="text-cyan-500 hover:underline"
                href="mailto:fahim.arif0373@outlook.com"
            >
                fahim.arif0373@outlook.com
            </a>
        </footer>
    );
}
