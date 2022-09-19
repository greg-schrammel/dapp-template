import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Home() {
  return (
    <div className="m-3 self-end">
      <ConnectButton chainStatus="none" />
    </div>
  )
}
