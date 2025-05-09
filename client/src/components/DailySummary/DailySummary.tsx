"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField as Input,
  InputLabel as Label,
  Divider as Separator,
  Box,
  Container,
  Typography,
  Grid,
  Switch,
} from "@mui/material";
import { Clock, Mail, Send } from "lucide-react";
import type { TaskData } from "@/types/types";
import { formatDate } from "@/components/TaskManagement/lib/utils";

interface DailySummary {
  readonly tasks: TaskData[];
}

export default function DailySummary({ tasks }: DailySummary) {
  const [emailTime, setEmailTime] = useState("18:00");
  const [emailRecipients, setEmailRecipients] = useState("admin@example.com");
  const [includeCompleted, setIncludeCompleted] = useState(true);
  const [includePending, setIncludePending] = useState(true);
  const [includeInProgress, setIncludeInProgress] = useState(true);

  // Get today's date in ISO format (YYYY-MM-DD)
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks based on settings
  const filteredTasks = (tasks ?? []).filter((task) => {
    if (task.status === "Completed" && !includeCompleted) return false;
    if (task.status === "Pending" && !includePending) return false;
    if (task.status === "In Progress" && !includeInProgress) return false;
    return true;
  });

  // Group tasks by assignee
  const tasksByAssignee: Record<string, TaskData[]> = {};
  filteredTasks.forEach((task) => {
    if (!tasksByAssignee[task.assignedTo]) {
      tasksByAssignee[task.assignedTo] = [];
    }
    tasksByAssignee[task.assignedTo].push(task);
  });

  // Calculate statistics
  const completedCount = filteredTasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const pendingCount = filteredTasks.filter(
    (t) => t.status === "Pending"
  ).length;
  const inProgressCount = filteredTasks.filter(
    (t) => t.status === "In Progress"
  ).length;
  const totalCount = filteredTasks.length;

  // Calculate completion percentage
  const completionPercentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Daily Summary
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Email Settings
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Label htmlFor="email-time">Daily Summary Time</Label>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email-time"
                    type="time"
                    value={emailTime}
                    onChange={(e) => setEmailTime(e.target.value)}
                    style={{ marginLeft: "8px" }}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Label htmlFor="email-recipients">Recipients</Label>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email-recipients"
                    type="text"
                    placeholder="email@example.com, email2@example.com"
                    value={emailRecipients}
                    onChange={(e) => setEmailRecipients(e.target.value)}
                    style={{ marginLeft: "8px" }}
                  />
                </Box>
              </Box>

              <Box sx={{ mt: 2 }}>
                <Label>Include Task Status</Label>
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Switch
                      id="include-completed"
                      checked={includeCompleted}
                      onChange={(e) =>
                        setIncludeCompleted(
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      inputProps={{ "aria-label": "Include Completed Tasks" }}
                      style={{ border: "1px solid #ccc" }}
                    />
                    <Label
                      htmlFor="include-completed"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      Completed Tasks
                      <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#10b981", display: "inline-block", marginLeft: "8px" }}></span>
                    </Label>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Switch
                      id="include-in-progress"
                      checked={includeInProgress}
                      onChange={(e) =>
                        setIncludeInProgress(
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      inputProps={{ "aria-label": "Include In Progress Tasks" }}
                      style={{ border: "1px solid #ccc" }}
                    />
                    <Label
                      htmlFor="include-in-progress"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      In Progress Tasks
                      <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#f59e0b", display: "inline-block", marginLeft: "8px" }}></span>
                    </Label>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <Switch
                      id="include-pending"
                      checked={includePending}
                      onChange={(e) =>
                        setIncludePending(
                          (e.target as HTMLInputElement).checked
                        )
                      }
                      inputProps={{ "aria-label": "Include Pending Tasks" }}
                      style={{ border: "1px solid #ccc" }}
                    />
                    <Label
                      htmlFor="include-pending"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      Pending Tasks
                      <span style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: "#6b7280", display: "inline-block", marginLeft: "8px" }}></span>
                    </Label>
                  </Box>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                style={{
                  marginTop: "16px",
                  width: "100%",
                  backgroundColor: "black",
                  color: "white",
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Save Email Settings
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Email Preview
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  From: Task Management System
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  To: {emailRecipients}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Subject: Daily Task Summary - {formatDate(today)}
                </Typography>
              </Box>

              <Separator style={{ margin: "16px 0" }} />

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" component="h3" fontWeight="bold">
                  Daily Task Summary - {formatDate(today)}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {totalCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Total Tasks
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {completedCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Completed
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {inProgressCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      In Progress
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h4" component="div" fontWeight="bold">
                      {pendingCount}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Pending
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    Task Completion: {completionPercentage}%
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      backgroundColor: "#e0e0e0",
                      borderRadius: "4px",
                      mt: 1,
                    }}
                  >
                    <Box
                      sx={{
                        width: `${completionPercentage}%`,
                        backgroundColor:
                          completionPercentage === 100
                            ? "#10b981" // Green for 100% completion
                            : completionPercentage >= 50
                            ? "#f59e0b" // Amber for 50-99% completion
                            : "#ef4444", // Red for less than 50% completion
                        height: "8px",
                        borderRadius: "4px",
                      }}
                    ></Box>
                  </Box>
                </Box>

                <Separator style={{ margin: "16px 0" }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
