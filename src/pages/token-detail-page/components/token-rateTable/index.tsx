import { useState } from "react";
import NovButtonGroup from "../../../../components/Basic/ButtonGroup/NovButtonGroup.tsx";
import NovaroTable from "../../../../components/Basic/NovaroTable";
import { TokenTableEnum, TokenTableMockData } from "../../../../mock-data/token.ts";

const TokenRateTable = () => {
  const [loading, setLoading] = useState(false)
  const Columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text: string) => {
        if (text === 'Sell') {
          return <span style={{ color: '#C3492F' }}>Sell</span>
        } else {
          return <span style={{ color: '#2DB83B' }}>Buy</span>
        }
      }
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (_: any, {cost, eth}: {cost: number, eth: number}) => {
        return <span>{cost}<span style={{ color: '#bbb'}}> ({eth}ETH)</span></span>
      }
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]
  return (
    <div>
      <NovButtonGroup children={TokenTableEnum}/>
      {/* table */}
      <div className="mt-4">
        <NovaroTable
          columns={Columns}
          dataSource={TokenTableMockData}
          loading={loading}
          pageSize={5}
        />
      </div>
    </div>
  )
}

export default TokenRateTable;