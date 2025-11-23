import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {Briefcase, DollarSign, MapPin, Plus, TrendingUp, X} from "lucide-react"
import {useState} from "react"

interface ComparisonInternship {
    id: string
    company: string
    position: string
    salary: { min: number; max: number }
    location: string
    format: "remote" | "onsite" | "hybrid"
    duration: string
    skills: string[]
    benefits: string[]
    rating: number
}

interface ComparisonProps {
    internships?: ComparisonInternship[]
}

const defaultComparisons: ComparisonInternship[] = [
    {
        id: "1",
        company: "Google",
        position: "Software Engineering Intern",
        salary: {min: 9500, max: 11000},
        location: "Mountain View, CA",
        format: "onsite",
        duration: "12 weeks",
        skills: ["Python", "C++", "Data Structures", "System Design"],
        benefits: ["Free meals", "Housing stipend", "Gym access", "Tech talks"],
        rating: 4.8,
    },
    {
        id: "2",
        company: "Microsoft",
        position: "Cloud Engineering Intern",
        salary: {min: 9000, max: 10500},
        location: "Seattle, WA",
        format: "hybrid",
        duration: "12 weeks",
        skills: ["Azure", "C#", "Cloud Architecture", "DevOps"],
        benefits: ["Free parking", "Cafeteria", "Mentor support", "Relocation"],
        rating: 4.7,
    },
    {
        id: "3",
        company: "Meta",
        position: "Frontend Engineering Intern",
        salary: {min: 10000, max: 11500},
        location: "Menlo Park, CA",
        format: "onsite",
        duration: "12 weeks",
        skills: ["React", "JavaScript", "GraphQL", "UI/UX"],
        benefits: ["Housing", "Free meals", "Transportation", "Events"],
        rating: 4.6,
    },
]

function InternshipComparison({internships: initialInternships = defaultComparisons}: ComparisonProps) {
    const [selectedInternships, setSelectedInternships] = useState<ComparisonInternship[]>(initialInternships.slice(0, 2))

    const addInternship = (internship: ComparisonInternship) => {
        if (!selectedInternships.find((i) => i.id === internship.id)) {
            setSelectedInternships([...selectedInternships, internship])
        }
    }

    const removeInternship = (id: string) => {
        setSelectedInternships(selectedInternships.filter((i) => i.id !== id))
    }

    const availableInternships = initialInternships.filter((i) => !selectedInternships.find((s) => s.id === i.id))

    return (
        <div className="space-y-6">
            {/* Add More Internships */}
            {availableInternships.length > 0 && selectedInternships.length < 3 && (
                <Card
                    className="p-4 border border-dashed border-primary/50 bg-gradient-to-br from-primary/5 to-background">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Add more internships to compare</h3>
                            <p className="text-xs text-muted-foreground">Up to 3 at a time</p>
                        </div>
                        <div className="flex gap-2">
                            {availableInternships.map((internship) => (
                                <Button
                                    key={internship.id}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => addInternship(internship)}
                                    className="gap-1"
                                >
                                    <Plus className="w-3 h-3"/>
                                    {internship.company}
                                </Button>
                            ))}
                        </div>
                    </div>
                </Card>
            )}

            {/* Comparison Table */}
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    {/* Internship Headers */}
                    <div
                        className="grid gap-4 mb-4"
                        style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                    >
                        <div></div>
                        {selectedInternships.map((internship) => (
                            <div key={internship.id} className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute -top-2 -right-2 h-6 w-6 p-0"
                                    onClick={() => removeInternship(internship.id)}
                                >
                                    <X className="w-4 h-4"/>
                                </Button>
                                <Card
                                    className="p-4 border border-border bg-gradient-to-br from-primary/5 to-background">
                                    <h3 className="font-semibold text-center mb-1">{internship.company}</h3>
                                    <p className="text-xs text-muted-foreground text-center">{internship.position}</p>
                                    <Badge className="mt-2 w-full justify-center text-xs">{internship.rating} ⭐</Badge>
                                </Card>
                            </div>
                        ))}
                    </div>

                    {/* Comparison Rows */}
                    <div className="space-y-3">
                        {/* Salary */}
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <DollarSign className="w-4 h-4"/>
                                Monthly Salary
                            </div>
                            {selectedInternships.map((internship) => (
                                <Card key={internship.id} className="p-3 border border-border">
                                    <p className="text-sm font-bold">
                                        ${internship.salary.min}K - ${internship.salary.max}K
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Avg: ${(internship.salary.min + internship.salary.max) / 2}K
                                    </p>
                                </Card>
                            ))}
                        </div>

                        {/* Location & Format */}
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <MapPin className="w-4 h-4"/>
                                Location
                            </div>
                            {selectedInternships.map((internship) => (
                                <Card key={internship.id} className="p-3 border border-border">
                                    <p className="text-sm font-medium">{internship.location}</p>
                                    <Badge variant="secondary" className="mt-2 text-xs">
                                        {internship.format}
                                    </Badge>
                                </Card>
                            ))}
                        </div>

                        {/* Duration */}
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <Briefcase className="w-4 h-4"/>
                                Duration
                            </div>
                            {selectedInternships.map((internship) => (
                                <Card key={internship.id} className="p-3 border border-border">
                                    <p className="text-sm font-medium">{internship.duration}</p>
                                </Card>
                            ))}
                        </div>

                        {/* Skills */}
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold">
                                <TrendingUp className="w-4 h-4"/>
                                Key Skills
                            </div>
                            {selectedInternships.map((internship) => (
                                <Card key={internship.id} className="p-3 border border-border">
                                    <div className="space-y-2">
                                        {internship.skills.map((skill, i) => (
                                            <Badge key={i} variant="outline" className="text-xs mr-1">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Benefits */}
                        <div
                            className="grid gap-4"
                            style={{gridTemplateColumns: `1fr repeat(${selectedInternships.length}, 1fr)`}}
                        >
                            <div className="flex items-center gap-2 text-sm font-semibold">Benefits</div>
                            {selectedInternships.map((internship) => (
                                <Card key={internship.id} className="p-3 border border-border">
                                    <ul className="space-y-1 text-xs">
                                        {internship.benefits.map((benefit, i) => (
                                            <li key={i} className="text-muted-foreground">
                                                ✓ {benefit}
                                            </li>
                                        ))}
                                    </ul>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-4">
                {selectedInternships.map((internship) => (
                    <Button key={internship.id} className="gap-2">
                        Apply to {internship.company}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default InternshipComparison;