import Hero from '@/components/Hero';
import ListTopRateProperty from '@/components/List-TopRateProperty';

export default function Home() {
  return (
    <main className="flex flex-col gap-10 pt-[78px]">
      <Hero />
      <ListTopRateProperty />
    </main>
  );
}
