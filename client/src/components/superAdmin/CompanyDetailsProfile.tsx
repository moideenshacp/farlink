interface Organization {
  admin: {
    email: string;
    phone: string;
  };
  name: string;
  description: string;
  city: string;
  country: string;
  industry: string;
  state: string;
  street: string;
  subscriptionType: string;
  zipcode: string;
}

interface CompanyDetailsProfileProps {
  organization: Organization;
}

const CompanyDetailsProfile: React.FC<CompanyDetailsProfileProps> = ({
  organization,
}) => {
  console.log(organization);

  return (
    <div>
        <div className="justify-end flex mb-1" >

      <button
        type="submit"
        className="bg-[#4361EE] py-2 px-6 rounded-full text-white"
      >
        Block Organization
      </button>

        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="form-group">
          <label className="block font-medium text-[#232360]">Name</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-[#232360]">Email</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.admin.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-[#232360]">Industry</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.industry}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-[#232360]">
            Description
          </label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.description}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-[#232360]">Address</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={`${organization.street}, ${organization.city}, ${organization.state}, ${organization.zipcode}, ${organization.country}`}
            readOnly
          />
        </div>

        <div className="form-group">
          <label className="block font-medium text-[#232360]">Phone</label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.admin.phone}
            readOnly
          />
        </div>
        <div className="form-group">
          <label className="block font-medium text-[#232360]">
            Subscription Type
          </label>
          <input
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200 text-[#333333] font-normal"
            type="text"
            value={organization.subscriptionType}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsProfile;