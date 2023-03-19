import Head from "next/head"

import { Layout } from "./layout"
import { buttonVariants } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function LayoutWithHeader() {
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
          <Input type="number" id="interest" placeholder="interest" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="years">Years</Label>
          <Input type="number" id="years" placeholder="Years" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="principal">Principal</Label>
          <Input type="number" id="principal" placeholder="Principal" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent onChange={(e) => console.log(e)}>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
        <p className="leading-7 [&:not(:first-child)]:mt-6">Result:</p>

        <div className="flex gap-4">
          <button className={buttonVariants({ size: "lg" })}>Save</button>
        </div>
      </section>
    </Layout>
  )
}
