import Hero from '@/components/Hero';
import ListTopRateProperty from '@/components/List-TopRateProperty';
import MainLayout from './(main)/layout';

const Home = () => {
  return (
    <MainLayout>
      <main className="flex flex-col gap-10 pt-[78px] mb-10 relative">
        <Hero />
        <ListTopRateProperty />
      </main>
    </MainLayout>
  );
}

export default Home;
