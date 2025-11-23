import {Button} from '@/components/ui/button.tsx';
import {Award, BookOpen, Briefcase, FileText} from 'lucide-react';
import {ActivitySection, ProfileForm} from "@/components/Dashboard/Profile/index.ts";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    bio: string;
    location: string;
    avatar: string;
    skills: string[];
    resume: any;
    applications: number;
    savedInternships: number;
}

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    user: User;
    setUser: (user: User) => void;
}

function ProfileTabs({activeTab, setActiveTab, user, setUser}: ProfileTabsProps) {
    const tabs = [
        {id: 'overview', label: 'Overview', icon: null},
        {id: 'certificates', label: 'Certificates', icon: Award},
        {id: 'courses', label: 'Courses', icon: BookOpen},
        {id: 'internships', label: 'Internships', icon: Briefcase},
        {id: 'applications', label: 'Applications', icon: FileText},
        {id: 'settings', label: 'Settings', icon: null},
        {id: 'activity', label: 'Activity', icon: null}
    ];

    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-4 border-b border-border mb-8 overflow-x-auto">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 font-medium transition-colors whitespace-nowrap flex items-center gap-2 ${
                                activeTab === tab.id
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {tab.icon && <tab.icon className="w-4 h-4"/>}
                            {tab.label}
                        </button>
                    ))}
                </div>

                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-card border border-border rounded-lg p-8">
                                <h2 className="text-2xl font-bold mb-6">About</h2>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold mb-2">Location</h3>
                                        <p className="text-muted-foreground">{user.location}</p>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Bio</h3>
                                        <p className="text-muted-foreground">{user.bio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Stats */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-3xl font-bold text-primary">{user.applications}</div>
                                        <p className="text-muted-foreground text-sm">Applications</p>
                                    </div>
                                    <div className="border-t border-border pt-4">
                                        <div className="text-3xl font-bold text-primary">{user.savedInternships}</div>
                                        <p className="text-muted-foreground text-sm">Saved Internships</p>
                                    </div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h3 className="font-semibold mb-4">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                                        >
                      {skill}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Certificates & Credentials</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">AWS Solutions Architect</h3>
                                        <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                                        <p className="text-xs text-muted-foreground mt-1">Issued June 15, 2024</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="cursor-pointer">View
                                        Credential</Button>
                                </div>
                            </div>
                            <div className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">React Advanced Patterns</h3>
                                        <p className="text-sm text-muted-foreground">Udacity</p>
                                        <p className="text-xs text-muted-foreground mt-1">Issued March 20, 2024</p>
                                    </div>
                                    <Button variant="outline" size="sm" className="cursor-pointer">View
                                        Credential</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'courses' && (
                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Courses in Progress</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-border rounded-lg">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold">Advanced React Development</h3>
                                        <p className="text-sm text-muted-foreground">Started January 10, 2025</p>
                                    </div>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">85% complete</p>
                            </div>
                            <div className="p-4 border border-border rounded-lg">
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <h3 className="font-semibold">System Design Fundamentals</h3>
                                        <p className="text-sm text-muted-foreground">Started January 5, 2025</p>
                                    </div>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2">
                                    <div className="bg-primary h-2 rounded-full" style={{width: '60%'}}></div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">60% complete</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'internships' && (
                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Internship Experience</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-border rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold">Full-Stack Intern</h3>
                                        <p className="text-sm text-primary">TechCorp Solutions</p>
                                        <p className="text-xs text-muted-foreground mt-1">Summer 2024</p>
                                        <p className="text-sm text-muted-foreground mt-2">Built responsive web
                                            applications and collaborated with senior developers on production
                                            features.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'applications' && (
                    <div className="bg-card border border-border rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-border rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">Senior Software Engineer</h3>
                                            <span
                                                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Interviewing</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Google</p>
                                        <p className="text-xs text-muted-foreground mt-1">Applied January 8, 2025</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 border border-border rounded-lg">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold">Cloud Architect</h3>
                                            <span
                                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">Applied</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Microsoft</p>
                                        <p className="text-xs text-muted-foreground mt-1">Applied January 5, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'settings' && <ProfileForm user={user} setUser={setUser}/>}
                {activeTab === 'activity' && <ActivitySection user={user}/>}
            </div>
        </div>
    );
}

export default ProfileTabs;