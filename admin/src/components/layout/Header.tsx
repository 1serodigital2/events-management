// react
import { useState } from "react";

// react router
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isEventOpen, setIsEventOpen] = useState(false);

  const handleToggleEvent = () => {
    setIsEventOpen((prevState) => !prevState);
  };

  return (
    <aside className="p-10 dark:bg-gray-800 w-2xs max-sm">
      <ul>
        <li className="dark:text-white py-2">
          <NavLink to="./">Home</NavLink>
        </li>
        <li className="dark:text-white py-2">
          <div
            className="flex justify-between cursor-pointer items-center"
            onClick={handleToggleEvent}
          >
            <div>Events</div>
            {!isEventOpen ? (
              <div className="p-1 w-10 flex items-center text-xl">+</div>
            ) : (
              <div className="p-1 w-10 flex items-center text-xl">-</div>
            )}
          </div>
          {isEventOpen && (
            <div className="flex-col flex pl-4">
              <div className="pb-1">
                <NavLink to="events">All Events</NavLink>
              </div>
              <div className="mb-1">
                <NavLink to="events/new">Add New</NavLink>
              </div>
            </div>
          )}
        </li>
      </ul>
    </aside>
  );
};

export default Header;
