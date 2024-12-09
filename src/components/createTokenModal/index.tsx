import { postUploadImages } from "@/api/asset-apis.ts";
import Star from "@/assets/svg/star.svg";
import UploadImage from "@/assets/svg/upload.svg";
import type { GetProp, UploadProps } from "antd";
import { Button, Input, Modal, Upload, message } from "antd";
import { useState } from "react";
import "./index.less";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const baseUrl = import.meta.env.VITE_BASE_URL;

const CreateTokenModal = ({
  confirmLoading = false,
  visible = false,
  handleVisible,
  onLaunch = async () => false,
}: {
  confirmLoading?: boolean;
  visible?: boolean;
  handleVisible: (visible: boolean) => void;
  onLaunch?: (data: {
    tokenName: string;
    tokenSymbol: string;
    tokenDescription: string;
    sourceId: string;
  }) => Promise<boolean>;
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [tokenDescription, setDescription] = useState("");
  const [sourceId, setSourceId] = useState<string>();
  const [imageFileList, setImageFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // limit file type and size less than 4MB
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "image/gif",
    ].includes(file.type);
    if (!isJpgOrPng) {
      message.error("You can only upload jpeg/png/webp/gif file!");
      return;
    }
    const isLt4M = file.size / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("Image must smaller than 4MB!");
      return;
    }
    return isJpgOrPng && isLt4M;
  };

  // custom upload image
  const customRequest = (options: any) => {
    postUploadImages({
      image: options.file,
    }).then((res) => {
      if (res.msg === "success") {
        setImageUrl(baseUrl + "/" + res.data[0].path);
        setImageFileList([res.data[0]]);
        setSourceId(res.data[0].sourceId);
      }
    });
  };

  const uploadButton = (
    <button className="defaultUploadBtn" type="button">
      <img
        src={UploadImage}
        style={{ width: "10vh", height: "10vh", marginBottom: "3vh" }}
        alt="Upload"
      />
      <div className="format">jpeg/png/webp/gif</div>
      <div className="format">less than 4M</div>
    </button>
  );

  const launchToken = async () => {
    console.log("img", imageFileList);
    if (!sourceId) {
      message.error("Please upload an image");
      return;
    }
    if (!tokenName) {
      message.error("Please enter token name");
      return;
    }
    if (!tokenSymbol) {
      message.error("Please enter token symbol");
      return;
    }
    setLoading(true);
    try {
      const result = await onLaunch({
        tokenName,
        tokenSymbol,
        tokenDescription,
        sourceId,
      });
      if (result) {
        setImageUrl("");
        setImageFileList([]);
        setTokenName("");
        setTokenSymbol("");
        setDescription("");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // 结合token-page中的创建失败时的报错信息，要显示导致创建失败的具体信息
      message.error("Error creating token");
    }
  };

  const handleCancel = () => {
    handleVisible(false);
    setImageUrl("");
    setImageFileList([]);
  };

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
              <div className="flex mb-2 text">
                Image <img className="ml-2" src={Star} alt="star" />
              </div>
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
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{ width: "100%", height: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <div className="w-2/3 token">
              <div className="mb-6">
                <div className="flex mb-2 text">
                  Token Name
                  <img className="ml-2" src={Star} alt="star" />
                </div>
                <Input
                  className="token-input"
                  showCount
                  maxLength={20}
                  placeholder="Enter Token Name"
                  value={tokenName}
                  onChange={(e) => setTokenName(e.target.value)}
                />
              </div>
              <div>
                <div className="flex mb-2 text">
                  Token Symbol
                  <img className="ml-2" src={Star} alt="star" />
                </div>
                <Input
                  className="token-input"
                  showCount
                  maxLength={20}
                  placeholder="Enter Token Symbol"
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex mb-2 text">
              Token Description <img className="ml-2" src={Star} alt="star" />
            </div>
            <Input.TextArea
              className="token-input-area"
              showCount
              maxLength={256}
              placeholder="Enter Token Description"
              value={tokenDescription}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="footer">
          <Button
            onClick={launchToken}
            type="primary"
            size="large"
            loading={loading}
            className="w-[180px]"
          >
            Launch
          </Button>
        </div>
        <div className="footer footer-text">Cost To Deploy 20 TRX</div>
      </Modal>
    </div>
  );
};

export default CreateTokenModal;
