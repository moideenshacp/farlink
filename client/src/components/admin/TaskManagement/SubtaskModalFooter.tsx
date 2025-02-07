import { Button } from "antd";

// Modal Footer Component
const ModalFooter: React.FC<{
    onClose: () => void;
    onSubmit: () => void;
    isFirstPage: boolean;
    isLastPage: boolean;
    onPrevious: () => void;
    onNext: () => void;
  }> = ({ onClose, onSubmit, isFirstPage, isLastPage, onPrevious, onNext }) => {
    return [
      <Button key="back" onClick={onClose}>
        Cancel
      </Button>,
      !isFirstPage && (
        <Button key="previous" onClick={onPrevious}>
          Previous
        </Button>
      ),
      !isLastPage && (
        <Button
          key="next"
          type="primary"
          className="bg-[#4361EE] hover:bg-[#3549bb]"
          onClick={onNext}
        >
          Next
        </Button>
      ),
      <Button
        key="submit"
        type="primary"
        className="bg-[#4361EE] hover:bg-[#3549bb]"
        onClick={onSubmit}
      >
        Submit Subtasks
      </Button>,
    ];
  };
  
  export default ModalFooter