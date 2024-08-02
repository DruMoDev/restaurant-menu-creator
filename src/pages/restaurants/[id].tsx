import DishesList from "@/components/DishesList";
import LayoutAuthenticated from "@/components/LayoutAuthenticated";
import MenusList from "@/components/MenusList";
import SectionsList from "@/components/SectionsList";
import TopNav from "@/components/TopNav";
import DishType from "@/types/DishType";
import SectionType from "@/types/SectionType";
import fetchDishesById from "@/utils/functions/fetchDishesById";
import fetchMenuById from "@/utils/functions/fetchMenuById";
import fetchRestaurantById from "@/utils/functions/fetchRestaurantById";
import fetchSectionById from "@/utils/functions/fetchSectionById";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";

const Restaurant = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [menusIds, setMenusIds] = useState<string[]>([]);
  const [menuSelected, setMenuSelected] = useState<string | null>(null);
  const [filteredSections, setFilteredSections] = useState<
    SectionType[] | null
  >(null);
  const [sectionSelected, setSectionSelected] = useState<string | null>(null);
  const [sectionsIds, setSectionsIds] = useState<string[]>([]);
  const [filteredDishes, setFilteredDishes] = useState<DishType[] | null>(null);

  const {
    data: { restaurant, menus, sections, dishes } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "restaurant",
      "menus",
      "sections",
      "dishes",
      menusIds,
      sectionsIds,
      id,
    ],
    queryFn: async () => {
      const restaurant = await fetchRestaurantById(id);
      const menus = await fetchMenuById(id);
      setMenusIds(menus?.map((menu) => menu.id) || []);
      const sections = await fetchSectionById(menusIds);
      setSectionsIds(sections?.map((section) => section.id) || []);
      const dishes = await fetchDishesById(sectionsIds);
      return { restaurant, menus, sections, dishes };
    },
  });

  useEffect((): any => {
    let filteredSections = sections?.filter(
      (section) => section.menu_id === menuSelected
    );
    if (filteredSections) {
      setFilteredSections(filteredSections);
    }
    let filteredDishes = dishes?.filter(
      (dish) => dish.section_id === sectionSelected
    );
    if (filteredDishes) {
      setFilteredDishes(filteredDishes);
    }
  }, [menuSelected, sections, sectionSelected]);

  if (isLoading) {
    return (
      <div className="flex flex-grow h-full justify-center items-center">
        <MoonLoader color="#2563EB" loading={isLoading} size={150} />
      </div>
    );
  }
  if (restaurant === undefined) {
    console.log("No restaurant found, redirecting to dashboard");
    router.push("/dashboard");
    return;
  }

  return (
    <>
      <TopNav
        firstItem="restaurants"
        menu={["menu creator", restaurant?.name]}
        searchActive={false}
      />
      <div className="flex gap-5 flex-grow mb-10">
        <MenusList
          menus={menus}
          setSectionSelected={setSectionSelected}
          setMenuSelected={setMenuSelected}
          menuSelected={menuSelected}
        />
        <SectionsList
          filteredSections={filteredSections}
          sectionSelected={sectionSelected}
          setSectionSelected={setSectionSelected}
        />
        <DishesList
          filteredDishes={filteredDishes}
          menuSelected={menuSelected}
        />
      </div>
    </>
  );
};
export default Restaurant;

Restaurant.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};
