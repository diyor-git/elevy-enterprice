import {Card} from "@/components/ui/card.tsx"
import {Badge} from "@/components/ui/badge.tsx"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"
import {DollarSign, PieChartIcon, Plus, TrendingDown, TrendingUp} from "lucide-react"
import {useState} from "react"

interface ExpenseItem {
    id: string
    category: "salaries" | "infrastructure" | "marketing" | "operations" | "legal" | "other"
    description: string
    amount: number
    date: Date
    recurring?: boolean
}

interface FinancialDashboardProps {
    expenses?: ExpenseItem[]
}

const expenseCategoryColors: Record<string, string> = {
    salaries: "#3b82f6",
    infrastructure: "#8b5cf6",
    marketing: "#ec4899",
    operations: "#f59e0b",
    legal: "#ef4444",
    other: "#6b7280",
}

const monthlyExpenses = [
    {month: "Jun", salaries: 25000, infrastructure: 8000, marketing: 5000, operations: 3000, legal: 2000},
    {month: "Jul", salaries: 30000, infrastructure: 9000, marketing: 6000, operations: 3500, legal: 1500},
    {month: "Aug", salaries: 35000, infrastructure: 10000, marketing: 7000, operations: 4000, legal: 2000},
    {month: "Sep", salaries: 40000, infrastructure: 11000, marketing: 8000, operations: 4500, legal: 1500},
    {month: "Oct", salaries: 40000, infrastructure: 12000, marketing: 9000, operations: 5000, legal: 2000},
]

const categoryBreakdown = [
    {name: "Salaries", value: 170000, fill: "#3b82f6"},
    {name: "Infrastructure", value: 50000, fill: "#8b5cf6"},
    {name: "Marketing", value: 35000, fill: "#ec4899"},
    {name: "Operations", value: 20000, fill: "#f59e0b"},
    {name: "Legal", value: 9000, fill: "#ef4444"},
]

const defaultExpenses: ExpenseItem[] = [
    {
        id: "1",
        category: "salaries",
        description: "Engineering team salaries",
        amount: 40000,
        date: new Date("2024-11-01"),
        recurring: true,
    },
    {
        id: "2",
        category: "infrastructure",
        description: "AWS cloud services",
        amount: 12000,
        date: new Date("2024-11-05"),
        recurring: true,
    },
    {
        id: "3",
        category: "marketing",
        description: "Ad campaigns and content",
        amount: 9000,
        date: new Date("2024-11-08"),
        recurring: false,
    },
    {
        id: "4",
        category: "operations",
        description: "Office rent and utilities",
        amount: 5000,
        date: new Date("2024-11-10"),
        recurring: true,
    },
    {
        id: "5",
        category: "legal",
        description: "Compliance and legal review",
        amount: 2000,
        date: new Date("2024-11-12"),
        recurring: false,
    },
]

