import { DollarSign } from "lucide-react";

export function Header() {
  return (
    <header className="  text-center text-white bg-gradient-to-r from-indigo-600 to-purple-600 py-12 mb-10 ">
      <div className="container mx-auto">
        <div className="flex item-center justify-center">
          <DollarSign size={40} />
          <h1 className="text-4xl font-bold">Exchango</h1>
        </div>

        <p className="max-w-2xl mx-auto mt-4">
          Your trusted companion for real-time currency conversion. Whether
          you're planning international travel, managing business transactions,
          or just curious about exchange rates, Exhango provides accurate and
          up-to-date currency conversions at your fingertips.
        </p>
      </div>
    </header>
  );
}
