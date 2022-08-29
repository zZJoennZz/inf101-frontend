import UserMenus from "./UserMenus/UserMenus";

const RightBar = ({ isAdmin, logout, isAuth }) => {
  return (
    <div className="w-0 p-0 lg:flex flex-col lg:w-60 lg:p-2 border-l border-gray-200">
      {isAuth ? (
        <UserMenus
          isAdmin={isAdmin}
          runLogout={logout}
          isAuthenticated={isAuth}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RightBar;
