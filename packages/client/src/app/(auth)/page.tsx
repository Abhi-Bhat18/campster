"use client";
import { useAppSelector } from "@/lib/hook";
import DataCard from "../../components/home/DataCard";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import {
  LucideProps,
  Rocket,
  PackageCheck,
  MailOpen,
  SquareMousePointer,
} from "lucide-react";
import { useGetDashboardCountsQuery } from "@/lib/features/dashboard/dashboardApis";
import { ViewsLineChart } from "@/components/Dashboard/ViewsLineChart";
import { DataCardSkeleton } from "@/components/home/DataCardSkeleton";

interface IData {
  cardName: string;
  data: number;
  cardContent: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

const Dashboard = () => {
  const first_name = useAppSelector((state) => state.auth.user?.first_name);
  const last_name = useAppSelector((state) => state.auth.user?.last_name);
  const { data, isLoading, isError } = useGetDashboardCountsQuery(undefined);

  let formattedData: IData[];
  formattedData = [
    {
      cardName: "Campaigns",
      data: data ? data[0].total_campaigns : 0,
      cardContent: "Up by 55 %",
      Icon: Rocket,
    },
    {
      cardName: "Delivered",
      data: data ? data[0].totalDelivered : 0,
      cardContent: "Down by 1%",
      Icon: PackageCheck,
    },
    {
      cardName: "Viewed",
      data: data ? data[0].totalOpens : 0,
      cardContent: "Down by 10%",
      Icon: MailOpen,
    },
    {
      cardName: "Clicked",
      data: data ? data[0].totalClicks : 0,
      cardContent: "Up by 20%",
      Icon: SquareMousePointer,
    },
  ];

  return (
    <div className="space-y-5">
      <p className="text-2xl"> Hello {first_name + " " + last_name}</p>
      <div className="flex space-x-5 w-full justify-between">
        {isLoading &&
          Array.from({ length: 4 }, (_, i) => <DataCardSkeleton key={i} />)}
        {!isLoading &&
          !isError &&
          formattedData.map((data, index) => (
            <DataCard key={index} {...data} />
          ))}
      </div>
      <div className="">
        <ViewsLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
