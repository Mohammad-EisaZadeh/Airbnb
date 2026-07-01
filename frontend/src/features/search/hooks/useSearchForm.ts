import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  searchFormSchema,
  type SearchFormValues,
} from "@/lib/validations/search";

const defaultValues: SearchFormValues = {
  destination: "",
  dateMode: "dates",
  dates: {
    checkIn: null,
    checkOut: null,
  },
  flexible: {
    month: null,
    duration: null,
  },
  guests: {
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  },
};

export function useSearchForm() {
  return useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues,
    mode: "onChange",
  });
}
