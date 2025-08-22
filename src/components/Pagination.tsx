import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  totalItems, 
  itemsPerPage 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const generatePageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination with ellipsis
      if (currentPage <= 3) {
        // Near beginning: 1, 2, 3, 4, ..., last
        pages.push(1, 2, 3, 4);
        if (totalPages > 5) {
          pages.push('ellipsis');
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Near end: 1, ..., last-3, last-2, last-1, last
        pages.push(1);
        if (totalPages > 5) {
          pages.push('ellipsis');
        }
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In middle: 1, ..., current-1, current, current+1, ..., last
        pages.push(1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages);
      }
    }

    return pages;
  };

  return (
    <Card className="border-0 shadow-card mt-8">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Results info */}
          <div className="text-sm text-muted-foreground">
            Showing {startItem} to {endItem} of {totalItems} results
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-1">
            {/* Previous button */}
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline ml-2">Previous</span>
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1 mx-2">
              {generatePageNumbers().map((page, index) => (
                <div key={index}>
                  {page === 'ellipsis' ? (
                    <Button variant="ghost" disabled className="w-10 h-10 p-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => onPageChange(page as number)}
                      className={`w-10 h-10 p-0 ${
                        currentPage === page 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      {page}
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Next button */}
            <Button
              variant="outline"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <span className="hidden sm:inline mr-2">Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}