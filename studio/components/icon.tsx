import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Browsers,
  CalendarCheck,
  Check,
  CircleNotch,
  ClockCountdown,
  Copy,
  DeviceMobile,
  EnvelopeSimple,
  GlobeSimple,
  GooglePlayLogo,
  Handshake,
  LinkedinLogo,
  MapPin,
  Plus,
  UserFocus,
} from "@phosphor-icons/react/dist/ssr";
import type { IconName } from "@/studio/lib/site";

/** Les icônes du site : la même famille (Phosphor) que le portfolio. */
const icons = {
  arrow: ArrowRight,
  "arrow-out": ArrowUpRight,
  "arrow-down": ArrowDown,
  check: Check,
  copy: Copy,
  mail: EnvelopeSimple,
  plus: Plus,
  pin: MapPin,
  clock: ClockCountdown,
  calendar: CalendarCheck,
  browser: Browsers,
  phone: DeviceMobile,
  linkedin: LinkedinLogo,
  portfolio: GlobeSimple,
  "play-store": GooglePlayLogo,
  user: UserFocus,
  handshake: Handshake,
  spinner: CircleNotch,
} satisfies Record<IconName, unknown>;

type Props = {
  name: IconName;
  size?: number;
  weight?: "regular" | "bold" | "fill";
  className?: string;
};

export function Icon({ name, size = 16, weight = "regular", className }: Props) {
  const Glyph = icons[name];
  return <Glyph size={size} weight={weight} className={className} aria-hidden="true" />;
}
