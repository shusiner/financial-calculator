import { useEffect, useState } from "react"
import Head from "next/head"
import useHasMounted from "@/hooks/useHasMount"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { pmt } from "financial"

import useStore from "@/lib/useStore"
import { Icons } from "@/components/icons"
import { Layout } from "@/components/layout"
import { LayoutWithHeader } from "@/components/layout-header"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function IndexPage() {
  // const t1 = useStore.persist.hasHydrated()
  const [interest, updateInterest] = useStore((state) => [
    state.interest,
    state.updateInterest,
  ])
  const [period, updatePeriod] = useStore((state) => [
    state.period,
    state.updatePeriod,
  ])
  const [principal, updatePrincipal] = useStore((state) => [
    state.principal,
    state.updatePrincipal,
  ])
  const [isMonth, updateIsMonth] = useStore((state) => [
    state.isMonth,
    state.updateIsMonth,
  ])
  const [loans, addLoan, removeLoan] = useStore((state) => [
    state.loans,
    state.addLoan,
    state.removeLoan,
  ])
  const periodNum = isMonth ? 12 : 1
  const calculated = -pmt(
    interest / 100 / periodNum,
    period * periodNum,
    principal
  )
  const loan = { interest, period, principal, isMonth, amount: calculated }
  const hasMounted = useHasMounted()
  if (!hasMounted) {
    return <LayoutWithHeader />
  }

  return (
    <Layout>
      <Head>
        <title>Financial Calculator</title>
        <meta name="description" content="Financial Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="interest">Interest</Label>
          <Input
            type="number"
            id="interest"
            placeholder="interest"
            value={interest === 0 ? "" : interest}
            step="0.1"
            onChange={(e) => {
              updateInterest(Number(e.target.value))
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="years">Years</Label>
          <Input
            type="number"
            id="years"
            placeholder="Years"
            value={period === 0 ? "" : period}
            onChange={(e) => {
              updatePeriod(Number(e.target.value))
            }}
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="principal">Principal</Label>
          <Input
            type="number"
            id="principal"
            placeholder="Principal"
            value={principal === 0 ? "" : principal}
            onChange={(e) => {
              updatePrincipal(Number(e.target.value))
            }}
          />
        </div>
        <Select
          value={isMonth ? "month" : "year"}
          onValueChange={(e) => {
            updateIsMonth(e === "month")
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent onChange={(e) => console.log(e)}>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Result: {Math.round(calculated * 100) / 100}
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => addLoan(loan)}
            className={buttonVariants({ size: "lg" })}
          >
            Save
          </button>
        </div>
        {loans.map((loan, idx) => (
          <div key={idx} className="flex gap-4">
            <span>{idx}</span>
            <span>{loan.interest}%</span>
            <span>{loan.period}</span>
            <span>{loan.principal}</span>
            <span>{loan.isMonth ? "Month" : "Year"}</span>
            <span>{Math.round(loan.amount * 100) / 100}</span>
            <Icons.delete
              className="cursor-pointer"
              onClick={() => removeLoan(idx)}
            />
          </div>
        ))}
      </section>
    </Layout>
  )
}
