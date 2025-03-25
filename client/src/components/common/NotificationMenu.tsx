"use client";

import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Divider,
  Avatar,
  Box,
  Button,
  ListItemIcon,
  Checkbox,
} from "@mui/material";
import { Notifications } from "@/app/data/Notification";

interface NotificationMenuProps {
  anchorEl: null | HTMLElement;
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationMenu({
  anchorEl,
  isOpen,
  onClose,
}: NotificationMenuProps) {
  const [notifications, setNotifications] = useState(
    Notifications.map((notification) => ({
      ...notification,
      read: false,
    }))
  );

  const [selectedNotifications, setSelectedNotifications] = useState<number[]>(
    []
  );

  const toggleMarkAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        selectedNotifications.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    );
    setSelectedNotifications([]);
  };

  const handleSelectNotification = (id: number) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        elevation: 3,
        sx: {
          overflow: "auto",
          maxHeight: 450,
          mt: 1.5,
          width: 400, // Adjusted width for better readability
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          Notifications
        </Typography>
        <Button
          onClick={toggleMarkAllAsRead}
          variant="text"
          sx={{
            fontSize: 14,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
          }}
        >
          Mark selected as read
        </Button>
      </Box>
      <Divider />
      {notifications.length === 0 ? (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            No new notifications
          </Typography>
        </Box>
      ) : (
        notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={() =>
              console.log(`Notification ${notification.id} clicked`)
            }
            sx={{
              bgcolor: notification.read ? "grey.100" : "white",
              "&:hover": {
                bgcolor: notification.read ? "grey.200" : "action.hover",
              },
              transition: "background-color 0.3s",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
              <Checkbox
                checked={selectedNotifications.includes(notification.id)}
                onChange={() => handleSelectNotification(notification.id)}
              />
              <Avatar sx={{ bgcolor: "primary.main", ml: 2 }}>
                {notification.firstName[0]}
                {notification.lastName[0]}
              </Avatar>
              <Box sx={{ flexGrow: 1, ml: 2 }}>
                <Typography variant="body1" fontWeight="bold" noWrap>
                  {notification.description}
                </Typography>
              </Box>
              {!notification.read && (
                <ListItemIcon sx={{ justifyContent: "flex-end" }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      bgcolor:
                        notification.type === "message"
                          ? "orange"
                          : notification.type === "info"
                          ? "blue"
                          : notification.type === "important"
                          ? "red"
                          : "primary.main",
                    }}
                  />
                </ListItemIcon>
              )}
            </Box>
          </MenuItem>
        ))
      )}
    </Menu>
  );
}
