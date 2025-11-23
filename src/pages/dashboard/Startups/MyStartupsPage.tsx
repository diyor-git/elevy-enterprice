import {Plus, TrendingUp, Users} from 'lucide-react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card.tsx';
import {Button} from '@/components/ui/button.tsx';
import {Badge} from '@/components/ui/badge.tsx';
import {Link} from 'react-router-dom';

export default function MyStartupsPage() {
    const myStartups = [
        {
            id: 1,
            name: 'Project Alpha',
            description: 'AI-powered task management platform',
            status: 'Active',
            team: 4,
            progress: 65,
            logo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&h=100&fit=crop',
        },
        {
            id: 2,
            name: 'Beta Solutions',
            description: 'Cloud infrastructure automation',
            status: 'Planning',
            team: 2,
            progress: 30,
            logo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&h=100&fit=crop',
        },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">My Startups</h1>
                    <p className="text-muted-foreground mt-1">Manage your startup projects</p>
                </div>
                <Link to="/my-startups/create">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4"/>
                        Create Startup
                    </Button>
                </Link>
            </div>


            {/* Startups List */}
            <div className="grid gap-6 md:grid-cols-2">
                {myStartups.map((startup) => (
                    <Link to={`${startup.id}`}>
                        <Card key={startup.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start gap-4">
                                    <img
                                        src={startup.logo}
                                        alt={startup.name}
                                        className="w-16 h-16 rounded-lg object-cover bg-muted"
                                        style={{aspectRatio: '1/1'}}
                                    />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{startup.name}</CardTitle>
                                            <Badge
                                                variant={startup.status === 'Active' ? 'default' : 'secondary'}
                                            >
                                                {startup.status}
                                            </Badge>
                                        </div>
                                        <CardDescription>{startup.description}</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Progress */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{startup.progress}%</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-2">
                                            <div
                                                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                                                style={{width: `${startup.progress}%`}}
                                            />
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4"/>
                                            {startup.team} members
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <Button variant="outline" className="flex-1">
                                            View
                                        </Button>
                                        <Button className="flex-1">Manage</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {myStartups.length === 0 && (
                <Card>
                    <CardContent className="py-12">
                        <div className="text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                                <Plus className="w-8 h-8 text-muted-foreground"/>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold">No startups yet</h3>
                                <p className="text-muted-foreground">
                                    Create your first startup to get started
                                </p>
                            </div>
                            <Link to="/my-startups/create">
                                <Button className="gap-2">
                                    <Plus className="w-4 h-4"/>
                                    Create Your First Startup
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
