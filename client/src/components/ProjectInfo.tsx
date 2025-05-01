import { FC } from "react";

interface Project {
  name: string;
  description: string;
  repoUrl: string;
}

interface ProjectInfoProps {
  project1: Project;
  project2: Project;
}

const ProjectInfo: FC<ProjectInfoProps> = ({ project1, project2 }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold mb-2">Merge Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 mr-3"></div>
            <div>
              <h2 className="font-semibold">{project1.name}</h2>
              <p className="text-sm text-gray-600">{project1.description}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-2 text-sm font-mono">
            {project1.repoUrl}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0 mr-3"></div>
            <div>
              <h2 className="font-semibold">{project2.name}</h2>
              <p className="text-sm text-gray-600">{project2.description}</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded p-2 text-sm font-mono">
            {project2.repoUrl}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-info p-4 rounded mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <i className="ri-information-line text-info"></i>
          </div>
          <div className="ml-3">
            <p className="text-sm text-gray-700">
              This tool will help you merge the frontend and backend projects into a single project structure while maintaining all functionality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
