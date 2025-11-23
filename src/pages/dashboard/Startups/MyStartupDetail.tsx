import {useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx"
import {Lock, Plus, Settings} from "lucide-react"
import {defaultMessages, defaultStartups, defaultTasks, defaultUsers} from "@/data/startup-data.ts"
import {Message, Startup, Task, User} from "@/types/startup.ts"
import {Button} from "@/components/ui/button.tsx"
import {useStartups} from "@/hooks/use-startups.ts"
import {Badge} from "@/components/ui/badge.tsx"
import {
    ApplicationsModal,
    FinancialDashboard,
    FundingTracker,
    JobCreationModal,
    KanbanBoard,
    MilestonesTimeline,
    PerformanceMetrics,
    ProjectSettingsModal,
    TeamChat,
    UserManagement
} from "@/components/Dashboard/MyStartups";

export default function MyStartupDetail() {
    const [selectedStartupId, setSelectedStartupId] = useState<string>("1")
    const [startups, setStartups] = useState<Startup[]>(defaultStartups)
    const [users, setUsers] = useState<User[]>(defaultUsers)
    const [messages, setMessages] = useState<Message[]>(defaultMessages)
    const [tasks, setTasks] = useState<Task[]>(defaultTasks)
    const [showSettingsModal, setShowSettingsModal] = useState(false)
    const [showApplicationsModal, setShowApplicationsModal] = useState(false)
    const [showJobCreationModal, setShowJobCreationModal] = useState(false)
    const [selectedJobId, setSelectedJobId] = useState<string>("")

    const {addStartup} = useStartups()

    const selectedStartup = startups.find((s) => s.id === selectedStartupId) || startups[0]
    const selectedJob = selectedStartup.jobs?.find((j) => j.id === selectedJobId)

    const handleUpdateApplicationStatus = (
        applicantId: string,
        status: "pending" | "reviewing" | "accepted" | "rejected",
    ) => {
        setStartups(
            startups.map((s) => {
                if (s.id === selectedStartupId && s.jobs) {
                    return {
                        ...s,
                        jobs: s.jobs.map((j) => {
                            if (j.id === selectedJobId && j.applicantsList) {
                                return {
                                    ...j,
                                    applicantsList: j.applicantsList.map((a) => (a.id === applicantId ? {
                                        ...a,
                                        status
                                    } : a)),
                                }
                            }
                            return j
                        }),
                    }
                }
                return s
            }),
        )
    }

    const openApplicationsModal = (jobId: string) => {
        setSelectedJobId(jobId)
        setShowApplicationsModal(true)
    }

    const handleSendMessage = (message: string): void => {
        const newMessage: Message = {
            id: Date.now().toString(),
            author: "You",
            message,
            timestamp: new Date(),
        }
        setMessages([...messages, newMessage])
    }

    const handleUpdateTask = (taskId: string, newStatus: string): void => {
        setTasks(tasks.map((task) => (task.id === taskId ? {...task, status: newStatus as any} : task)))
    }

    const handleAddTask = (newTask: Omit<Task, "id" | "status" | "comments" | "activity">): void => {
        const task: Task = {
            id: Date.now().toString(),
            title: newTask.title,
            description: newTask.description,
            status: "todo",
            assignee: newTask.assignee,
            priority: newTask.priority,
            deadline: newTask.deadline,
            comments: [],
            activity: [],
        }
        setTasks([...tasks, task])
    }

    const handleAddUser = (name: string, email: string, role: string): void => {
        const newUser: User = {
            id: Date.now().toString(),
            name,
            email,
            role: role as any,
            avatar: "👤",
        }
        setUsers([...users, newUser])
    }

    const handleRemoveUser = (userId: string): void => {
        setUsers(users.filter((user) => user.id !== userId))
    }

    const handleUpdateProjectSettings = (updatedStartup: Startup) => {
        setStartups(startups.map((s) => (s.id === updatedStartup.id ? updatedStartup : s)))
    }

    const handleCreateJob = (job: any) => {
        setStartups(
            startups.map((s) => {
                if (s.id === selectedStartupId) {
                    return {
                        ...s,
                        jobs: [...(s.jobs || []), job],
                    }
                }
                return s
            }),
        )
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto">

                {/* Project Details Card */}
                <div className="bg-card border border-border rounded-lg p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-4xl font-bold text-foreground mb-2">{selectedStartup.name}</h1>
                                <Badge
                                    className="bg-green-500/20 text-green-700 dark:text-green-400 cursor-pointer">mvp</Badge>
                                <div
                                    className="flex items-center gap-1 text-muted-foreground cursor-pointer hover:text-foreground">
                                    <Lock className="w-4 h-4"/>
                                    <span className="text-sm">public</span>
                                </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{selectedStartup.description}</p>
                        </div>
                        <Button size="sm" onClick={() => setShowSettingsModal(true)}
                                className="cursor-pointer">
                            <Settings className="w-5 h-5"/>
                            <span className="ml-2">Settings</span>
                        </Button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div
                            className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200/30 dark:border-blue-800/30">
                            <p className="text-muted-foreground text-sm mb-1">Stage</p>
                            <p className="text-xl font-semibold text-foreground capitalize">{selectedStartup.stage}</p>
                        </div>
                        <div
                            className="bg-green-50 dark:bg-green-950/20 rounded-lg p-4 border border-green-200/30 dark:border-green-800/30">
                            <p className="text-muted-foreground text-sm mb-1">Funding</p>
                            <p className="text-xl font-semibold text-foreground">
                                ${(selectedStartup.fundingRounds?.reduce((sum, r) => sum + r.amount, 0) || 120000) / 1000}K
                            </p>
                        </div>
                        <div
                            className="bg-purple-50 dark:bg-purple-950/20 rounded-lg p-4 border border-purple-200/30 dark:border-purple-800/30">
                            <p className="text-muted-foreground text-sm mb-1">Team</p>
                            <p className="text-xl font-semibold text-foreground">{selectedStartup.teamSize} members</p>
                        </div>
                        <div
                            className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-4 border border-amber-200/30 dark:border-amber-800/30">
                            <p className="text-muted-foreground text-sm mb-1">Founded</p>
                            <p className="text-xl font-semibold text-foreground">
                                {new Date(selectedStartup.founded).toLocaleDateString("en-US", {
                                    month: "2-digit",
                                    day: "2-digit",
                                    year: "2-digit",
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="tasks" className="w-full bg-card p-6 border border-border rounded-lg">
                    <TabsList className="grid w-full grid-cols-8 bg-background  rounded">
                        <TabsTrigger
                            value="tasks"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Tasks
                        </TabsTrigger>
                        <TabsTrigger
                            value="funding"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Funding
                        </TabsTrigger>
                        <TabsTrigger
                            value="milestones"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Milestones
                        </TabsTrigger>
                        <TabsTrigger
                            value="metrics"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Metrics
                        </TabsTrigger>
                        <TabsTrigger
                            value="team"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Team
                        </TabsTrigger>
                        <TabsTrigger
                            value="chat"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Chat
                        </TabsTrigger>
                        <TabsTrigger
                            value="jobs"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Jobs
                        </TabsTrigger>
                        <TabsTrigger
                            value="financials"
                            className="data-[state=active]:bg-white border-transparent rounded data-[state=active]:border-primary"
                        >
                            Financials
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="funding" className="pt-6">
                        <FundingTracker
                            fundingRounds={selectedStartup.fundingRounds}
                            investors={selectedStartup.investors}
                            totalRaised={selectedStartup.fundingRounds?.reduce((sum, r) => sum + r.amount, 0)}
                            target={1000000}
                        />
                    </TabsContent>

                    <TabsContent value="milestones" className="pt-6">
                        <MilestonesTimeline/>
                    </TabsContent>

                    <TabsContent value="metrics" className="pt-6">
                        <PerformanceMetrics
                            users={selectedStartup.metrics?.users}
                            arr={selectedStartup.metrics?.arr}
                            monthlyGrowth={selectedStartup.metrics?.monthlyGrowth}
                        />
                    </TabsContent>

                    <TabsContent value="tasks" className="pt-6">
                        <KanbanBoard users={users} tasks={tasks} onUpdateTask={handleUpdateTask}
                                     onAddTask={handleAddTask}/>
                    </TabsContent>

                    <TabsContent value="team" className="pt-6">
                        <UserManagement users={users} onAddUser={handleAddUser} onRemoveUser={handleRemoveUser}/>
                    </TabsContent>

                    <TabsContent value="chat" className="pt-6">
                        <TeamChat messages={messages} onSendMessage={handleSendMessage}/>
                    </TabsContent>

                    <TabsContent value="jobs" className="pt-6">
                        <div className="space-y-6">
                            <div className="flex justify-end">
                                <Button onClick={() => setShowJobCreationModal(true)} className="gap-2">
                                    <Plus className="w-4 h-4"/>
                                    Create Job Posting
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {selectedStartup.jobs && selectedStartup.jobs.length > 0 ? (
                                    <>
                                        {selectedStartup.jobs.map((job) => (
                                            <div key={job.id} className="bg-card border border-border rounded-lg p-6">
                                                <h3 className="font-semibold text-lg mb-2">{job.title}</h3>
                                                <p className="text-sm text-muted-foreground mb-4">{job.location}</p>
                                                <Badge variant="outline" className="mb-4">
                                                    {job.type}
                                                </Badge>
                                                <p className="text-sm mb-4">{job.description}</p>
                                                <Button className="w-full cursor-pointer"
                                                        onClick={() => openApplicationsModal(job.id)}>
                                                    View Applications ({job.applicants || 0})
                                                </Button>
                                            </div>
                                        ))}
                                    </>
                                ) : (
                                    <div
                                        className="col-span-full bg-card border border-border rounded-lg p-8 text-center">
                                        <p className="text-muted-foreground mb-4">No job postings yet</p>
                                        <Button onClick={() => setShowJobCreationModal(true)}>Create First Job</Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="financials" className="pt-6">
                        <FinancialDashboard/>
                    </TabsContent>
                </Tabs>

                <ProjectSettingsModal
                    startup={selectedStartup}
                    open={showSettingsModal}
                    onOpenChange={setShowSettingsModal}
                    onSave={handleUpdateProjectSettings}
                />

                {showApplicationsModal && selectedJob && (
                    <ApplicationsModal
                        jobTitle={selectedJob.title}
                        applicants={selectedJob.applicantsList || []}
                        onClose={() => setShowApplicationsModal(false)}
                        onUpdateStatus={handleUpdateApplicationStatus}
                    />
                )}

                <JobCreationModal
                    open={showJobCreationModal}
                    onOpenChange={setShowJobCreationModal}
                    onCreateJob={handleCreateJob}
                />
            </div>
        </div>
    )
}
