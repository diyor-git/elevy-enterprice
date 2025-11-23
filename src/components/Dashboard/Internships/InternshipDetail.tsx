import {Button} from '@/components/ui/button';
import {ArrowLeft, Briefcase, CheckCircle, Clock, DollarSign, MapPin} from 'lucide-react';

interface Internship {
    id: number;
    title: string;
    company: string;
    category: string;
    location: string;
    duration: string;
    salary: string;
    description: string;
    requirements: string[];
    benefits: string[];
    image: string;
}

interface InternshipDetailProps {
    internship: Internship;
    onBack: () => void;
    isApplied: boolean;
    onApply: () => void;
}

function InternshipDetail({
                              internship,
                              onBack,
                              isApplied,
                              onApply,
                          }: InternshipDetailProps) {
    return (
        <div>
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-primary hover:underline mb-6 cursor-pointer"
            >
                <ArrowLeft className="w-4 h-4"/>
                Back to List
            </button>

            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <img
                    src={internship.image || "/placeholder.svg"}
                    alt={internship.company}
                    className="w-full h-80 object-cover"
                />

                <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{internship.title}</h1>
                            <p className="text-xl text-muted-foreground">{internship.company}</p>
                        </div>
                        <div className="text-right">
                            {isApplied && (
                                <div className="flex items-center gap-2 text-green-600 font-semibold">
                                    <CheckCircle className="w-5 h-5"/>
                                    Applied
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 pb-8 border-b border-border">
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <MapPin className="w-4 h-4"/>
                                Location
                            </div>
                            <p className="font-semibold">{internship.location}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Clock className="w-4 h-4"/>
                                Duration
                            </div>
                            <p className="font-semibold">{internship.duration}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <DollarSign className="w-4 h-4"/>
                                Salary
                            </div>
                            <p className="font-semibold">{internship.salary}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                <Briefcase className="w-4 h-4"/>
                                Category
                            </div>
                            <p className="font-semibold">{internship.category}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-4">About the Role</h2>
                            <p className="text-muted-foreground mb-8">{internship.description}</p>

                            <h3 className="text-xl font-bold mb-4">Requirements</h3>
                            <ul className="space-y-2 mb-8">
                                {internship.requirements.map((req, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-primary rounded-full"/>
                                        <span className="text-muted-foreground">{req}</span>
                                    </li>
                                ))}
                            </ul>

                            <h3 className="text-xl font-bold mb-4">What We Offer</h3>
                            <ul className="space-y-2">
                                {internship.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0"/>
                                        <span className="text-muted-foreground">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="bg-muted rounded-lg p-6 sticky top-32">
                                <Button
                                    onClick={onApply}
                                    disabled={isApplied}
                                    size="lg"
                                    className="w-full cursor-pointer mb-4"
                                >
                                    {isApplied ? 'Application Submitted' : 'Apply Now'}
                                </Button>
                                <p className="text-sm text-muted-foreground text-center">
                                    {isApplied
                                        ? 'Check your email for updates'
                                        : 'Apply today and hear back within 5 business days'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default InternshipDetail;