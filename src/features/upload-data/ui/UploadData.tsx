import React, {FC} from "react";
import {useAppDispatch} from "@app/store/store";
import {fetchMonitoringSession} from "@entities/session-upload/api/sessionUploadThunk";
import {validateFile} from "@features/upload-data/lib/validation";


const UploadData: FC = () => {
  const dispatch = useAppDispatch();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    if (!validateFile(file)) {
      alert("Поддерживаются только .zip файлы");
      return;
    }

    dispatch(fetchMonitoringSession(file));
  };

  return (
    <label style={{cursor: "pointer"}}>
      <span>Загрузить CSV</span>
      <input
        type="file"
        accept=".zip"
        style={{display: "none"}}
        onChange={handleFile}
      />
    </label>
  );
};

export default UploadData;
