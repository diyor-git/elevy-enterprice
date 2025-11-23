import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Badge} from "@/components/ui/badge";
import {Briefcase, Filter, MapPin, X,} from "lucide-react";
import {InternshipCategory, InternshipFormat, InternshipPay,} from "@/types/internships";

const categories: InternshipCategory[] = [
    "Software Development",
    "Data Science",
    "Design",
    "Marketing",
    "Business",
    "Product Management",
];

const formats: InternshipFormat[] = ["Remote", "Hybrid", "On-site"];
const payTypes: InternshipPay[] = ["Paid", "Unpaid", "Stipend"];

function InternshipFilters({
                               activeFiltersCount,
                               clearFilters,
                               selectedCategory,
                               setSelectedCategory,
                               selectedFormat,
                               setSelectedFormat,
                               setSelectedPay,
                               selectedPay,
                               setLocationFilter,
                               locationFilter,
                               categories
                           }: any) {

    return (

        <div className="space-y-7">
            {/* Category */}
            <aside className="shrink-0">
                <div className="sticky top-24">
                    <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-semibold text-lg flex items-center gap-2">
                                <Filter className="w-5 h-5 text-primary"/>
                                Filters
                                {activeFiltersCount > 0 && (
                                    <Badge className="ml-2">
                                        {activeFiltersCount}
                                    </Badge>
                                )}
                            </h2>
                            {activeFiltersCount > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearFilters}
                                    className="text-xs"
                                >
                                    Clear all
                                </Button>
                            )}
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-4 h-4 text-primary/70"/>
                                <h3 className="font-medium text-sm">Category</h3>
                            </div>
                            <div className="space-y-2 border-b-2">
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedCategory === "All"
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    All Categories
                                </button>
                                {categories.map((category: { id: string, name: string }) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            selectedCategory == category.id
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Format Filter */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-4 h-4 text-primary/70"/>
                                <h3 className="font-medium text-sm">Format</h3>
                            </div>
                            <div className="space-y-2 border-b-2">
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedFormat === "All"
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                    onClick={() => setSelectedFormat("All")}
                                >
                                    All Categories
                                </button>
                                {formats.map((format) => (
                                    <button
                                        key={format}
                                        onClick={() => setSelectedFormat(format)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            selectedFormat.includes(format)
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {format}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pay Type Filter */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="w-4 h-4 text-primary/70"/>
                                <h3 className="font-medium text-sm">Compensation</h3>
                            </div>
                            <div className="space-y-2 border-b-2">
                                <button
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                        selectedPay === "All"
                                            ? "bg-primary text-primary-foreground"
                                            : "hover:bg-muted"
                                    }`}
                                    onClick={() => setSelectedPay("All")}
                                >
                                    All Categories
                                </button>
                                {payTypes.map((pay) => (
                                    <button
                                        key={pay}
                                        onClick={() => setSelectedPay(pay)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                                            selectedPay.includes(pay)
                                                ? "bg-primary text-primary-foreground"
                                                : "hover:bg-muted"
                                        }`}
                                    >
                                        {pay}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Filter */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <MapPin className="w-4 h-4 text-primary/70"/>
                                <h3 className="font-medium text-sm">Location</h3>
                            </div>
                            <div className="relative">
                                <Input
                                    type="text"
                                    placeholder="City, State, or Country"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="pr-8"
                                />
                                {locationFilter && (
                                    <button
                                        onClick={() => setLocationFilter("")}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        <X className="w-4 h-4"/>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}

export default InternshipFilters;