"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  Plus,
  CreditCard,
  History,
  DollarSign,
  RefreshCw,
  Home,
  Clock,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  apiClient,
  WalletResponse,
  TransactionResponse,
  RechargeRequest,
} from "@/lib/api";
import { toast } from "react-toastify";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRecharging, setIsRecharging] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [showRechargeForm, setShowRechargeForm] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{
    transaction_id: string;
    amount: number;
    payment_url: string;
  } | null>(null);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      window.location.href = "/auth/login";
      return;
    }

    if (isAuthenticated) {
      fetchWalletData();
    }
  }, [isAuthenticated, authLoading]);

  const fetchWalletData = async () => {
    try {
      const [walletData, transactionsData] = await Promise.all([
        apiClient.getWalletBalance(),
        apiClient.getWalletTransactions(),
      ]);
      setWallet(walletData);
      setTransactions(transactionsData);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to fetch wallet data: " + errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecharge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rechargeAmount || parseFloat(rechargeAmount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsRecharging(true);
    try {
      const rechargeRequest: RechargeRequest = {
        amount_dollars: parseFloat(rechargeAmount),
        payment_method: "nowpay",
      };

      const result = await apiClient.rechargeWallet(rechargeRequest);

      if (result.status === "pending" && result.payment_url) {
        // Store pending transaction info
        setPendingTransaction({
          transaction_id: result.transaction_id,
          amount: result.amount_dollars,
          payment_url: result.payment_url,
        });

        toast.success(`Payment invoice created! Please complete payment.`);
        setRechargeAmount("");
        setShowRechargeForm(false);

        // Start checking payment status
        checkPaymentStatus(result.transaction_id);
      } else {
        toast.success(`Successfully recharged $${rechargeAmount}`);
        setRechargeAmount("");
        setShowRechargeForm(false);
        await fetchWalletData();
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      toast.error("Recharge failed: " + errorMessage);
    } finally {
      setIsRecharging(false);
    }
  };

  const checkPaymentStatus = async (transactionId: string) => {
    setIsCheckingPayment(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001"}/wallet/payment-status/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.ok) {
        const status = await response.json();

        if (status.status === "completed") {
          toast.success(
            `Payment completed! Wallet credited with $${status.amount_dollars}`,
          );
          setPendingTransaction(null);
          await fetchWalletData();
        } else {
          // Still pending, check again in 5 seconds
          setTimeout(() => checkPaymentStatus(transactionId), 5000);
        }
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    } finally {
      setIsCheckingPayment(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "recharge":
        return <Plus className="w-4 h-4 text-green-400" />;
      case "purchase":
        return <CreditCard className="w-4 h-4 text-blue-400" />;
      case "deduction":
        return <DollarSign className="w-4 h-4 text-red-400" />;
      case "refund":
        return <RefreshCw className="w-4 h-4 text-yellow-400" />;
      default:
        return <DollarSign className="w-4 h-4 text-gray-400" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "recharge":
        return "text-green-400";
      case "purchase":
        return "text-blue-400";
      case "deduction":
        return "text-red-400";
      case "refund":
        return "text-yellow-400";
      default:
        return "text-gray-400";
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading wallet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Link href="/">
                <Button
                  variant="outline"
                  className="border-border hover:bg-card"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="gradient-text">Wallet</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage your account balance and view transaction history
            </p>
          </div>

          {/* Wallet Balance Card */}
          <Card className="p-8 mb-8 bg-gradient-card border-border">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-primary rounded-2xl">
                  <Wallet className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Account Balance</h2>
                  <p className="text-muted-foreground">
                    Current available balance
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowRechargeForm(!showRechargeForm)}
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Funds
              </Button>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">
                ${wallet?.balance_dollars.toFixed(2) || "0.00"}
              </div>
              <p className="text-muted-foreground">
                {wallet?.balance_cents || 0} cents
              </p>
            </div>

            {/* Recharge Form */}
            {showRechargeForm && (
              <div className="mt-8 p-6 bg-background/30 rounded-lg border border-border">
                <h3 className="text-lg font-semibold mb-4">
                  Add Funds to Wallet
                </h3>
                <form onSubmit={handleRecharge} className="space-y-4">
                  <div>
                    <Label htmlFor="amount" className="text-sm font-medium">
                      Amount (USD)
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="1"
                        max="1000"
                        placeholder="Enter amount"
                        value={rechargeAmount}
                        onChange={(e) => setRechargeAmount(e.target.value)}
                        className="pl-10 bg-background/50 border-input focus:border-primary"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Minimum: $1.00, Maximum: $1,000.00
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="submit"
                      disabled={isRecharging}
                      className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                    >
                      {isRecharging ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Add Funds
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowRechargeForm(false)}
                      className="border-border hover:bg-card"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Card>

          {/* Pending Payment */}
          {pendingTransaction && (
            <Card className="p-6 mb-8 bg-gradient-card border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Payment Pending</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete your payment to add funds to your wallet
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-background/30 rounded-lg">
                  <div>
                    <p className="font-medium">
                      Amount: ${pendingTransaction.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Transaction ID: {pendingTransaction.transaction_id}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {isCheckingPayment && (
                      <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                    )}
                    <span className="text-sm text-yellow-400">Pending</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() =>
                      (window.location.href = pendingTransaction.payment_url)
                    }
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground text-lg px-8 py-3"
                    size="lg"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Complete Payment - ${pendingTransaction.amount}
                  </Button>
                  <Button
                    onClick={() => setPendingTransaction(null)}
                    variant="outline"
                    className="border-border hover:bg-card"
                  >
                    Cancel
                  </Button>
                </div>

                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-sm text-blue-400">
                    💡 <strong>Tip:</strong> Click &quot;Complete Payment&quot;
                    to be redirected to NowPay where you can pay securely with
                    crypto or fiat.
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Transaction History */}
          <Card className="p-8 bg-gradient-card border-border">
            <div className="flex items-center gap-3 mb-6">
              <History className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Transaction History</h2>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <DollarSign className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">
                  No transactions yet
                </h3>
                <p className="text-muted-foreground">
                  Your transaction history will appear here once you start using
                  the service
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-background/20 rounded-lg border border-border/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-background/30 rounded-lg">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold capitalize">
                          {transaction.type.replace("_", " ")}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(
                            transaction.created_at,
                          ).toLocaleDateString()}{" "}
                          at{" "}
                          {new Date(
                            transaction.created_at,
                          ).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div
                        className={`font-semibold ${getTransactionColor(transaction.type)}`}
                      >
                        {transaction.amount_cents > 0 ? "+" : ""}$
                        {(transaction.amount_cents / 100).toFixed(2)}
                      </div>
                      <Badge
                        className={
                          transaction.status === "completed"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : transaction.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
