"use client"

import {useState} from "react"
import {ChevronLeft, ChevronRight, Search} from "lucide-react"
import {Button} from "@/components/ui/button"
import {InternshipCard} from "./InternshipCard"
import {Internship} from "@/types/internships";

interface InternshipsListProps {
    clearFilters: () => void;
    internships: any
    loading: boolean
}

const ITEMS_PER_PAGE = 6

function InternshipsList({clearFilters, internships, loading}: InternshipsListProps) {
    if (!internships.length || loading) return

    const [currentPage, setCurrentPage] = useState(1)

    const totalPages = Math.ceil(internships.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginatedInternships: Internship[] = internships.slice(startIndex, endIndex)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({top: 0, behavior: "smooth"})
        }
    }

    return (
        <main className="flex-1 space-y-8">
            {paginatedInternships.length > 0 ? (
                <>
                    {/* Internships Grid */}
                    <div className="grid gap-4">
                        {paginatedInternships.map((internship) => (
                            <InternshipCard key={internship.id} internship={internship}/>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div
                            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
                            <div className="text-sm text-muted-foreground">
                                Showing <span className="font-semibold">{startIndex + 1}</span> to{" "}
                                <span className="font-semibold">{Math.min(endIndex, internships.length)}</span> of{" "}
                                <span className="font-semibold">{internships.length}</span> internships
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="gap-1 bg-transparent"
                                >
                                    <ChevronLeft className="w-4 h-4"/>
                                    Previous
                                </Button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-1">
                                    {Array.from({length: totalPages}).map((_, idx) => {
                                        const pageNum = idx + 1
                                        const isActive = pageNum === currentPage
                                        const isVisible = Math.abs(pageNum - currentPage) <= 1 || pageNum === 1 || pageNum === totalPages

                                        if (!isVisible) {
                                            if (pageNum === 2) return <span key="dots-start">...</span>
                                            return null
                                        }

                                        return (
                                            <Button
                                                key={pageNum}
                                                variant={isActive ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => {
                                                    setCurrentPage(pageNum)
                                                    window.scrollTo({top: 0, behavior: "smooth"})
                                                }}
                                                className={`w-9 ${isActive ? "bg-primary" : ""}`}
                                            >
                                                {pageNum}
                                            </Button>
                                        )
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="gap-1 bg-transparent"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4"/>
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-10 h-10 text-muted-foreground"/>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No internships found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        Try adjusting your filters or search query to find more opportunities
                    </p>
                    <Button onClick={clearFilters} variant="outline">
                        Clear all filters
                    </Button>
                </div>
            )}
        </main>
    )
}


export default InternshipsList;