import { HomeIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Itim } from "next/font/google";

export const itim = Itim({ 
  weight : [ '400'],
  subsets : [ 'latin','latin-ext']
});

import {
  Home,
  Settings,
  Rocket,
  MonitorCog,
  LayoutList,
  NotepadTextDashed,
  ArrowLeftRight,
} from "lucide-react";

export const navigations = [
  {
    name: "Docs",
    link: "/docs",
    Icon: ReaderIcon,
  },
];

export const sidebarNavigations = [
  {
    name: "Home",
    link: "/",
    Icon: Home,
    feature: "analytics",
    requiredPermissions: ["manage", "read"],
  },
  {
    name: "Campaigns",
    link: "/campaigns",
    Icon: Rocket,
    feature: "campaigns",
    requiredPermissions: ["manage", "read"],
  },
  {
    name: "Contact-lists",
    link: "/contact-lists",
    Icon: LayoutList,
    feature: "contact-lists",
    requiredPermissions: ["manage", "read"],
  },
  {
    name: "Templates",
    link: "/templates",
    Icon: NotepadTextDashed,
    feature: "templates",
    requiredPermissions: ["manage", "read"],
  },
  {
    name: "Transactional",
    link: "/transactionals",
    Icon: ArrowLeftRight,
    feature: "transactionals",
    requiredPermissions: ["manage", "read"],
  },
  {
    name: "Project config",
    link: "/project/default",
    Icon: MonitorCog,
    feature: "project",
    requiredPermissions: ["manage", "read"],
  },
];

export const sidebarDownNavigations = [
  {
    name: "Settings",
    link: "/settings",
    Icon: Settings,
  },
];
