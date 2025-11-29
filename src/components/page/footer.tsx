import { Link } from "react-router";

import Logo from "@/assets/images/logo-icon.svg?react";

export function Footer({
  items
}: {
  items: {
    title: string;
    items: {
      text: string;
      path: string;
    }[];
  }[];
}) {
  return (
    <footer className="relative max-w-full border-t">
      <div className="max-w-5xl mx-auto py-14 grid place-items-start gap-8 grid-cols-3 md:grid-cols-6">
        <Link to="/" className="ml-6 col-span-full md:w-full md:col-auto">
          <Logo className="w-5 h-5" />
        </Link>
        {items.map((item, i) => (
          <div key={i} className="ps-6 w-full text-sm">
            <h3 className="mb-6">{item.title}</h3>
            <ul className="list-none m-0 p-0 flex flex-col gap-2 tracking-light">
              {item.items.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-muted-foreground w-full min-h-6">{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}   
      </div>
    </footer>
  );
}
