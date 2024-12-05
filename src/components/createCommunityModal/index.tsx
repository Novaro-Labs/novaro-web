import React, { useState } from 'react';
import { Modal, Select, Input } from 'antd';
import { useAccount } from 'wagmi';

const { TextArea } = Input;

interface CreateCommunityModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: {
    network: string;
    token: string;
    communityName: string;
    description: string;
  }) => void;
  confirmLoading?: boolean;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  visible,
  onClose,
  onSubmit,
  confirmLoading = false,
}) => {
  const [network, setNetwork] = useState('Ethereum');
  const [token, setToken] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit({
      network,
      token,
      communityName,
      description,
    });
  };

  return (
    <Modal
      title={null}
      open={visible}
      onCancel={onClose}
      footer={null}
      width={480}
      centered
      closable
    >
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <img
            src="/upload-icon.svg"
            alt="Upload"
            className="w-16 h-16"
          />
        </div>

        <div className="mb-6">
          <div className="mb-2">Network</div>
          <Select
            value={network}
            onChange={setNetwork}
            className="w-full"
            options={[
              { value: 'Ethereum', label: 'Ethereum' },
              { value: 'Linea', label: 'Linea' },
            ]}
          />
        </div>

        <div className="mb-6">
          <div className="mb-2">Community Token</div>
          <Select
            value={token}
            onChange={setToken}
            className="w-full"
            options={[
              { value: 'token1', label: 'Token 1' },
              { value: 'token2', label: 'Token 2' },
            ]}
          />
        </div>

        <div className="mb-6">
          <div className="mb-2">Community Name</div>
          <Input
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
            placeholder="Enter community name"
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <div className="mb-2">Token Description</div>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter token description"
            className="w-full"
            rows={4}
          />
          <div className="text-right text-gray-400 text-sm mt-1">
            {description.length}/256
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={confirmLoading}
          className={`w-full py-3 text-white rounded-lg transition-colors ${
            confirmLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#4F46E5] hover:bg-[#4338CA]'
          }`}
        >
          {confirmLoading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </Modal>
  );
};

export default CreateCommunityModal;
