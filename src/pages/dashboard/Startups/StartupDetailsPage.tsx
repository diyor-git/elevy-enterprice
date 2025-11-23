import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';
import {
    ArrowLeft,
    Briefcase,
    CheckCircle,
    Code2,
    DollarSign,
    ExternalLink,
    Globe,
    Heart,
    Mail,
    MapPin,
    MessageSquare,
    TrendingUp,
    Users
} from 'lucide-react';
import {defaultStartups} from '@/data/startup-data';
import {User} from '@/types/startup';
import {Link} from "react-router-dom";
import {TeamMemberModal} from "@/components/Dashboard/MyStartups";

function StartupDetailsPage() {
    const [selectedMember, setSelectedMember] = useState<User | null>(null);
    const [showMemberModal, setShowMemberModal] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);


    const startup = defaultStartups.find(s => s.id == "1");
    if (!startup) {
        return (
            <div className="min-h-screen bg-background pt-24">
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <p className="text-lg text-muted-foreground text-center">Startup not found</p>
                </div>
            </div>
        );
    }

    const stageBadgeColor: Record<string, string> = {
        'mvp': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        'early-stage': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        'growth': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        'idea': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };

    const handleMemberClick = (member: User) => {
        setSelectedMember(member);
        setShowMemberModal(true);
    };

    const totalFunded = startup.fundingRounds?.reduce((sum, r) => sum + r.amount, 0) || 0;

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto ">
                <Link to="/startups">
                    <Button className="flex items-center gap-2 mb-8 cursor-pointer">
                        <ArrowLeft className="w-4 h-4"/>
                        Back to Startups
                    </Button>
                </Link>

                {/* Hero Section with Background */}
                <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-8 mb-8 border border-border relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
                                <p className="text-lg text-muted-foreground mb-4">{startup.description}</p>

                                {/* Location and Links */}
                                <div className="flex flex-wrap gap-4 text-sm">
                                    {startup.location && (
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <MapPin className="w-4 h-4"/>
                                            {startup.location}
                                        </div>
                                    )}
                                    {startup.website && (
                                        <a
                                            href={startup.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Globe className="w-4 h-4"/>
                                            Visit Website
                                        </a>
                                    )}
                                    {startup.email && (
                                        <a
                                            href={`mailto:${startup.email}`}
                                            className="flex items-center gap-2 text-primary hover:underline"
                                        >
                                            <Mail className="w-4 h-4"/>
                                            Contact
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Badge className={`${stageBadgeColor[startup.stage]} hover:bg-sky-700`}>
                                    {startup.stage.toUpperCase()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {startup.description_long && (
                            <Card className="p-6 border border-border">
                                <h2 className="text-2xl font-bold mb-4">About</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {startup.description_long}
                                </p>
                            </Card>
                        )}

                        {startup.techStack && startup.techStack.length > 0 && (
                            <Card className="p-6 border border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Code2 className="w-5 h-5 text-primary"/>
                                    <h2 className="text-2xl font-bold">Tech Stack</h2>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {startup.techStack.map((tech, idx) => (
                                        <Badge key={idx} variant="outline">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {startup.fundingRounds && startup.fundingRounds.length > 0 && (
                            <Card className="p-6 border border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <DollarSign className="w-5 h-5 text-primary"/>
                                    <h2 className="text-2xl font-bold">Funding Timeline</h2>
                                </div>
                                <div className="space-y-4">
                                    {startup.fundingRounds.map((round, idx) => (
                                        <div key={idx} className="border-l-2 border-primary/50 pl-4 pb-4 last:pb-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold text-lg capitalize">{round.stage}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        {new Date(round.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'long'
                                                        })}
                                                    </p>
                                                </div>
                                                <p className="font-bold text-primary text-lg">
                                                    ${(round.amount / 1000000).toFixed(1)}M
                                                </p>
                                            </div>
                                            {round.investors && round.investors.length > 0 && (
                                                <p className="text-sm text-muted-foreground">
                                                    Investors: {round.investors.join(', ')}
                                                </p>
                                            )}
                                            {round.description && (
                                                <p className="text-sm text-muted-foreground mt-2">{round.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {startup.jobs && startup.jobs.length > 0 && (
                            <Card className="p-6 border border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Briefcase className="w-5 h-5 text-primary"/>
                                    <h2 className="text-2xl font-bold">Open Positions</h2>
                                </div>
                                <div className="space-y-4">
                                    {startup.jobs.map((job, idx) => (
                                        <div key={idx}
                                             className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <p className="font-semibold text-lg">{job.title}</p>
                                                    <p className="text-sm text-muted-foreground">{job.location}</p>
                                                </div>
                                                <Badge variant="outline">{job.type}</Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                                            {job.salary && (
                                                <p className="text-sm font-semibold text-primary mb-2">
                                                    ${job.salary.min.toLocaleString()} -
                                                    ${job.salary.max.toLocaleString()}
                                                </p>
                                            )}
                                            <Button size="sm" className="cursor-pointer">
                                                Apply Now
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {startup.recentUpdates && startup.recentUpdates.length > 0 && (
                            <Card className="p-6 border border-border">
                                <h2 className="text-2xl font-bold mb-4">Recent Updates</h2>
                                <div className="space-y-4">
                                    {startup.recentUpdates.map((update, idx) => (
                                        <div key={idx} className="border-b pb-4 last:border-b-0">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="font-semibold">{update.title}</p>
                                                <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {new Date(update.date).toLocaleDateString()}
                        </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground">{update.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* Team Section */}
                        <Card className="p-6 border border-border">
                            <div className="flex items-center gap-2 mb-4">
                                <Users className="w-5 h-5 text-primary"/>
                                <h2 className="text-2xl font-bold">Team</h2>
                            </div>
                            <p className="text-muted-foreground mb-6">
                                Team size: <span
                                className="font-semibold text-foreground">{startup.teamSize} members</span>
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {startup.teamMembers.map((member, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleMemberClick(member)}
                                        className="p-4 rounded-lg border hover:shadow-lg hover:border-primary transition-all cursor-pointer text-left"
                                    >
                                        <div className="text-3xl mb-2">{member.avatar}</div>
                                        <p className="font-semibold text-sm line-clamp-1">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{member.role}</p>
                                    </button>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {/* Key Metrics */}
                        <Card className="p-6 border border-border">
                            <h3 className="text-lg font-bold mb-4">Key Metrics</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground mb-1">Team Members</p>
                                    <p className="text-2xl font-bold text-primary">{startup.teamSize}</p>
                                </div>
                                {totalFunded > 0 && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Total Funded</p>
                                        <p className="text-2xl font-bold text-primary">${(totalFunded / 1000000).toFixed(1)}M</p>
                                    </div>
                                )}
                                {startup.metrics?.users && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Users</p>
                                        <p className="text-2xl font-bold text-primary">{startup.metrics.users.toLocaleString()}</p>
                                    </div>
                                )}
                                {startup.metrics?.arr && (
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Annual Recurring Revenue</p>
                                        <p className="text-2xl font-bold text-primary">${(startup.metrics.arr / 1000).toFixed(0)}K</p>
                                    </div>
                                )}
                            </div>
                        </Card>

                        {/* Startup Status */}
                        <Card className="p-6 border border-border">
                            <h3 className="text-lg font-bold mb-4">Status</h3>
                            <div className="space-y-3">
                                {startup.hiringStatus === 'actively-hiring' && (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <CheckCircle className="w-4 h-4"/>
                                        <span className="text-sm font-semibold">Actively Hiring</span>
                                    </div>
                                )}
                                {startup.seekingInvestors && (
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <CheckCircle className="w-4 h-4"/>
                                        <span className="text-sm font-semibold">Seeking Investors</span>
                                    </div>
                                )}
                                {startup.productLink && (
                                    <a
                                        href={startup.productLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-primary hover:underline text-sm font-semibold"
                                    >
                                        <ExternalLink className="w-4 h-4"/>
                                        Try Product
                                    </a>
                                )}
                            </div>
                        </Card>

                        {/* Action Buttons */}
                        <Card className="p-4 border border-border space-y-3">
                            <Button className="w-full cursor-pointer gap-2">
                                <Briefcase className="w-4 h-4"/>
                                Apply to Join
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full cursor-pointer gap-2"
                            >
                                <MessageSquare className="w-4 h-4"/>
                                Message Team
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsFavorite(!isFavorite)}
                                className="w-full cursor-pointer gap-2"
                            >
                                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}/>
                                {isFavorite ? 'Saved' : 'Save'}
                            </Button>
                        </Card>

                        {/* Featured Badge */}
                        {startup.featured && (
                            <Card className="p-4 border border-primary/50 bg-primary/5">
                                <div className="flex items-center gap-2 text-primary">
                                    <TrendingUp className="w-4 h-4"/>
                                    <span className="font-semibold text-sm">Featured Startup</span>
                                </div>
                            </Card>
                        )}
                    </div>
                </div>
            </main>

            <TeamMemberModal
                member={selectedMember}
                open={showMemberModal}
                onOpenChange={setShowMemberModal}
                isOwner={false}
            />
        </div>
    );
}


export default StartupDetailsPage;