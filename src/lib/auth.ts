import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || "dev-secret-key-32-chars-long-minimum-ksdigital"
);

const COOKIE_NAME = "ks_admin_session";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "EDITOR" | "SALES";
  exp?: number;
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET);
}

export async function verifySession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function loginUser(email: string, password: string) {
  // Normalize
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // 1. Try finding in database
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (user) {
      const isValid = await bcrypt.compare(password, user.passwordHash);
      if (isValid) {
        const token = await createSessionToken({
          userId: user.id,
          email: user.email,
          name: user.name,
          role: user.role as SessionPayload["role"],
        });
        await setSessionCookie(token);
        return { success: true, user: { name: user.name, role: user.role } };
      }
    }
  } catch (error) {
    console.error("Database auth lookup failed, checking fallback credentials:", error);
  }

  // 2. Fallback check for initial admin credentials before database seed
  const defaultAdminEmail = (process.env.ADMIN_EMAIL || "sawantketan87@gmail.com").toLowerCase();
  const defaultAdminPass = process.env.ADMIN_PASSWORD || "AdminKS2026!Secure";

  if (normalizedEmail === defaultAdminEmail && password === defaultAdminPass) {
    const token = await createSessionToken({
      userId: "admin-root",
      email: defaultAdminEmail,
      name: process.env.ADMIN_NAME || "Ketan Sawant",
      role: "SUPER_ADMIN",
    });
    await setSessionCookie(token);
    return { success: true, user: { name: process.env.ADMIN_NAME || "Ketan Sawant", role: "SUPER_ADMIN" } };
  }

  return { success: false, error: "Invalid email or password." };
}
