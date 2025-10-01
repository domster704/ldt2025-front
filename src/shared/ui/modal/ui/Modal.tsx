import React, {FC} from "react";
import * as style from "./Modal.module.css";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({
                                 isOpen,
                                 onClose,
                                 children,
                                 ...props
                               }) => {
  if (!isOpen) return null;

  return (
    <div className={style.overlay} onClick={onClose}>
      <div {...props} className={[
        style.content,
        props.className || ''
      ].join(' ')} onClick={e => e.stopPropagation()}>
        <button className={style.close} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
