import {Calendar, FileText, Heart} from 'lucide-react';

interface User {
    id: string;
    name: string;
    applications: number;
    savedInternships: number;
}

interface ActivitySectionProps {
    user: User;
}

const activities = [
    {
        id: 1,
        type: 'application',
        title: 'Applied to Software Engineering Internship',
        company: 'TechCorp Uzbekistan',
        date: '2 days ago',
        icon: FileText,
    },
    {
        id: 2,
        type: 'saved',
        title: 'Saved Product Manager Internship',
        company: 'StartupHub',
        date: '5 days ago',
        icon: Heart,
    },
    {
        id: 3,
        type: 'application',
        title: 'Applied to UI/UX Design Internship',
        company: 'Design Studio Tashkent',
        date: '1 week ago',
        icon: FileText,
    },
];

function ActivitySection({user}: ActivitySectionProps) {
    return (
        <div className="max-w-2xl">
            <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>

                <div className="space-y-4">
                    {activities.map((activity) => {
                        const Icon = activity.icon;
                        return (
                            <div key={activity.id}
                                 className="flex gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition">
                                <div
                                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                                    <Icon className="w-5 h-5"/>
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{activity.title}</p>
                                    <p className="text-sm text-muted-foreground">{activity.company}</p>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Calendar className="w-4 h-4"/>
                                    {activity.date}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}


export default ActivitySection;