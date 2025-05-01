import { FC } from "react";

const DirectoryTree: FC = () => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Project Structure</h3>
        </div>
        
        <div className="p-3">
          <div className="text-sm font-mono">
            {/* Root Directory */}
            <div className="mb-1">
              <div className="flex items-center text-gray-800">
                <i className="ri-folder-open-fill text-yellow-500 mr-1.5"></i>
                <span className="font-semibold">merged-project/</span>
              </div>
              
              {/* Project files */}
              <div className="pl-5 mt-1 space-y-1">
                <div className="flex items-center">
                  <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                  <span>.gitignore</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                  <span>package.json</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                  <span>README.md</span>
                </div>
                
                {/* Client Directory */}
                <div>
                  <div className="flex items-center">
                    <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                    <span className="font-semibold">client/</span>
                  </div>
                  <div className="pl-5 mt-1 space-y-1">
                    <div className="flex items-center">
                      <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                      <span>package.json</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                      <span>public/</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                      <span>src/</span>
                    </div>
                  </div>
                </div>
                
                {/* Server Directory */}
                <div>
                  <div className="flex items-center">
                    <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                    <span className="font-semibold">server/</span>
                  </div>
                  <div className="pl-5 mt-1 space-y-1">
                    <div className="flex items-center">
                      <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                      <span>package.json</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-file-text-fill text-gray-500 mr-1.5"></i>
                      <span>server.js</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                      <span>routes/</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                      <span>controllers/</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-folder-fill text-yellow-500 mr-1.5"></i>
                      <span>models/</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
              <i className="ri-edit-line mr-1.5"></i>
              Customize Structure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectoryTree;
