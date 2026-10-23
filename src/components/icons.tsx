import {
  Building2, Folder, User, FileText, CreditCard, Landmark, Briefcase, Wallet, ShieldCheck, Users, Home, Car, ClipboardList,
  type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  building: Building2,
  folder: Folder,
  user: User,
  users: Users,
  file: FileText,
  card: CreditCard,
  bank: Landmark,
  briefcase: Briefcase,
  wallet: Wallet,
  shield: ShieldCheck,
  home: Home,
  car: Car,
  list: ClipboardList,
};

export function CategoryIcon({ name, className }: { name: string; className?: string }) {
  const I = ICONS[name] ?? Folder;
  return <I className={className} aria-hidden />;
}
