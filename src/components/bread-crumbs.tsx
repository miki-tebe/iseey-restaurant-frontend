"use client"

import { useRouter, usePathname } from "next/navigation"
import {ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BreadcrumbsProps {
  homeLabel?: string
  showBackButton?: boolean
}

export function Breadcrumbs({ showBackButton = true }: BreadcrumbsProps) {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === "/dashboard/index") {
    return null
  }

  return (
    <div className="flex items-center mb-4 text-sm px-7">
      {showBackButton && (
        <Button variant="ghost" size="sm" className="mr-2" onClick={() => router.back()}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
      )}
    </div>
  )
}

