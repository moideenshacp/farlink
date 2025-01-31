import { Button } from "antd";
import { useState } from "react";
import AssignMeetingDrawer from "./AssignMeetingDrawer";
import { Video } from "lucide-react";

const Meeting = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div>
        <div className="flex justify-end">

      <Button
        type="primary"
        className="bg-[#4361EE] p-5 hover:bg-[#3b59d7]"
        onClick={showDrawer}
      >
        <Video />
        Create Meet
      </Button>
        </div>

      <AssignMeetingDrawer onClose={onClose} open={open} />
    </div>
  );
};

export default Meeting;
