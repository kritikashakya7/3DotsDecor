import { useState } from "react";
import Button from "../components/Button";
import useAuthContext from "../hooks/useAuthContext";

const Profile = () => {
  const { logout, user } = useAuthContext();

  const [selectedMenu, setSelectedMenu] = useState("profile");

  return (
    <div className="container py-10 max-lg:px-2">
      <div className="w-full flex gap-5 h-[calc(100vh-500px)]">
        <div className="max-w-[200px] h-[calc(100vh-500px)] w-full flex flex-col justify-between gap-8 pr-5 border-r-2 border-hover">
          <ul className="space-y-2">
            <li>
              <button
                className={`p-2 w-full text-left hover:bg-hover rounded animation ${
                  selectedMenu === "profile" && "bg-hover"
                }`}
                onClick={() => setSelectedMenu("profile")}
              >
                Profile
              </button>
            </li>
          </ul>
          <Button onClick={logout} className={"w-full"}>
            Logout
          </Button>
        </div>
        <div className="w-full">
          {selectedMenu === "profile" && (
            <div className="space-y-2">
              <h1 className="text-xl font-bold">Profile Details</h1>
              <p>
                <strong>Full Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email Address:</strong> {user?.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
