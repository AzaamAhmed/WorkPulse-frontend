"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Home,
  People as Users,
  Assignment as ClipboardList,
  Announcement as Megaphone,
  TrackChanges as Target,
  BarChart as BarChart3,
  CalendarMonth as Calendar,
  Settings,
  Business as Building2,
  Summarize as Summary,
} from "@mui/icons-material";

const drawerWidth = 240;

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
}

export function Sidebar({ mobileOpen, onDrawerToggle }: SidebarProps) {
  const pathname = usePathname();
  // const theme = useTheme()
  // const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const navItems = [
    {
      title: "Dashboard",
      href: "/pages/dashboard",
      icon: <Home />,
    },
    {
      title: "Employees",
      href: "/pages/employee-management",
      icon: <Users />,
    },
    {
      title: "Projects",
      href: "/pages/project-management",
      icon: <ClipboardList />,
    },
    {
      title: "Daily Summary",
      href: "/pages/daily-summary",
      icon: <Summary />,
    },
    {
      title: "Focus Work",
      href: "/pages/focus-work",
      icon: <Target />,
    },
    {
      title: "Analytics",
      href: "/pages/analytics",
      icon: <BarChart3 />,
    },
    {
      title: "Announcements",
      href: "/pages/announcements",
      icon: <Megaphone />,
    },
    {
      title: "Calendar",
      href: "/pages/calendar",
      icon: <Calendar />,
    },
    {
      title: "Settings",
      href: "/pages/settings",
      icon: <Settings />,
    },
  ];

  const drawer = (
    <>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box
          component={Link}
          href="/dashboard"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Building2 />
          <Typography variant="subtitle1" fontWeight="medium">
            Work Pulse
          </Typography>
        </Box>
      </Toolbar>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.href} disablePadding>
            <ListItemButton
              component={Link}
              href={item.href}
              selected={pathname === item.href}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
