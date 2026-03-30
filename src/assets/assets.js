import backgroundimage from "./backgroungimage.jpg";
import logo from "./logo.svg";
import { 
  LayoutDashboard, 
  List, 
  Wallet, 
  Coins, 
  Filter
} from 'lucide-react';


const assets=
{
    backgroundimage,
    logo
}
export const SIDE_BAR_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Category",
    icon: List,
    path: "/category",
  },
  {
    id: "03",
    label: "Income",
    icon: Wallet,
    path: "/income",
  },
  {
    id: "04",
    label: "Expense",
    icon: Coins,
    path: "/expense",
  },
  {
    id: "05",
    label: "Filters",
    icon: Filter,
    path: "/filter",
  },

];

export default assets
