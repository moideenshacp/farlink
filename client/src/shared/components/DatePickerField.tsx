/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "antd";
import moment from "moment";

const DatePickerField = ({ label, value, onChange }: any) => (
  <div>
    <label className="block mb-1 font-semibold text-sm text-[#232360]">
      {label}
    </label>
    <DatePicker
      className="w-full border rounded-lg p-2"
      value={value ? moment(value) : null}
      onChange={onChange}
    />
  </div>
);

export default DatePickerField;
