"use client";
import { useCheckLoginQuery } from "@/lib/features/auth/authApis";
import { ReactNode } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/lib/hook";
import HeaderV2 from "@/components/header/Header";

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
  const { isLoggedIn, permissions } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const pathName = usePathname();

  const { error, isLoading } = useCheckLoginQuery(undefined, {
    // This conditionally disables the query based on the login state
    skip: isLoggedIn,
  });

  const allowedFeatures = ["settings", ...Object.keys(permissions)];

  const paths = pathName.split("/");

  let feature = paths[1];
  if(feature == '') feature = 'analytics'

  let isUserAuthorized = false;

  if (feature in permissions || allowedFeatures.includes(feature)) {
    isUserAuthorized = true;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (error) {
    router.push("/sign-in");
    return null;
  }

  if (
    (isLoggedIn && isUserAuthorized) ||
    (isLoggedIn && !isUserAuthorized && pathName == "/unauthorized")
  ) {
    return (
      <main>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          <Sidebar />
          <div className="flex flex-col">
            <HeaderV2 />
            <div className="p-5">{children}</div>
          </div>
        </div>
      </main>
    );
  }

  if (isLoggedIn && !isUserAuthorized) {
    router.push("/unauthorized");
    return null;
  }
};

export default AuthenticatedLayout;
