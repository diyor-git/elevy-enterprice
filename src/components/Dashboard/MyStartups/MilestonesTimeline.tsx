import type React from "react"
import {useState} from "react"
import {Card} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {CheckCircle2, Clock, Plus, Rocket, Target, X} from "lucide-react"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"

interface Milestone {
    id: string
    title: string
    description: string
    date: Date
    status: "completed" | "in-progress" | "upcoming"
    category: "product" | "business" | "team" | "funding"
}

interface MilestonesTimelineProps {
    milestones?: Milestone[]
    onAddMilestone?: (milestone: Milestone) => void
    onEditMilestone?: (milestone: Milestone) => void
    onDeleteMilestone?: (id: string) => void
}

const defaultMilestones: Milestone[] = [
    {
        id: "1",
        title: "Launched MVP",
        description: "First version of the platform goes live",
        date: new Date("2023-06-15"),
        status: "completed",
        category: "product",
    },
    {
        id: "2",
        title: "Seed Funding Raised",
        description: "$500K seed round from Sequoia and a16z",
        date: new Date("2023-08-01"),
        status: "completed",
        category: "funding",
    },
    {
        id: "3",
        title: "Reached 1000 Users",
        description: "Hit first significant user milestone",
        date: new Date("2023-10-20"),
        status: "completed",
        category: "business",
    },
    {
        id: "4",
        title: "Hired First Engineer",
        description: "Expanded team with senior engineer",
        date: new Date("2023-11-01"),
        status: "completed",
        category: "team",
    },
    {
        id: "5",
        title: "Series A Fundraising",
        description: "Actively raising Series A round",
        date: new Date("2024-03-01"),
        status: "in-progress",
        category: "funding",
    },
    {
        id: "6",
        title: "Launch Premium Tier",
        description: "Release premium features and pricing",
        date: new Date("2024-06-01"),
        status: "upcoming",
        category: "product",
    },
    {
        id: "7",
        title: "10000 Customers",
        description: "Reach 10K customers milestone",
        date: new Date("2024-12-31"),
        status: "upcoming",
        category: "business",
    },
]

const categoryColors: Record<string, { bg: string; icon: React.ElementType; color: string }> = {
    product: {bg: "bg-blue-100 dark:bg-blue-900/20", icon: Rocket, color: "text-blue-600 dark:text-blue-400"},
    business: {bg: "bg-green-100 dark:bg-green-900/20", icon: Target, color: "text-green-600 dark:text-green-400"},
    team: {bg: "bg-purple-100 dark:bg-purple-900/20", icon: Target, color: "text-purple-600 dark:text-purple-400"},
    funding: {bg: "bg-amber-100 dark:bg-amber-900/20", icon: Rocket, color: "text-amber-600 dark:text-amber-400"},
}

const statusConfig = {
    completed: {badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle2},
    "in-progress": {badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", icon: Clock},
    upcoming: {badge: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400", icon: Target},
}

function MilestonesTimeline({
                                milestones = defaultMilestones,
                                onAddMilestone,
                                onEditMilestone,
                                onDeleteMilestone,
                            }: MilestonesTimelineProps) {
    const [showModal, setShowModal] = useState(false)
    const [editingMilestone, setEditingMilestone] = useState<Milestone | null>(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        status: "upcoming",
        category: "product",
    })
    const [localMilestones, setMilestones] = useState(milestones)

    const handleOpenModal = (milestone?: Milestone) => {
        if (milestone) {
            setEditingMilestone(milestone)
            setFormData({
                title: milestone.title,
                description: milestone.description,
                date: milestone.date.toISOString().split("T")[0],
                status: milestone.status,
                category: milestone.category,
            })
        } else {
            setEditingMilestone(null)
            setFormData({
                title: "",
                description: "",
                date: "",
                status: "upcoming",
                category: "product",
            })
        }
        setShowModal(true)
    }

    const handleSubmit = () => {
        if (formData.title && formData.date) {
            const newMilestone: any = {
                id: editingMilestone?.id || Date.now().toString(),
                ...formData,
                date: new Date(formData.date),
            }

            if (editingMilestone && onEditMilestone) {
                onEditMilestone(newMilestone)
            } else if (!editingMilestone && onAddMilestone) {
                onAddMilestone(newMilestone)
            }

            if (editingMilestone) {
                setMilestones((prev) => prev.map((m) => (m.id === editingMilestone.id ? newMilestone : m)))
            } else {
                setMilestones((prev) => [...prev, newMilestone])
            }

            setShowModal(false)
        }
    }

    const sortedMilestones = [...localMilestones].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card
                    className="p-4 border border-border bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/10">
                    <p className="text-sm text-muted-foreground mb-1">Completed Milestones</p>
                    <p className="text-2xl font-bold">{localMilestones.filter((m) => m.status === "completed").length}</p>
                </Card>
                <Card
                    className="p-4 border border-border bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/10">
                    <p className="text-sm text-muted-foreground mb-1">In Progress</p>
                    <p className="text-2xl font-bold">{localMilestones.filter((m) => m.status === "in-progress").length}</p>
                </Card>
                <Card
                    className="p-4 border border-border bg-gradient-to-br from-amber-50/50 to-background dark:from-amber-950/10">
                    <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                    <p className="text-2xl font-bold">{localMilestones.filter((m) => m.status === "upcoming").length}</p>
                </Card>
            </div>

            <Card className="p-6 border border-border">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Timeline</h3>
                    <Button size="sm" onClick={() => handleOpenModal()} className="gap-2">
                        <Plus className="w-4 h-4"/>
                        Add Milestone
                    </Button>
                </div>

                <div className="space-y-4">
                    {sortedMilestones.map((milestone, index) => {
                        const config = statusConfig[milestone.status]
                        const CategoryIcon = categoryColors[milestone.category].icon

                        return (
                            <div key={milestone.id} className="flex gap-4 group">
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${categoryColors[milestone.category].bg} border-current`}
                                    >
                                        <CategoryIcon
                                            className={`w-5 h-5 ${categoryColors[milestone.category].color}`}/>
                                    </div>
                                    {index < sortedMilestones.length - 1 &&
                                        <div className="w-1 h-12 bg-border mt-2 mb-2"/>}
                                </div>

                                <div className="pb-4 flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-foreground">{milestone.title}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                                        </div>
                                        <div
                                            className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
                                            <Button size="sm" variant="ghost"
                                                    onClick={() => handleOpenModal(milestone)}>
                                                Edit
                                            </Button>
                                            {onDeleteMilestone && (
                                                <Button size="sm" variant="ghost"
                                                        onClick={() => onDeleteMilestone(milestone.id)}>
                                                    <X className="w-4 h-4"/>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge className={config.badge}>{milestone.status.replace("-", " ")}</Badge>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(milestone.date).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingMilestone ? "Edit Milestone" : "Add New Milestone"}</DialogTitle>
                        <DialogDescription>
                            {editingMilestone ? "Update your milestone details" : "Create a new milestone for your startup"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
                            <Input
                                placeholder="Milestone title"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                            <textarea
                                placeholder="Describe this milestone"
                                value={formData.description}
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                                <Input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-foreground mb-1 block">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                                >
                                    <option value="completed">Completed</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="upcoming">Upcoming</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                                <option value="product">Product</option>
                                <option value="business">Business</option>
                                <option value="team">Team</option>
                                <option value="funding">Funding</option>
                            </select>
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSubmit} className="bg-primary">
                                {editingMilestone ? "Update" : "Add"} Milestone
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default MilestonesTimeline;