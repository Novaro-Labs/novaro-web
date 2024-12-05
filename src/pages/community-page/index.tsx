import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CreateCommunityModal from '@/components/createCommunityModal';
import { message } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CommunityCard = ({ title, memberCount }: { title: string; memberCount: number }) => {
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Activity',
        data: [85, 72, 65, 72, 68, 70, 85],
        borderColor: '#4CAF50',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 mb-6">
      <div className="relative">
        <img
          src="/doge-twitter.png"
          alt="Community Banner"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute top-4 right-4 bg-[#4ade80] text-white px-3 py-1 rounded-full flex items-center">
          <span className="mr-1">👥</span>
          <span>{memberCount}</span>
        </div>
      </div>
      <h2 className="text-2xl font-bold mt-4 mb-2">{title}</h2>
      <div className="h-48 mb-4">
        <Line data={chartData} options={chartOptions} />
      </div>
      <button className="w-full bg-[#4F46E5] text-white py-3 rounded-lg hover:bg-[#4338CA] transition-colors">
        Join
      </button>
    </div>
  );
};

const CommunityPage: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  
  const communities = [
    { title: 'Meme($ Meme)', memberCount: 128 },
    { title: 'Pepe($ PEPE)', memberCount: 256 },
    { title: 'DOGE($ DOGE)', memberCount: 512 },
  ];

  const handleCreateCommunity = async (values: {
    network: string;
    token: string;
    communityName: string;
    description: string;
  }) => {
    try {
      setConfirmLoading(true);
      // TODO: Implement community creation logic here
      console.log('Creating community with values:', values);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
      message.success('Community created successfully!');
      setModalVisible(false);
    } catch (error) {
      message.error('Failed to create community');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Community</h1>
        <button 
          onClick={() => setModalVisible(true)}
          className="bg-[#4F46E5] text-white px-6 py-2 rounded-lg hover:bg-[#4338CA] transition-colors flex items-center"
        >
          <span className="mr-2">✨</span>
          Create
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {communities.map((community, index) => (
          <CommunityCard
            key={index}
            title={community.title}
            memberCount={community.memberCount}
          />
        ))}
      </div>

      <CreateCommunityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleCreateCommunity}
        confirmLoading={confirmLoading}
      />
    </div>
  );
};

export default CommunityPage;
