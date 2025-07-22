import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,
        url: "dashboard",
        roles: ["admin", "supplier"],
        items: [],
      },

      {
        title: "Users",
        icon: Icons.User,
        roles: ["admin"],
        url: "users",
        items: [
          { title: "Customer", url: "customer" },
          { title: "Supplier", url: "supplier" },
          { title: "Shipper", url: "shipper" },
        ],
      },
      {
        title: "Moderate Suppliers",
        icon: Icons.User,
        roles: ["admin"],
        url: "moderate-suppliers",
        items: [],
      },

      {
        title: "Report",
        icon: Icons.PieChart,
        roles: ["admin", "supplier", "shipper"],
        url: "report",
        items: [],
      },

      {
        title: "Inventory",
        icon: Icons.BoxIcon,
        roles: ["supplier"],
        url: "inventory",
        items: [],
      },

      {
        title: "Orders",
        icon: Icons.PackageIcon,
        roles: ["supplier", "shipper"],
        url: "orders",
        items: [],
      },

      {
        title: "Profile",
        icon: Icons.User,
        roles: ["admin", "supplier", "shipper"],
        url: "profile",
        items: [],
      },
    ],
  },
];
