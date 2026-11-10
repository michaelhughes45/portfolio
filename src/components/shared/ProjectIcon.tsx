import {
  Bell,
  Calendar,
  ChartLine,
  Heart,
  House,
  Layers,
  Move,
  Repeat,
  Search,
  Shield,
  Swords,
  Upload,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

const PROJECT_ICONS = {
  home: House,
  calendar: Calendar,
  repeat: Repeat,
  chart: ChartLine,
  bell: Bell,
  shield: Shield,
  layers: Layers,
  swords: Swords,
  zap: Zap,
  move: Move,
  search: Search,
  users: Users,
  upload: Upload,
  heart: Heart,
} as const satisfies Record<string, LucideIcon>;

export type ProjectIconName = keyof typeof PROJECT_ICONS;

export const PROJECT_ICON_NAMES = Object.keys(PROJECT_ICONS) as [ProjectIconName, ...ProjectIconName[]];

interface ProjectIconProps {
  name: ProjectIconName;
  className?: string;
}

export function ProjectIcon({ name, className }: ProjectIconProps) {
  const Icon = PROJECT_ICONS[name];
  return <Icon aria-hidden="true" className={className} />;
}
