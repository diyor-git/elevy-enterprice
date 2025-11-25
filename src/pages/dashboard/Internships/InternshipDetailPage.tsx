import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {
    AlertCircle,
    ArrowLeft,
    Bookmark,
    CheckCircle,
    Clock,
    DollarSign,
    Globe,
    Mail,
    MapPin,
    Star,
    Users,
} from "lucide-react"
import {Link, useParams} from "react-router-dom";
import { internships } from "./InternshipCreatePage"

export default function InternshipDetailPage() {
    const params = useParams()
    const id = params.id 
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isApplied, setIsApplied] = useState(false)

    const internship = internships.find((i) => i.id === id)

    if (!internship) {
        return (
            <div className="min-h-screen bg-background pt-24 px-4">
                <div className="max-w-7xl mx-auto text-center py-12">
                    <p className="text-muted-foreground">Internship not found</p>
                </div>
            </div>
        )
    }
console.log(internship);
    return (
        <div className="min-h-screen bg-background">
            {/* Header with gradient background */}
            <div className="border-b border-border/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    {/* Back button */}
                    <Link to="/internships">
                        <button
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
                            <ArrowLeft className="w-4 h-4"/>
                            Back to Internships
                        </button>
                    </Link>

                    {/* Hero section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main content */}
                        <div className="lg:col-span-2">
                            <img
                                src={internship.image || "/placeholder.svg?height=400&width=800&query=internship"}
                                alt={internship.title}
                                className="w-full h-64 sm:h-80 object-cover rounded-xl border border-border mb-6"
                            />

                            <div className="flex items-start gap-4 mb-6">
                                <img
                                    src={internship.company.logo || "/placeholder.svg?height=80&width=80&query=logo"}
                                    alt={internship.company.name}
                                    className="w-16 h-16 rounded-xl object-cover border border-border flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{internship.title}</h1>
                                    <p className="text-lg text-muted-foreground mb-4">{internship.company.name}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {internship.featured &&
                                            <Badge className="bg-primary/15 text-primary">Featured</Badge>}
                                        <Badge variant="outline">{internship.category}</Badge>
                                        <Badge variant="outline">{internship.format}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar CTA */}
                        <div className="space-y-4">
                            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                                <div className="space-y-4">
                                    <Button
                                        onClick={() => setIsApplied(!isApplied)}
                                        className={`w-full font-semibold transition-all ${isApplied ? "bg-green-600 hover:bg-green-700" : ""}`}
                                        size="lg"
                                    >
                                        {isApplied ? "Applied ✓" : "Apply Now"}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsWishlisted(!isWishlisted)}
                                        className="w-full gap-2 transition-all"
                                        size="lg"
                                    >
                                        <Bookmark className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}/>
                                        {isWishlisted ? "Saved" : "Save"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Quick Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Location</p>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary"/>
                            <p className="font-semibold text-sm">{internship.location}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Duration</p>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary"/>
                            <p className="font-semibold text-sm">{internship.duration}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Compensation</p>
                        <div className="flex items-center gap-2">
                            <DollarSign className="w-4 h-4 text-primary"/>
                            <p className="font-semibold text-sm">{internship.pay === "Paid" ? internship.salary : internship.pay}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4">
                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Applicants</p>
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary"/>
                            <p className="font-semibold text-sm">{internship.applicants}</p>
                        </div>
                    </div>
                </div>

                {/* Tabs Content */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList
                        className="grid w-full grid-cols-5 bg-background rounded-lg h-auto border-2 px-1">
                        {["overview", "requirements", "company", "reviews", "faqs"].map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="data-[state=active]:bg-white border-transparent rounded-lg  py-2 capitalize"
                            >
                                {tab}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="pt-8 space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="p-6 border border-border">
                                    <h3 className="text-xl font-bold mb-4">About This Role</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">{internship.description}</p>

                                    <h4 className="font-semibold text-lg mb-3">Key Responsibilities</h4>
                                    <ul className="space-y-2 mb-8">
                                        {internship.responsibilities.map((resp, idx) => (
                                            <li key={idx} className="flex gap-3 items-start">
                                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0"/>
                                                <span className="text-muted-foreground">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <h4 className="font-semibold text-lg mb-3">Skills You'll Develop</h4>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {internship.skills.map((skill, idx) => (
                                            <Badge key={idx} variant="secondary" className="px-3 py-1">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>

                                    {internship.benefits.length > 0 && (
                                        <>
                                            <h4 className="font-semibold text-lg mb-3">Benefits</h4>
                                            <ul className="space-y-2">
                                                {internship.benefits.map((benefit, idx) => (
                                                    <li key={idx} className="flex gap-3 items-start">
                                                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0"/>
                                                        <span className="text-muted-foreground">{benefit}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </>
                                    )}
                                </Card>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                <Card className="p-6 border border-border">
                                    <h3 className="font-semibold mb-4">Quick Info</h3>
                                    <div className="space-y-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground mb-1">Status</p>
                                            <Badge className="bg-green-600/20 text-green-600">Open</Badge>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground mb-1">Applications</p>
                                            <p className="font-semibold">{internship.applicants}+ received</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6 border border-border bg-primary/5">
                                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4"/>
                                        Application Tip
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Customize your resume and cover letter to match this role's requirements.
                                    </p>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Requirements Tab */}
                    <TabsContent value="requirements" className="pt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <Card className="p-6 border border-border">
                                    <h3 className="text-xl font-bold mb-6">Requirements</h3>

                                    <div className="mb-8">
                                        <h4 className="font-semibold text-lg mb-3 text-green-600 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5"/>
                                            Required Skills
                                        </h4>
                                        <ul className="space-y-2">
                                            {internship.requirements.required.map((req, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-muted-foreground">
                                                    <span className="text-green-600 font-bold">✓</span>
                                                    <span>{req}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-lg mb-3 text-blue-600 flex items-center gap-2">
                                            <Star className="w-5 h-5"/>
                                            Preferred Skills
                                        </h4>
                                        <ul className="space-y-2">
                                            {internship.requirements.preferred.map((pref, idx) => (
                                                <li key={idx} className="flex gap-3 items-start text-muted-foreground">
                                                    <span className="text-blue-600 font-bold">+</span>
                                                    <span>{pref}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Company Tab */}
                    <TabsContent value="company" className="pt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <Card className="p-6 border border-border">
                                    <h3 className="text-xl font-bold mb-4">About {internship.company.name}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6">{internship.company.description}</p>

                                    <div
                                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 py-6 border-y border-border">
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Industry</p>
                                            <p className="font-semibold">{internship.company.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Company
                                                Size</p>
                                            <p className="font-semibold">{internship.company.size}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Location</p>
                                            <p className="font-semibold">{internship.company.location}</p>
                                        </div>
                                    </div>

                                    <h4 className="font-semibold text-lg mb-3">Culture & Values</h4>
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {internship.company.culture.map((value, idx) => (
                                            <Badge key={idx} variant="outline">
                                                {value}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button variant="outline" className="gap-2 bg-transparent">
                                            <Globe className="w-4 h-4"/>
                                            Visit Website
                                        </Button>
                                        <Button variant="outline" className="gap-2 bg-transparent">
                                            <Mail className="w-4 h-4"/>
                                            Contact Company
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* Reviews Tab */}
                    <TabsContent value="reviews" className="pt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {internship.reviews.length > 0 ? (
                                    internship.reviews.map((review) => (
                                        <Card key={review.id} className="p-6 border border-border">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={review.avatar || "/placeholder.svg?height=40&width=40&query=avatar"}
                                                        alt={review.author}
                                                        className="w-10 h-10 rounded-full"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">{review.author}</p>
                                                        <p className="text-xs text-muted-foreground">{review.role}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {Array.from({length: 5}).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${
                                                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-muted-foreground mb-3">{review.text}</p>
                                            <div className="flex gap-4 text-xs">
                                                <button
                                                    className="text-muted-foreground hover:text-foreground transition-colors">
                                                    👍 Helpful ({review.helpful})
                                                </button>
                                                <span className="text-muted-foreground">{review.date}</span>
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <Card className="p-6 border border-border text-center">
                                        <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    {/* FAQs Tab */}
                    <TabsContent value="faqs" className="pt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <Card className="p-6 border border-border">
                                    <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                                    <div className="space-y-6">
                                        <div className="pb-6 border-b border-border last:border-b-0">
                                            <p className="font-semibold mb-2">What is the timeline for application
                                                review?</p>
                                            <p className="text-sm text-muted-foreground">
                                                We typically review applications within 2-3 weeks of submission. You'll
                                                receive an email update
                                                about your application status.
                                            </p>
                                        </div>
                                        <div className="pb-6 border-b border-border last:border-b-0">
                                            <p className="font-semibold mb-2">Can I apply if I am not in the target
                                                location?</p>
                                            <p className="text-sm text-muted-foreground">
                                                Yes, especially for remote roles. We encourage applications from all
                                                locations and will consider
                                                all qualified candidates.
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-semibold mb-2">What happens after I apply?</p>
                                            <p className="text-sm text-muted-foreground">
                                                You'll first receive an acknowledgment email. Selected candidates will
                                                be contacted for an
                                                initial screening call within 2 weeks.
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
