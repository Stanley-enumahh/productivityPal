import { useEffect, useState } from "react";
import { Logo } from "./components/logo";
import { SideNav } from "./components/sideNav";
import { AccountUI } from "./components/accountUI";
import imageCompression from "browser-image-compression";
import { NotesUI } from "./components/notesUI";
import { useForm } from "react-hook-form";
import { OverviewUI } from "./components/overvieUI";
import { Todos } from "./components/todos";

export default function App() {
  // const [Tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState("overview");
  const [profile, setProfile] = useState("");
  const [profileImg, setProfileImg] = useState(null);

  async function handleChangeProfileImg(e) {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 500,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
          const base64Img = reader.result;
          setProfileImg(base64Img);
          localStorage.setItem("profileImg", base64Img);
        };
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => setProfile(data);

  useEffect(function () {
    const savedProfile = JSON.parse(localStorage.getItem("profileDetails"));
    const savedProfileImage = localStorage.getItem("profileImg");

    if (savedProfile) {
      setProfile(savedProfile);
    }
    if (savedProfileImage) {
      setProfileImg(savedProfileImage);
    }
  }, []);

  useEffect(
    function () {
      if (profileImg) {
        localStorage.setItem("profileImg", profileImg);
      }
    },
    [profileImg]
  );

  useEffect(
    function () {
      if (
        profile.email ||
        profile.username ||
        profile.profession ||
        profile.bio
      ) {
        localStorage.setItem("profileDetails", JSON.stringify(profile));
      }
    },
    [profile]
  );

  return (
    <div className="w-full overflow-hidden h-screen flex flex-row justify-between bg-[#f2f2f2]">
      <div className="w-[17%] flex flex-col gap-7 h-full bg-white p-7">
        <Logo />
        <SideNav onActiveTab={setActiveTab} activeTab={activeTab} />
      </div>

      {/* contents */}

      <div className="w-full h-full items-center flex flex-col gap-4">
        <div className="h-[60px] border-gray-300 border-b w-full px-8 mx-7 flex flex-row justify-between items-center">
          <input
            type="text"
            className="rounded-md w-[45%] border border-slate-400 h-fit bg-gray-200 py-1 px-3"
            placeholder="search"
          />
          <span className="flex bg-gray-200 px-4 py-1 rounded-lg flex-row gap-2 text-sm items-center">
            <img
              src={profileImg}
              alt=""
              className="w-[30px] shadow-lg h-[30px] rounded-full"
            />
            <p className="font-semibold capitalize">{profile.username}</p>
          </span>
        </div>

        <div className="h-[85%] flex flex-col gap-4 w-[90%]">
          {activeTab === "Profile" ? (
            <AccountUI
              profile={profile}
              onSubmit={onSubmit}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              profileImg={profileImg}
              setProfileImg={setProfileImg}
              onChangeProfileImg={handleChangeProfileImg}
            />
          ) : activeTab === "Notes" ? (
            <NotesUI />
          ) : activeTab === "overview" ? (
            <OverviewUI profile={profile} />
          ) : (
            activeTab === "Todos" && <Todos />
          )}
        </div>
      </div>
    </div>
  );
}
