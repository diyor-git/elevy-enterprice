import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, Clock, XCircle, Send, Calendar, DollarSign, MapPin } from "lucide-react"
import { useState } from "react"

interface ApplicationItem {
  id: string
  company: string
  position: string
  appliedDate: Date
  status: "applied" | "interviewing" | "accepted" | "rejected"
  salary?: { min: number; max: number }
  location: string
  deadline?: Date
  notes?: string
}

interface ApplicationTrackerProps {
  applications?: ApplicationItem[]
}

const statusConfig = {
  applied: {
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: Send,
    color: "text-blue-600",
  },
  interviewing: {
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: Clock,
    color: "text-purple-600",
  },
  accepted: {
    badge: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    icon: CheckCircle2,
    color: "text-green-600",
  },
  rejected: {
    badge: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: XCircle,
    color: "text-red-600",
  },
}

const defaultApplications: ApplicationItem[] = [
  {
    id: "1",
    company: "Google",
    position: "Software Engineering Intern",
    appliedDate: new Date("2024-10-15"),
    status: "interviewing",
    salary: { min: 8000, max: 10000 },
    location: "Mountain View, CA",
    deadline: new Date("2024-11-30"),
    notes: "First round completed, waiting for second round",
  },
  {
    id: "2",
    company: "Microsoft",
    position: "Product Management Intern",
    appliedDate: new Date("2024-10-20"),
    status: "applied",
    salary: { min: 7500, max: 9000 },
    location: "Seattle, WA",
    deadline: new Date("2024-12-15"),
  },
  {
    id: "3",
    company: "Amazon",
    position: "Cloud Infrastructure Intern",
    appliedDate: new Date("2024-10-01"),
    status: "rejected",
    salary: { min: 8500, max: 10500 },
    location: "Seattle, WA",
    notes: "Not selected for this cycle",
  },
  {
    id: "4",
    company: "Meta",
    position: "Frontend Engineering Intern",
    appliedDate: new Date("2024-10-25"),
    status: "applied",
    salary: { min: 9000, max: 11000 },
    location: "Menlo Park, CA",
    deadline: new Date("2024-12-01"),
  },
  {
    id: "5",
    company: "Tesla",
    position: "Machine Learning Intern",
    appliedDate: new Date("2024-09-15"),
    status: "accepted",
    salary: { min: 8000, max: 10000 },
    location: "Palo Alto, CA",
    notes: "Offer accepted! Starting in summer 2025",
  },
]

function ApplicationTracker({ applications = defaultApplications }: ApplicationTrackerProps) {
  const [appList, setAppList] = useState<ApplicationItem[]>(applications)

  const stats = {
    total: appList.length,
    applied: appList.filter((a) => a.status === "applied").length,
    interviewing: appList.filter((a) => a.status === "interviewing").length,
    accepted: appList.filter((a) => a.status === "accepted").length,
    rejected: appList.filter((a) => a.status === "rejected").length,
  }

  const successRate = stats.total > 0 ? Math.round((stats.accepted / stats.total) * 100) : 0

  const getApplicationsByStatus = (status: string) => appList.filter((a) => a.status === status)

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 border border-border bg-gradient-to-br from-slate-50/50 to-background dark:from-slate-950/10">
          <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </Card>
        <Card className="p-4 border border-border bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/10">
          <p className="text-sm text-muted-foreground mb-1">Applied</p>
          <p className="text-2xl font-bold">{stats.applied}</p>
        </Card>
        <Card className="p-4 border border-border bg-gradient-to-br from-purple-50/50 to-background dark:from-purple-950/10">
          <p className="text-sm text-muted-foreground mb-1">Interviewing</p>
          <p className="text-2xl font-bold">{stats.interviewing}</p>
        </Card>
        <Card className="p-4 border border-border bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/10">
          <p className="text-sm text-muted-foreground mb-1">Accepted</p>
          <p className="text-2xl font-bold">{stats.accepted}</p>
        </Card>
        <Card className="p-4 border border-border bg-gradient-to-br from-amber-50/50 to-background dark:from-amber-950/10">
          <p className="text-sm text-muted-foreground mb-1">Success Rate</p>
          <p className="text-2xl font-bold">{successRate}%</p>
        </Card>
      </div>

      {/* Tabbed Applications */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
          <TabsTrigger value="applied">Applied ({stats.applied})</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing ({stats.interviewing})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({stats.accepted})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({stats.rejected})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3 mt-4">
          {appList.length === 0 ? (
            <Card className="p-8 text-center border border-border">
              <p className="text-muted-foreground">No applications yet</p>
            </Card>
          ) : (
            appList.map((app) => <ApplicationCard key={app.id} application={app} />)
          )}
        </TabsContent>

        <TabsContent value="applied" className="space-y-3 mt-4">
          {getApplicationsByStatus("applied").map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="interviewing" className="space-y-3 mt-4">
          {getApplicationsByStatus("interviewing").map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-3 mt-4">
          {getApplicationsByStatus("accepted").map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3 mt-4">
          {getApplicationsByStatus("rejected").map((app) => (
            <ApplicationCard key={app.id} application={app} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ApplicationCard({ application }: { application: ApplicationItem }) {
  const config = statusConfig[application.status]
  const Icon = config.icon
  const daysLeft = application.deadline
    ? Math.ceil((new Date(application.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <Card className="p-5 border border-border hover:border-primary/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{application.company}</h3>
            <Badge className={config.badge}>{application.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{application.position}</p>
        </div>
        <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${config.color}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Location</p>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium text-sm">{application.location}</span>
          </div>
        </div>
        {application.salary && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Monthly Stipend</p>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium text-sm">
                ${application.salary.min / 1000}K - ${application.salary.max / 1000}K
              </span>
            </div>
          </div>
        )}
        <div className="text-sm">
          <p className="text-muted-foreground mb-1">Applied</p>
          <p className="font-medium text-sm">{new Date(application.appliedDate).toLocaleDateString()}</p>
        </div>
        {application.deadline && daysLeft !== null && (
          <div className="text-sm">
            <p className="text-muted-foreground mb-1">Deadline</p>
            <div className="flex items-center gap-1">
              <Calendar className={`w-4 h-4 ${daysLeft < 7 ? "text-red-600" : "text-muted-foreground"}`} />
              <span className={`font-medium text-sm ${daysLeft < 7 ? "text-red-600" : ""}`}>{daysLeft} days left</span>
            </div>
          </div>
        )}
      </div>

      {application.notes && (
        <div className="bg-muted/30 p-3 rounded-lg mb-3 border border-border">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold">Note:</span> {application.notes}
          </p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
          View Details
        </Button>
        <Button variant="ghost" size="sm">
          More
        </Button>
      </div>
    </Card>
  )
}

export default ApplicationTracker;