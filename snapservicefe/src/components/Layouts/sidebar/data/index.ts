import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        roles: ["admin", "supplier"],
        items: [
          { title: "eCommerce", url: "dashboard" },
        ],
      },

      {
        title: "Users",
        icon: Icons.User,
        roles: ["admin"],
        url: "users",
        items: [
          { title: "Customer", url: "customer" },
          { title: "Supplier", url: "supplier" },
        ],
      },

      {
        title: "Report",
        icon: Icons.PieChart,
        roles: ["admin"],
        url: "report",
        items: [],
      },

      {
        title: "Inventory",
        icon: Icons.BoxIcon, // ✅ Updated: more intuitive than Table
        roles: ["supplier"],
        url: "inventory",
        items: [],
      },

      {
        title: "Orders",
        icon: Icons.PackageIcon, // ✅ Updated: replaces 'Alphabet'
        roles: ["supplier"],
        url: "orders",
        items: [],
      },

      {
        title: "Report",
        icon: Icons.PieChart,
        roles: ["supplier"],
        url: "report",
        items: [],
      },

      {
        title: "Profile",
        icon: Icons.User,
        roles: ["admin", "supplier"],
        url: "profile",
        items: [],
      },
    ],
  },
];
