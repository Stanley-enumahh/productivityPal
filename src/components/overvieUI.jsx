export function OverviewUI({ profile }) {
  return (
    <div className="flex flex-col w-full h-full gap-3">
      {" "}
      <h1 className="font-bold">Overview</h1>
      <div>
        <div className="flex flex-col gap-2 w-[55%] justify-center px-7 h-[150px] rounded-md bg-gradient-to-tr from-amber-300 to-blue-700">
          <span className="flex flex-col gap-0 leading-0.5">
            <p className=" text-sm capitalize">
              Hi,
              {profile.username
                ? profile.username
                : "click here to set up ypur account"}
            </p>
            <h1 className="text-2xl font-bold">Welcome back</h1>
          </span>
          <p className="text-xs">
            productivity is achieved by right time management, say no
            procastination
          </p>
        </div>
      </div>
    </div>
  );
}
