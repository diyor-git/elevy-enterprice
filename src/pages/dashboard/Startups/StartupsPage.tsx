'use client';

import {useState} from 'react';
import {Briefcase, CheckCircle, Users, Zap} from 'lucide-react';
import {useStartups} from '@/hooks/use-startups';
import {
    StartupDetail,
    StartupPagination,
    StartupSearchFilter,
    StartupsList,
    StatCard
} from "@/components/Dashboard/Startups";

const ITEMS_PER_PAGE = 6;

function StartupsPage() {
    const [selectedStartup, setSelectedStartup] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const stats = [
        {label: 'Count of all Startups', value: 1, icon: Briefcase, subtext: 'Keep going!'},
        {label: 'Number of students', value: 2, icon: Users, subtext: 'Your Startups'},
        {label: 'Your Startups', value: 3, icon: CheckCircle, subtext: 'Complete courses to earn'},
        {label: 'Your team members', value: 4, icon: Zap, subtext: 'Badges earned'},
    ];

    const {
        searchQuery,
        selectedCategory,
        selectedStage,
        filteredStartups,
        setSearchQuery,
        setSelectedCategory,
        setSelectedStage,
        resetFilters,
    } = useStartups();

    const totalPages = Math.ceil(filteredStartups.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedStartups = filteredStartups.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const handleFiltersChange = () => {
        setCurrentPage(1);
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="max-w-7xl mx-auto ">
                <div className="space-y-2 mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Startup Hub</h1>

                    <p className="text-lg text-muted-foreground">
                        Explore new Startups and teams with AI-powered tools
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, idx) => (
                        <StatCard
                            key={idx}
                            label={stat.label}
                            value={stat.value}
                            icon={stat.icon}
                            subtext={stat.subtext}
                        />
                    ))}
                </div>

                {selectedStartup ? (
                    <StartupDetail
                        startup={paginatedStartups.find(s => s.id === selectedStartup)!}
                        onBack={() => setSelectedStartup(null)}
                    />
                ) : (
                    <>
                        <StartupSearchFilter
                            searchQuery={searchQuery}
                            selectedCategory={selectedCategory}
                            selectedStage={selectedStage}
                            onSearchChange={(query) => {
                                setSearchQuery(query);
                                handleFiltersChange();
                            }}
                            onCategoryChange={(category) => {
                                setSelectedCategory(category);
                                handleFiltersChange();
                            }}
                            onStageChange={(stage) => {
                                setSelectedStage(stage);
                                handleFiltersChange();
                            }}
                            onResetFilters={() => {
                                resetFilters();
                                handleFiltersChange();
                            }}
                        />

                        {paginatedStartups.length > 0 ? (
                            <>
                                <StartupsList
                                    startups={paginatedStartups}
                                    onSelectStartup={setSelectedStartup}
                                />
                                {totalPages > 1 && (
                                    <StartupPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                    />
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground text-lg">
                                    No startups found matching your filters. Try adjusting your search criteria.
                                </p>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

export default StartupsPage;