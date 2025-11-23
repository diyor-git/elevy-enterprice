import {Card} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Progress} from "@/components/ui/progress.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx"
import {Input} from "@/components/ui/input.tsx"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {PieChartIcon, Plus, Target, TrendingUp, Wallet} from "lucide-react"
import type {FundingRound, Investor} from "@/types/startup.ts"
import {useState} from "react"

interface FundingTrackerProps {
    fundingRounds?: FundingRound[]
    investors?: Investor[]
    totalRaised?: number
    target?: number
}

const fundingVelocityData = [
    {month: "Jan", amount: 0},
    {month: "Feb", amount: 0},
    {month: "Mar", amount: 0},
    {month: "Apr", amount: 0},
    {month: "May", amount: 0},
    {month: "Jun", amount: 500000},
    {month: "Jul", amount: 500000},
    {month: "Aug", amount: 500000},
]

const burnRateData = [
    {month: "Jun", burn: 45000, runway: 11},
    {month: "Jul", burn: 48000, runway: 10},
    {month: "Aug", burn: 42000, runway: 11},
    {month: "Sep", burn: 50000, runway: 9},
]

function FundingTracker({
                            fundingRounds = [],
                            investors = [],
                            totalRaised = 500000,
                            target = 1000000,
                        }: FundingTrackerProps) {
    const [showFundingModal, setShowFundingModal] = useState(false)
    const [editingRound, setEditingRound] = useState<FundingRound | null>(null)
    const [fundingRoundsList, setFundingRoundsList] = useState(fundingRounds)
    const [newRound, setNewRound] = useState({
        stage: "seed",
        amount: "",
        date: new Date().toISOString().split("T")[0],
        investors: "",
    })

    const fundingPercentage = ((totalRaised + fundingRoundsList.reduce((sum, r) => sum + r.amount, 0)) / target) * 100
    const remainingFunding = target - (totalRaised + fundingRoundsList.reduce((sum, r) => sum + r.amount, 0))

    const handleAddFundingRound = () => {
        if (newRound.amount && newRound.date) {
            const round: FundingRound = {
                id: editingRound?.id || Date.now().toString(),
                stage: newRound.stage,
                amount: Number.parseFloat(newRound.amount),
                date: newRound.date,
                investors: newRound.investors.split(",").map((i) => i.trim()),
                description: "",
            }

            if (editingRound) {
                setFundingRoundsList((prev) => prev.map((r) => (r.id === editingRound.id ? round : r)))
            } else {
                setFundingRoundsList((prev) => [...prev, round])
            }

            setNewRound({
                stage: "seed",
                amount: "",
                date: new Date().toISOString().split("T")[0],
                investors: "",
            })
            setShowFundingModal(false)
            setEditingRound(null)
        }
    }

    const handleOpenFundingModal = (round?: FundingRound) => {
        if (round) {
            setEditingRound(round)
            setNewRound({
                stage: round.stage,
                amount: round.amount.toString(),
                date: new Date(round.date).toISOString().split("T")[0],
                investors: round.investors.join(", "),
            })
        } else {
            setEditingRound(null)
            setNewRound({
                stage: "seed",
                amount: "",
                date: new Date().toISOString().split("T")[0],
                investors: "",
            })
        }
        setShowFundingModal(true)
    }

    return (
        <div className="space-y-6">
            {/* Funding Goal Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Total Raised */}
                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-blue-50/50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total
                                Raised</p>
                            <p className="text-3xl font-bold text-foreground">
                                ${((totalRaised + fundingRoundsList.reduce((sum, r) => sum + r.amount, 0)) / 1000000).toFixed(2)}M
                            </p>
                        </div>
                        <div
                            className="w-12 h-12 rounded-lg bg-blue-100/50 dark:bg-blue-900/20 flex items-center justify-center">
                            <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">Target: ${(target / 1000000).toFixed(2)}M</span>
                            <span
                                className="font-semibold text-foreground">{Math.min(Math.round(fundingPercentage), 100)}%</span>
                        </div>
                        <Progress value={Math.min(fundingPercentage, 100)} className="h-2"/>
                    </div>
                </Card>

                {/* Remaining */}
                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-green-50/50 via-background to-background dark:from-green-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">To
                                Target</p>
                            <p className="text-3xl font-bold text-foreground">
                                ${Math.max(remainingFunding / 1000000, 0).toFixed(2)}M
                            </p>
                        </div>
                        <div
                            className="w-12 h-12 rounded-lg bg-green-100/50 dark:bg-green-900/20 flex items-center justify-center">
                            <Target className="w-6 h-6 text-green-600 dark:text-green-400"/>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {fundingRoundsList.length} round{fundingRoundsList.length !== 1 ? "s" : ""} completed
                    </p>
                </Card>

                {/* Active Investors */}
                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-purple-50/50 via-background to-background dark:from-purple-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Investors</p>
                            <p className="text-3xl font-bold text-foreground">{investors.length}</p>
                        </div>
                        <div
                            className="w-12 h-12 rounded-lg bg-purple-100/50 dark:bg-purple-900/20 flex items-center justify-center">
                            <PieChartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400"/>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">Supporting your growth</p>
                </Card>
            </div>

            {/* Funding Rounds Timeline */}
            {fundingRoundsList.length > 0 && (
                <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Funding Rounds</h3>
                        <Button size="sm" onClick={() => handleOpenFundingModal()} className="gap-2">
                            <Plus className="w-4 h-4"/>
                            Add Round
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {fundingRoundsList.map((round) => (
                            <div
                                key={round.id}
                                className="flex items-start justify-between pb-3 border-b border-border last:border-b-0 group"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-sm capitalize">{round.stage} Round</h4>
                                        <Badge variant="outline" className="text-xs">
                                            {round.investors.length} investors
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{new Date(round.date).toLocaleDateString()}</p>
                                    {round.description &&
                                        <p className="text-sm text-muted-foreground mt-1">{round.description}</p>}
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right">
                                        <p className="font-bold text-foreground">${(round.amount / 1000000).toFixed(2)}M</p>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleOpenFundingModal(round)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Funding Velocity & Burn Rate Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5"/>
                        Funding Velocity
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={fundingVelocityData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="month" stroke="var(--muted-foreground)"/>
                            <YAxis stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Bar dataKey="amount" fill="hsl(217, 91%, 60%)" radius={[8, 8, 0, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Runway Projection</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={burnRateData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="month" stroke="var(--muted-foreground)"/>
                            <YAxis yAxisId="left" stroke="var(--muted-foreground)"/>
                            <YAxis yAxisId="right" orientation="right" stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Legend/>
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="burn"
                                stroke="#ef4444"
                                name="Monthly Burn ($)"
                                strokeWidth={2}
                                dot={{r: 3}}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="runway"
                                stroke="#22c55e"
                                name="Runway (months)"
                                strokeWidth={2}
                                dot={{r: 3}}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Top Investors */}
            {investors.length > 0 && (
                <Card className="p-6 border border-border hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Investor Portfolio</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {investors.slice(0, 4).map((investor) => (
                            <div
                                key={investor.id}
                                className="p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold text-sm">{investor.name}</h4>
                                    <Badge variant="secondary" className="text-xs">
                                        {investor.type}
                                    </Badge>
                                </div>
                                <p className="text-sm font-bold text-foreground mb-1">
                                    ${(investor.invested / 1000).toFixed(0)}K invested
                                </p>
                                <p className="text-xs text-muted-foreground">{new Date(investor.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            <Dialog open={showFundingModal} onOpenChange={setShowFundingModal}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>{editingRound ? "Edit Funding Round" : "Add Funding Round"}</DialogTitle>
                        <DialogDescription>
                            {editingRound ? "Update funding round details" : "Add a new funding round to your timeline"}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Stage</label>
                            <select
                                value={newRound.stage}
                                onChange={(e) => setNewRound({...newRound, stage: e.target.value as any})}
                                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                            >
                                <option value="pre-seed">Pre-Seed</option>
                                <option value="seed">Seed</option>
                                <option value="series-a">Series A</option>
                                <option value="series-b">Series B</option>
                                <option value="series-c">Series C</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Amount ($M)</label>
                            <Input
                                type="number"
                                placeholder="0.5"
                                value={newRound.amount}
                                onChange={(e) => setNewRound({...newRound, amount: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                            <Input
                                type="date"
                                value={newRound.date}
                                onChange={(e) => setNewRound({...newRound, date: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-foreground mb-1 block">Investors
                                (comma-separated)</label>
                            <Input
                                placeholder="Sequoia, a16z, Benchmark"
                                value={newRound.investors}
                                onChange={(e) => setNewRound({...newRound, investors: e.target.value})}
                            />
                        </div>

                        <div className="flex gap-3 justify-end">
                            <Button variant="outline" onClick={() => setShowFundingModal(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddFundingRound} className="bg-primary">
                                {editingRound ? "Update" : "Add"} Round
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default FundingTracker;