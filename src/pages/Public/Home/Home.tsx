import CommonWrapper from "@/common/CommonWrapper";
import WorkInProgress from "@/common/WorkInProgress";
const Home = () => {
  return (
    <CommonWrapper>
      <div className="h-[90vh] flex items-center justify-center">
        <WorkInProgress title="Welcome to React Typescript Starter Template" />
      </div>
    </CommonWrapper>
  );
};

export default Home;
