import { MdToggleOff } from "react-icons/md";
import { MdToggleOn } from "react-icons/md";

const ToggleButton = ({
  toggle,
  isOpen,
}: {
  toggle: () => void;
  isOpen: boolean;
}) => {
  return (
    <div
      className="fixed bottom-4 left-4 cursor-pointer text-gray-300 z-20"
      onClick={toggle}
    >
      {isOpen ? <MdToggleOn size={40} /> : <MdToggleOff size={40} />}
    </div>
  );
};

export default ToggleButton;
