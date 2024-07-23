import DishType from "@/types/DishType";

interface DishesListProps {
  filteredDishes: DishType[] | null;
  menuSelected: string | null;
}

const DishesList = ({ filteredDishes, menuSelected }: DishesListProps) => {
  return (
    <section className="bg-white flex flex-col border shadow-md mt-2 py-6 px-7 rounded-lg w-5/12">
      <div className="flex justify-between border-b pb-3 mb-5">
        <h3 className="text-2xl font-medium">Dishes</h3>
        <button className="bg-contrast text-white px-4 font-medium py-2 rounded-lg">
          Add Dish
        </button>
      </div>
      <ul>
        {filteredDishes?.map((dish) => {
          return (
            <li
              key={dish.id}
              className={`mt-4 border rounded-lg shadow px-2 py-2 cursor-pointer hover:bg-bg_2  ${
                menuSelected === "" ? "bg-bg_2" : ""
              }`}>
              <div className="flex gap-3 items-center">
                <p className="text-lg font-semibold">{dish.name}</p>
                <p className="text-slate-500">
                  {dish.price || "No price provided."}
                </p>
              </div>
              <p className="text-slate-500">
                {dish.description || "No description provided."}
              </p>
            </li>
          );
        })}
      </ul>
      {!filteredDishes ||
        (filteredDishes.length === 0 && (
          <p className="place-self-center my-auto text-3xl italic font-semibold opacity-70">
            Select a Section ↩
          </p>
        ))}
    </section>
  );
};
export default DishesList;
