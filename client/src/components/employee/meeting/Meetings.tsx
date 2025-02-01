import { Button } from "antd";
import { useEffect, useState } from "react";
import { Video } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { fetchAllMeetsOfEmployee } from "../../../api/meetApi";
import { FaSpinner } from "react-icons/fa";
import AssignMeetingDrawer from "../../admin/meeting/AssignMeetingDrawer";
import MeetingTable from "../../admin/meeting/MeetingTable";

const Meetings = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const [meetDatas, setMeetDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const fetchMeetings = async () => {
    if (!user?.organizationId) return;
    setLoading(true);
    const res = await fetchAllMeetsOfEmployee(user._id);
    if (res.data.message === "Meetings fetched sucessfully..") {
      setMeetDatas(res.data.result);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);
  console.log("meeeeeeeeeeeeeeeeeee demplye",meetDatas);
  

  return (
    <div>
        {(user?.role === "admin" || user?.position === "HR") && (
      <div className="flex justify-end">
        <Button
          type="primary"
          className="bg-[#4361EE] p-5 hover:bg-[#3b59d7]"
          onClick={showDrawer}
        >
          <Video />
          Create Meet
        </Button>
        <AssignMeetingDrawer
          onClose={onClose}
          fetchMeetings={fetchMeetings}
          open={open}
        />
      </div>
      )}

      <div className="mt-0">
        {loading ? (
          <div className="flex mt-[20%] justify-center items-center py-4">
            <FaSpinner className="text-blue-500 animate-spin text-3xl" />
          </div>
        ) : (
          <MeetingTable meetDatas={meetDatas} fetchMeetings={fetchMeetings} />
        )}
      </div>
    </div>
  );
};

export default Meetings;
