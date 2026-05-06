import EventsList from "../components/events/EventsList";

const Events = () => {
  const apiUrl = import.meta.env.VITE_API_URL;

  console.log("hello world", apiUrl);
  return (
    <>
      <h1 className="mb-3">Events</h1>
      <EventsList />
    </>
  );
};

export default Events;
