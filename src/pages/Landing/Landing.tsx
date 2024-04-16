import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import Modules from "../../components/Modules/Modules";
import { useAuth } from "../../hooks/use-auth";
import { useGetLessonsQuery } from "../../store/lessonsApi";

const Landing = () => {
  const { isAuth } = useAuth();
  const { data, isFetching } = useGetLessonsQuery({});
  console.log(data);

  return (
    <>
      <Hero />
      {isAuth && <Modules rowData={isFetching ? [] : data} />}
      <About />
    </>
  );
};

export default Landing;
