import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import GradeNavigation from "@/components/GradeNavigation";
import FeaturedGames from "@/components/FeaturedGames";
import GamesByGrade from "@/components/GamesByGrade";
import CallToAction from "@/components/CallToAction";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>EduFun Games - Educational Games for Kids PreK-6</title>
        <meta name="description" content="Educational games for PreK through 6th grade. Make learning fun with math, reading, science and more interactive games!" />
        <meta property="og:title" content="EduFun Games - Educational Games for Kids" />
        <meta property="og:description" content="Educational games for PreK through 6th grade. Make learning fun with math, reading, science and more!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://edufungames.com" />
      </Helmet>
      
      <GradeNavigation />
      <Hero />
      <FeaturedGames />
      <GamesByGrade gradeId={1} gradeSlug="prek" />
      <CallToAction />
    </>
  );
};

export default HomePage;
