import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  // get search parameters
  const [searchParams] = useSearchParams();

  // calculate number of days based on search parameter
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // calculate query date
  const queryDate = subDays(new Date(), numDays).toISOString();

  // fetch bookings based on query date
  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    queryKey: ["bookings", `last-${numDays}`],
  });

  // return loading state and bookings
  return { isLoading, bookings };
}
