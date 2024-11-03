import NavLink from "./NavLink";
import { navigations } from "@/utils/config";
import { Github } from "lucide-react";
import { IconBrandDiscord } from "@tabler/icons-react";
import Link from "next/link";

const DeskNav = () => {
  return (
    <nav className="lg:flex sticky items-center flex top-0 w-full mx-auto py-4 px-8 justify-center rounded-xl bg-black">
      <div className="flex justify-between items-center w-full max-w-[1400px]">
        <div className="flex space-x-20 items-center">
          <p className="font-bold">Mailman</p>
        </div>
        <div className="space-x-5 flex items-center">
          <ul className="flex items-center">
            {navigations.map((nav) => (
              <NavLink
                name={nav.name}
                link={nav.link}
                Icon={nav.Icon}
                key={nav.link}
              />
            ))}
          </ul>
          <Link href={"https://github.com/Abhi-Bhat18/mail-man"}>
            <IconBrandDiscord />
          </Link>
          <Link href={"https://github.com/Abhi-Bhat18/mail-man"}>
            <Github />
          </Link>
        </div>
      </div>
    </nav>
  );
};
const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 px-5 pt-5 bg-background shadow-lg">
      <DeskNav />
    </div>
  );
};

export default Navbar;
