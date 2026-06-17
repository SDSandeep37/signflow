import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

interface SignatureModalProps {
  onClose: () => void;
  onSave: (signature: string) => void;
}

const SignatureModal = ({ onClose, onSave }: SignatureModalProps) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const handleSave = () => {
    if (!sigCanvas.current) return;

    // const signature = sigCanvas.current
    //   .getTrimmedCanvas()
    //   .toDataURL("image/png");

    // const signatureImage = sigCanvas.current.getCanvas().toDataURL("image/png");
    const signature = sigCanvas.current.getCanvas().toDataURL("image/png");
    onSave(signature);
  };

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/70">
      <div className="bg-blue-950 rounded-lg p-6 w-150">
        <h2 className="text-xl font-semibold mb-4 text-black">Sign Document</h2>

        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 200,
            className: "border border-gray-300 bg-white",
          }}
        />

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => sigCanvas.current?.clear()}
            className="px-4 py-2 bg-orange-300 text-black rounded"
          >
            Clear
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save Signature
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignatureModal;
