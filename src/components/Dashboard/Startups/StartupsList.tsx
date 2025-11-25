import {Badge} from '@/components/ui/badge';
import {Lightbulb, Rocket, Target, TrendingUp, Users} from 'lucide-react';
import type {Startup} from '@/types/startup';
import {Button} from "@/components/ui/button";
import {Link} from "react-router-dom";

interface StartupsListProps {
    startups: Startup[];
    onSelectStartup: (id: string) => void;
}

const stageConfig = {
    idea: {label: 'Idea Stage', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-700'},
    mvp: {label: 'MVP', icon: Rocket, color: 'bg-blue-100 text-blue-700'},
    'early-stage': {label: 'Early Stage', icon: Target, color: 'bg-purple-100 text-purple-700'},
    growth: {label: 'Growth', icon: TrendingUp, color: 'bg-green-100 text-green-700'},
    scaling: {label: 'Scaling', icon: Users, color: 'bg-orange-100 text-orange-700'},
};

const categoryLabels: any = {
    edtech: 'EdTech',
    fintech: 'FinTech',
    healthtech: 'HealthTech',
    'e-commerce': 'E-Commerce',
    saas: 'SaaS',
    'ai-ml': 'AI/ML',
    social: 'Social',
    marketplace: 'Marketplace',
};

function StartupsList({startups, onSelectStartup}: StartupsListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {startups.map(startup => {
                const stageInfo = stageConfig[startup.stage];
                const StageIcon = stageInfo.icon;

                return (
                    <Link to={`${startup.id}`}>
                        <div
                            className="group bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                            {/* Cover Image */}
                            <div className="relative h-40 overflow-hidden bg-muted">
                                <img
                                    src={"https://images.unsplash.com/photo-1560179707-f14e90ef3623?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcGFueXxlbnwwfHwwfHx8MA%3D%3D"}
                                    alt={startup.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    loading="lazy"
                                />
                                {startup.featured && (
                                    <div className="absolute top-3 right-3">
                                        <Badge
                                            className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                                            Featured
                                        </Badge>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-5 flex flex-col flex-1">
                                {/* Logo and Title */}
                                <div className="flex items-start gap-3 mb-3">
                                    <img
                                        src={"https://innovation.gov.uz/media/post_images/0fbdc5e8af37709994fa4652b7c3ac37.jpg"}
                                        alt={`${startup.name} logo`}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-1">
                                            {startup.name}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {startup.stage}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                                    {startup.description}
                                </p>

                                {/* Stage and Category */}
                                <div className="flex items-center gap-2 mb-4">
                                    <Badge className={stageInfo.color}>
                                        <StageIcon className="w-3 h-3 mr-1"/>
                                        {startup.stage}
                                    </Badge>
                                    <Badge variant="outline">
                                        {startup.category}
                                    </Badge>
                                </div>
                                {/* Team Preview */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">{startup.teamMembers.length} team member{startup.teamMembers.length !== 1 ? 's' : ''}</span>
                                </div>

                                {/* CTA */}
                                <Button className="w-full mt-4" variant="default">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

export default StartupsList;
