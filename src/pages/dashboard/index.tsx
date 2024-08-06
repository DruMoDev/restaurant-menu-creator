import { ReactElement, useState } from "react";
import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import TopNav from "@/components/navs/TopNav";
import RestaurantsList from "@/components/RestaurantsList";
import RestaurantsDashboardNav from "@/components/navs/RestaurantsDashboardNav";

const Dashboard = () => {
  const [statusMenu, setStatusMenu] = useState("all");

  return (
    <section className="flex flex-col">
      <TopNav
        firstItem="dashboard"
        menu={["restaurants", statusMenu + " restaurants"]}
      />
      <RestaurantsDashboardNav
        setStatusMenu={setStatusMenu}
        statusMenu={statusMenu}
      />
      <RestaurantsList statusMenu={statusMenu} />
    </section>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