function FinancialDashboard({expenses = defaultExpenses}: FinancialDashboardProps) {
    const [showAddExpense, setShowAddExpense] = useState(false)
    const [expenseList, setExpenseList] = useState<ExpenseItem[]>(expenses)
    const [newExpense, setNewExpense] = useState({
        description: "",
        amount: "",
        category: "operations" as const,
        recurring: false,
    })

    const totalExpenses = expenseList.reduce((sum, e) => sum + e.amount, 0)
    const monthlyBurn = totalExpenses
    const runway = 500000 / monthlyBurn // assuming $500k funding

    const recurringExpenses = expenseList.filter((e) => e.recurring).reduce((sum, e) => sum + e.amount, 0)
    const oneTimeExpenses = expenseList.filter((e) => !e.recurring).reduce((sum, e) => sum + e.amount, 0)

    const getCategoryLabel = (cat: string) => {
        const labels: Record<string, string> = {
            salaries: "Salaries",
            infrastructure: "Infrastructure",
            marketing: "Marketing",
            operations: "Operations",
            legal: "Legal",
            other: "Other",
        }
        return labels[cat] || cat
    }

    const handleAddExpense = () => {
        if (newExpense.description && newExpense.amount) {
            const expense: ExpenseItem = {
                id: Date.now().toString(),
                description: newExpense.description,
                amount: Number.parseFloat(newExpense.amount),
                category: newExpense.category,
                recurring: newExpense.recurring,
                date: new Date(),
            }
            setExpenseList([...expenseList, expense])
            setNewExpense({
                description: "",
                amount: "",
                category: "operations",
                recurring: false,
            })
            setShowAddExpense(false)
        }
    }

    return (
        <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-red-50/50 via-background to-background dark:from-red-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Monthly
                                Burn</p>
                            <p className="text-3xl font-bold">${(monthlyBurn / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">Tracked expenses</p>
                        </div>
                        <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-amber-50/50 via-background to-background dark:from-amber-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Runway</p>
                            <p className="text-3xl font-bold">{runway.toFixed(1)} mo</p>
                            <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">At current burn rate</p>
                        </div>
                        <DollarSign className="w-6 h-6 text-amber-600 dark:text-amber-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-blue-50/50 via-background to-background dark:from-blue-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                Recurring Costs
                            </p>
                            <p className="text-3xl font-bold">${(recurringExpenses / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Monthly commitments</p>
                        </div>
                        <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400"/>
                    </div>
                </Card>

                <Card
                    className="p-6 border border-border/50 bg-gradient-to-br from-green-50/50 via-background to-background dark:from-green-950/20 dark:via-background dark:to-background hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                One-Time Costs
                            </p>
                            <p className="text-3xl font-bold">${(oneTimeExpenses / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-green-600 dark:text-green-400 mt-2">This period</p>
                        </div>
                        <PieChartIcon className="w-6 h-6 text-green-600 dark:text-green-400"/>
                    </div>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expense Trend */}
                <Card className="p-6 border border-border/50 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Expense Trend (Last 5 Months)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyExpenses}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)"/>
                            <XAxis dataKey="month" stroke="var(--muted-foreground)"/>
                            <YAxis stroke="var(--muted-foreground)"/>
                            <Tooltip contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)"
                            }}/>
                            <Legend/>
                            <Bar dataKey="salaries" stackId="a" fill={expenseCategoryColors.salaries} name="Salaries"/>
                            <Bar
                                dataKey="infrastructure"
                                stackId="a"
                                fill={expenseCategoryColors.infrastructure}
                                name="Infrastructure"
                            />
                            <Bar dataKey="marketing" stackId="a" fill={expenseCategoryColors.marketing}
                                 name="Marketing"/>
                            <Bar dataKey="operations" stackId="a" fill={expenseCategoryColors.operations}
                                 name="Operations"/>
                            <Bar dataKey="legal" stackId="a" fill={expenseCategoryColors.legal} name="Legal"/>
                        </BarChart>
                    </ResponsiveContainer>
                </Card>

                {/* Category Breakdown */}
                <Card className="p-6 border border-border/50 hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={categoryBreakdown}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({name, value}) => `${name}: $${(value / 1000).toFixed(0)}K`}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {categoryBreakdown.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill}/>
                                ))}
                            </Pie>
                            {/*@ts-ignore*/}
                            <Tooltip formatter={(value) => `$${(value / 1000).toFixed(0)}K`}/>
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Expense List */}
            <Card className="p-6 border border-border/50 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Recent Expenses</h3>
                    <Button size="sm" onClick={() => setShowAddExpense(!showAddExpense)} className="gap-2">
                        <Plus className="w-4 h-4"/>
                        Add Expense
                    </Button>
                </div>

                {showAddExpense && (
                    <div className="mb-6 p-4 border border-border rounded-lg bg-muted/30 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label
                                    className="text-xs font-medium text-muted-foreground mb-2 block">Description</label>
                                <Input
                                    placeholder="e.g., AWS Services"
                                    value={newExpense.description}
                                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-2 block">Amount</label>
                                <Input
                                    type="number"
                                    placeholder="0.00"
                                    value={newExpense.amount}
                                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-medium text-muted-foreground mb-2 block">Category</label>
                                <select
                                    value={newExpense.category}
                                    onChange={(e) =>
                                        setNewExpense({
                                            ...newExpense,
                                            category: e.target.value as any,
                                        })
                                    }
                                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                                >
                                    <option value="salaries">Salaries</option>
                                    <option value="infrastructure">Infrastructure</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="operations">Operations</option>
                                    <option value="legal">Legal</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={newExpense.recurring}
                                        onChange={(e) => setNewExpense({...newExpense, recurring: e.target.checked})}
                                        className="w-4 h-4"
                                    />
                                    <span className="text-sm text-muted-foreground">Recurring</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                    setShowAddExpense(false)
                                    setNewExpense({
                                        description: "",
                                        amount: "",
                                        category: "operations",
                                        recurring: false,
                                    })
                                }}
                            >
                                Cancel
                            </Button>
                            <Button size="sm" onClick={handleAddExpense} className="bg-primary">
                                Add
                            </Button>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    {expenseList.map((expense) => (
                        <div
                            key={expense.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-sm">{expense.description}</span>
                                    {expense.recurring && (
                                        <Badge variant="secondary" className="text-xs">
                                            Recurring
                                        </Badge>
                                    )}
                                    <Badge variant="outline" className="text-xs">
                                        {getCategoryLabel(expense.category)}
                                    </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{new Date(expense.date).toLocaleDateString()}</p>
                            </div>
                            <p className="font-bold text-foreground">${expense.amount.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    )
}


export default FinancialDashboard;