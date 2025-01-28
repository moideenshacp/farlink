import Card from "../../components/shimmers/Card";
import { IProject } from "../../interface/IprojectDetails";

interface ProjectViewCardProps {
  projects: IProject[];
  isLoading: boolean;
  onProjectClick: (project: IProject) => void;
}

const ProjectViewCard = ({ projects, isLoading,onProjectClick }: ProjectViewCardProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => <Card key={index} />)
        ) : projects.length === 0 ? (
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-500">
              No Projects Found
            </h3>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project._id}
              onClick={() => onProjectClick(project)}
              className="border rounded-lg shadow-lg p-8 hover:scale-105 transition-transform bg-white"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-[#4361EE] text-white flex items-center justify-center rounded">
                  <span className="font-bold text-lg">
                    {project.projectName[0]}
                  </span>
                </div>
                <h3 className="ml-4 text-lg font-semibold text-[#4361EE]">
                  {project.projectName}
                </h3>
              </div>

              <p className="text-gray-600 text-sm mb-4">
                {project.projectDescription}
              </p>

              <div className="border-b-2 mb-8 mt-8"></div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member) => (
                      <img
                        key={member._id}
                        className="w-8 h-8 rounded-full border-2 border-white"
                        src={member.image || "https://via.placeholder.com/32"}
                        alt={`Participant ${member.firstName || member._id}`}
                      />
                    ))}
                    {project.members.length > 3 && (
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 text-black text-xs flex items-center justify-center">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                  <span className="ml-2 text-sm text-black font-normal">
                    {project.members.length} Participants
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  <span className="block text-black font-normal">
                    Start Date:{" "}
                    {new Date(project.startDate).toLocaleDateString()}
                  </span>
                  <span className="block">
                    End Date: {new Date(project.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProjectViewCard;
