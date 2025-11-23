import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Card} from "@/components/ui/card"
import {Bookmark, Clock, DollarSign, MapPin, Users} from "lucide-react"
import {Internship} from "@/types/internships"
import {memo, useState} from "react"
import {Link} from "react-router-dom";

interface InternshipCardProps {
    internship: Internship
}

export const InternshipCard = memo(function InternshipCard({internship}: InternshipCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false)

    return (
        <Card
            className="group h-full p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card hover:bg-card/80 cursor-pointer">
            {internship.featured && (
                <Badge className="mb-4 bg-primary/15 text-primary hover:bg-primary/25 font-medium">Featured</Badge>
            )}

            <div className="flex items-start gap-4 mb-4">
                <img
                    src={internship.company.logo || "/placeholder.svg"}
                    alt={internship.company.name}
                    className="w-14 h-14 rounded-lg object-cover border border-border/50 flex-shrink-0 group-hover:shadow-md transition-shadow"
                />
                <div className="flex-1 min-w-0">
                    <Link to={`/internships/${internship.id}`} className="block group/link">
                        <h3 className="font-semibold text-base text-foreground group-hover/link:text-primary transition-colors mb-1 line-clamp-2">
                            {internship.title}
                        </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{internship.company.name}</p>
                </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{internship.description}</p>

            {/* Info Grid - Compact & Clean */}
            <div className="grid grid-cols-2 gap-3 mb-4 py-3 border-y border-border/30">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5 text-primary/60 flex-shrink-0"/>
                    <span className="truncate">{internship.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary/60 flex-shrink-0"/>
                    <span>{internship.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="w-3.5 h-3.5 text-primary/60 flex-shrink-0"/>
                    <span
                        className="font-medium">{internship.pay === "Paid" ? internship.salary : internship.pay}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Users className="w-3.5 h-3.5 text-primary/60 flex-shrink-0"/>
                    <span>{internship.applicants} applied</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <Badge className="text-xs bg-primary/10 text-primary">{internship.category}</Badge>
                <Badge variant="outline" className="text-xs">
                    {internship.format}
                </Badge>
                {internship.skills.slice(0, 2).map((skill, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                    </Badge>
                ))}
                {internship.skills.length > 2 && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                        +{internship.skills.length - 2}
                    </Badge>
                )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 gap-2">
                <div className="text-xs text-muted-foreground">
                    <span>Apply by </span>
                    <span className="font-medium text-foreground">{internship.deadline}</span>
                </div>
                <div className="flex gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => {
                            e.preventDefault()
                            setIsWishlisted(!isWishlisted)
                        }}
                        className="px-2 hover:bg-primary/10"
                    >
                        <Bookmark
                            className={`w-4 h-4 transition-colors ${isWishlisted ? "fill-primary text-primary" : "text-muted-foreground"}`}
                        />
                    </Button>
                    <Link to={`/internships/${internship.id}`} className="flex-1">
                        <Button size="sm" className="w-full text-xs font-medium">
                            View Details
                        </Button>
                    </Link>
                </div>
            </div>
        </Card>
    )
})
