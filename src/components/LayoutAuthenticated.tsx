import { ReactElement } from "react";
import SideNav from "./SideNav";

const LayoutAuthenticated = ({ children }: any): ReactElement => {
  return (
    <>
      <main className="min-h-screen container mx-auto pt-24 xl:max-w-[1700px]">
        <SideNav />
        {children}
      </main>
    </>
  );
};
export default LayoutAuthenticated;
