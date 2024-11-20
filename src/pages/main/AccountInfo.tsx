import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import { useAccount, useDisconnect } from "wagmi";

const AccountInfo = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const signOut = () => {
    // 退出登录
    localStorage.removeItem("x_auth_code");
    localStorage.removeItem("x_auth_time");
    disconnect();

    window.location.href = "/login";
  };

  const menuProps = {
    items: [
      {
        label: "Sign out",
        key: "signout",
        onClick: signOut,
      },
    ],
  };

  return (
    <Dropdown menu={menuProps}>
      <Button>
        <Space>
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default AccountInfo;
