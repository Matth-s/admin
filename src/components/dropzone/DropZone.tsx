import { FileImport } from "../../schema";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import "./style.scss";

type Props = {
  importedFiles: FileImport[] | [];
  setImportedFiles: React.Dispatch<React.SetStateAction<FileImport[] | []>>;
  setImagePresentation: React.Dispatch<React.SetStateAction<any>>;
  imagePresentation: any;
};

const DropZone = ({
  importedFiles,
  setImportedFiles,
  setImagePresentation,
  imagePresentation,
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
    },
    onDrop: (acceptedFiles: any) => {
      const newFiles = acceptedFiles
        .filter((newFile: any) => {
          const exists = importedFiles.some(
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

      setImportedFiles((prevData) => [...prevData, ...newFiles]);
    },
  });

  const handleRemoveImage = (id: string) => {
    const newFiles = importedFiles.filter((file: any) => file.id !== id);
    setImportedFiles(newFiles);

    if (imagePresentation.id === id) {
      if (newFiles.length > 0) {
        setImagePresentation(newFiles[0]);
      } else {
        setImagePresentation([]);
      }
    }
  };

  const presentationImage = (file: FileImport) => {
    setImagePresentation(file);
  };

  const thumbs = importedFiles.map((file: any) => (
    <div
      className={`"thumbs-container" ${
        file.id === imagePresentation?.id ? "active" : null
      } `}
      key={file.id}
    >
      <div className="thumbs-header flex flex__alignCenter flex__spacebetween">
        <img
          className="icon-close"
          onClick={() => handleRemoveImage(file.id)}
          src="./assets/close.png"
          alt="close"
        />
        <p onClick={() => presentationImage(file)}>Image de presentation</p>
      </div>
      <div className="thumbs-div">
        <img
          alt="selection"
          src={file.preview}
          onLoad={() => URL.revokeObjectURL(file.preview)}
        />
      </div>
    </div>
  ));

  return (
    <div className="dropzone-container">
      <section>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p className="select-image">Selectionnez les images</p>
        </div>
        {importedFiles.length > 0 && <aside className="flex">{thumbs}</aside>}
      </section>
    </div>
  );
};

export default DropZone;
