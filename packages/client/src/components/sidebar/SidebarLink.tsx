"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideProps } from "lucide-react";

interface SidebarLinkProps {
  name: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  link: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ name, link, Icon }) => {
  const pathname = usePathname();
  const paths = pathname.split("/");

  const isCurrentPath = (): boolean => {
    if (name == "Home" && paths[1] == "") {
      return true;
    } else if (link != "/" && pathname.includes(link)) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <Link
      href={link}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted ${isCurrentPath() ? "bg-muted text-primary" : ""}`}
    >
      <Icon className="h-4 w-4" />
      {name}
    </Link>
  );
};

export default SidebarLink;
