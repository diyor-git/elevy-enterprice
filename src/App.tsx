import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {Toaster} from '@/components/ui/toaster';
import {TooltipProvider} from '@/components/ui/tooltip';
import {
    CreateStartupPage,
    MyStartupDetail,
    MyStartupsPage,
    StartupDetailsPage,
    StartupsPage
} from "@/pages/dashboard/Startups";

import {Login, Signup, VerifyEmailPage} from "@/pages/auth";
import {
    AchievementsPage,
    AIZonePage,
    DashboardPage, InternshipCreatePage, InternshipDetailPage,
    InternshipsPage,
    MessagesPage,
    NotFoundPage,
    ProfilePage
} from "@/pages/dashboard";
import {DashboardLayout} from "@/components/Dashboard/MyStartups";
import {ProtectedRoute} from "@/components/ProtectedRoute.tsx";
import LandingPage from "@/pages/landing";

function App() {
    return (
        <TooltipProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/verify-email" element={<VerifyEmailPage/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route
                            path="/dashboard"
                            element={
                                <DashboardLayout>
                                    <DashboardPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/profile"
                            element={
                                <DashboardLayout>
                                    <ProfilePage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/startups"
                            element={
                                <DashboardLayout>
                                    <StartupsPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/startups/:id"
                            element={
                                <DashboardLayout>
                                    <StartupDetailsPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/achievements"
                            element={
                                <DashboardLayout>
                                    <AchievementsPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/ai-zone"
                            element={
                                <DashboardLayout>
                                    <AIZonePage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/internships"
                            element={
                                <DashboardLayout>
                                    <InternshipsPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/internships/:id"
                            element={
                                <DashboardLayout>
                                    <InternshipDetailPage/>
                                </DashboardLayout>
                            }
                        />
                        <Route
                            path="/internships/create"
                            element={
                                <DashboardLayout>
                                    <InternshipCreatePage/>
                                </DashboardLayout>
                            }
                        />

                        <Route
                            path="/messages"
                            element={
                                <DashboardLayout>
                                    <MessagesPage/>
                                </DashboardLayout>
                            }
                        />

                        <Route path="/my-startups">
                            <Route
                                index
                                element={
                                    <DashboardLayout>
                                        <MyStartupsPage/>
                                    </DashboardLayout>
                                }
                            />
                            <Route
                                path="create"
                                element={
                                    <DashboardLayout>
                                        <CreateStartupPage/>
                                    </DashboardLayout>
                                }
                            />
                            <Route
                                path=":id"
                                element={
                                    <DashboardLayout>
                                        <MyStartupDetail/>
                                    </DashboardLayout>
                                }
                            />
                        </Route>
                    </Route>


                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </TooltipProvider>
    );
}

export default App;
