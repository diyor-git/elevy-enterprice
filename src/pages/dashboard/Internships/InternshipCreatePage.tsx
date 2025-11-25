import type React from "react"
import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Textarea} from "@/components/ui/textarea"
import {Badge} from "@/components/ui/badge"
import {internships} from "@/data/internships"
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert"
import {AlertCircle, CheckCircle2, ChevronLeft, Plus, Trash2} from "lucide-react"
import {Link} from "react-router-dom";


interface FormData {
    title: string
    category: string
    format: string
    pay: string
    location: string
    salary: string
    duration: string
    startDate: string
    deadline: string
    openings: string
    description: string
    responsibilities: string[]
    requiredSkills: string[]
    requirements: {
        required: string[]
        preferred: string[]
    }
    benefits: string[]
    companyName: string
    companyIndustry: string
    companySize: string
}

const initialFormData: FormData = {
    title: "",
    category: "Software Development",
    format: "Remote",
    pay: "Paid",
    location: "",
    salary: "",
    duration: "3 months",
    startDate: "",
    deadline: "",
    openings: "",
    description: "",
    responsibilities: [],
    requiredSkills: [],
    requirements: {
        required: [],
        preferred: [],
    },
    benefits: [],
    companyName: "",
    companyIndustry: "",
    companySize: "",
}

