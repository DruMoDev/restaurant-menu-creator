import { NextPageWithLayout } from "@/pages/_app";
import { ReactElement, useState } from "react";
import LayoutAuthenticated from "../../../components/LayoutAuthenticated";
import TopNav from "@/components/TopNav";
import { createClient } from "@/utils/supabase/client";
import { toast } from "react-toastify";
import Link from "next/link";

const CreateRestaurant: NextPageWithLayout = () => {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("restaurants")
        .insert([{ name: name, location: location, cuisine: cuisine }])
        .select();

      setName("");
      setLocation("");
      setCuisine("");
      console.log("Submited succesfully", data);
      toast.success("Restaurant created successfully");
    } catch (error) {
      console.error("Error creating restaurant:", error);
      return;
    }
  };

  return (
    <section>
      <TopNav
        firstItem="Dashboard"
        menu={["Restaurants", "All restaurants", "Create Restaurant"]}
      />
      <div className="bg-white  mx-auto flex flex-col border shadow-md mt-2 py-6 px-7 rounded-lg">
        <h1 className="text-3xl font-semibold">Create a Restaurant</h1>
        <form
          className="flex flex-col gap-4 mt-10 indent-5"
          onSubmit={handleSubmit}>
          <label className="text-2xl  flex  gap-2 w-fit mb-2 ">
            Name:{" "}
            <input
              type="text"
              className="border rounded-lg text-lg pl-2 py-1 focus:outline-contrast placeholder:italic placeholder:opacity-60 bg-bg_1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Restaurant Name"
            />
          </label>
          <label className="text-2xl  flex  gap-2 w-fit mb-2">
            Location:{" "}
            <input
              type="text"
              className="border rounded-lg text-lg pl-2 py-1 focus:outline-contrast placeholder:italic placeholder:opacity-60 bg-bg_1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, Country..."
            />
          </label>
          <label className="text-2xl  flex  gap-2 w-fit mb-2">
            Cuisine:{" "}
            <input
              type="text"
              className="border rounded-lg text-lg pl-2 py-1 focus:outline-contrast placeholder:italic placeholder:opacity-60 bg-bg_1"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              placeholder="Chinese, Italian..."
            />
          </label>

          <div className="flex gap-10  mt-3">
            <button
              className="bg-contrast hover:bg-opacity-90 text-white rounded-lg py-2  w-[250px] font-medium text-xl transition-all"
              type="submit">
              Create Restaurant
            </button>
            <Link
              href="/dashboard"
              className="bg-text_1 text-white hover:bg-opacity-90 rounded-lg py-2  w-[250px] text-center indent-0 font-medium text-xl transition-all">
              Return
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};
export default CreateRestaurant;

CreateRestaurant.getLayout = function getLayout(page: ReactElement) {
  return <LayoutAuthenticated>{page}</LayoutAuthenticated>;
};
