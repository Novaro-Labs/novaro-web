import logo from "@/assets/landing-page/logo.png";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import HeroSectionBg from "@/components/HeroSectionBg";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.less";
import { authCallback } from "@/api/auth-apis";


const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const loginWithoutWallet = () => {
    navigate("/home");
  };

  const handleOk = () => {
    setOpen(false);
  };

  const getXAvatar = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const state = urlParams.get("state")||'';
    const invitationCode = localStorage.getItem("invitationCode") || "";

    const user  = await authCallback({
      invitationCode,
      state
    });

    console.log(user);
  }

  /**
   * url:
   * https://novaro-web-demo.vercel.app/auth/x/callback?state=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3DF&code=M0JvRUNiRWJNdDV1dXNSaUZYY01UenNaUC1jdFBiUTlpenBfbTVmdUNxbEhhOjE3MzQyMzUxMjkwMTA6MTowOmFjOjE
   */

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state) {
      getXAvatar()
      setOpen(true);
      localStorage.setItem("x_auth_code", code);
      localStorage.setItem("x_auth_time", String(Date.now()));
    } else {
      const errorModal = Modal.warning({
        title: "Warning",
        content: "Auth error",
        cancelButtonProps: { style: { display: "none" } },
        okText: "Back to Login",
        okButtonProps: {
          onClick: () => {
            errorModal.destroy();
            navigate("/login");
          },
        },
      });
    }
  }, []);

  return (
    <div className="bg-black h-screen relative flex-1 landing_container">
      <div className="header h-full relative w-full overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-full">
          <HeroSectionBg />
        </div>
        <div className="relative z-10 flex justify-between items-start overflow-hidden pr-[240px] h-[1006px]">
          <div className="header_left">
            <img src={logo} className="logo" />
            <div className="login_form">
              <div className="form_title">
                Nova Your Social Identity with the Power of Web3
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title={<div className="mb-10 text-center">Login with X</div>}
        closable={false}
        onOk={handleOk}
        width={300}
        centered
        footer={null}
      >
        <div className="space-x-4 flex justify-center w-full pt-4">
          <Button key="back" onClick={loginWithoutWallet}>
            Skip Wallet
          </Button>
          <ConnectWalletButton className="bg-[#436BD1] px-8 rounded-lg text-white h-10"/>
        </div>
      </Modal>
    </div>
  );
};

export default AuthCallbackPage;
