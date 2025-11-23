import {Search, X} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from '@/components/ui/select';
import {CATEGORIES, STAGES} from "@/data/startup-data.ts";

interface StartupSearchFilterProps {
    searchQuery: string;
    selectedCategory: string;
    selectedStage: string;
    onSearchChange: (query: string) => void;
    onCategoryChange: (category: string) => void;
    onStageChange: (stage: string) => void;
    onResetFilters: () => void;
}

function StartupSearchFilter({
                                 searchQuery,
                                 selectedCategory,
                                 selectedStage,
                                 onSearchChange,
                                 onCategoryChange,
                                 onStageChange,
                                 onResetFilters,
                             }: StartupSearchFilterProps) {
    const hasActiveFilters =
        searchQuery || selectedCategory !== 'All Categories' || selectedStage !== 'All Stages';

    return (
        <div className="mb-8 bg-card border rounded-xl p-4 shadow-sm">
            <div className="flex gap-2 items-center flex-wrap">
                <div className="flex-1 min-w-64 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"/>
                    <Input
                        placeholder="Search startups by name, tech, description..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-10 h-10"
                    />
                </div>

                <Select value={selectedCategory} onValueChange={onCategoryChange}>
                    <SelectTrigger className="w-40">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select value={selectedStage} onValueChange={onStageChange}>
                    <SelectTrigger className="w-40">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {STAGES.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                                {stage}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onResetFilters}
                        className="gap-2"
                    >
                        <X className="w-4 h-4"/>
                        Clear
                    </Button>
                )}
            </div>
        </div>
    );
}

export default StartupSearchFilter;