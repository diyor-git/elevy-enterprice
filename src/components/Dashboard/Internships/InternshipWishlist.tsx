import {Card} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {Button} from "@/components/ui/button"
import {DollarSign, Heart, MapPin, Trash2} from "lucide-react"
import {useState} from "react"

interface WishlistItem {
    id: string
    company: string
    position: string
    location: string
    salary?: { min: number; max: number }
    format: "remote" | "onsite" | "hybrid"
    addedDate: Date
    reason?: string
}

interface InternshipWishlistProps {
    wishlist?: WishlistItem[]
}

const defaultWishlist: WishlistItem[] = [
    {
        id: "1",
        company: "OpenAI",
        position: "ML Research Intern",
        location: "San Francisco, CA",
        salary: {min: 10000, max: 12000},
        format: "onsite",
        addedDate: new Date("2024-11-01"),
        reason: "Leading AI research, great learning opportunity",
    },
    {
        id: "2",
        company: "Anthropic",
        position: "Research Intern",
        location: "San Francisco, CA",
        salary: {min: 9500, max: 11500},
        format: "onsite",
        addedDate: new Date("2024-10-28"),
        reason: "Focus on AI safety, interesting research",
    },
    {
        id: "3",
        company: "DeepSeek",
        position: "Backend Engineering Intern",
        location: "Remote",
        salary: {min: 7000, max: 9000},
        format: "remote",
        addedDate: new Date("2024-11-05"),
    },
    {
        id: "4",
        company: "Stripe",
        position: "Product Management Intern",
        location: "San Francisco, CA",
        salary: {min: 8500, max: 10500},
        format: "hybrid",
        addedDate: new Date("2024-11-03"),
        reason: "Great for product skills",
    },
]

function InternshipWishlist({wishlist = defaultWishlist}: InternshipWishlistProps) {
    const [items, setItems] = useState<WishlistItem[]>(wishlist)

    const handleRemove = (id: string) => {
        setItems(items.filter((item) => item.id !== id))
    }

    const formatOptions = {
        remote: {badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30", label: "Remote"},
        onsite: {badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30", label: "On-site"},
        hybrid: {badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/30", label: "Hybrid"},
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Your Wishlist</h2>
                    <p className="text-muted-foreground">{items.length} internships saved</p>
                </div>
                <Heart className="w-6 h-6 text-red-500 fill-red-500"/>
            </div>

            {items.length === 0 ? (
                <Card className="p-12 text-center border border-border">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50"/>
                    <p className="text-muted-foreground">No internships in your wishlist yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Save interesting internships to apply later</p>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map((item) => (
                        <Card key={item.id}
                              className="p-5 border border-border hover:border-primary/50 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg">{item.company}</h3>
                                    <p className="text-sm text-muted-foreground">{item.position}</p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRemove(item.id)}
                                    className="text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="w-4 h-4"/>
                                </Button>
                            </div>

                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-muted-foreground"/>
                                    <span className="text-sm">{item.location}</span>
                                </div>
                                {item.salary && (
                                    <div className="flex items-center gap-2">
                                        <DollarSign className="w-4 h-4 text-muted-foreground"/>
                                        <span className="text-sm">
                      ${item.salary.min / 1000}K - ${item.salary.max / 1000}K per month
                    </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-3">
                                <Badge
                                    className={formatOptions[item.format].badge}>{formatOptions[item.format].label}</Badge>
                                <span className="text-xs text-muted-foreground">
                  Saved {new Date(item.addedDate).toLocaleDateString()}
                </span>
                            </div>

                            {item.reason && (
                                <div className="bg-muted/30 p-3 rounded-lg mb-3 border border-border">
                                    <p className="text-sm text-muted-foreground">{item.reason}</p>
                                </div>
                            )}

                            <Button className="w-full">Apply Now</Button>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}

export default InternshipWishlist;