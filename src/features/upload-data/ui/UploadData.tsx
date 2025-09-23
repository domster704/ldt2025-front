import React, {FC} from "react";
import Papa from "papaparse";
import {useAppDispatch} from "@app/store/store";
import {DataPoint, MonitoringSession} from "@entities/session-upload/model/types";
import {addSession} from "@entities/session-upload/model/uploadSlice";

interface CSVType {
  time_sec: number;
  value: number;
}

const UploadData: FC = () => {
  const dispatch = useAppDispatch();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const heartRates = (results.data as any[]).map((row: CSVType) => ({
          time: Number(row.time_sec),
          value: Number(row.value),
        })) as DataPoint[];

        const session: MonitoringSession = {
          id: crypto.randomUUID(),
          heartRate: heartRates,
          uterineContractions: [],
        };
        console.log(session)

        dispatch(addSession(session));
      },
    });
  };

  return (
    <label style={{cursor: "pointer"}}>
      <span>Загрузить CSV</span>
      <input
        type="file"
        accept=".csv"
        style={{display: "none"}}
        onChange={handleFile}
      />
    </label>
  );
};

export default UploadData;
