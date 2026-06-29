import Link from "next/link";

export type FooterSection = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const footerSections: FooterSection[] = [
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Get help with a safety issue", href: "#" },
      { label: "AirCover", href: "#" },
      { label: "Travel insurance", href: "#" },
      { label: "Anti-discrimination", href: "#" },
      { label: "Disability support", href: "#" },
      { label: "Cancellation options", href: "#" },
      { label: "Report neighborhood concern", href: "#" },
    ],
  },
  {
    title: "Hosting",
    links: [
      { label: "Airbnb your home", href: "#" },
      { label: "Airbnb your experience", href: "#" },
      { label: "Airbnb your service", href: "#" },
      { label: "AirCover for Hosts", href: "#" },
      { label: "Hosting resources", href: "#" },
      { label: "Community forum", href: "#" },
      { label: "Hosting responsibly", href: "#" },
      { label: "Airbnb-friendly apartments", href: "#" },
      { label: "Join a free hosting class", href: "#" },
      { label: "Find a co-host", href: "#" },
      { label: "Refer a host", href: "#" },
    ],
  },
  {
    title: "Airbnb",
    links: [
      { label: "2026 Summer Release", href: "#" },
      { label: "Newsroom", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Investors", href: "#" },
      { label: "Gift cards", href: "#" },
      { label: "Airbnb.org emergency stays", href: "#" },
    ],
  },
];
export default function FooterSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {footerSections.map((section) => (
        <div
          className="flex flex-col gap-4 border-b border-[#dddddd] py-8"
          key={section.title}
        >
          <span className="font-medium">{section.title}</span>
          {section.links.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
