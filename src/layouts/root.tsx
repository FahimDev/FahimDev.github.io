import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <>
        <ScrollToTop />
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
