import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { currencies } from "@/app/_constants/searchComponent";
import { useDispatch } from "react-redux";
import { handleCurrencyChange } from "@/app/_handlers/searchComponentHandlers";
import { useSearchParams } from "@/app/_hooks/useSearchParams";

export const CurrencySelector = () => {
  
  const dispatch = useDispatch();
  const { currency } = useSearchParams();

  return (
    <Select onValueChange={(value) => handleCurrencyChange(value, dispatch)}>
      <SelectTrigger className="w-full">
        {currency ? currency : "Select a currency"}
      </SelectTrigger>
      <SelectContent>
        {currencies.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
