import SectionType from "@/types/SectionType";

interface SectionListProps {
  filteredSections: SectionType[] | null;
  sectionSelected: string | null;
  setSectionSelected: (sectionId: string | null) => void;
}

const SectionsList = ({
  filteredSections,
  sectionSelected,
  setSectionSelected,
}: SectionListProps) => {
  return (
    <section className="bg-white flex flex-col border shadow-md py-6 px-7 rounded-lg w-4/12">
      <div className="flex justify-between border-b pb-3 mb-5">
        <h3 className="text-2xl font-medium">Sections</h3>
        <button className="bg-contrast text-white px-4 font-medium py-2 rounded-lg">
          Add Section
        </button>
      </div>
      <ul>
        {filteredSections?.map((section) => {
          return (
            <li
              key={section.id}
              className={`mt-4 border rounded-lg shadow px-2 py-2 cursor-pointer hover:bg-bg_2  ${
                sectionSelected === section.id ? "bg-bg_2" : ""
              }`}
              onClick={() => setSectionSelected(section.id)}>
              <p className="text-lg font-semibold">{section.name}</p>
              <p className="text-slate-500">
                {section.description || "No description provided."}
              </p>
            </li>
          );
        })}
      </ul>
      {!filteredSections ||
        (filteredSections.length === 0 && (
          <p className="place-self-center my-auto text-3xl italic font-semibold opacity-70">
            Select a menu ↩
          </p>
        ))}
    </section>
  );
};
export default SectionsList;
