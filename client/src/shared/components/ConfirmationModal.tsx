const ConfirmationModal: React.FC<{
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
  }> = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <p className="text-lg mb-4">{message}</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default ConfirmationModal