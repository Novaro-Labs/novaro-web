import CryptosActiveIcon from "@/assets/common/cryptos-active-icon.svg";
import CryptosIcon from "@/assets/common/cryptos-icon.svg";
import HomeActiveIcon from "@/assets/common/home-active-icon.svg";
import HomeIcon from "@/assets/common/home-icon.svg";
import ProfileActiveIcon from "@/assets/common/profile-active-icon.svg";
import ProfileIcon from "@/assets/common/profile-icon.svg";
import SpaceActiveIcon from "@/assets/common/space-active-icon.svg";
import SpaceIcon from "@/assets/common/space-icon.svg";
import TokenActiveIcon from "@/assets/common/token-active-icon.png";
import TokenIcon from "@/assets/common/token-icon.png";
import logo from "@/assets/svg/logo.svg";
import { NavLink } from "react-router-dom";
import { useDisconnect } from "wagmi";
import "./index.less";

const MENU_DICT: Record<
  string,
  { icon: string; activeIcon?: string; title: string }
> = {
  home: {
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
    title: "Home",
  },
  space: {
    icon: SpaceIcon,
    activeIcon: SpaceActiveIcon,
    title: "Space",
  },
  token: {
    icon: TokenIcon,
    activeIcon: TokenActiveIcon,
    title: "Token",
  },
  profile: {
    icon: ProfileIcon,
    activeIcon: ProfileActiveIcon,
    title: "Profile",
  },
  cryptos: {
    icon: CryptosIcon,
    activeIcon: CryptosActiveIcon,
    title: "Cryptos",
  },
} as const;

interface NavLinkItemProps {
  to: string;
  label: string;
}

const NavLinkItem = ({ to, label }: NavLinkItemProps) => {
  return (
    <li>
      <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {({ isActive }) => (
          <div className="flex items-center gap-2">
            <img
              src={
                !isActive
                  ? MENU_DICT[label.toLowerCase() as keyof typeof MENU_DICT]
                      .icon
                  : MENU_DICT[label.toLowerCase() as keyof typeof MENU_DICT]
                      .activeIcon
              }
              alt={label}
              className="size-8 nav-item-icon"
            />
            {label}
          </div>
        )}
      </NavLink>
    </li>
  );
};
const Sidebar = () => {
  const { disconnect } = useDisconnect();

  const signOut = () => {
    // 退出登录
    localStorage.removeItem("x_auth_code");
    localStorage.removeItem("x_auth_time");
    disconnect()

    window.location.href = "/login";
  };
  return (
    <div className="sidebar sticky top-0 flex flex-col pt-10 py-20 items-center">
      <div className="flex-1">
        <NavLink to="/home" className="flex items-center justify-center mb-16">
          <img src={logo} width={42} height={42} alt="Logo" />
        </NavLink>
        <nav>
          <ul>
            <NavLinkItem to="/home" label="Home" />
            <NavLinkItem to="/space" label="Space" />
            <NavLinkItem to="/token" label="Token" />
            <NavLinkItem to="/cryptos" label="Cryptos" />
            <NavLinkItem to="/profile" label="Profile" />
          </ul>
        </nav>
      </div>
      <div className="flex-none">
        <button
          className="text-sm  rounded-md border px-6 py-2 text-[#8291A4] hover:bg-black hover:text-white"
          onClick={signOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
