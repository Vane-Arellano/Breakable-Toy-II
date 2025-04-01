"use client";

import { handleSelectAirportChange } from "@/app/_handlers/searchComponentHandlers";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface Airport {
  name: string;
  state: string;
}

export const SelectScrollable = (props: { holder: string, departure: boolean }) => {
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<[string, Airport][]>([]);
  const [allAirports, setAllAirports] = useState<Record<string, Airport> | null>(null);
  const dispatch = useDispatch(); 

  // Load airports from JSON only once
  useEffect(() => {
    fetch("/cleaned_airports.json")
      .then((res) => res.json())
      .then((data) => setAllAirports(data))
      .catch((err) => console.error("Failed to load airport data", err));
  }, []);

  // Search dynamically when user types
  useEffect(() => {
    if (!allAirports || query.length < 2) {
      setFilteredOptions([]); // Clear if query is too short
      return;
    }

    const timeout = setTimeout(() => {
      const filtered = Object.entries(allAirports).filter(
        ([key, airport]) =>
          key.toLowerCase().includes(query.toLowerCase()) ||
          airport.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredOptions(filtered);
    }, 300); // Debounce input

    return () => clearTimeout(timeout);
  }, [query, allAirports]);

  return (
    <Select onValueChange={(value: string) => handleSelectAirportChange(value, dispatch, props.departure, setSelectedValue)}>
      <SelectTrigger className="w-full">
        {selectedValue ? selectedValue : props.holder}
      </SelectTrigger>
      <SelectContent>
        <div className="px-2 py-1">
          <input
            type="text"
            className="w-full p-2 rounded-md border border-gray-300"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {filteredOptions.length > 0 ? (
          filteredOptions.map(([key, airport]) => (
            <SelectItem key={key} value={key}>
              {`${key}: ${airport.name}`}
            </SelectItem>
          ))
        ) : (
          <div className="p-2 text-gray-500 text-center">No results found</div>
        )}
      </SelectContent>
    </Select>
  );
};
