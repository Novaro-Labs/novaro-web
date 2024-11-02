import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useNavigate } from 'react-router-dom';

import "./index.less";
import { ChangeEvent, KeyboardEvent, useRef, useState, useEffect } from "react";
import logo from "../../assets/landing-page/logo.png";
import part1Left from "../../assets/landing-page/part1Left.png";
import part1Right from "../../assets/landing-page/part1Right.png";
import part1Human from "../../assets/landing-page/part1human.png";
import part1Back from "../../assets/landing-page/part1Back.png";
import part1Ufo from "../../assets/landing-page/part1Ufo.png";
import part2Left from "../../assets/landing-page/part2Left.png";
import part2Right from "../../assets/landing-page/part2Right.png";
import part2Logo from "../../assets/landing-page/part2Logo.png";
import bottomKV from "../../assets/landing-page/bottomKV.png";
import rocket from "../../assets/landing-page/rocket.png";
import planet from "../../assets/landing-page/planet.png";
import X from "../../assets/landing-page/X.png";
import Telegram from "../../assets/landing-page/Telegram.png";
import Discord from "../../assets/landing-page/Discord.png";
import Medium from "../../assets/landing-page/Medium.png";
import Medium1 from "../../assets/landing-page/Medium1.png";
import HeroSectionBg from "./HeroSectionBg";

const SOCIAL_LIST = [
  {
    img: X,
  },
  {
    img: Telegram,
  },
  {
    img: Discord,
  },
  {
    img: Medium,
  },
  {
    img: Medium1,
  },
];


const LandingPage = () => {
  const navigate = useNavigate();
  const [codes, setCodes] = useState(new Array(6).fill(""));
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === "") {
      const newValues = [...codes];
      newValues[index] = value;
      setCodes(newValues);
      // 自动跳转到下一个输入框
      if (value !== "" && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && codes[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const loginWithX = ()=>{
    navigate('/home')
  } 


  return (
    <div className="landing_container">
      <div className="header h-[1006px] relative w-full overflow-hidden pb-20">
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
              <div className="form">
                <div className="code_title">Enter your invitation code:</div>
                <div className="code">
                  {codes.map((value, index) => (
                    <input
                      key={index}
                      ref={(el: HTMLInputElement) =>
                        (inputsRef.current[index] = el)
                      }
                      type="text"
                      className="code_input"
                      value={value}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                    />
                  ))}
                </div>
                <div className="discord">
                  Don't have one? Visit our{" "}
                  <div className="discord_text"> Discord</div>
                </div>
                <div className="twitter cursor-pointer font-bolder" onClick={loginWithX}>Login with X</div>
              </div>
            </div>
          </div>
          {/* <div className="header_right">login</div> */}
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (() => {
                if (!connected) {
                  return (
                    <button
                      onClick={() => {
                        openConnectModal();
                        // navigate to home
                      }}
                      className="relative  mt-4 flex h-12 select-none items-center overflow-hidden whitespace-nowrap rounded-full bg-[#030305] px-7 text-white transition-all duration-200 font-bold group"
                    >
                      <div className="absolute inset-0 left-0 top-0 z-10 hidden rounded-lg bg-white/5 group-hover:block"></div>
                      Connect Wallet
                    </button>
                  );
                }
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })();
            }}
          </ConnectButton.Custom>
        </div>
      </div>
      <div className="part_1">
        <img src={part1Left} className="part1Left" />
        <img src={part1Back} className="part1Back" />
        <div className="image-container">
          <img
            src={part1Ufo}
            className={`part1Ufo rotate-image ${animate ? "rotate" : ""}`}
          />
        </div>

        <img src={part1Human} className="part1Human" />
        <div className="part1Form">
          <div className="part1Text">
            <div className="title">
              <div className="text">Redefine Social Identity with DST</div>
            </div>
            <div className="content">
              Social interactions shape on-chain token and influence your
              digital presence
            </div>
          </div>
          <div className="part1Button">Learn more</div>
        </div>
        <img src={part1Right} className="part1Right" />
      </div>
      <div className="part_2">
        <img src={part2Left} className="part2Left" />
        <img src={part2Right} className="part2Right" />
        <img src={part2Logo} className="part2Logo" />
        <div className="part2Form">
          <div className="part2Text">
            <div className="part2Title">Social Rebate</div>
            <div className="part2Content">
              Labeling the post will reward both of you.
            </div>
          </div>
          <div className="part2Button">Learn more</div>
        </div>
      </div>
      <div className="bottom">
        <img src={bottomKV} className="bottomKV" />
        <div className="image-container">
          <img
            src={planet}
            className={`planet rotate-image ${animate ? "rotate" : ""}`}
          />
        </div>
        <div className="image-container">
          <img
            src={rocket}
            className={`rocket rotate-image ${animate ? "rotate" : ""}`}
          />
        </div>
        <div className="bottom_social">
          <img src={logo} className="logo" />
          <div className="social_list">
            {SOCIAL_LIST.map((item, index) => {
              return <img src={item.img} key={index} className="social_item" />;
            })}
          </div>

          <div className="tc">©2024 NPVARO Inc. All rights reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
