import { useState } from "react";
import Header from "@/components/Header";
import ProjectInfo from "@/components/ProjectInfo";
import ConfigTabs from "@/components/ConfigTabs";
import DirectoryTree from "@/components/DirectoryTree";
import MergeConfiguration from "@/components/MergeConfiguration";
import Footer from "@/components/Footer";
import { TabType } from "@/types";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("structure");

  return (
    <div className="flex flex-col min-h-screen bg-neutralBg">
      <Header 
        logoUrl="https://replit.com/public/images/logo.svg"
        navigationItems={[
          { label: "Dashboard", href: "#" },
          { label: "Docs", href: "#" },
          { label: "Help", href: "#" }
        ]}
        username="manoharLoghic"
      />
      
      <main className="container mx-auto px-4 py-6 flex-grow">
        <ProjectInfo 
          project1={{
            name: "Loghic App",
            description: "Frontend Project",
            repoUrl: "https://github.com/mahaveer-kudosta/Demo.git"
          }}
          project2={{
            name: "replit-loghic-API",
            description: "Backend API",
            repoUrl: "https://github.com/mahaveer-kudosta/replit-loghic-API.git"
          }}
        />
        
        <ConfigTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={[
            { id: "structure", label: "Project Structure" },
            { id: "dependencies", label: "Dependencies" },
            { id: "config", label: "Configuration" },
            { id: "preview", label: "Preview" }
          ]}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <DirectoryTree />
          <MergeConfiguration />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
