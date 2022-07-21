import UserMenus from "./UserMenus/UserMenus";

const RightBar = ({ logout, isAuth }) => {
  return (
    <div className="hidden lg:flex flex-col w-60 p-2 border-l border-gray-200">
      <UserMenus runLogout={logout} isAuthenticated={isAuth} />
    </div>
  );
};

export default RightBar;
