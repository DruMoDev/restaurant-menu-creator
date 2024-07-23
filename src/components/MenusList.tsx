import MenuType from "@/types/MenuType";

interface MenusListProps {
  menus: MenuType[] | undefined;
  setSectionSelected: (sectionId: string | null) => void;
  setMenuSelected: (menuId: string | null) => void;
  menuSelected: string | null;
}

const MenusList = ({
  menus,
  setSectionSelected,
  setMenuSelected,
  menuSelected,
}: MenusListProps) => {
  return (
    <section className="bg-white flex flex-col border shadow-md mt-2 py-6 px-7 rounded-lg w-3/12">
      {/* <div className="border-b mb-4 pb-3">
            <h2 className="font-semibold text-3xl capitalize">
              {restaurant?.name}
            </h2>
            <p className="text-slate-500 capitalize">
              {restaurant?.location} - {restaurant?.cuisine} -{" "}
              {restaurant?.status}
            </p>
          </div> */}

      <div className="flex justify-between border-b pb-3">
        <h3 className="text-2xl font-medium">Menus</h3>
        <button className="bg-contrast text-white px-4 font-medium py-2 rounded-lg">
          Add Menu
        </button>
      </div>

      <ul>
        {menus?.map((menu) => {
          return (
            <li
              key={menu.id}
              className={`mt-4 border rounded-lg shadow px-2 py-2 cursor-pointer hover:bg-bg_2  ${
                menuSelected === menu.id ? "bg-bg_2" : ""
              }`}
              onClick={() => {
                if (menuSelected !== menu.id) {
                  setSectionSelected(null);
                }
                setMenuSelected(menu.id);
              }}>
              <p className="text-lg font-semibold">{menu.name}</p>
              <p className="text-slate-500">{menu.description}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
export default MenusList;
