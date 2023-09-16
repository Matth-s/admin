import { FileImport } from "../../schema";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";

type Props = {
  importNewFile: FileImport[] | [];
  setImportNewFile: React.Dispatch<React.SetStateAction<FileImport[] | []>>;
};

const EditDropZone = ({ importNewFile, setImportNewFile }: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles: any) => {
      const newFiles = acceptedFiles
        .filter((newFile: any) => {
          const exists = importNewFile.some(
            (existingFile: any) => existingFile.name === newFile.name
          );
          return !exists;
        })
        .map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            id: uuidv4(),
          })
        );

      setImportNewFile((prevData) => [...prevData, ...newFiles]);
    },
  });

  return (
    <div>
      <h1>drop</h1>
    </div>
  );
};

export default EditDropZone;
