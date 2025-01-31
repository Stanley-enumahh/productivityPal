import { FaRegUser } from "react-icons/fa";
import { LuSquareActivity, LuListTodo } from "react-icons/lu";
import { TfiWrite } from "react-icons/tfi";
import { MdColorLens } from "react-icons/md";

export function SideNav({ onActiveTab, activeTab }) {
  return (
    <ul className="flex flex-col gap-5 text-sm">
      <li
        onClick={() => onActiveTab("overview")}
        className={`flex cursor-pointer flex-row gap-3 hover:bg-amber-200 transition-all duration-200 pl-3 pr-4 py-2 rounded-lg items-center ${
          activeTab === "overview" ? "bg-amber-300" : ""
        }`}
      >
        <span>
          <MdColorLens />
        </span>
        <p>overview</p>
      </li>
      <li
        onClick={() => onActiveTab("Tasks")}
        className={`flex cursor-pointer flex-row gap-3 hover:bg-amber-200 transition-all duration-200 pl-3 pr-4 py-2 rounded-lg items-center ${
          activeTab === "Tasks" ? "bg-amber-300" : ""
        }`}
      >
        <span>
          <LuSquareActivity />
        </span>
        <p>Tasks</p>
      </li>
      <li
        onClick={() => onActiveTab("Notes")}
        className={`flex cursor-pointer flex-row gap-3 hover:bg-amber-200 transition-all duration-200 pl-3 pr-4 py-2 rounded-lg items-center ${
          activeTab === "Notes" ? "bg-amber-300" : ""
        }`}
      >
        <span>
          <TfiWrite />
        </span>
        <p>Notes</p>
      </li>
      <li
        onClick={() => onActiveTab("Todos")}
        className={`flex cursor-pointer flex-row gap-3 hover:bg-amber-200 transition-all duration-200 pl-3 pr-4 py-2 rounded-lg items-center ${
          activeTab === "Todos" ? "bg-amber-300" : ""
        }`}
      >
        <span>
          <LuListTodo />
        </span>
        <p>Todo List</p>
      </li>
      <li
        onClick={() => onActiveTab("Profile")}
        className={`flex cursor-pointer flex-row gap-3 hover:bg-amber-200 transition-all duration-200 pl-3 pr-4 py-2 rounded-lg items-center ${
          activeTab === "Profile" ? "bg-amber-300" : ""
        }`}
      >
        <span>
          <FaRegUser />
        </span>
        <p>Profie</p>
      </li>
    </ul>
  );
}
