import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { FilterOptions } from '@/utils/tripFilters';

interface SearchAndFiltersProps {
  filters: FilterOptions;
  onUpdateFilter: (key: keyof FilterOptions, value: string) => void;
  onUpdateSearch: (search: string) => void;
  onClearFilters: () => void;
  hasFilters: boolean;
  totalItems: number;
  filteredCount: number;
}

export function SearchAndFilters({ 
  filters, 
  onUpdateFilter, 
  onUpdateSearch, 
  onClearFilters, 
  hasFilters, 
  totalItems, 
  filteredCount 
}: SearchAndFiltersProps) {
  return (
    <Card className="border-0 shadow-card mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          {/* Search Input */}
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search trips by title or destination..."
              value={filters.search}
              onChange={(e) => onUpdateSearch(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            {/* Budget Filter */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
              <Select value={filters.budgetRange} onValueChange={(value) => onUpdateFilter('budgetRange', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="budget">Budget ($0-1.5K)</SelectItem>
                  <SelectItem value="mid">Mid-range ($1.5K-3.5K)</SelectItem>
                  <SelectItem value="luxury">Luxury ($3.5K+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Duration Filter */}
            <Select value={filters.duration} onValueChange={(value) => onUpdateFilter('duration', value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="short">Short (1-5 days)</SelectItem>
                <SelectItem value="medium">Medium (6-10 days)</SelectItem>
                <SelectItem value="long">Long (11+ days)</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={filters.sortBy} onValueChange={(value) => onUpdateFilter('sortBy', value)}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="duration-short">Duration: Short to Long</SelectItem>
                <SelectItem value="duration-long">Duration: Long to Short</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters */}
            {hasFilters && (
              <Button 
                variant="outline" 
                onClick={onClearFilters}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
              >
                <X className="w-4 h-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
          <div className="text-sm text-muted-foreground">
            {filteredCount === totalItems ? (
              <span>Showing all {totalItems} trips</span>
            ) : (
              <span>
                Showing {filteredCount} of {totalItems} trips
                {filters.search && (
                  <span className="ml-1">
                    for "<span className="font-medium text-foreground">{filters.search}</span>"
                  </span>
                )}
              </span>
            )}
          </div>
          
          {hasFilters && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Filter className="w-3 h-3" />
              <span>Filters applied</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}