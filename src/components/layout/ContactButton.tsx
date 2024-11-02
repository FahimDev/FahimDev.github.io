const email = {
    to: "fahim.arif0373@outlook.com",
    subject: "Hello",
    body: "Hello, just viewed your portfolio.",
};

export default function ContactButton() {
    return (
        <a
            href={`mailto:${email.to}?subject=${email.subject}&body=${email.body}`}
            target="_blank"
            rel="noopener noreferrer"
        >Contact</a>
    );
}
