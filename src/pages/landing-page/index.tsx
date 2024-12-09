import { useNavigate } from "react-router-dom";

import { authX } from "@/api/auth-apis";
import bottomKV from "@/assets/landing-page/bottomKV.png";
import Discord from "@/assets/landing-page/Discord.png";
import logo from "@/assets/landing-page/logo.png";
import Medium from "@/assets/landing-page/Medium.png";
import Medium1 from "@/assets/landing-page/Medium1.png";
import part1Back from "@/assets/landing-page/part1Back.png";
import part1Human from "@/assets/landing-page/part1human.png";
import part1Left from "@/assets/landing-page/part1Left.png";
import part1Right from "@/assets/landing-page/part1Right.png";
import part1Ufo from "@/assets/landing-page/part1Ufo.png";
import part2Left from "@/assets/landing-page/part2Left.png";
import part2Logo from "@/assets/landing-page/part2Logo.png";
import part2Right from "@/assets/landing-page/part2Right.png";
import planet from "@/assets/landing-page/planet.png";
import rocket from "@/assets/landing-page/rocket.png";
import Telegram from "@/assets/landing-page/Telegram.png";
import X from "@/assets/landing-page/X.png";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import HeroSectionBg from "@/components/HeroSectionBg";
import { message } from "antd";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import "./index.less";

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
const baseUrl = import.meta.env.VITE_BASE_URL;
const CODES_LENGTH = 6;

const LandingPage = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);
  const [codes, setCodes] = useState(new Array(CODES_LENGTH).fill(""));

  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    console.log({ value, index });
    if (/^\d$/.test(value) || value === "") {
      const newValues = [...codes];
      newValues[index] = value;
      setCodes(newValues);
      // 自动跳转到下一个输入框
      if (value !== "" && index < 7) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && codes[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const loginWithX = async () => {
    if (codes.join("").length < CODES_LENGTH) {
      message.warning("Please input invitation code");
      return;
    }
    /**
     * https://novaro-web-demo.vercel.app/auth/x/callback?state=Ky5XeUViuf0bgtRYVoXtqFf4ZmvMbK9voEO9gvqski0%3D&code=RHFMd0RsenlEUEU2WFhoRUxDZXkwcDFCVVlUV1RsWi1TVWI4T3oyeUdWVjhVOjE3MzA3ODk4MjcyMTM6MTowOmFjOjE
     * https://twitter.com/i/oauth2/authorize?client_id=V19YdlA5VnBybXNTVHlCQXdYRFQ6MTpjaQ&code_challenge=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3D&code_challenge_method=plain&redirect_uri=https%3A%2F%2Fnovaro-web-demo.vercel.app%2Fauth%2Fx%2Fcallback&response_type=code&scope=tweet.read%2Busers.read%2Bfollows.read%2Boffline.access&state=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3D
     * redirect to auth/x/callback
     * 
     * window.location.href = "https://twitter.com/i/oauth2/authorize?client_id=V19YdlA5VnBybXNTVHlCQXdYRFQ6MTpjaQ&code_challenge=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3D&code_challenge_method=plain&redirect_uri=https%3A%2F%2Fnovaro-web-demo.vercel.app%2Fauth%2Fx%2Fcallback&response_type=code&scope=tweet.read%2Busers.read%2Bfollows.read%2Boffline.access&state=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3DF";
     * 
     * window.location.href = 
        "https://twitter.com/i/oauth2/authorize?\
        client_id=V19YdlA5VnBybXNTVHlCQXdYRFQ6MTpjaQ\
        &code_challenge=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3D\
        &code_challenge_method=plain\
        &redirect_uri=http%3A%2F%2F127.0.0.1:8080%2Fv1%2Fauth%2Fcallback
        &response_type=code\
        &scope=tweet.read%2Busers.read%2Bfollows.read%2Boffline.access\
        &state=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3DF";
        
     * 
     */
    const invitationCode = codes.join("");
    try {
      await authX({ invitationCode });
      message.success("Login success, redirecting...");
      window.location.href = "http://localhost:5173/home"
      // "https://twitter.com/i/oauth2/authorize?client_id=V19YdlA5VnBybXNTVHlCQXdYRFQ6MTpjaQ&code_challenge=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3D&code_challenge_method=plain&redirect_uri=https%3A%2F%2Fnovaro-web-demo.vercel.app%2Fauth%2Fx%2Fcallback&response_type=code&scope=tweet.read%2Busers.read%2Bfollows.read%2Boffline.access&state=KqDKE9_qPWFyg5JzZePpp2Aq1jRAtK0swjGTBMFRH6Q%3DF";
    } catch (error: any) {
      message.warning(
        error?.response?.data?.error || "Invalid invitation code"
      );
    }
  };

  const handleInvitationCodePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || (window as any).clipboardData;
    const pastedData = clipboardData.getData("Text");
    if (pastedData.length > CODES_LENGTH) {
      return;
    }
    const newValues = [...codes];
    const pastedValues = pastedData.split("");
    pastedValues.forEach((value, index) => {
      newValues[index] = value;
    });
    setCodes(newValues);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 3000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
                      onPaste={handleInvitationCodePaste}
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
                <div
                  className="twitter cursor-pointer font-bolder"
                  onClick={loginWithX}
                >
                  Login with X
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <ConnectWalletButton className="bg-[#030305] px-8 text-white h-12 font-bold mt-4" />
          </div>
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
