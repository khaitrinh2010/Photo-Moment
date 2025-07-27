import { UserButton } from "@clerk/nextjs";
import NavigationSidebar from "@/components/NavigationSidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#1c1c1e] text-white flex">
            {/* Sidebar - fixed width */}
            <div className="fixed top-0 left-0 h-full w-[80px] z-30 bg-neutral-900">
                <NavigationSidebar />
            </div>

            {/* Main Content - pushed by sidebar width */}
            <div className="flex-1 ml-[80px] px-6 py-6">
                {/* Header */}
                <div className="flex justify-end mb-6">
                    <UserButton afterSignOutUrl="/sign-in" />
                </div>

                {/* Page content */}
                {children}
            </div>
        </div>
    );
}

