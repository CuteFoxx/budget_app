import { cn } from "@/lib/utils"
import OverviewChart from "./OverviewChart"

interface OverviewChartWrapper extends React.HTMLAttributes<HTMLDivElement> {}

function OverviewChartWrapper({ ...props }) {
  const { className, ...rest } = { ...props }

  return (
    <div className={cn("", className)} {...rest}>
      <OverviewChart />
    </div>
  )
}

export default OverviewChartWrapper
