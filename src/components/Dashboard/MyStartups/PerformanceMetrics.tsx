import {Card} from "@/components/ui/card.tsx"
import {
    Area,
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {Target, TrendingUp, Users, Zap} from "lucide-react"

interface PerformanceMetricsProps {
    users?: number
    arr?: number
    monthlyGrowth?: number
}

const userGrowthData = [
    {month: "Jun", users: 150, target: 300},
    {month: "Jul", users: 280, target: 400},
    {month: "Aug", users: 450, target: 500},
    {month: "Sep", users: 720, target: 650},
    {month: "Oct", users: 950, target: 800},
    {month: "Nov", users: 1100, target: 950},
    {month: "Dec", users: 1250, target: 1200},
]

const revenueData = [
    {month: "Jun", revenue: 2000, mrr: 2000},
    {month: "Jul", revenue: 4500, mrr: 4500},
    {month: "Aug", revenue: 8200, mrr: 8200},
    {month: "Sep", revenue: 12500, mrr: 12500},
    {month: "Oct", revenue: 18000, mrr: 18000},
    {month: "Nov", revenue: 25000, mrr: 25000},
    {month: "Dec", revenue: 32000, mrr: 32000},
]

const engagementData = [
    {week: "W1", active: 45, retained: 40, churned: 5},
    {week: "W2", active: 52, retained: 48, churned: 4},
    {week: "W3", active: 61, retained: 56, churned: 5},
    {week: "W4", active: 78, retained: 72, churned: 6},
]

function PerformanceMetrics({users = 1250, arr = 45000, monthlyGrowth = 12}: PerformanceMetricsProps) {
    const mrr = arr / 12
    const currentMonthUsers = userGrowthData[userGrowthData.length - 1]?.users || 0
    const previousMonthUsers = userGrowthData[userGrowthData.length - 2]?.users || 0
    const userGrowthPercent = ((currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                    className="p-6 border border-border bg-gradient-to-br from-blue-50/50 to-background dark:from-blue-950/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                            <p className="text-3xl font-bold">{users.toLocaleString()}</p>
                            <p className="text-xs text-green-600 mt-2">+{userGrowthPercent.toFixed(1)}% MoM</p>
                        </div>
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border bg-gradient-to-br from-green-50/50 to-background dark:from-green-950/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
                            <p className="text-3xl font-bold">${(mrr / 1000).toFixed(1)}K</p>
                            <p className="text-xs text-green-600 mt-2">+{monthlyGrowth}% MoM</p>
                        </div>
                        <Zap className="w-6 h-6 text-green-600 dark:text-green-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border bg-gradient-to-br from-purple-50/50 to-background dark:from-purple-950/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">ARR</p>
                            <p className="text-3xl font-bold">${(arr / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-green-600 mt-2">+45% YoY</p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border bg-gradient-to-br from-amber-50/50 to-background dark:from-amber-950/10">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                            <p className="text-3xl font-bold">3.2%</p>
                            <p className="text-xs text-green-600 mt-2">+0.5% vs last month</p>
                        </div>
                        <Target className="w-6 h-6 text-amber-600 dark:text-amber-400"/>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth */}
                <Card className="p-6 border border-border">
                    <h3 className="text-lg font-semibold mb-4">User Growth vs Target</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={userGrowthData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="month" stroke="var(--muted-foreground)"/>
                            <YAxis stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Legend/>
                            <Area
                                type="monotone"
                                dataKey="users"
                                fill="hsl(217, 91%, 60%)"
                                stroke="hsl(217, 91%, 60%)"
                                opacity={0.3}
                                name="Actual Users"
                            />
                            <Line
                                type="monotone"
                                dataKey="target"
                                stroke="#ef4444"
                                strokeWidth={2}
                                strokeDasharray="5 5"
                                name="Target"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </Card>

                {/* Revenue Growth */}
                <Card className="p-6 border border-border">
                    <h3 className="text-lg font-semibold mb-4">Revenue Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="month" stroke="var(--muted-foreground)"/>
                            <YAxis stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Bar dataKey="revenue" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Engagement Metrics */}
                <Card className="p-6 border border-border lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Weekly Engagement</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={engagementData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="week" stroke="var(--muted-foreground)"/>
                            <YAxis stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Legend/>
                            <Bar dataKey="active" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]} name="Active Users"/>
                            <Bar dataKey="retained" fill="#22c55e" radius={[8, 8, 0, 0]} name="Retained"/>
                            <Bar dataKey="churned" fill="#ef4444" radius={[8, 8, 0, 0]} name="Churned"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        </div>
    )
}

export default PerformanceMetrics;