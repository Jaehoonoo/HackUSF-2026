"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
  Button,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  TextField,
} from "@mui/material";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Load submitted users once on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/getUsers");
      const response = await res.json();

      if (response.success) {
        const submittedUsers = response.data.submittedUsers || [];
        setUsers(submittedUsers);
        setFilteredUsers(submittedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      alert("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  // 2. Filter users based on search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredUsers(users);
      return;
    }
    const q = searchQuery.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.firstName?.toLowerCase().includes(q) ||
          u.lastName?.toLowerCase().includes(q) ||
          u.email?.toLowerCase().includes(q) ||
          u.school?.toLowerCase().includes(q) ||
          u.otherSchool?.toLowerCase().includes(q),
      ),
    );
  }, [searchQuery, users]);

  // 3. Handle user selection (checkbox)
  const toggleUser = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  // 4. Handle select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(new Set(filteredUsers.slice(0, 300).map((u) => u.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  // 5. Handle bulk action (Accept/Reject/Waitlist)
  const handleBulkAction = async (status) => {
    if (selectedUsers.size === 0) {
      alert("Please select at least one user");
      return;
    }

    const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
    const confirmed = confirm(
      `Are you sure you want to ${status} ${selectedUsers.size} user(s)?\n\nThis will update their status and send them an email.`,
    );

    if (!confirmed) return;

    setActionLoading(true);
    try {
      const res = await fetch("/api/updateUserStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userIds: Array.from(selectedUsers),
          status,
        }),
      });
      const result = await res.json();

      if (result.success) {
        const { successful, failed, emailsFailed } = result.results;

        let message = `✅ Successfully updated ${successful} user(s)`;
        if (failed > 0) message += `\nFailed to update ${failed} user(s)`;
        if (emailsFailed > 0)
          message += `\n📧 Failed to send ${emailsFailed} email(s)`;

        alert(message);

        // Refresh table and clear selection
        await fetchUsers();
        setSelectedUsers(new Set());
      } else {
        alert(`Error: ${result.error || "Failed to update users"}`);
      }
    } catch (error) {
      console.error("Error updating users:", error);
      alert("An error occurred while updating users");
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "waitlisted":
        return "warning";
      default:
        return "default";
    }
  };

  // 7. Export all applied users to Google Sheets
  const handleExportToSheets = async () => {
    const confirmed = confirm(
      "This will export all applied users to Google Sheets. Continue?",
    );
    if (!confirmed) return;

    setExportLoading(true);
    try {
      const res = await fetch("/api/exportToSheets", { method: "POST" });
      const result = await res.json();

      if (res.ok) {
        alert(`✅ ${result.message}`);
      } else {
        alert(`❌ Export failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("An error occurred while exporting to Google Sheets");
    } finally {
      setExportLoading(false);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Admin Dashboard
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Submitted Users Panel */}
          <Paper sx={{ mb: 3 }}>
            <Box
              sx={{
                p: 3,
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Submitted
              </Typography>
              <Chip
                label={users.length}
                size="small"
                sx={{ height: 22, fontSize: "0.75rem" }}
              />
            </Box>

            <Box sx={{ p: 3 }}>
              <Box sx={{ display: "flex", gap: 2, mb: 2, flexWrap: "wrap" }}>
                {/* Search */}
                <TextField
                  label="Search"
                  placeholder="Name, email, or school..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  sx={{ minWidth: 300 }}
                  size="small"
                />
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleBulkAction("accepted")}
                  disabled={actionLoading || selectedUsers.size === 0}
                >
                  Accept Selected ({selectedUsers.size})
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleBulkAction("rejected")}
                  disabled={actionLoading || selectedUsers.size === 0}
                >
                  Reject Selected ({selectedUsers.size})
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => handleBulkAction("waitlisted")}
                  disabled={actionLoading || selectedUsers.size === 0}
                >
                  Waitlist Selected ({selectedUsers.size})
                </Button>

                {selectedUsers.size > 0 && (
                  <Button
                    variant="outlined"
                    onClick={() => setSelectedUsers(new Set())}
                    disabled={actionLoading}
                  >
                    Clear Selection
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="info"
                  onClick={handleExportToSheets}
                  disabled={exportLoading}
                  sx={{ ml: "auto" }}
                >
                  {exportLoading ? "Exporting..." : "Export to Google Sheets"}
                </Button>
              </Box>
            </Box>
          </Paper>

          {/* Users Table */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f5f5" }}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={
                        filteredUsers.length > 0 &&
                        selectedUsers.size ===
                          Math.min(filteredUsers.length, 300)
                      }
                      indeterminate={
                        selectedUsers.size > 0 &&
                        selectedUsers.size < Math.min(filteredUsers.length, 300)
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>School</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Level of Study</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                      <Typography color="text.secondary">
                        No users found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      hover
                      sx={{
                        "&:hover": { bgcolor: "#f9f9f9" },
                        cursor: "pointer",
                      }}
                      onClick={() => toggleUser(user.id)}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.has(user.id)}
                          onChange={() => toggleUser(user.id)}
                        />
                      </TableCell>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.status || "submitted"}
                          color={getStatusColor(user.status)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {user.school === "Other"
                          ? user.otherSchool || "Not specified"
                          : user.school || "Not specified"}
                      </TableCell>
                      <TableCell>
                        {user.levelOfStudy || "Not specified"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
            Showing {filteredUsers.length} of {users.length} submitted users
          </Typography>
        </>
      )}
    </Container>
  );
}
