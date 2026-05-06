// tanstack
import { useQuery } from "@tanstack/react-query";

// api
import { getEvents } from "../../api/events";

const EventsList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    // staleTime: 3000,
  });

  console.log("loading", isLoading);
  console.log("isError", isError);
  console.log("error", error);
  console.log("data", data);

  let content;

  {
    isLoading && <p>Events are loading...</p>;
  }
  {
    isError && <p>{error.message}</p>;
  }

  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th>SL No</th>
          <th>Event Name</th>
          <th>location</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((event) => (
            <tr key={event.id}>
              <td>01</td>
              <td>{event.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default EventsList;
