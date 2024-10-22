import { MdEmail } from "react-icons/md";
import { FaGithub, FaTwitter } from "react-icons/fa";

export default function FindMeOn() {
    return (
        <div className="flex items-center gap-2">
            <div>Find me on</div>
            <a href="https://github.com/fahimdev">
                <FaGithub />
            </a>
            <a href="https://x.com/ArifulIslamFah5">
                <FaTwitter />
            </a>
            <div>and</div>
            <a href="mailto:fahim.arif0373@outlook.com">
                <MdEmail />
            </a>
            <div>.</div>
        </div>
    );
}
