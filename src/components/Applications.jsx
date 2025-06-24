import { useState } from 'react';
import { Fade, Slide } from "react-awesome-reveal";

const Applications = () => {
  const [applications, setApplications] = useState([
    { id: 1, user: 'John Doe', plan: 'Basic Plan', status: 'pending', date: '2023-05-01' },
    { id: 2, user: 'Jane Smith', plan: 'Premium Plan', status: 'approved', date: '2023-05-02' },
    { id: 3, user: 'Robert Johnson', plan: 'Basic Plan', status: 'rejected', date: '2023-05-03' },
  ]);

  const [filter, setFilter] = useState('all');

  const updateApplicationStatus = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const filteredApplications = filter === 'all' 
    ? applications 
    : applications.filter(app => app.status === filter);

  return (
    <div className="p-8">
      <Fade triggerOnce>
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Policy Applications</h1>
      </Fade>

      <Slide direction="up" triggerOnce>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Policy Applications</h3>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${filter === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('pending')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${filter === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Pending
              </button>
              <button 
                onClick={() => setFilter('approved')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${filter === 'approved' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Approved
              </button>
              <button 
                onClick={() => setFilter('rejected')}
                className={`px-3 py-1 text-xs rounded-full transition-colors duration-200 ${filter === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Rejected
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(app => (
                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{app.user}</h4>
                      <p className="text-gray-600 mt-1">Applied for {app.plan} on {app.date}</p>
                      <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${
                        app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    {app.status === 'pending' && (
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'approved')}
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateApplicationStatus(app.id, 'rejected')}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No applications available</div>
            )}
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Applications;