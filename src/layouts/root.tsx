import Footer from "@/components/layout/Footer";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="h-10">
                <Footer />
            </div>
        </div>
    );
}
