import { Button, Container } from "@chakra-ui/react"
import Head from "next/head"


export default function Kitchen() {
  return (
    <>
      <Head>
        <title>eCommerce Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <Container>
        <Button>Button</Button>
      </Container>
    </>
  )
}