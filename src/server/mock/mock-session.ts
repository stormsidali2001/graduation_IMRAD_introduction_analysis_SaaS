export const mockUserSession = {
  user: {
    id: "preview-user-id",
    name: "Demo User",
    email: "demo@preview.com",
    image: null,
    createdAt: new Date("2024-01-01"),
    customerId: "preview-customer-id",
    isBanned: false,
    role: "User" as const,
    plan: "premium" as const,
    emailVerified: new Date("2024-01-01"),
  },
  expires: "2099-12-31T23:59:59.999Z",
};

export const mockAdminSession = {
  user: {
    id: "preview-admin-id",
    name: "Admin",
    email: "admin@preview.com",
    image: null,
    createdAt: new Date("2024-01-01"),
    customerId: "preview-admin-customer-id",
    isBanned: false,
    role: "Admin" as const,
    plan: "premium" as const,
    emailVerified: new Date("2024-01-01"),
  },
  expires: "2099-12-31T23:59:59.999Z",
};

// Default session (backward-compat)
export const mockSession = mockUserSession;
