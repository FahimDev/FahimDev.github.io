import Footer from "@/components/layout/Footer";
import HashScrollHandler from "@/components/HashScrollHandler";
import ScrollToTop from "@/components/ScrollToTop";
import { useRouteSeo } from "@/seo/useRouteSeo";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    useRouteSeo();
    return (
        <>
        <ScrollToTop />
        <HashScrollHandler />
        <div className="flex flex-col h-screen">
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="h-10">
                <Footer />
            </div>
        </div>
        </>
    );
}
