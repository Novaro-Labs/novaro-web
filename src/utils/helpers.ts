import { Modal, ModalFuncProps } from "antd";

export const confirmPromise = (modalProps: ModalFuncProps): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    Modal.confirm({
      ...modalProps,
      onOk: () => resolve(true),
      onCancel: () => resolve(false),
    });
  });
};
