import { FC } from "react";

const MergeConfiguration: FC = () => {
  return (
    <div className="lg:col-span-9">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-medium">Merge Configuration</h3>
        </div>
        
        {/* Core Project Settings */}
        <div className="p-5">
          <h4 className="font-medium text-base mb-3">Project Settings</h4>
          <div className="space-y-4">
            <div>
              <label htmlFor="project-name" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
              <input type="text" id="project-name" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary" defaultValue="loghic-fullstack" />
            </div>
            
            <div>
              <label htmlFor="project-description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea id="project-description" rows={2} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary" defaultValue="A full-stack application combining Loghic App frontend with replit-loghic-API backend."></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="main-script" className="block text-sm font-medium text-gray-700 mb-1">Main Script</label>
                <input type="text" id="main-script" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary" defaultValue="server/server.js" />
              </div>
              
              <div>
                <label htmlFor="node-version" className="block text-sm font-medium text-gray-700 mb-1">Node Version</label>
                <select id="node-version" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-secondary focus:border-secondary">
                  <option>16.x</option>
                  <option selected>18.x</option>
                  <option>20.x</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Scripts Configuration */}
          <div className="mt-8">
            <h4 className="font-medium text-base mb-3">Scripts Configuration</h4>
            <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
              <div className="mb-2 flex justify-between items-center">
                <span className="text-gray-700 font-semibold">package.json scripts:</span>
                <button className="text-secondary hover:text-opacity-80">
                  <i className="ri-edit-line"></i> Edit
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="text-gray-500 w-24">"start":</span>
                  <span className="text-gray-800">"node server/server.js"</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">"dev":</span>
                  <span className="text-gray-800">"concurrently \"npm run server\" \"npm run client\""</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">"server":</span>
                  <span className="text-gray-800">"nodemon server/server.js"</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">"client":</span>
                  <span className="text-gray-800">"cd client && npm start"</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">"build":</span>
                  <span className="text-gray-800">"cd client && npm run build"</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dependencies Resolution */}
          <div className="mt-8">
            <h4 className="font-medium text-base mb-3">Dependencies Resolution</h4>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="ri-alert-line text-yellow-700"></i>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700">
                    Dependency conflicts detected: Both projects use different versions of express, axios.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg divide-y">
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm">express</span>
                  <div className="mt-1 flex space-x-4 text-xs">
                    <span className="text-gray-500">Frontend: <span className="font-semibold">^4.17.1</span></span>
                    <span className="text-gray-500">Backend: <span className="font-semibold">^4.18.2</span></span>
                  </div>
                </div>
                <div>
                  <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-secondary focus:ring-secondary">
                    <option>Newest (^4.18.2)</option>
                    <option>Keep Both</option>
                    <option>Use Frontend Version</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-mono text-sm">axios</span>
                  <div className="mt-1 flex space-x-4 text-xs">
                    <span className="text-gray-500">Frontend: <span className="font-semibold">^0.21.1</span></span>
                    <span className="text-gray-500">Backend: <span className="font-semibold">^1.1.3</span></span>
                  </div>
                </div>
                <div>
                  <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-secondary focus:ring-secondary">
                    <option>Newest (^1.1.3)</option>
                    <option>Keep Both</option>
                    <option>Use Frontend Version</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Environment Variables */}
          <div className="mt-8">
            <h4 className="font-medium text-base mb-3">Environment Variables</h4>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variable</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">PORT</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">5000</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        API
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button className="text-gray-400 hover:text-gray-500">
                        <i className="ri-edit-line"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">MONGODB_URI</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">********</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        API
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button className="text-gray-400 hover:text-gray-500">
                        <i className="ri-edit-line"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-mono">REACT_APP_API_URL</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">http://localhost:5000/api</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Frontend
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <button className="text-gray-400 hover:text-gray-500">
                        <i className="ri-edit-line"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} className="px-4 py-2">
                      <button className="text-secondary text-sm flex items-center">
                        <i className="ri-add-line mr-1"></i> Add environment variable
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          {/* API Endpoint Mapping */}
          <div className="mt-8">
            <h4 className="font-medium text-base mb-3">API Endpoint Mapping</h4>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm mb-3">
                <span className="text-gray-700">The following API endpoints from the backend will be accessible to the frontend:</span>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span className="inline-block w-16 text-green-600 font-semibold">GET</span>
                  <span>/api/users</span>
                </div>
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span className="inline-block w-16 text-green-600 font-semibold">GET</span>
                  <span>/api/users/:id</span>
                </div>
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span className="inline-block w-16 text-blue-600 font-semibold">POST</span>
                  <span>/api/users</span>
                </div>
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span className="inline-block w-16 text-orange-600 font-semibold">PUT</span>
                  <span>/api/users/:id</span>
                </div>
                <div className="flex items-center py-1 px-2 rounded hover:bg-gray-100">
                  <span className="inline-block w-16 text-red-600 font-semibold">DELETE</span>
                  <span>/api/users/:id</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
              Save Configuration
            </button>
            <button className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Start Merge Process
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergeConfiguration;
