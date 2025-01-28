/* eslint-disable @typescript-eslint/no-explicit-any */
import Select from "react-select";

const SelectField = ({ label, ...props }: any) => (
    <div>
      <label className="block mb-1 font-semibold text-sm text-[#232360]">{label}</label>
      <Select className="w-full" classNamePrefix="react-select" {...props} />
    </div>
  );
  

export default SelectField