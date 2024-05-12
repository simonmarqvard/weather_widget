import { Oval } from "react-loader-spinner";

export default function Skeleton() {
  return (
    <div>
      <div className="h-6 my-5"></div>
      <div className="h-6 my-5"></div>
      <div className="flex justify-center vertical-center">
        <Oval
          visible={true}
          height="72"
          width="72"
          secondaryColor="#000000"
          color="#ffffff"
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
      <div className="h-6 my-5"></div>
      <div className="h-6 my-5"></div>
    </div>
  );
}
