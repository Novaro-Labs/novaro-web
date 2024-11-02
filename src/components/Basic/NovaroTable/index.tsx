import { Table } from "antd"
import "./index.less"

const NovaroTable = ({ columns, dataSource, loading, pageSize }) => {
  return (
    <Table
      rowKey={(record) => record.id}
      rowClassName="even-row"
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{
        position: ["bottomCenter"],
        total: dataSource.length,
        pageSize: pageSize,
        className: "custom-pagination"
      }}
    />
  )
}

export default NovaroTable;