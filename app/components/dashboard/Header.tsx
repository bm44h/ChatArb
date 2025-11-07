// src/app/components/dashboard/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SignOutButton from "@/app/components/SignOutButton";
import { Skeleton } from "@/app/components/ui/skeleton";
import Image from "next/image";

interface User {
  id: string;
  email?: string;
  user_metadata?: {
    name?: string;
    full_name?: string;
  };
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [supabase]);

  // الحصول على اسم المستخدم من البيانات المختلفة
  const getUserName = () => {
    if (!user) return "مستخدم";

    return (
      user.user_metadata?.name ||
      user.user_metadata?.full_name ||
      user.email ||
      "مستخدم"
    );
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-[#FCFCFC] px-4">
      {/* Left side: يمكن أن يكون اسم البوت أو شعار */}
      <div>
        <Image
          src="/logod.png"
          alt="Logod"
          width={80}
          height={80}
          unoptimized
          quality={100}
          priority
        />
      </div>

      {/* Right side: معلومات المستخدم */}
      <div className="flex items-center gap-4">
        {isLoading ? (
          // عرض هيكل عظمي لكامل قسم المستخدم
          <>
            <Skeleton className="h-6 w-24 rounded-md" /> {/* لاسم المستخدم */}
          </>
        ) : (
          // عرض المحتوى الفعلي عند اكتمال التحميل
          <>
            <div className="text-right">
              <div className="font-semibold text-gray-800">{getUserName()}</div>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
