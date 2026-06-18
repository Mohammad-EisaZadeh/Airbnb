import DesktopHeader from "@/_components/layout/DesktopHeader";
import MobileHeader from "@/_components/layout/MobileHeader";

export default function Header() {
  return (
    <>
      <div className="md:hidden">
        <MobileHeader />
      </div>
      <div className="sticky top-0 z-50 hidden md:block">
        <DesktopHeader />
      </div>
    </>
  );
}
