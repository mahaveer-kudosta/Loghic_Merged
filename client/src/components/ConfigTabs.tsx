import { FC } from "react";
import { TabType } from "@/types";

interface ConfigTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  tabs: Array<{
    id: TabType;
    label: string;
  }>;
}

const ConfigTabs: FC<ConfigTabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="mb-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href="#"
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default ConfigTabs;
