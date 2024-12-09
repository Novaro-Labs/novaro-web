import NovaroTable from "@/components/Basic/NovaroTable";
import { TCrypto } from "@/types/crypto-types";
import { ColumnType } from "antd/es/table";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CryptosPage() {
  const [loading, setLoading] = useState(false);
  const [cryptos, setCryptos] = useState<TCrypto[]>([]);

  const Columns: ColumnType<TCrypto>[] = [
    {
      title: "#",
      dataIndex: "Order",
      key: "order",
      render: (_, __, index) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <img src={record.image} alt="crypto" className="w-8 h-8 mr-2" />
            <span>{record.name}</span>
            <span className="text-[#999] uppercase ml-1 text-xs">
              {record.symbol}
            </span>
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "current_price",
      key: "current_price",
      render: (_, record) => {
        return <span>${record.current_price}</span>;
      },
    },
    {
      title: "Swap Cap",
      dataIndex: "swaprCap",
      key: "swaprCap",
      sorter: true,
      render: (_, record) => {
        return <span>${record.market_cap_change_24h}</span>;
      },
    },
    {
      title: "Social Score",
      dataIndex: "socialScore",
      key: "socialScore",
      sorter: true,
      render: (_, record, index) => {
        // random number with current order
        const random = Math.floor(Math.random() * 100) + (100 - index) * 50;
        return <span>{random}</span>;
      },
    },
    {
      title: "Last 7 Days",
      dataIndex: "lastWeekData",
      key: "lastWeekData",
    },
  ];

  const getCryptos = async () => {
    const res = axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return res;
  };

  useEffect(() => {
    setLoading(true);
    getCryptos().then((res) => {
      setCryptos(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="px-8 py-10">
      <div className="text-2xl font-bold mb-10">Cryptos Leader Board</div>
      {/* table */}
      <div className="mt-4">
        <NovaroTable
          columns={Columns}
          dataSource={cryptos}
          loading={loading}
          pageSize={10}
        />
      </div>
    </div>
  );
}
