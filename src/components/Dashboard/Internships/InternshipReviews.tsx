import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {MessageCircle, Star, ThumbsUp} from "lucide-react"
import {useState} from "react"

interface Review {
    id: string
    reviewer: string
    company: string
    rating: number
    title: string
    content: string
    year: number
    helpful: number
    tags: string[]
}

interface ReviewsProps {
    reviews?: Review[]
}

const defaultReviews: Review[] = [
    {
        id: "1",
        reviewer: "Sarah Johnson",
        company: "Google",
        rating: 5,
        title: "Incredible learning experience and mentorship",
        content:
            "The program was well-structured with clear objectives. My mentor was very supportive and helped me navigate complex projects. The infrastructure and tooling were top-notch.",
        year: 2024,
        helpful: 127,
        tags: ["Great mentorship", "Learning focused", "Tech excellence", "Good culture"],
    },
    {
        id: "2",
        reviewer: "Alex Chen",
        company: "Google",
        rating: 4,
        title: "Great experience but very intensive",
        content:
            "Learned a ton but the workload was intense. Not much time for socializing but that depends on your goals. Housing was provided which was helpful.",
        year: 2023,
        helpful: 89,
        tags: ["Fast-paced", "Housing included", "Competitive projects"],
    },
    {
        id: "3",
        reviewer: "Jordan Miller",
        company: "Microsoft",
        rating: 4,
        title: "Solid internship with good work-life balance",
        content:
            "Great team environment with flexible work arrangements. Azure experience was valuable. The campus was amazing with lots of amenities.",
        year: 2024,
        helpful: 156,
        tags: ["Work-life balance", "Good campus", "Cloud focused"],
    },
    {
        id: "4",
        reviewer: "Taylor Kim",
        company: "Meta",
        rating: 5,
        title: "Fantastic opportunity at a world-class company",
        content:
            "Worked on real products used by billions. The culture was collaborative and innovative. Excellent compensation and benefits. Would highly recommend.",
        year: 2024,
        helpful: 203,
        tags: ["Impact work", "Innovation", "Best compensation", "Highly recommend"],
    },
]

function InternshipReviews({reviews = defaultReviews}: ReviewsProps) {
    const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

    const companies = [...new Set(reviews.map((r) => r.company))]
    const filteredReviews = selectedCompany ? reviews.filter((r) => r.company === selectedCompany) : reviews

    const avgRating = (reviews: Review[]) => {
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
        return (sum / reviews.length).toFixed(1)
    }

    return (
        <div className="space-y-6">
            {/* Company Filter */}
            <div className="flex flex-wrap gap-2">
                <Button
                    variant={selectedCompany === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCompany(null)}
                >
                    All Companies ({reviews.length})
                </Button>
                {companies.map((company) => {
                    const companyReviews = reviews.filter((r) => r.company === company)
                    return (
                        <Button
                            key={company}
                            variant={selectedCompany === company ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCompany(company)}
                        >
                            {company} ({companyReviews.length})
                        </Button>
                    )
                })}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <Card key={review.id}
                          className="p-6 border border-border hover:border-primary/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold">{review.title}</h3>
                                    <div className="flex items-center gap-1">
                                        {Array.from({length: review.rating}).map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400"/>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{review.reviewer}</span>
                                    <span>•</span>
                                    <span>{review.company}</span>
                                    <span>•</span>
                                    <span>{review.year}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-4">{review.content}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {review.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-border">
                            <Button variant="ghost" size="sm" className="gap-2 text-xs">
                                <ThumbsUp className="w-4 h-4"/>
                                Helpful ({review.helpful})
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2 text-xs">
                                <MessageCircle className="w-4 h-4"/>
                                Reply
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Write Review CTA */}
            <Card className="p-6 border border-border bg-gradient-to-br from-primary/5 to-background text-center">
                <h3 className="font-semibold mb-2">Share Your Experience</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Help other students make informed decisions about internships
                </p>
                <Button className="gap-2">
                    <MessageCircle className="w-4 h-4"/>
                    Write a Review
                </Button>
            </Card>
        </div>
    )
}


export default InternshipReviews;