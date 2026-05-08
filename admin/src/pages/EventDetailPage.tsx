import { useParams } from "react-router-dom";

// tanstack
import { useQuery } from "@tanstack/react-query";
import { getEventDetail } from "../api/events";
import Alert from "../components/ui/alert";

const EventDetailPage = () => {
  const params = useParams();
  const id = params.id || "";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events", id],
    queryFn: () => getEventDetail(id),
    staleTime: 10000,
  });

  if (isLoading) {
    return <Alert type="loading" message="Event is loading..." />;
  }

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  return (
    <>
      {data && (
        <>
          <h1>{data.name}</h1>
          <div>Location: {data.location}</div>
          <div>Date: {data.date}</div>
          <div>Description: {data.description}</div>
        </>
      )}
    </>
  );
};
export default EventDetailPage;
