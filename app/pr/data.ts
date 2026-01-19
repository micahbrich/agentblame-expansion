// PR mock data with realistic TypeScript code lines and AI attribution

export type LineType = "context" | "addition" | "deletion";

export interface DiffLine {
  old?: number;
  new?: number;
  content: string;
  type: LineType;
  ai?: boolean;
  provider?: string;
  model?: string;
}

export interface FileData {
  path: string;
  lines: DiffLine[];
}

export const pr = {
  number: 47,
  title: "feat: Add AI-powered code review suggestions",
  author: "alice",
  branch: "feat/ai-review-suggestions",
  baseBranch: "main",
};

export const files: FileData[] = [
  {
    path: "src/api/users.ts",
    lines: [
      { old: 36, new: 36, content: "import { db } from '../db';", type: "context" },
      { old: 37, new: 37, content: "import { validateUser } from '../utils/validation';", type: "context" },
      { old: 38, new: 38, content: "", type: "context" },
      { old: 39, content: "export async function getUser(id: string) {", type: "deletion" },
      { old: 40, content: "  const user = await db.users.findOne({ id });", type: "deletion" },
      { old: 41, content: "  return user;", type: "deletion" },
      { new: 39, content: "export async function getUser(id: string): Promise<User | null> {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 40, content: "  const validation = validateUser({ id });", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 41, content: "  if (!validation.success) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 42, content: "    throw new ValidationError(validation.errors);", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 43, content: "  }", type: "addition" },
      { new: 44, content: "", type: "addition" },
      { new: 45, content: "  const user = await db.users.findOne({ id });", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 46, content: "  if (!user) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 47, content: "    return null;", type: "addition" },
      { new: 48, content: "  }", type: "addition" },
      { new: 49, content: "", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 50, content: "  return sanitizeUser(user);", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { old: 42, new: 51, content: "}", type: "context" },
      { old: 43, new: 52, content: "", type: "context" },
      { old: 44, new: 53, content: "export async function updateUser(id: string, data: Partial<User>) {", type: "context" },
    ],
  },
  {
    path: "src/api/orders.ts",
    lines: [
      { old: 22, new: 22, content: "import { Order, OrderStatus } from '../types';", type: "context" },
      { old: 23, new: 23, content: "", type: "context" },
      { old: 24, content: "export async function createOrder(userId: string, items: CartItem[]) {", type: "deletion" },
      { old: 25, content: "  const order = await db.orders.create({ userId, items });", type: "deletion" },
      { new: 24, content: "export async function createOrder(", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 25, content: "  userId: string,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 26, content: "  items: CartItem[]", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 27, content: "): Promise<Order> {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 28, content: "  if (!items.length) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 29, content: "    throw new ValidationError('Order must have at least one item');", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 30, content: "  }", type: "addition" },
      { new: 31, content: "", type: "addition" },
      { new: 32, content: "  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 33, content: "  const order = await db.orders.create({", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 34, content: "    userId,", type: "addition" },
      { new: 35, content: "    items,", type: "addition" },
      { new: 36, content: "    total,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 37, content: "    status: OrderStatus.PENDING,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 38, content: "    createdAt: new Date(),", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 39, content: "  });", type: "addition" },
      { old: 26, new: 40, content: "  return order;", type: "context" },
      { old: 27, new: 41, content: "}", type: "context" },
    ],
  },
  {
    path: "src/auth/oauth.ts",
    lines: [
      { old: 15, new: 15, content: "import { OAuthProvider, TokenSet } from './types';", type: "context" },
      { old: 16, new: 16, content: "", type: "context" },
      { old: 17, content: "export async function handleOAuthCallback(code: string) {", type: "deletion" },
      { old: 18, content: "  const tokens = await exchangeCode(code);", type: "deletion" },
      { old: 19, content: "  return tokens;", type: "deletion" },
      { new: 17, content: "export async function handleOAuthCallback(", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 18, content: "  code: string,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 19, content: "  provider: OAuthProvider", type: "addition" },
      { new: 20, content: "): Promise<TokenSet> {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 21, content: "  // Validate code format to prevent injection", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 22, content: "  if (!isValidOAuthCode(code)) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 23, content: "    throw new SecurityError('Invalid OAuth code format');", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 24, content: "  }", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 25, content: "", type: "addition" },
      { new: 26, content: "  const tokens = await exchangeCode(code, provider);", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 27, content: "  ", type: "addition" },
      { new: 28, content: "  // Verify token signature", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 29, content: "  if (!verifyTokenSignature(tokens.accessToken)) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 30, content: "    throw new SecurityError('Invalid token signature');", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 31, content: "  }", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 32, content: "", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 33, content: "  return tokens;", type: "addition" },
      { old: 20, new: 34, content: "}", type: "context" },
    ],
  },
  {
    path: "src/payments/stripe.ts",
    lines: [
      { old: 8, new: 8, content: "import Stripe from 'stripe';", type: "context" },
      { old: 9, new: 9, content: "", type: "context" },
      { old: 10, content: "export async function createPaymentIntent(amount: number) {", type: "deletion" },
      { new: 10, content: "export async function createPaymentIntent(", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 11, content: "  amount: number,", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 12, content: "  currency: string = 'usd'", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 13, content: "): Promise<Stripe.PaymentIntent> {", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 14, content: "  // Validate amount is positive integer (cents)", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 15, content: "  if (!Number.isInteger(amount) || amount <= 0) {", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 16, content: "    throw new Error('Amount must be a positive integer');", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 17, content: "  }", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 18, content: "", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { old: 11, new: 19, content: "  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);", type: "context" },
      { old: 12, content: "  return stripe.paymentIntents.create({ amount, currency: 'usd' });", type: "deletion" },
      { new: 20, content: "  return stripe.paymentIntents.create({", type: "addition" },
      { new: 21, content: "    amount,", type: "addition" },
      { new: 22, content: "    currency,", type: "addition" },
      { new: 23, content: "    automatic_payment_methods: { enabled: true },", type: "addition" },
      { new: 24, content: "  });", type: "addition" },
      { old: 13, new: 25, content: "}", type: "context" },
    ],
  },
  {
    path: "src/utils/validation.ts",
    lines: [
      { old: 1, new: 1, content: "import { z } from 'zod';", type: "context" },
      { old: 2, new: 2, content: "", type: "context" },
      { new: 3, content: "export const userIdSchema = z.string().uuid();", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 4, content: "", type: "addition" },
      { new: 5, content: "export function validateUser(data: { id: string }) {", type: "addition" },
      { new: 6, content: "  const result = userIdSchema.safeParse(data.id);", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 7, content: "  return {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 8, content: "    success: result.success,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 9, content: "    errors: result.success ? [] : result.error.errors,", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 10, content: "  };", type: "addition" },
      { new: 11, content: "}", type: "addition" },
      { new: 12, content: "", type: "addition" },
      { old: 3, new: 13, content: "export const emailSchema = z.string().email();", type: "context" },
    ],
  },
  {
    path: "src/components/ReviewPanel.tsx",
    lines: [
      { old: 1, new: 1, content: "import { useState } from 'react';", type: "context" },
      { old: 2, new: 2, content: "import { Review } from '../types';", type: "context" },
      { old: 3, new: 3, content: "", type: "context" },
      { old: 4, content: "export function ReviewPanel({ reviews }: { reviews: Review[] }) {", type: "deletion" },
      { new: 4, content: "interface ReviewPanelProps {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 5, content: "  reviews: Review[];", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 6, content: "  onApprove?: (id: string) => void;", type: "addition" },
      { new: 7, content: "  onReject?: (id: string) => void;", type: "addition" },
      { new: 8, content: "}", type: "addition" },
      { new: 9, content: "", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { new: 10, content: "export function ReviewPanel({ reviews, onApprove, onReject }: ReviewPanelProps) {", type: "addition", ai: true, provider: "Cursor", model: "claude-4-opus" },
      { old: 5, new: 11, content: "  const [expanded, setExpanded] = useState<string | null>(null);", type: "context" },
    ],
  },
  {
    path: "src/hooks/useReviewSuggestions.ts",
    lines: [
      { old: 1, new: 1, content: "import { useState, useEffect } from 'react';", type: "context" },
      { old: 2, new: 2, content: "", type: "context" },
      { old: 3, content: "export function useReviewSuggestions(prId: string) {", type: "deletion" },
      { new: 3, content: "export function useReviewSuggestions(prId: string | null) {", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { old: 4, new: 4, content: "  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);", type: "context" },
      { old: 5, new: 5, content: "  const [loading, setLoading] = useState(true);", type: "context" },
      { new: 6, content: "  const [error, setError] = useState<Error | null>(null);", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { old: 6, new: 7, content: "", type: "context" },
      { old: 7, new: 8, content: "  useEffect(() => {", type: "context" },
      { new: 9, content: "    if (!prId) {", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 10, content: "      setSuggestions([]);", type: "addition" },
      { new: 11, content: "      setLoading(false);", type: "addition" },
      { new: 12, content: "      return;", type: "addition", ai: true, provider: "Claude Code", model: "claude-3.5-sonnet" },
      { new: 13, content: "    }", type: "addition" },
      { new: 14, content: "", type: "addition" },
      { old: 8, new: 15, content: "    fetchSuggestions(prId).then(setSuggestions).finally(() => setLoading(false));", type: "context" },
    ],
  },
  {
    path: "README.md",
    lines: [
      { old: 1, new: 1, content: "# Agentblame", type: "context" },
      { old: 2, new: 2, content: "", type: "context" },
      { old: 3, content: "A tool for tracking AI contributions in code.", type: "deletion" },
      { new: 3, content: "A powerful tool for tracking and analyzing AI contributions in your codebase.", type: "addition" },
      { new: 4, content: "", type: "addition" },
      { new: 5, content: "## Features", type: "addition" },
      { new: 6, content: "", type: "addition" },
      { new: 7, content: "- AI-powered code review suggestions", type: "addition" },
      { new: 8, content: "- Contribution attribution tracking", type: "addition" },
      { new: 9, content: "- Security analysis for AI-generated code", type: "addition" },
      { old: 4, new: 10, content: "", type: "context" },
      { old: 5, new: 11, content: "## Installation", type: "context" },
    ],
  },
];

// Computed stats from real data
function computeStats() {
  const allLines = files.flatMap((f) => f.lines);
  const additions = allLines.filter((l) => l.type === "addition");
  const deletions = allLines.filter((l) => l.type === "deletion");
  const aiLines = additions.filter((l) => l.ai);
  const humanLines = additions.filter((l) => !l.ai);

  // Provider breakdown
  const providerMap = new Map<string, { model: string; lines: number }>();
  for (const line of aiLines) {
    if (line.provider && line.model) {
      const key = line.provider;
      const existing = providerMap.get(key);
      if (existing) {
        existing.lines++;
      } else {
        providerMap.set(key, { model: line.model, lines: 1 });
      }
    }
  }

  const providers = Array.from(providerMap.entries())
    .map(([name, data]) => ({
      name,
      model: data.model,
      lines: data.lines,
      percent: Math.round((data.lines / aiLines.length) * 100),
    }))
    .sort((a, b) => b.lines - a.lines);

  const aiCount = aiLines.length;
  const humanCount = humanLines.length;
  const total = aiCount + humanCount;

  return {
    ai: aiCount,
    human: humanCount,
    percent: total > 0 ? Math.round((aiCount / total) * 100) : 0,
    additions: additions.length,
    deletions: deletions.length,
    providers,
  };
}

export const stats = computeStats();

// Security-sensitive files (files in auth/ or payments/)
export const securityFiles = files
  .filter((f) => f.path.includes("/auth/") || f.path.includes("/payments/"))
  .map((f) => {
    const additions = f.lines.filter((l) => l.type === "addition");
    const aiAdditions = additions.filter((l) => l.ai);
    return {
      path: f.path,
      aiPercent:
        additions.length > 0
          ? Math.round((aiAdditions.length / additions.length) * 100)
          : 0,
    };
  });

// Duplicate detection (simulated)
export const duplicates = [
  {
    hash: "725288e4",
    locations: [
      "src/api/users.ts:42-47",
      "src/api/orders.ts:38-43",
    ],
  },
];

// File stats for the sidebar
export function getFileStats(file: FileData) {
  const additions = file.lines.filter((l) => l.type === "addition").length;
  const deletions = file.lines.filter((l) => l.type === "deletion").length;
  const aiLines = file.lines.filter(
    (l) => l.type === "addition" && l.ai
  ).length;
  const aiPercent = additions > 0 ? Math.round((aiLines / additions) * 100) : 0;
  return { additions, deletions, aiPercent };
}

// Group files by directory
export function getFileTree() {
  const tree: Record<string, FileData[]> = {};
  for (const file of files) {
    const parts = file.path.split("/");
    const dir = parts.length > 1 ? parts.slice(0, -1).join("/") : "";
    if (!tree[dir]) tree[dir] = [];
    tree[dir].push(file);
  }
  return tree;
}
