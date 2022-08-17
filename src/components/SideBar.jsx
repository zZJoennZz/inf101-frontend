import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

const SideBar = ({ isAuth }) => {
  return (
    <div className="bg-gradient-to-b from-cyan-600 to-teal-500 p-2 md:p-5 max-w-[600px] xl:min-w-[300px]">
      <Logo />
      <div className="w-full h-0.5 bg-white mb-6"></div>
      <Menu isAuth={isAuth} />
    </div>
  );
};

export default SideBar;
