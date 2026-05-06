import { useParams } from "react-router-dom";

// tanstack
import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "../api/events";

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id || "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", { id }],
    queryFn: () => getEventDetail(id),
  });

  console.log(`event detail form ${id}`, data);

  return <h1>Event detail page</h1>;
};
export default EventDetailPage;
