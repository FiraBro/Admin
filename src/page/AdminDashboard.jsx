// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/card";
import { Button } from "@/components/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Input } from "@/components/input";
import { adminService } from "@/services/adminService";

export default function AdminDashboard() {
  const [tab, setTab] = useState("plans");
  const [stats, setStats] = useState({
    users: 0,
    policies: 0,
    claims: 0,
    revenue: 0,
  });
  const [plans, setPlans] = useState([]);
  const [applications, setApplications] = useState([]);
  const [claims, setClaims] = useState([]);
  const [users, setUsers] = useState([]);
  const [newPlan, setNewPlan] = useState({ name: "", price: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsData, plansData, applicationsData, claimsData, usersData] =
        await Promise.all([
          adminService.getStats(),
          adminService.getPlans(),
          adminService.getApplications(),
          adminService.getClaims(),
          adminService.getUsers(),
        ]);
      setStats(statsData);
      setPlans(plansData);
      setApplications(applicationsData);
      setClaims(claimsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
    }
  };

  const handlePlanUpdate = async (id, updated) => {
    try {
      await adminService.updatePlan(id, updated);
      fetchData();
    } catch (error) {
      console.error("Failed to update plan:", error.message);
    }
  };

  const handleAddPlan = async () => {
    if (!newPlan.name || !newPlan.price) return;
    try {
      await adminService.addPlan(newPlan);
      setNewPlan({ name: "", price: "" });
      fetchData();
    } catch (error) {
      console.error("Failed to add plan:", error.message);
    }
  };

  const handleUserAction = async (id, action) => {
    try {
      await adminService.updateUser(id, action);
      fetchData();
    } catch (error) {
      console.error("Failed to update user:", error.message);
    }
  };

  const handleClaimAction = async (id, action) => {
    try {
      await adminService.updateClaimStatus(id, action);
      fetchData();
    } catch (error) {
      console.error("Failed to update claim status:", error.message);
    }
  };

  const handleApplicationAction = async (id, status) => {
    try {
      await adminService.updateApplicationStatus(id, status);
      fetchData();
    } catch (error) {
      console.error("Failed to update application status:", error.message);
    }
  };

  return (
    <div className="p-6">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {Object.entries(stats).map(([key, value]) => (
          <Card key={key} className="text-center p-4 shadow-lg">
            <h2 className="text-xl font-bold capitalize">
              {key.replace(/_/g, " ")}
            </h2>
            <p className="text-2xl mt-2">{value}</p>
          </Card>
        ))}
      </motion.div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="plans">
          <div className="space-y-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add New Plan</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Plan</DialogTitle>
                </DialogHeader>
                <Input
                  placeholder="Plan Name"
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  className="mb-2"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newPlan.price}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, price: e.target.value })
                  }
                  className="mb-4"
                />
                <Button onClick={handleAddPlan}>Save</Button>
              </DialogContent>
            </Dialog>

            {plans.map((plan) => (
              <Card key={plan._id} className="p-4">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p>Price: ${plan.price}</p>
                <Button
                  onClick={() =>
                    handlePlanUpdate(plan._id, { price: plan.price + 10 })
                  }
                >
                  Increase Price
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="applications">
          <div className="grid gap-4">
            {applications.map((app) => (
              <Card key={app._id} className="p-4">
                <p>User: {app.user.name}</p>
                <p>Status: {app.status}</p>
                <div className="space-x-2 mt-2">
                  <Button onClick={() => handleApplicationAction(app._id, "approved")}>
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleApplicationAction(app._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="claims">
          <div className="grid gap-4">
            {claims.map((claim) => (
              <Card key={claim._id} className="p-4">
                <p>User: {claim.user.name}</p>
                <p>Amount: ${claim.amount}</p>
                <p>Status: {claim.status}</p>
                <div className="space-x-2 mt-2">
                  <Button onClick={() => handleClaimAction(claim._id, "approved")}>
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleClaimAction(claim._id, "rejected")}
                  >
                    Reject
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-4">
            {users.map((user) => (
              <Card key={user._id} className="p-4">
                <p>
                  {user.name} - {user.email}
                </p>
                <div className="space-x-2 mt-2">
                  <Button onClick={() => handleUserAction(user._id, "block")}>
                    Block
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleUserAction(user._id, "delete")}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Users", value: stats.users },
              { name: "Policies", value: stats.policies },
              { name: "Claims", value: stats.claims },
              { name: "Revenue", value: stats.revenue },
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
