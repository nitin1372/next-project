import {
  FaBullhorn,
  FaFacebookF,
  FaGift,
  FaInstagram,
  FaPhoneAlt,
  FaQuestionCircle,
  FaStore,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const footerSections = [
  {
    title: "ABOUT",
    links: [
      "Contact Us",
      "About Us",
      "Careers",
      "MobileStore Stories",
      "Press",
      "Corporate Information",
    ],
  },
  {
    title: "HELP",
    links: ["Payments", "Shipping", "Cancellation & Returns", "FAQ"],
  },
  {
    title: "CONSUMER POLICY",
    links: [
      "Cancellation & Returns",
      "Terms Of Use",
      "Security",
      "Privacy",
      "Sitemap",
      "Grievance Redressal",
      "EPR Compliance",
      "FSSAI Food Safety Connect App",
    ],
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com", icon: FaFacebookF },
  { label: "Twitter", href: "https://x.com", icon: FaTwitter },
  { label: "YouTube", href: "https://www.youtube.com", icon: FaYoutube },
  { label: "Instagram", href: "https://www.instagram.com", icon: FaInstagram },
];

const utilityLinks = [
  { label: "Become a Seller", icon: FaStore },
  { label: "Advertise", icon: FaBullhorn },
  { label: "Gift Cards", icon: FaGift },
  { label: "Help Center", icon: FaQuestionCircle },
];

const mailAddress = [
  "Mobile Store Internet Private Limited,",
  "Building Alyssa, Begonia and Clove Embassy Tech Village,",
  "Outer Ring Road, Devarabeesanahalli Village,",
  "Bengaluru, 560103, Karnataka, India",
];

const registeredAddress = [
  "Mobile Store Internet Private Limited,",
  "Vaishnavi Summit, Ground Floor, 7th Main, 80 Feet Road,",
  "3rd Block, Koramangala Industrial Layout,",
  "Bengaluru, 560034, Karnataka, India",
  "CIN : U51109KA2012PTC066107",
];

const paymentMethods = ["Visa", "Mastercard", "RuPay", "UPI", "NetBanking"];

export default function Footer() {
  return (
    <footer className="mt-12 bg-[#172337] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1.6fr)]">
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  {section.title}
                </h2>

                <ul className="space-y-2.5 text-[13px] font-medium text-white">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="transition-colors hover:text-white/80 hover:underline"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:border-l lg:border-white/10 lg:pl-8">
            <div>
              <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Mail Us:
              </h2>

              <div className="space-y-1 text-[13px] leading-6 text-slate-300">
                {mailAddress.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <div className="mt-5">
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  Social
                </p>

                <div className="flex flex-wrap items-center gap-3 text-base text-white">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 transition hover:border-primary hover:text-primary"
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Registered Office Address:
              </h2>

              <div className="space-y-1 text-[13px] leading-6 text-slate-300">
                {registeredAddress.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>

              <a
                href="tel:+919876543210"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#f5c518] transition hover:text-[#ffd84d]"
              >
                <FaPhoneAlt className="text-xs" />
                <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white">
            {utilityLinks.map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                className="inline-flex items-center gap-2 transition hover:text-[#f5c518]"
              >
                <Icon className="text-xs text-[#f5c518]" />
                <span>{label}</span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-slate-200"
              >
                {method}
              </span>
            ))}
          </div>

          <div className="text-sm text-slate-300 xl:text-right">
            Copyright 2007-{new Date().getFullYear()} MobileStore.com
          </div>
        </div>
      </div>
    </footer>
  );
}
