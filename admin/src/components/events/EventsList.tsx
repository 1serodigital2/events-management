import { useState } from "react";

// react router
import { NavLink } from "react-router-dom";

// tanstack
import { useQuery, useMutation } from "@tanstack/react-query";

// api
import { getEvents, deleteEvent, queryClient } from "../../api/events";

const EventsList = () => {
  const [message, setMessage] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    staleTime: 5000,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteEvent,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });

      setMessage("Event deleted successfully");

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    },

    onError: () => {
      setMessage("Unable to delete event");

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Are you sure to delete")) {
      mutate(id);
    }
  };

  if (isLoading) {
    return <p>Events are loading...</p>;
  }

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }

  return (
    <>
      {/* alert messages */}
      {isPending && (
        <div className="bg-blue-300 p-4 rounded mb-4">Deleting event...</div>
      )}

      {message && (
        <div className="bg-green-300 p-4 rounded mb-4">{message}</div>
      )}

      {data.length <= 0 ? (
        <div className="bg-orange-500 p-4 rounded mb-4">Please add event</div>
      ) : (
        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default rounded">
          <table className="w-full text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default rounded">
              <tr>
                <th className="px-6 py-3 font-medium">SL No</th>
                <th className="px-6 py-3 font-medium">Event Name</th>
                <th className="px-6 py-3 font-medium">location</th>
                <th className="px-6 py-3 font-medium">Event date</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {data?.map((event, i) => (
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
                      disabled={isPending}
                      onClick={() => handleDelete(event.id)}
                      className="cursor-pointer text-red-900 disabled:opacity-50"
                    >
                      {isPending ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default EventsList;
