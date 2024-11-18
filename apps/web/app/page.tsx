import WeatherFrom from '@/components/sections/weather/Form';

export default function Home() {
  return (
    <>
      <main className="min-h-full flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="w-full max-w-md">
          <WeatherFrom />
        </div>
      </main>

    </>
  )
}