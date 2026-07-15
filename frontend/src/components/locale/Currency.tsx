import { useCurrencies } from "@/features/localization/hooks/useCurrencies";

import { useLocale } from "@/features/localization/context/LocaleContext";
import CurrencySkeleton from "./CurrencySkeleton";

export default function Currency() {
  const { data, isLoading } = useCurrencies();
  const currenciesData = data?.data.currencies;
  const { selectedCurrency, setSelectedCurrency } = useLocale();
  if (isLoading) return <CurrencySkeleton />;
  return (
    <div className="grid grid-cols-2 gap-4 px-2 py-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {currenciesData?.map((el) => (
        <div
          key={el._id}
          onClick={() => setSelectedCurrency(el)}
          className={`flex cursor-pointer flex-col rounded-[8px] border px-3 py-2.5 ${
            selectedCurrency === el ? "border-[#222222]" : "border-transparent"
          }`}
        >
          <span className="text-[#222222]">{el.currency}</span>
          <span className="text-[#6a6a6a]">
            {el.code} - {el.symbol}
          </span>
        </div>
      ))}
    </div>
  );
}
