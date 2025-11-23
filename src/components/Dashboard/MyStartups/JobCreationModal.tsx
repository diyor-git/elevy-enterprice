import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"

interface JobCreationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onCreateJob: (job: any) => void
}

function JobCreationModal({open, onOpenChange, onCreateJob}: JobCreationModalProps) {
    const [formData, setFormData] = useState({
        title: "",
        location: "",
        type: "Full-time",
        description: "",
        requirements: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (formData.title && formData.description) {
            onCreateJob({
                id: Date.now().toString(),
                ...formData,
                applicants: 0,
                applicantsList: [],
            })
            setFormData({
                title: "",
                location: "",
                type: "Full-time",
                description: "",
                requirements: "",
            })
            onOpenChange(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Create New Job Posting</DialogTitle>
                    <DialogDescription>Add a new job position for your startup</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Job Title</label>
                            <Input
                                placeholder="e.g., Senior Product Manager"
                                value={formData.title}
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                            <Input
                                placeholder="e.g., San Francisco, CA"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Job Type</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                                <option>Full-time</option>
                                <option>Part-time</option>
                                <option>Contract</option>
                                <option>Internship</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Job Description</label>
                        <textarea
                            placeholder="Describe the role, responsibilities, and expectations..."
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[120px]"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Requirements</label>
                        <textarea
                            placeholder="List the required skills, experience, and qualifications..."
                            value={formData.requirements}
                            onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground min-h-[100px]"
                        />
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-primary">
                            Create Job Posting
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default JobCreationModal;