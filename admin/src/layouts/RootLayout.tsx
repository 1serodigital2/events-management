import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";

const RootLayout = () => {
  return (
    <div className="flex">
      <Header />
      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
