import { Link, Routes, Route } from "react-router-dom";

// Content Components
const Overview = () => <div>Overview Content</div>;
const MyTeam = () => <div>My Team Content</div>;
const LeaveSummary = () => <div>Leave Summary Content</div>;
const ManageLeave = () => <div>Manage Leave Content</div>;
const CreateProject = () => <div>Create Project Content</div>;
const ManageTasks = () => <div>Manage Tasks Content</div>;

const MyTeamPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto h-screen scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-blue-600">FarLink</h1>
        </div>
        <nav className="mt-6">
          <ul className="space-y-2">
            {/* Realtime Section */}
            <li>
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Realtime
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team"
                    className="block text-blue-600 font-medium px-4 py-2 bg-blue-50 rounded-md"
                  >
                    Overview
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/my-team"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    My Team
                  </Link>
                </li>
              </ul>
            </li>

            {/* Leave Management Section */}
            <li className="mt-4">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Leave Management
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team/leave-summary"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Leave Summary
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-leave"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Manage Leave
                  </Link>
                </li>
              </ul>
            </li>

            {/* Project Management Section */}
            <li className="mt-4">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Project Management
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team/create-project"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Create Project
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-tasks"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Manage Tasks
                  </Link>
                </li>
              </ul>
            </li>


            {/* support and notification */}
            <li className="mt-4">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Support and Notification Hub
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team/create-project"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Service Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-tasks"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Real Time Alert
                  </Link>
                </li>
              </ul>
            </li>

            {/* communictaion */}

            <li className="mt-4">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Communication
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team/create-project"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Meetings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-tasks"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Messages
                  </Link>
                </li>
              </ul>
            </li>

            {/* configuration */}
            <li className="mt-4">
              <p className="text-sm text-gray-500 font-semibold uppercase">
                Configuration
              </p>
              <ul className="mt-1 space-y-1">
                <li>
                  <Link
                    to="/my-team/create-project"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-team/manage-tasks"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Billing
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white shadow">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-700">My Team</h1>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 bg-gray-50 p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/my-team" element={<MyTeam />} />
            <Route path="/leave-summary" element={<LeaveSummary />} />
            <Route path="/manage-leave" element={<ManageLeave />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/manage-tasks" element={<ManageTasks />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MyTeamPage;
