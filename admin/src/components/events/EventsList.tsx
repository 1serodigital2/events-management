// react router
import { NavLink } from "react-router-dom";

// tanstack
import { useQuery, useMutation } from "@tanstack/react-query";

// api
import { getEvents, deleteEvent, queryClient } from "../../api/events";

const EventsList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 5000,
  });

  const {
    mutate,
    isLoading: deleteIsLoading,
    isError: deleteIsError,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
  });

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete") === true) {
      if (!id) {
        alert("Event id not found");
      }
      console.log("deleting", id);

      mutate(id);
      queryClient.invalidateQueries(["events"]);
    }
  };

  if (isLoading) {
    return <p>Events are loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }

  if (data) {
    return (
      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default rounded">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                SL No
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Event Name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                location
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Event date
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 &&
              data.map((event, i) => (
                <tr
                  key={event.id}
                  className="bg-neutral-primary border-b border-default"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{event.name}</td>
                  <td className="px-6 py-4">{event.location}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">
                    <NavLink
                      to={event.id}
                      className="cursor-pointer btn-primary mr-4 text-green-700"
                    >
                      View
                    </NavLink>
                    <button className="cursor-pointer btn-primary mr-4 text-blue-600">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="cursor-pointer text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default EventsList;
