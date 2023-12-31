'use client'

import { useState } from 'react'

import { motion } from 'framer-motion'
import Image from 'next/image'
import CopyToClipboard from 'react-copy-to-clipboard'
import { FaCheck, FaCopy, FaDiscord, FaGithub } from 'react-icons/fa'
import Balancer from 'react-wrap-balancer'

import { WalletAddress } from '@/components/blockchain/wallet-address'
import { WalletConnect } from '@/components/blockchain/wallet-connect'
import Card from '@/components/shared/card'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { LinkComponent } from '@/components/shared/link-component'
import { FADE_DOWN_ANIMATION_VARIANTS } from '@/config/design'
import { DEPLOY_URL, siteConfig } from '@/config/site'
import { turboIntegrations } from '@/data/turbo-integrations'
import { ButtonSIWELogin } from '@/integrations/siwe/components/button-siwe-login'
import { ButtonSIWELogout } from '@/integrations/siwe/components/button-siwe-logout'
import { IsSignedIn } from '@/integrations/siwe/components/is-signed-in'
import { IsSignedOut } from '@/integrations/siwe/components/is-signed-out'

export default function Home() {
  const [copied, setCopied] = useState(false)

  return (
    <>
      <div className="relative flex flex-1">
        <div className="flex-center flex h-full flex-1 flex-col items-center justify-center text-center">
          <motion.div
            animate="show"
            className="max-w-3xl px-5 xl:px-0"
            initial="hidden"
            viewport={{ once: true }}
            whileInView="show"
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}>
            <img alt="Turbo ETH" className="mx-auto mb-10 h-20 w-20" src="/logo-fill.png" />
            <motion.h1
              className="bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm dark:from-stone-100 dark:to-yellow-200 md:text-8xl md:leading-[6rem]"
              variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer>Build Web3 in Turbo Mode</Balancer>
            </motion.h1>
            <motion.p className="mt-6 text-center text-gray-500 dark:text-gray-200 md:text-xl" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <Balancer className="text-xl font-semibold">{siteConfig.description}</Balancer>
            </motion.p>
            <motion.div className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-y-3 space-x-4" variants={FADE_DOWN_ANIMATION_VARIANTS}>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
                href={siteConfig.links.github}>
                <FaGithub />
                <p>Star on GitHub</p>
              </LinkComponent>
              <LinkComponent
                className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-indigo-400 bg-indigo-500 px-5 py-2 text-sm text-white shadow-md transition-colors hover:border-indigo-600"
                href={siteConfig.links.discord}>
                <FaDiscord />
                <p>Join us on Discord</p>
              </LinkComponent>
            </motion.div>
            <CopyToClipboard text="pnpm create turbo-eth@latest" onCopy={() => setCopied(true)}>
              <motion.div
                className="group mx-auto mt-8 flex max-w-fit cursor-pointer items-center justify-between gap-x-2 rounded-xl border border-gray-200 bg-white px-3 py-4 text-sm font-medium shadow-md transition-colors dark:border-gray-800 dark:bg-neutral-800 dark:text-white hover:dark:border-gray-600/70 hover:dark:bg-neutral-700/70 md:px-6 md:text-lg"
                variants={FADE_DOWN_ANIMATION_VARIANTS}>
                <pre>pnpm create turbo-eth@latest</pre>
                <span className="flex-center flex h-4 w-4 cursor-pointer rounded-md text-neutral-600 dark:text-neutral-100 md:h-7 md:w-7">
                  {copied ? <FaCheck /> : <FaCopy />}
                </span>
              </motion.div>
            </CopyToClipboard>
          </motion.div>
          <div className="mt-10">
            <motion.div
              animate="show"
              className="my-10 grid w-full max-w-screen-2xl grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0"
              initial="hidden"
              viewport={{ once: true }}
              whileInView="show"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    delayChildren: 0.5,
                    staggerChildren: 0.15,
                  },
                },
              }}>
              {features.map(({ ...props }) => (
                <Card key={props.title} {...props} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

const features = [
  {
    title: 'Web3 Components for the power developer',
    description: 'Pre-built Web3 components, powered by WAGMI',
    large: true,
    demo: (
      <div className="mx-auto  justify-between">
        <IsWalletConnected>
          <div className="flex flex-col gap-5 lg:flex-row lg:gap-5 lg:pt-10">
            <div className=" block text-center">
              <WalletAddress isLink truncate />
              <span className="mt-4 block font-mono text-xs font-semibold">&lt;WalletAddress isLink truncate /&gt;</span>
            </div>
          </div>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect className="mx-auto inline-block" />
        </IsWalletDisconnected>
      </div>
    ),
  },
  {
    title: 'One-click Deploy',
    description: 'Start your next Web3 project in ⚡ Turbo Mode with a deploy to [Vercel](https://vercel.com/) in one click.',
    demo: (
      <a href={DEPLOY_URL} rel="noreferrer" target={'_blank'}>
        <img alt="Deploy with Vercel" src="https://vercel.com/button" width={120} />
      </a>
    ),
  },
  {
    title: 'Sign-In With Ethereum',
    description: turboIntegrations.siwe.description,
    href: turboIntegrations.siwe.href,
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Prisma logo" height={80} src="/integrations/siwe.svg" width={80} />
      </div>
    ),
  },
  {
    title: 'Rainbowkit',
    description: 'The best way to connect a wallet. Designed for everyone. Built for developers.',
    demo: (
      <div className="flex items-center justify-center space-x-20">
        <Image alt="Rainbow logo" height={100} src="/integrations/rainbowkit.svg" width={100} />
      </div>
    ),
  },
  {
    title: 'Web3 Login',
    description: 'Authenticate using an Ethereum Account',
    demo: (
      <div className="text-center text-gray-800">
        <IsWalletConnected>
          <IsSignedIn>
            <ButtonSIWELogout className="btn btn-blue btn-lg " />
          </IsSignedIn>
          <IsSignedOut>
            <ButtonSIWELogin className="btn btn-emerald" label="Sign-In With Ethereum" />
          </IsSignedOut>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
      </div>
    ),
  },
]
