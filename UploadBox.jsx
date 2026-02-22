import { useDropzone } from "react-dropzone";

export default function UploadBox() {

  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div {...getRootProps()} className="bg-gray-800 p-5 rounded-xl text-center">
      <input {...getInputProps()} />
      <p>Upload Screenshot or Claim</p>
    </div>
  );
}