import Hero from '@/components/Hero';
import ListTopRateProperty from '@/components/List-TopRateProperty';
import MainLayout from './(main)/layout';

export default function Home() {
  return (
    <MainLayout>
      <main className="flex flex-col gap-10 pt-[78px] mb-10">
        <Hero />
        <ListTopRateProperty />
      </main>
    </MainLayout>
  );
}
