/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";
import { IProject } from "../../interface/IprojectDetails";
import Input from "./Input";

interface SidebarProps {
  items: IProject[];  
  selectedItem: IProject | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<IProject | null>>;
  setActiveProject: React.Dispatch<React.SetStateAction<string | any>>;
  loading: boolean;
  searchPlaceholder?: string;
  title?: string;
  activeProject?: string;

}

const ProjectSidebar = ({
  items,
  setSelectedItem,
  loading,
  searchPlaceholder = "Search...",
  title = "Items",
  setActiveProject,
  activeProject
}: SidebarProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<IProject[]>([]);

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = items.filter((item) =>
      item.projectName.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  return (
    <div className="w-64 border-r -ml-6 sm: -mt-0 lg:-mt-9 h-full shadow-md fixed overflow-y-auto max-h-screen scrollbar-none scrollbar-thumb-gray-300 scrollbar-track-gray-100">
      <div className="flex items-center p-4">
        <Input
          type="text"
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded-md pl-8 pr-2 py-2 text-[#8C97A8] focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <CiSearch className="absolute top-8 left-6 w-5 h-5" color="#8C97A8" />
      </div>

      <div className="p-0">
        <h2 className="text-[#8C97A8] text-sm ml-4 uppercase font-bold mb-4">
          {title}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center py-4">
            <FaSpinner className="text-blue-500 animate-spin text-xl" />
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li
                  key={index}
                  className={`flex items-center px-4 font-medium py-2 rounded cursor-pointer ${
                    activeProject === item.projectName
                      ? "text-[#4361EE] bg-blue-50 rounded-lg border-l-4 border-[#4361EE]"
                      : "hover:bg-gray-100 text-[#0B0B0B]"
                  }`}
                  onClick={() =>{
                    setSelectedItem(item)
                    setActiveProject(item.projectName);
                  } }
                >
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#E3E8F4] text-[#4361EE] font-bold uppercase">
                    {item.projectName.charAt(0)}
                  </span>
                  <span className="ml-3">{item.projectName}</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-sm ml-10">No items found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProjectSidebar;
