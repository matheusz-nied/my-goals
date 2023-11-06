"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"


export default function TaskPage() {
  const { status } = useSession()

  if (status === "unauthenticated") {
    redirect('/api/auth/signin')
  }
  return (
    <>
      <div className="">
      <h1 className="my-4 text-center text-4xl font-semibold		">
        Suas <span className="text-primary">MiniTasks</span>
      </h1>{" "}
      </div>
    </>
  )
}
