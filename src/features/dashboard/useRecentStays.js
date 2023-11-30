import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";

// define the custom hook for recent stays
export function useRecentStays() {
  // get search params from URL
  const [searchParams] = useSearchParams();

  // get number of days for recent stays
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // calculate query date for fetching recent stays
  const queryDate = subDays(new Date(), numDays).toISOString();

  // fetch stays data after query date
  const { isLoading, data: stays } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["stays", `last-${numDays}`],
  });

  // filter confirmed stays
  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.staus === "checked-out"
  );

  // return data with loading state
  return { isLoading, stays, confirmedStays, numDays };
}
