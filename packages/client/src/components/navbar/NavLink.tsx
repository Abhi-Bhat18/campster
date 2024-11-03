import Link from "next/link";
import React from "react";

interface Props {
  Icon?: React.FC;
  name: string;
  link: string;
}

const NavLink: React.FC<Props> = ({ Icon, name, link }) => {
  return (
    <div className="mx-2 my-1">
      <Link href={link}>{name}</Link>
    </div>
  );
};

export default NavLink;
