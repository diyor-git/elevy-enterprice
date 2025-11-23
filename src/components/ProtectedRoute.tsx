import {Navigate, Outlet} from "react-router-dom";

export function ProtectedRoute() {
    const isAuthenticated = true;
    const isLoading = false;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <Outlet/>;
}
