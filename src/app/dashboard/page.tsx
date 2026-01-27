"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  Download,
  Trash2,
  RefreshCw,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Wallet,
  Package,
  DollarSign,
  Home,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  apiClient,
  JobStatusResponse,
  WalletResponse,
  SubscriptionResponse,
} from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";

export default function DashboardPage() {
  const [jobs, setJobs] = useState<JobStatusResponse[]>([]);
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (isAuthenticated) {
      fetchJobs();
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchJobs = async () => {
    try {
      const [jobsData, walletData, subscriptionData] = await Promise.all([
        apiClient.getUserJobs(),
        apiClient.getWalletBalance(),
        apiClient.getCurrentSubscription().catch(() => null), // Handle no subscription case
      ]);
      setJobs(jobsData);
      setWallet(walletData);
      setSubscription(subscriptionData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to fetch data: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshJobs = async () => {
    setIsRefreshing(true);
    await fetchJobs();
    setIsRefreshing(false);
  };

  const cancelJob = async (jobId: string) => {
    try {
      await apiClient.cancelJob(jobId);
      toast.success("Job cancelled successfully");
      await fetchJobs();
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to cancel job: " + errorMessage);
    }
  };

  const downloadResult = async (jobId: string, filename?: string) => {
    try {
      const blob = await apiClient.downloadResult(jobId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to download: " + errorMessage);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your email validation jobs
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-border hover:bg-card"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
              <Button
                onClick={refreshJobs}
                disabled={isRefreshing}
                variant="outline"
                className="border-border hover:bg-card"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
              <Link href="/dashboard/upload">
                <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
                  <Plus className="w-4 h-4 mr-2" />
                  New Validation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Wallet and Subscription Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Wallet Balance */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-primary rounded-2xl">
                <Wallet className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Wallet Balance</h3>
                <p className="text-muted-foreground text-sm">Available funds</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-2">
              ${wallet?.balance_dollars.toFixed(2) || "0.00"}
            </div>
            <Link href="/wallet">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-border hover:bg-card"
              >
                Manage Wallet
              </Button>
            </Link>
          </Card>

          {/* Current Subscription */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Subscription</h3>
                <p className="text-muted-foreground text-sm">
                  {subscription ? "Active plan" : "No active plan"}
                </p>
              </div>
            </div>
            {subscription ? (
              <>
                <div className="text-lg font-semibold mb-1">
                  {subscription.package.name}
                </div>
                <div className="text-sm text-muted-foreground mb-4">
                  {subscription.days_remaining} days remaining
                </div>
                <Link href="/packages">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border hover:bg-card"
                  >
                    View Plans
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <div className="text-lg font-semibold mb-4 text-muted-foreground">
                  No active subscription
                </div>
                <Link href="/packages">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border hover:bg-card"
                  >
                    Browse Plans
                  </Button>
                </Link>
              </>
            )}
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-card border-border">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-muted-foreground text-sm">Get started</p>
              </div>
            </div>
            <div className="space-y-2">
              <Link href="/wallet">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-border hover:bg-card"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Add Funds
                </Button>
              </Link>
              <Link href="/packages">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-border hover:bg-card"
                >
                  <Package className="w-4 h-4 mr-2" />
                  Buy Package
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Jobs Section */}
        {jobs.length === 0 ? (
          <Card className="p-12 text-center bg-gradient-card border-border">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">
              No validation jobs yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Upload your first email list to get started with validation
            </p>
            <Link href="/dashboard/upload">
              <Button className="bg-gradient-primary hover:opacity-90 text-primary-foreground">
                <Upload className="w-4 h-4 mr-2" />
                Upload File
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6">
              {jobs.map((job) => (
                <Card
                  key={job.job_id}
                  className="p-6 bg-gradient-card border-border hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <h3 className="font-semibold">
                          Job {job.job_id.slice(0, 8)}...
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Created{" "}
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(job.status)}>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(job.status)}
                        {job.status}
                      </span>
                    </Badge>
                  </div>

                  {job.status === "processing" && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">
                          {job.progress_percentage}%
                        </span>
                      </div>
                      <Progress
                        value={job.progress_percentage}
                        className="h-2"
                      />
                    </div>
                  )}

                  {job.error_message && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-sm text-red-400">
                        {job.error_message}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {job.completed_at && (
                        <span>
                          Completed{" "}
                          {new Date(job.completed_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {job.status === "completed" && job.file_url && (
                        <Button
                          onClick={() => downloadResult(job.job_id)}
                          size="sm"
                          variant="outline"
                          className="border-border hover:bg-card"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}

                      {(job.status === "pending" ||
                        job.status === "processing") && (
                        <Button
                          onClick={() => cancelJob(job.job_id)}
                          size="sm"
                          variant="outline"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
