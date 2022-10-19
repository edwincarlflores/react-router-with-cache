import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
  title?: string;
}

const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <Link to="/">
          <h1 className="cursor-pointer text-5xl font-extrabold leading-normal text-gray-700 md:text-[5rem]">
            Ho<span className="text-purple-300">m</span>e
          </h1>
        </Link>
        {title && <p className="mb-6 text-3xl">{title}</p>}
        <div className="font-mono">{children}</div>
      </main>
    </>
  );
};

export default Layout;
