import Logo from "./Logo/Logo";
import Menu from "./Menu/Menu";

const SideBar = ({ isAuth }) => {
  return (
    <div className="p-2 md:p-5 max-w-[600px] xl:min-w-[300px] border-r border-gray-200">
      <Logo />
      <Menu isAuth={isAuth} />
    </div>
  );
};

export default SideBar;
