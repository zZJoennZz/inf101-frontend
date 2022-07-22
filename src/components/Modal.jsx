import { XIcon } from "@heroicons/react/solid";
const Modal = ({
  btnClass = "bg-green-500 text-white rounded-md px-8 py-2 text-base font-medium hover:bg-green-600",
  isOpen = true,
  closeModal,
  content,
  title,
  btnText,
}) => {
  return (
    <div className="w-full">
      <button className={btnClass} onClick={closeModal} id="open-btn">
        {btnText}
      </button>

      <div
        className={`fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full ${
          isOpen ? "flex items-center" : "hidden"
        }`}
        id="my-modal"
      >
        <div className="bg-white w-11/12 md:w-2/3 rounded-2xl mx-auto shadow-lg shadow-slate-400">
          <div className="border-b">
            <div className="p-4 md:py-5 md:px-5 font-bold">
              {title}
              <button
                onClick={closeModal}
                className="float-right hover:bg-slate-500 hover:text-white hover:rounded-md transition-all"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Modal;
