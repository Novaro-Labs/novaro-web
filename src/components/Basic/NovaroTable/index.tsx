import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import "./index.less";

interface NovaroTableProps {
  columns: ColumnsType<any>;
  dataSource: any[];
  loading: boolean;
  pageSize: number;
}

const NovaroTable: React.FC<NovaroTableProps> = ({
  columns,
  dataSource,
  loading,
  pageSize,
}) => {
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
        className: "custom-pagination",
      }}
    />
  );
};

export default NovaroTable;
