import { ConnectKitButton } from 'connectkit'
import makeBlockie from 'ethereum-blockies-base64'
import { truncateAddress } from 'lib/truncateAddress'
import Image from 'next/image'
import { Button } from 'ui'
import { useNetwork } from 'wagmi'

const ConnectedButton = ({
  ensName,
  address,
  onClick,
}: {
  ensName?: string
  address: Address
  onClick: VoidFunction
}) => {
  const { chain } = useNetwork()
  return (
    <Button variant="secondary" onClick={onClick} bleed>
      <div className="flex flex-col justify-end gap-[2px]">
        <span className="text-sm font-semibold">{ensName ?? truncateAddress(address)}</span>
        <span className="text-low text-right text-xs">{chain?.name}</span>
      </div>
      <Image
        width="32px"
        height="32px"
        className="rounded-sm"
        alt="address blockie"
        src={makeBlockie(address)}
      />
    </Button>
  )
}

export const ConnectButton = () => {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address, ensName }) => {
        if (!isConnected) return <Button onClick={() => show?.()}>Connect Wallet</Button>
        return (
          <ConnectedButton
            address={address as Address}
            ensName={ensName}
            onClick={() => show?.()}
          />
        )
      }}
    </ConnectKitButton.Custom>
  )
}
