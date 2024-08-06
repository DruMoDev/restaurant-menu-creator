import { ReactElement } from "react";
import SideNav from "./navs/SideNav";

const LayoutAuthenticated = ({ children }: any): ReactElement => {
  return (
    <>
      <main className="min-h-screen container pt-24  flex flex-col mx-auto px-20 xl:max-w-[1700px] ">
        <SideNav />
        {children}
      </main>
    </>
  );
};
export default LayoutAuthenticated;