function CreateInternshipPage() {

    const [formData, setFormData] = useState<FormData>(initialFormData)
    const [currentResponsibility, setCurrentResponsibility] = useState("")
    const [currentSkill, setCurrentSkill] = useState("")
    const [currentRequiredReq, setCurrentRequiredReq] = useState("")
    const [currentPreferredReq, setCurrentPreferredReq] = useState("")
    const [currentBenefit, setCurrentBenefit] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [alertState, setAlertState] = useState<{
        show: boolean
        type: "error" | "success"
        message: string
    }>({show: false, type: "error", message: ""})

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({...prev, [name]: value}))
    }

    const addResponsibility = () => {
        if (currentResponsibility.trim()) {
            setFormData((prev) => ({
                ...prev,
                responsibilities: [...prev.responsibilities, currentResponsibility],
            }))
            setCurrentResponsibility("")
        }
    }

    const addSkill = () => {
        if (currentSkill.trim()) {
            setFormData((prev) => ({
                ...prev,
                requiredSkills: [...prev.requiredSkills, currentSkill],
            }))
            setCurrentSkill("")
        }
    }

    const addRequiredReq = () => {
        if (currentRequiredReq.trim()) {
            setFormData((prev) => ({
                ...prev,
                requirements: {
                    ...prev.requirements,
                    required: [...prev.requirements.required, currentRequiredReq],
                },
            }))
            setCurrentRequiredReq("")
        }
    }

    const addPreferredReq = () => {
        if (currentPreferredReq.trim()) {
            setFormData((prev) => ({
                ...prev,
                requirements: {
                    ...prev.requirements,
                    preferred: [...prev.requirements.preferred, currentPreferredReq],
                },
            }))
            setCurrentPreferredReq("")
        }
    }

    const addBenefit = () => {
        if (currentBenefit.trim()) {
            setFormData((prev) => ({
                ...prev,
                benefits: [...prev.benefits, currentBenefit],
            }))
            setCurrentBenefit("")
        }
    }

    const removeItem = (type: string, index: number) => {
        setFormData((prev) => {
            if (type === "responsibility") {
                return {
                    ...prev,
                    responsibilities: prev.responsibilities.filter((_, i) => i !== index),
                }
            } else if (type === "skill") {
                return {
                    ...prev,
                    requiredSkills: prev.requiredSkills.filter((_, i) => i !== index),
                }
            } else if (type === "required") {
                return {
                    ...prev,
                    requirements: {
                        ...prev.requirements,
                        required: prev.requirements.required.filter((_, i) => i !== index),
                    },
                }
            } else if (type === "preferred") {
                return {
                    ...prev,
                    requirements: {
                        ...prev.requirements,
                        preferred: prev.requirements.preferred.filter((_, i) => i !== index),
                    },
                }
            } else if (type === "benefit") {
                return {
                    ...prev,
                    benefits: prev.benefits.filter((_, i) => i !== index),
                }
            }
            return prev
        })
    }

    const validateForm = () => {
        if (!formData.title.trim()) {
            setAlertState({show: true, type: "error", message: "Title is required"})
            return false
        }
        if (!formData.companyName.trim()) {
            setAlertState({show: true, type: "error", message: "Company name is required"})
            return false
        }
        if (!formData.location.trim()) {
            setAlertState({show: true, type: "error", message: "Location is required"})
            return false
        }
        if (!formData.description.trim()) {
            setAlertState({show: true, type: "error", message: "Description is required"})
            return false
        }
        if (formData.responsibilities.length === 0) {
            setAlertState({show: true, type: "error", message: "Add at least one responsibility"})
            return false
        }
        if (formData.requiredSkills.length === 0) {
            setAlertState({show: true, type: "error", message: "Add at least one skill"})
            return false
        }
        if (formData.requirements.required.length === 0) {
            setAlertState({show: true, type: "error", message: "Add at least one required skill"})
            return false
        }
        if (!formData.deadline) {
            setAlertState({show: true, type: "error", message: "Application deadline is required"})
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            const internshipData = {
                ...formData,
                id: Math.random().toString(36).substr(2, 9),
                openings: Number.parseInt(formData.openings) || 1,
                applicants: 0,
                featured: false,
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
                reviews: [],
                company: {
                    id: formData.companyName.toLowerCase().replace(/\s+/g, "-"),
                    name: formData.companyName,
                    logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=100&h=100&fit=crop",
                    description: formData.description,
                    industry: formData.companyIndustry,
                    size: formData.companySize,
                    location: formData.location,
                    website: "https://example.com",
                    culture: [],
                    benefits: formData.benefits,
                },
            }

            
            internships.push(internshipData)
            console.log("[v0] Internship created:", internshipData)
            internships.push(internshipData)
            console.log(internships)
            setAlertState({show: true, type: "success", message: "Internship created successfully!"})

            setTimeout(() => {
                // router.push("/internships")
            }, 1500)
        } catch (error) {
            console.error("[v0] Error creating internship:", error)
            setAlertState({show: true, type: "error", message: "Error creating internship"})
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/internships"
                        className="flex items-center gap-2 text-primary hover:underline mb-6 inline-flex cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4"/>
                        Back to Internships
                    </Link>
                    <div className="mb-6">
                        <h1 className="text-4xl font-bold mb-2">Create Internship Opportunity</h1>
                        <p className="text-lg text-muted-foreground">
                            Post a new internship position and attract talented candidates
                        </p>
                    </div>
                </div>

                {/* Alert */}
                {alertState.show && (
                    <Alert variant={alertState.type === "error" ? "destructive" : "default"} className="mb-6">
                        {alertState.type === "error" ? <AlertCircle className="h-4 w-4"/> :
                            <CheckCircle2 className="h-4 w-4"/>}
                        <AlertTitle>{alertState.type === "error" ? "Error" : "Success"}</AlertTitle>
                        <AlertDescription>{alertState.message}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Company Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  1
                </span>
                                Company Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Company Name*</label>
                                    <Input
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Google, Microsoft"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Industry*</label>
                                    <Input
                                        name="companyIndustry"
                                        value={formData.companyIndustry}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Technology, Finance"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Company Size</label>
                                <Select
                                    value={formData.companySize}
                                    onValueChange={(value) => handleSelectChange("companySize", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select company size"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1-50">1-50 employees</SelectItem>
                                        <SelectItem value="51-200">51-200 employees</SelectItem>
                                        <SelectItem value="201-1000">201-1,000 employees</SelectItem>
                                        <SelectItem value="1000+">1,000+ employees</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Job Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  2
                </span>
                                Job Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Job Title*</label>
                                <Input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="e.g., Full-Stack Developer Intern"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Category*</label>
                                    <Select value={formData.category}
                                            onValueChange={(value) => handleSelectChange("category", value)}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Software Development">Software Development</SelectItem>
                                            <SelectItem value="Data Science">Data Science</SelectItem>
                                            <SelectItem value="Design">Design</SelectItem>
                                            <SelectItem value="Marketing">Marketing</SelectItem>
                                            <SelectItem value="Business">Business</SelectItem>
                                            <SelectItem value="Product Management">Product Management</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Format*</label>
                                    <Select value={formData.format}
                                            onValueChange={(value) => handleSelectChange("format", value)}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Remote">Remote</SelectItem>
                                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                                            <SelectItem value="On-site">On-site</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Pay Type*</label>
                                    <Select value={formData.pay}
                                            onValueChange={(value) => handleSelectChange("pay", value)}>
                                        <SelectTrigger>
                                            <SelectValue/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Paid">Paid</SelectItem>
                                            <SelectItem value="Unpaid">Unpaid</SelectItem>
                                            <SelectItem value="Stipend">Stipend</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Duration*</label>
                                    <Input
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleInputChange}
                                        placeholder="e.g., 3 months"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Location*</label>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g., San Francisco, CA"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Salary/Stipend</label>
                                    <Input
                                        name="salary"
                                        value={formData.salary}
                                        onChange={handleInputChange}
                                        placeholder="e.g., $8,000/month"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Start Date</label>
                                    <Input type="date" name="startDate" value={formData.startDate}
                                           onChange={handleInputChange}/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Application Deadline*</label>
                                    <Input type="date" name="deadline" value={formData.deadline}
                                           onChange={handleInputChange}/>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Number of Openings</label>
                                <Input
                                    type="number"
                                    name="openings"
                                    value={formData.openings}
                                    onChange={handleInputChange}
                                    placeholder="e.g., 5"
                                    min="1"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  3
                </span>
                                Job Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-2">Description*</label>
                                <Textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the internship opportunity..."
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Responsibilities */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  4
                </span>
                                Responsibilities
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={currentResponsibility}
                                    onChange={(e) => setCurrentResponsibility(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addResponsibility()}
                                    placeholder="Add a responsibility..."
                                />
                                <Button onClick={addResponsibility} type="button" variant="outline">
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.responsibilities.map((resp, index) => (
                                    <Badge key={index} variant="secondary" className="gap-2">
                                        {resp}
                                        <button
                                            onClick={() => removeItem("responsibility", index)}
                                            className="text-xs cursor-pointer hover:text-destructive"
                                        >
                                            <Trash2 className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Required Skills */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  5
                </span>
                                Required Skills & Technologies
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={currentSkill}
                                    onChange={(e) => setCurrentSkill(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                                    placeholder="e.g., React, Node.js..."
                                />
                                <Button onClick={addSkill} type="button" variant="outline">
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.requiredSkills.map((skill, index) => (
                                    <Badge key={index} className="gap-2">
                                        {skill}
                                        <button
                                            onClick={() => removeItem("skill", index)}
                                            className="text-xs cursor-pointer hover:text-destructive"
                                        >
                                            <Trash2 className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Requirements */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  6
                </span>
                                Requirements
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h4 className="font-medium mb-3">Required</h4>
                                <div className="flex gap-2 mb-4">
                                    <Input
                                        value={currentRequiredReq}
                                        onChange={(e) => setCurrentRequiredReq(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && addRequiredReq()}
                                        placeholder="Add required requirement..."
                                    />
                                    <Button onClick={addRequiredReq} type="button" variant="outline">
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.requirements.required.map((req, index) => (
                                        <Badge key={index} variant="outline" className="gap-2">
                                            {req}
                                            <button
                                                onClick={() => removeItem("required", index)}
                                                className="text-xs cursor-pointer hover:text-destructive"
                                            >
                                                <Trash2 className="h-3 w-3"/>
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium mb-3">Preferred</h4>
                                <div className="flex gap-2 mb-4">
                                    <Input
                                        value={currentPreferredReq}
                                        onChange={(e) => setCurrentPreferredReq(e.target.value)}
                                        onKeyPress={(e) => e.key === "Enter" && addPreferredReq()}
                                        placeholder="Add preferred requirement..."
                                    />
                                    <Button onClick={addPreferredReq} type="button" variant="outline">
                                        <Plus className="h-4 w-4"/>
                                    </Button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.requirements.preferred.map((req, index) => (
                                        <Badge key={index} variant="outline" className="gap-2">
                                            {req}
                                            <button
                                                onClick={() => removeItem("preferred", index)}
                                                className="text-xs cursor-pointer hover:text-destructive"
                                            >
                                                <Trash2 className="h-3 w-3"/>
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Benefits */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                <span
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                  7
                </span>
                                Benefits
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    value={currentBenefit}
                                    onChange={(e) => setCurrentBenefit(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && addBenefit()}
                                    placeholder="e.g., Health insurance, Free meals..."
                                />
                                <Button onClick={addBenefit} type="button" variant="outline">
                                    <Plus className="h-4 w-4"/>
                                </Button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.benefits.map((benefit, index) => (
                                    <Badge key={index} variant="secondary" className="gap-2">
                                        {benefit}
                                        <button
                                            onClick={() => removeItem("benefit", index)}
                                            className="text-xs cursor-pointer hover:text-destructive"
                                        >
                                            <Trash2 className="h-3 w-3"/>
                                        </button>
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-4 justify-end sticky bottom-0 bg-background py-4 border-t">
                        <Link to="/internships">
                            <Button variant="outline" className="cursor-pointer bg-transparent">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
                            {isSubmitting ? "Creating..." : "Create Internship"}
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CreateInternshipPage;
