import {useEffect, useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx"
import {BarChart3, BookmarkPlus, CheckCircle2, Heart, Plus, Search, Star} from "lucide-react"
import {Button} from "@/components/ui/button.tsx"
import type {InternshipCategory, InternshipFormat, InternshipPay} from "@/types/internships.ts"
import {useAppDispatch, useAppSelector} from "@/redux/hooks.ts";
import {getCategories, getInternships} from "@/redux/thunks/internships.ts";
import {
    getCategoriesSelector,
    getInternshipsLoadingSelector,
    getInternshipsSelector
} from "@/redux/selectors/internshipsSelector.ts";
import {Link} from "react-router-dom";
import {
    ApplicationTracker,
    InternshipComparison,
    InternshipFilters,
    InternshipReviews,
    InternshipsList,
    InternshipWishlist
} from "@/components/Dashboard/Internships";

export default function InternshipsPage() {

    const dispatch = useAppDispatch();
    const internships = useAppSelector((state) => getInternshipsSelector(state));
    const categories = useAppSelector((state) => getCategoriesSelector(state));
    const loading = useAppSelector((state) => getInternshipsLoadingSelector(state));

    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState<InternshipCategory | "All">("All")
    const [selectedFormat, setSelectedFormat] = useState<InternshipFormat | "All">("All")
    const [selectedPay, setSelectedPay] = useState<InternshipPay | "All">("All")
    const [locationFilter, setLocationFilter] = useState("")

    useEffect(() => {
        dispatch(getCategories());
    }, [])

    useEffect(() => {

        const params = Object.fromEntries(
            Object.entries({
                category: selectedCategory,
                format: selectedFormat,
                pay: selectedPay,
                location: locationFilter,
                search: searchQuery,
            }).filter(([_, value]) => value && value !== "All") // убираем пустые и "All"
        );

        dispatch(getInternships(params));
    }, [selectedCategory, selectedFormat, selectedPay, locationFilter])


    const activeFiltersCount = [
        selectedCategory !== "All",
        selectedFormat !== "All",
        selectedPay !== "All",
        locationFilter !== "",
    ].filter(Boolean).length

    const clearFilters = () => {
        setSelectedCategory("All")
        setSelectedFormat("All")
        setSelectedPay("All")
        setLocationFilter("")
    }

    return (
        <div className="min-h-screen bg-background">
            <main className="min-h-screen">
                <Tabs defaultValue="explore" className="w-full">
                    <div
                        className="bg-gradient-to-b from-primary/8 to-background border-b border-border/50  backdrop-blur-sm">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="py-10 flex items-start justify-between">
                                <div className="flex-1">
                                    <h1 className="text-4xl md:text-5xl font-bold mb-3 text-balance">Internship Hub</h1>
                                    <p className="text-lg text-muted-foreground max-w-2xl">
                                        Explore opportunities, track applications, and land your dream internship
                                    </p>
                                </div>
                                <Link to="/internships/create">
                                    <Button className="gap-2 cursor-pointer whitespace-nowrap">
                                        <Plus className="w-4 h-4"/>
                                        <span className="hidden sm:inline">Create</span> Internship
                                    </Button>
                                </Link>
                            </div>

                            {/* Tabs - modern underline style */}
                            <TabsList
                                className="grid w-full grid-cols-3 md:grid-cols-6 gap-1 mb-0 bg-transparent border-t border-border/30 h-auto p-0 rounded-none overflow-x-auto">
                                {[
                                    {value: "explore", label: "Explore", icon: Search},
                                    {value: "applications", label: "Applications", icon: CheckCircle2},
                                    {value: "wishlist", label: "Wishlist", icon: Heart},
                                    {value: "comparison", label: "Compare", icon: BarChart3},
                                    {value: "reviews", label: "Reviews", icon: Star},
                                    {value: "insights", label: "Insights", icon: BookmarkPlus},
                                ].map(({value, label, icon: Icon}) => (
                                    <TabsTrigger
                                        key={value}
                                        value={value}
                                        className="gap-2 whitespace-nowrap rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium transition-all"
                                    >
                                        <Icon className="w-4 h-4 hidden sm:block"/>
                                        <span>{label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <TabsContent value="explore" className="space-y-6">
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                <InternshipFilters
                                    activeFiltersCount={activeFiltersCount}
                                    clearFilters={clearFilters}
                                    categories={categories}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    selectedFormat={selectedFormat}
                                    setSelectedFormat={setSelectedFormat}
                                    setSelectedPay={setSelectedPay}
                                    selectedPay={selectedPay}
                                    setLocationFilter={setLocationFilter}
                                    locationFilter={locationFilter}
                                />

                                {/* Internships List */}
                                <div className="lg:col-span-3">
                                    <InternshipsList internships={internships} loading={loading} clearFilters={() => {
                                    }}/>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="applications" className="space-y-6">
                            <ApplicationTracker/>
                        </TabsContent>

                        <TabsContent value="wishlist" className="space-y-6">
                            <InternshipWishlist/>
                        </TabsContent>

                        <TabsContent value="comparison" className="space-y-6">
                            <InternshipComparison/>
                        </TabsContent>

                        <TabsContent value="reviews" className="space-y-6">
                            <InternshipReviews/>
                        </TabsContent>

                        <TabsContent value="insights" className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-card border border-border rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">Top Companies</h3>
                                    <p className="text-muted-foreground text-sm mb-4">Most internships posted</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Google</span>
                                            <span className="font-bold">24 internships</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Microsoft</span>
                                            <span className="font-bold">18 internships</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Amazon</span>
                                            <span className="font-bold">16 internships</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">Average Stipend</h3>
                                    <p className="text-muted-foreground text-sm mb-4">By internship type</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Engineering</span>
                                            <span className="font-bold">$9,500/mo</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Product</span>
                                            <span className="font-bold">$8,200/mo</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Design</span>
                                            <span className="font-bold">$7,800/mo</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-card border border-border rounded-lg p-6">
                                    <h3 className="font-semibold mb-2">Popular Locations</h3>
                                    <p className="text-muted-foreground text-sm mb-4">Most internships in</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>San Francisco</span>
                                            <span className="font-bold">89 internships</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>New York</span>
                                            <span className="font-bold">62 internships</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>Seattle</span>
                                            <span className="font-bold">41 internships</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </main>
        </div>
    )
}
