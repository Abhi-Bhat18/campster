"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Package2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

import { sidebarDownNavigations, sidebarNavigations } from "@/utils/config";
import SidebarLink from "./SidebarLink";

import { useLogoutMutation } from "@/lib/features/auth/authApis";
import { toast } from "sonner";
import { itim } from "@/utils/config";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/hook";

const Sidebar = () => {
  const [logout, { isError, isLoading }] = useLogoutMutation();
  const router = useRouter();

  const { permissions } = useAppSelector((state) => state.auth);

  const filteredSidebarNavs = sidebarNavigations.filter((nav) => {
    return nav.feature in permissions;
  });

  const handleLogout = async () => {
    try {
      const result = await logout(undefined).unwrap();
      if (result) {
        toast.success("Logged out successfully");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="hidden max-h-screen sticky top-0 left-0 border-r-background bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b-background px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className={`${itim.className} text-3xl`}>Campster</span>
          </Link>
          {/* <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button> */}
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2">
            {filteredSidebarNavs.map((item, index) => {
              return (
                <SidebarLink
                  name={item.name}
                  link={item.link}
                  Icon={item.Icon}
                  key={index}
                />
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          {/* <Card x-chunk="dashboard-02-chunk-0" className="shadow-md border-none shadow-secondary">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card> */}
          {sidebarDownNavigations.map((item, index) => {
            return (
              <SidebarLink
                link={item.link}
                Icon={item.Icon}
                name={item.name}
                key={index}
              />
            );
          })}

          <Dialog>
            <DialogTrigger>
              <div className="w-full flex justify-start space-x-2 text-muted-foreground hover:text-primary px-3 py-2 items-center">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </div>
            </DialogTrigger>
            <DialogContent className="border-secondary">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription className="flex justify-end">
                  <Button onClick={handleLogout}>Logout</Button>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
