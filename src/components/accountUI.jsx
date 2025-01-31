import { IoCameraOutline } from "react-icons/io5";
import noProfile from "../assets/blank-profile-picture-973460_1280.png";

export function AccountUI({
  profile,
  onSubmit,
  register,
  handleSubmit,
  errors,
  profileImg,
  onChangeProfileImg,
}) {
  return (
    <div className="h-full flex flex-col gap-3 w-full ">
      <h1 className="font-bold ml-2">Your profile</h1>
      <div className=" justify-between flex flex-row w-full h-[90%] p-3">
        {/* account */}
        {!profile ? (
          <div className="h-full w-[40%] flex justify-center items-center">
            <p className="font-bold text-gray-500">No profile</p>
          </div>
        ) : (
          <div className="flex shadow-lg flex-col w-[40%] items-center bg-white p-7 rounded-lg">
            <div className="flex flex-col gap-10 items-center w-full">
              <div className="relative w-fit">
                <ProfileImg
                  onChangeProfileImg={onChangeProfileImg}
                  profileImg={profileImg || "https://via.placeholder.com/100"}
                />
              </div>
              <div className="flex flex-col gap-2 items-center  w-full">
                <h1 className="font-bold">
                  {profile.username ? profile.username : ""}
                </h1>

                <span className="text-xs flex flex-col gap-1 text-center w-[80%]">
                  <p className="font-semibold">{profile.profession}</p>
                  <p>{profile.bio}</p>
                  <p className="text-gray-400">{profile.email}</p>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* account setting */}
        {!profile && (
          <AccountForm
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onSubmit={onSubmit}
          />
        )}
      </div>
    </div>
  );
}

function ProfileImg({ profileImg, onChangeProfileImg }) {
  return (
    <div className="flex flex-col gap-2 mt-3 text-xs relative">
      <label
        htmlFor="photo"
        className="bg-black absolute right-0 bottom-0 cursor-pointer rounded-md text-white shadow-lg py-2 px-3 w-fit"
      >
        <IoCameraOutline />
      </label>

      <input
        onChange={onChangeProfileImg}
        type="file"
        accept="Image/*"
        name=""
        id="photo"
        hidden
        className="border outline-none px-4 bg-gray-700 text-wrap py-4 text-xs rounded-md"
      />
      <img
        src={!profileImg ? noProfile : profileImg}
        alt="profile image"
        className="w-[120px] h-[120px] rounded-full object-cover"
      />
    </div>
  );
}

function AccountForm({ register, errors, handleSubmit, onSubmit }) {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex gap-5 flex-col w-[55%] shadow-lg bg-white p-7 rounded-lg"
    >
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className="text-sm font-semibold">
            Username:
          </label>
          <input
            {...register("username", { required: true })}
            id="username"
            name="username"
            type="text"
            placeholder="username"
            className="border outline-none border-gray-400 w-[220px] rounded text-xs py-3 px-3"
          />
          {errors.username && (
            <p className="text-xs text-red-500">username is required</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="profession" className="text-sm font-semibold">
            Profession:
          </label>
          <input
            {...register("profession", { required: true })}
            id="profession"
            name="profession"
            type="text"
            placeholder="profession"
            className="border outline-none border-gray-400 w-[220px] rounded text-xs py-3 px-3"
          />
          {errors.profession && (
            <p className="text-xs text-red-500">profession is required</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-semibold">
          Email:
        </label>
        <input
          {...register("email", { required: true })}
          id="email"
          name="email"
          type="email"
          placeholder="email"
          className="border border-gray-400 w-full rounded text-xs py-3 px-3"
        />
        {errors.email && (
          <p className="text-xs text-red-500">email is required</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="bio" className="text-sm font-semibold">
          Bio:
        </label>
        <input
          {...register("bio", { required: true })}
          id="bio"
          name="bio"
          type="bio"
          placeholder="bio"
          className="border border-gray-400 w-full rounded text-xs py-3 px-3"
        />
        {errors.bio && <p className="text-xs text-red-500">bio is required</p>}
      </div>
      <button className=" w-fit bg-amber-300 rounded text-xs py-3 px-6 shadow-lg mt-3 cursor-pointer hover:scale-95 transition-all duration-200">
        save changes
      </button>
    </form>
  );
}
