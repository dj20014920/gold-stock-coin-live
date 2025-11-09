import { Coins } from "lucide-react";
import { WidgetCard } from "./WidgetCard";

export const GoldWidget = () => {
  return (
    <WidgetCard title="금 시세" icon={<Coins className="h-5 w-5" />} accentColor="gold">
      <iframe
        src="https://www.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=TVC%3AGOLD&interval=D&hidesidetoolbar=0&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Asia%2FSeoul&withdateranges=1&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=kr&utm_source=&utm_medium=widget&utm_campaign=chart&utm_term=TVC%3AGOLD"
        className="h-full w-full border-0"
        title="금 시세 차트"
      />
    </WidgetCard>
  );
};
