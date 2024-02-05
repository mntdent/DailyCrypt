import { useDropzone, DropzoneOptions } from "react-dropzone";

import { FileUploadRounded } from "@mui/icons-material";
import { Typography } from "@mui/material";

import styles from "./Dropzone.module.css";

import useTranslation from "../hooks/useTranslation";

interface Props {
  updateFiles: (files: File[]) => void;
  isFiles: File;
}

const Dropzone = (props: Props) => {

  const translate = useTranslation().translate;
  const transNoInt = useTranslation().translateNoInterpolate;

  const formatFileSize = (sizeInBytes: number) => {
    const kilobytes = sizeInBytes / 1000; // Convert to kilobytes
    const megabytes = kilobytes / 1000; // Convert to megabytes
    const gigabytes = megabytes / 1000; // Convert to gigabytes

    switch (true) {
      case gigabytes >= 1:
        return `${gigabytes.toFixed(2)} GB`;
      case megabytes >= 1:
        return `${megabytes.toFixed(2)} MB`;
      case kilobytes >= 1:
        return `${kilobytes.toFixed(2)} KB`;
      default:
        return `${sizeInBytes} bytes`;
    }
  };
  

  const handleDrop = (acceptedFiles: File[]) => {
    props.updateFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    multiple: false,
  } as DropzoneOptions);

  return (
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      {props.isFiles ? (
        <Typography color="text.secondary">
          {transNoInt('dropbox_text3').split("{file_name}")[0]}
          <b style={{ color: "var(--encryptgreen)" }}>{props.isFiles.name}</b>
          {transNoInt('dropbox_text3').split("{file_name}")[1].split("{file_size}")[0]}
          {formatFileSize(props.isFiles.size)}
          {transNoInt('dropbox_text3').split("{file_name}")[1].split("{file_size}")[1]}
          <br></br>
          {translate('dropbox_text2')}
        </Typography>
      ) : (
        <>
          <Typography color="text.secondary">
          {translate('dropbox_text1')}
          </Typography>
          <FileUploadRounded />
        </>
      )}
    </div>
  );
};

export default Dropzone;
