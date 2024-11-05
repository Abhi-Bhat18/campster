import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import SidebarLink from "../sidebar/SidebarLink";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppSelector } from "@/lib/hook";
import { Building2, LogOut } from "lucide-react";
import { itim } from "@/utils/config";
import { sidebarDownNavigations, sidebarNavigations } from "@/utils/config";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/lib/features/auth/authApis";
import { toast } from "sonner";
const Header = () => {
  const project_name = useAppSelector(
    (state) => state.auth.defaultProject?.project_name
  );

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
    <header className="flex h-14 items-center gap-4 border-b-background bg-muted/40 px-4 lg:h-[60px] lg:px-6 sticky top-0 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <span className={`${itim.className} sr-only`}>Campster</span>
            </Link>
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
          <div className="mt-auto">
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
        </SheetContent>
      </Sheet>
      <div className="w-full flex justify-end items-center">
        <div className="flex space-x-2 items-center">
          <p>{project_name}</p>
          <Building2 className="h-5 w-5" />
        </div>
        {/* <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex space-x-2 cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-center">
                  <p>Abhishek Bhat</p>
                  <p className="text-xs">Owner</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/settings"}>Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logOut}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
