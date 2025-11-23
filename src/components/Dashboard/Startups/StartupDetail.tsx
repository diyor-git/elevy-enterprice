import {useState} from 'react';
import {ArrowLeft, Lock, Mail, TrendingUp} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {NdaModal} from "@/components/Dashboard/Startups";

interface Startup {
    id: number;
    name: string;
    founder: string;
    description: string;
    stage: string;
    team: string[];
    lookingFor: string[];
    fundingTarget: string;
    equity: string;
    nda: boolean;
    ndaStatus: string;
    memberCount: number;
    idea: string;
    timeline: string;
    traction: string[];
}

interface StartupDetailProps {
    startup: any;
    onBack: () => void;
}

function StartupDetail({startup, onBack}: StartupDetailProps) {
    const [showNDAModal, setShowNDAModal] = useState(false);
    const [ndaAccepted, setNdaAccepted] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);

    const stageColors: Record<string, string> = {
        'Seed': 'bg-yellow-100 text-yellow-800',
        'Pre-seed': 'bg-blue-100 text-blue-800',
        'Series A': 'bg-green-100 text-green-800',
    };

    return (
        <div>
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-primary hover:underline mb-6 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4"/>
                Back to Startups
            </button>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{startup.name}</h1>
                            <p className="text-lg text-muted-foreground">Founded by {startup.founder}</p>
                        </div>
                        <Badge className={stageColors[startup.stage] || 'bg-gray-100'}>
                            {startup.stage}
                        </Badge>
                    </div>
                    <p className="text-lg">{startup.description}</p>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        <div className="lg:col-span-2">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">The Idea</h2>
                                <p className="text-muted-foreground leading-relaxed">{startup.idea}</p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Traction</h2>
                                <ul className="space-y-2">
                                    {startup.traction.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <TrendingUp className="w-5 h-5 text-primary flex-shrink-0"/>
                                            <span className="text-muted-foreground">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">Team</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {startup.team.map((member, i) => (
                                        <div key={i} className="bg-muted p-4 rounded-lg">
                                            <p className="font-semibold">{member}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h2 className="text-2xl font-bold mb-4">We're Looking For</h2>
                                <div className="flex flex-wrap gap-2">
                                    {startup.lookingFor.map(role => (
                                        <Badge key={role} variant="secondary">
                                            {role}
                                        </Badge>
                                    ))}
                                </div>
                            </section>
                        </div>

                        <div className="space-y-4">
                            <div className="bg-muted rounded-lg p-6">
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground mb-1">Funding Target</p>
                                    <p className="text-2xl font-bold">{startup.fundingTarget}</p>
                                </div>
                                <div className="mb-4 pb-4 border-b border-border">
                                    <p className="text-sm text-muted-foreground mb-1">Equity Offered</p>
                                    <p className="text-2xl font-bold">{startup.equity}</p>
                                </div>
                                <div className="mb-4">
                                    <p className="text-sm text-muted-foreground mb-1">Timeline</p>
                                    <p className="font-semibold">{startup.timeline}</p>
                                </div>
                                <div className="pb-4 border-b border-border mb-4">
                                    <p className="text-sm text-muted-foreground mb-2">Members</p>
                                    <p className="font-semibold">{startup.memberCount} joined</p>
                                </div>

                                {startup.nda && (
                                    <div className="flex items-start gap-3 mb-4 p-3 bg-primary/10 rounded">
                                        <Lock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"/>
                                        <div>
                                            <p className="text-sm font-semibold">NDA Required</p>
                                            <p className="text-xs text-muted-foreground">Sign to access full details</p>
                                        </div>
                                    </div>
                                )}

                                {ndaAccepted ? (
                                    <Button className="w-full cursor-pointer" onClick={() => setShowJoinModal(true)}>
                                        <Mail className="w-4 h-4 mr-2"/>
                                        Contact Founder
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full cursor-pointer"
                                        onClick={() => setShowNDAModal(true)}
                                    >
                                        <Lock className="w-4 h-4 mr-2"/>
                                        Sign NDA to Join
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showNDAModal && (
                <NdaModal
                    startupName={startup.name}
                    onAccept={() => {
                        setNdaAccepted(true);
                        setShowNDAModal(false);
                    }}
                    onClose={() => setShowNDAModal(false)}
                />
            )}

            {showJoinModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-card border border-border rounded-lg p-8 max-w-md">
                        <h2 className="text-2xl font-bold mb-4">Join {startup.name}</h2>
                        <p className="text-muted-foreground mb-6">
                            A message has been sent to the founder. They will review your profile and respond within 3-5
                            business days.
                        </p>
                        <Button
                            className="w-full cursor-pointer"
                            onClick={() => {
                                setShowJoinModal(false);
                            }}
                        >
                            Got it
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}


export default StartupDetail;