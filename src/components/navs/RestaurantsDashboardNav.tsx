import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface RestaurantsDashboardNavProps {
  statusMenu: string;
  setStatusMenu: Dispatch<SetStateAction<string>>;
}

const RestaurantsDashboardNav = ({
  statusMenu,
  setStatusMenu,
}: RestaurantsDashboardNavProps) => {
  return (
    <nav className="flex justify-between mb-2">
      <ul className="flex bg-bg_2 gap-3 px-1 py-1 w-fit rounded-lg">
        <button
          className={`bg-transparent px-3 font-medium  cursor-pointer rounded py-0.5 ${
            statusMenu === "all" ? "bg-white text-black" : "text-slate-500"
          }`}
          value={"all"}
          onClick={(e) => setStatusMenu(e.currentTarget.value)}>
          All
        </button>
        <button
          className={`bg-transparent px-3 font-medium  cursor-pointer rounded py-0.5 ${
            statusMenu === "active" ? "bg-white text-black" : "text-slate-500"
          }`}
          value={"active"}
          onClick={(e) => setStatusMenu(e.currentTarget.value)}>
          Active
        </button>
        <button
          className={`bg-transparent px-3 font-medium  cursor-pointer rounded py-0.5 ${
            statusMenu === "draft" ? "bg-white text-black" : "text-slate-500"
          }`}
          value={"draft"}
          onClick={(e) => setStatusMenu(e.currentTarget.value)}>
          Draft
        </button>
        <button
          className={`bg-transparent px-3 font-medium  cursor-pointer rounded py-0.5 ${
            statusMenu === "archived" ? "bg-white text-black" : "text-slate-500"
          }`}
          value={"archived"}
          onClick={(e) => setStatusMenu(e.currentTarget.value)}>
          Archived
        </button>
      </ul>

      <div className="flex gap-5 ">
        <button className="flex items-center bg-white border rounded-lg px-2 font-semibold gap-1 hover:bg-bg_2 transition-all">
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em">
            <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" />
          </svg>
          Filter
        </button>
        <button className="flex items-center bg-white rounded-lg px-2 font-semibold border gap-1 hover:bg-bg_2 transition-all">
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em">
            <path d="M8.71 7.71L11 5.41V15a1 1 0 002 0V5.41l2.29 2.3a1 1 0 001.42 0 1 1 0 000-1.42l-4-4a1 1 0 00-.33-.21 1 1 0 00-.76 0 1 1 0 00-.33.21l-4 4a1 1 0 101.42 1.42zM21 14a1 1 0 00-1 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 00-2 0v4a3 3 0 003 3h14a3 3 0 003-3v-4a1 1 0 00-1-1z" />
          </svg>
          Export
        </button>
        <Link
          href="/dashboard/create-restaurant"
          className="flex items-center bg-contrast rounded-lg px-2 text-white font-semibold gap-1 hover:opacity-90 transition-all">
          <svg
            viewBox="0 0 1024 1024"
            fill="currentColor"
            height="1em"
            width="1em">
            <defs>
              <style />
            </defs>
            <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
            <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
          </svg>{" "}
          Add Restaurant
        </Link>
      </div>
    </nav>
  );
};
export default RestaurantsDashboardNav;
