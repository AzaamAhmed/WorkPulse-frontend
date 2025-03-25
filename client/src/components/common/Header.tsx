"use client";

import { AppBar, Toolbar, Box, IconButton, Avatar, Badge } from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";
import { ProfileMenu } from "@/components/common/ProfileMenu";
import { NotificationMenu } from "@/components/common/NotificationMenu";
import { Employee } from "@/types/Employee";

interface HeaderProps {
  onSidebarToggle: () => void;
}

const employee: Employee = {
  id: 1,
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  role: "Admin",
};

export function Header({ onSidebarToggle }: HeaderProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={1}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "grey.800",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onSidebarToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
              <Image src="/images/logo.png" alt="Logo" width={70} height={70} />
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              size="large"
              aria-label="show notifications"
              color="inherit"
              onClick={handleNotificationMenuOpen}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton size="large" aria-label="help" color="inherit">
              <HelpIcon />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              <IconButton onClick={handleMenuOpen}>
                <Avatar>
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </Avatar>
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <ProfileMenu
        anchorEl={anchorEl}
        isOpen={Boolean(anchorEl)}
        onClose={handleMenuClose}
        employee={employee}
      />

      <NotificationMenu
        anchorEl={notificationAnchorEl}
        isOpen={Boolean(notificationAnchorEl)}
        onClose={handleNotificationMenuClose}
      />
    </>
  );
}
