"use client";

import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";

export const SelectScrollable = (props: {holder: string, options?: string[]}) => {
  const [query, setQuery] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  
  // Example list of options to filter
  const options: string[] = ["MXN", "USD", "EUR"];

  
  
  // Filter options based on query
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <Select onValueChange={(value: string) => setSelectedValue(value)}>
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
        {filteredOptions.map((option, index) => (
          <SelectItem key={index} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
