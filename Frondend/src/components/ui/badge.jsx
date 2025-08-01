// src/components/ui/badge.jsx
import React from "react"
import classNames from "classnames"

export function Badge({ children, className = "", color = "default" }) {
  const base =
    "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-muted text-muted-foreground ring-1 ring-inset ring-border"

  const colorVariants = {
    default: "bg-gray-100 text-gray-800 ring-gray-300",
    blue: "bg-blue-100 text-blue-800 ring-blue-300",
    green: "bg-green-100 text-green-800 ring-green-300",
    red: "bg-red-100 text-red-800 ring-red-300",
    yellow: "bg-yellow-100 text-yellow-800 ring-yellow-300",
    purple: "bg-purple-100 text-purple-800 ring-purple-300",
  }

  return (
    <span className={classNames(base, colorVariants[color], className)}>
      {children}
    </span>
  )
}
