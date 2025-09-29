import React, {FC} from "react";
import {useAppDispatch, useAppSelector} from "@app/store/store";
import {replaceSound, toggleSound} from "@entities/sound/model/soundSlice";
import {cacheSound} from "@shared/lib/audio/audio";
import fileIcon from "@shared/assets/img/fileEdit.svg";
import onOffSoundIcon from "@shared/assets/img/onOffSound.svg";
import * as style from "./SoundManager.module.css";
import {selectAllSounds} from "@entities/sound/model/selectors";
import {Sound, SoundType} from "@entities/sound/model/types";
import Switch from "@shared/ui/switch";

const SoundManager: FC = () => {
  const sounds = useAppSelector(selectAllSounds);
  const dispatch = useAppDispatch();

  const handleReplace = async (id: SoundType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await cacheSound(id, file);
    dispatch(replaceSound({id, fileName: file.name}));
  };

  return (
    <div className={style.table}>
      <div className={style.row}>
        <div></div>
        <div className={[
          style.cell,
          style.centered
        ].join(' ')}>
          <img className={style.onOffSoundIcon} src={onOffSoundIcon} alt="toggle"/>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {
        sounds.map((sound: Sound) => (
          <div className={style.row} key={sound.id}>
            <div className={style.cell}>
              <p className={style.sound__name}>{sound.name}</p>
            </div>

            <div className={[
              style.cell,
              style.centered
            ].join(" ")}>
              <Switch checked={sound.enabled}
                      onChange={() => dispatch(toggleSound(sound.id))}/>
            </div>

            <div className={style.cell}>
              <p className={style.sound__fileName}>{sound.fileName}</p>
            </div>

            <div className={style.cell}>
              <label className={style.replace}>
                <img src={fileIcon} alt="file"/>
                Заменить звук…
                <input type="file" accept="audio/*" hidden onChange={e => handleReplace(sound.id, e)}/>
              </label>
            </div>

            <div className={style.cell}></div>
          </div>
        ))
      }
    </div>
  );
};

export default SoundManager;
