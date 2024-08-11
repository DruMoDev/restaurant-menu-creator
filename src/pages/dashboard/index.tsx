import { ReactElement, useState } from "react";
import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import TopNav from "@/components/navs/TopNav";
import RestaurantsList from "@/components/RestaurantsList";
import RestaurantsDashboardNav from "@/components/navs/RestaurantsDashboardNav";
import { NextPageWithLayout } from "../_app";

const Dashboard: NextPageWithLayout = () => {
  const [sortParam, setSortParam] = useState({
    searchQuery: "",
    statusMenu: "all",
  });

  return (
    <section className="flex flex-col">
      <TopNav
        firstItem="dashboard"
        menu={["restaurants", sortParam.statusMenu + " restaurants"]}
        sortParam={sortParam}
        setSortParam={setSortParam}
      />
      <RestaurantsDashboardNav
        sortParam={sortParam}
        setSortParam={setSortParam}
      />
      <RestaurantsList sortParam={sortParam} />
    </section>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};

export default Dashboard;
