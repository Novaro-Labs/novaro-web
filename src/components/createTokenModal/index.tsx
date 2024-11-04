import { useState } from "react";
import { Modal, Upload, message, Input } from "antd";
import NovButton from "@/components/Basic/Button/NovButton.tsx";
import "./index.less"
import type { GetProp, UploadProps, UploadFile } from 'antd';
import UploadImage from "@/assets/svg/upload.svg"
import Star from "@/assets/svg/star.svg"
import { generateRandomSourceId } from "@/utils/utils.ts";
import { postUploadImages } from "@/api/asset-apis.ts";

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const baseUrl = import.meta.env.VITE_BASE_URL

const CreateTokenModal = ({ confirmLoading = false, visible = false, handleVisible }) => {
  const [imageUrl, setImageUrl] = useState<string>()
  const [imageFileList, setImageFileList] = useState<any>([])

  // limit file type and size less than 4MB
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = ["image/png", "image/jpeg", "image/webp", "image/gif"].includes(file.type);
    if (!isJpgOrPng) {
      message.error('You can only upload jpeg/png/webp/gif file!');
      return;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error('Image must smaller than 4MB!');
      return;
    }
    return isJpgOrPng && isLt4M;
  };

  // custom upload image
  const customRequest = (options: any) => {
    postUploadImages({
      image: options.file
    }).then(res => {
      if (res.msg === "success") {
        setImageUrl(baseUrl + res.data[0].path)
        setImageFileList([res.data[0]])
      }
    })
  }

  const uploadButton = (
    <button className="defaultUploadBtn" type="button">
      <img src={UploadImage} style={{ width: '10vh', height: '10vh', marginBottom: '3vh'}} alt="Upload" />
      <div className="format">jpeg/png/webp/gif</div>
      <div className="format">less than 4M</div>
    </button>
  );

  const lanuchToken = () => {
    console.log('img', imageFileList)
    handleCancel()
  }
  const handleCancel = () => {
    handleVisible(false)
    setImageUrl('')
    setImageFileList([])
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
                beforeUpload={beforeUpload}
                customRequest={customRequest}
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