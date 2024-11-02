import { useState } from "react";
import { Modal, Upload, message, Input } from "antd";
import NovButton from "@/components/Basic/Button/NovButton.tsx";
import "./index.less"
import type { GetProp, UploadProps } from 'antd';
import UploadImage from "@/assets/svg/upload.svg"
import Star from "@/assets/svg/star.svg"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const CreateTokenModal = ({ confirmLoading = false, visible = false, handleVisible }) => {
  const [imageUrl, setImageUrl] = useState<string>()

  const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      // setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        // setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button className="defaultUploadBtn" type="button">
      <img src={UploadImage} style={{ width: '10vh', height: '10vh', marginBottom: '3vh'}} alt="Upload" />
      <div className="format">jpeg/png/webp/gif</div>
      <div className="format">less than 4M</div>
    </button>
  );

  const lanuchToken = () => {
    handleVisible(false)
  }
  const handleCancel = () => {
    handleVisible(false)
  }

  return (
    <div>
      <Modal
        style={{ top: 20 }}
        width={800}
        open={visible}
        footer={null} // 禁用默认的底部按钮
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="p-6">
          <div className="flex">
            <div className="w-1/3 image">
              <div className="flex mb-2 text">Image <img className="ml-2" src={Star} alt="star" /></div>
              {/* upload */}
              <Upload
                name="avatar"
                style={{ width: "261px", height: "211px" }}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ?
                  <img src={imageUrl} alt="avatar" style={{ width: "100%", height: "100%" }} /> : uploadButton}
              </Upload>
            </div>
            <div className="w-2/3 token">
              <div className="mb-6">
                <div className="flex mb-2 text">Token Name<img className="ml-2" src={Star} alt="star" /></div>
                <Input className="token-input" showCount maxLength={20} placeholder="Enter Token Name" />
              </div>
              <div>
                <div className="flex mb-2 text">Token Symbol<img className="ml-2" src={Star} alt="star" /></div>
                <Input className="token-input" showCount maxLength={20} placeholder="Enter Token Symbol" />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex mb-2 text">Token Description <img className="ml-2" src={Star} alt="star" /></div>
            <Input.TextArea className="token-input-area" showCount maxLength={256}
                            placeholder="Enter Token Description" />
          </div>
        </div>
        <div className="footer">
          <NovButton text="Launch" width="180px" onClick={lanuchToken} />
        </div>
        <div className="footer footer-text">Cost To Deploy 20 TRX</div>
      </Modal>
    </div>
  )
}

export default CreateTokenModal;