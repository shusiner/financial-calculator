import Head from "next/head"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Layout } from "@/components/layout"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function IndexPage() {
  return (
    <Layout>
      <Head>
        <title>Financial Calculator</title>
        <meta name="description" content="Financial Calculator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
        <Input />
        <div className="flex gap-4">
          <button className={buttonVariants({ size: "lg" })}>Calculate</button>
        </div>
      </section>
    </Layout>
  )
}
