'use client'
import { handleSubmit } from "@/app/_handlers/searchComponentHandlers";
import { useSearchParams } from "@/app/_hooks/useSearchParams";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { searchSlice } from "@/lib/features/search/searchSlice";
import { Label } from "@radix-ui/react-label"
import { useDispatch } from "react-redux";

export const SortComponents = () => {
    const dispatch = useDispatch();
    const { departureDate, returnDate, origin, destination, currency, nonStopS, adults, sortBy, sortOrder } = useSearchParams();

    const handleSortCheckboxChange = (type: 'price' | 'duration', checked: boolean | string) => {
        let currentSorts = sortBy.split('_'); // Split existing sort criteria
        
        // Update the selected criteria
        if (checked) {
          if (!currentSorts.includes(type)) {
            currentSorts.push(type);
          }
        } else {
          currentSorts = currentSorts.filter(t => t !== type);
        }
        
        // Determine the new sortBy value
        let newSortBy: string;
        if (currentSorts.length === 2) {
          newSortBy = 'price_duration'; // Both selected
        } else if (currentSorts.length === 1) {
          newSortBy = currentSorts[0]; // Single selection
        } else {
          newSortBy = ''; // None selected
        }
        
        dispatch(searchSlice.actions.addSearchParam({ 
          sortBy: newSortBy,
          // Keep existing sort order when toggling checkboxes
          sortOrder: sortOrder || 'asc' 
        }));
      };

    const handleOrderChange = (value: string) => {
        dispatch(searchSlice.actions.addSearchParam({ sortOrder: value }));
    };


    return (
        <div className="w-full flex flex-row justify-between">
            <div className="w-full flex flex-row gap-5 mb-5">
            <div className="flex items-center gap-2">
                <Checkbox
                    id="sort-price"
                    checked={sortBy.includes('price')}
                    onCheckedChange={(checked) => 
                        handleSortCheckboxChange('price', checked)
                    }
                />
                <Label htmlFor="sort-price">Sort by price</Label>
            </div>

            <div className="flex items-center gap-2">
                <Checkbox
                    id="sort-duration"
                    checked={sortBy.includes('duration')}
                    onCheckedChange={(checked) => 
                        handleSortCheckboxChange('duration', checked)
                    }
                />
                <Label htmlFor="sort-duration">Sort by duration</Label>
            </div>
                <Select value={sortOrder} onValueChange={handleOrderChange}>
                    <SelectTrigger className="w-[180px] bg-white" >
                        <SelectValue placeholder="Order" className="text-black"/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <Button className="bg-blue-800 w-80" onClick={(e) => handleSubmit(e, dispatch, {
                  departure_date: departureDate, 
                  return_date: returnDate,
                  departure_airport: origin, 
                  arrival_airport: destination, 
                  currency: currency, 
                  non_stop: nonStopS, 
                  adults: adults,
                  sortBy: sortBy, 
                  sortOrder: sortOrder
                })}>Search</Button>
            
        </div>
    )
}