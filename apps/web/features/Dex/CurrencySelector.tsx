import { useQuery } from '@tanstack/react-query'
import { useVirtualizer } from '@tanstack/react-virtual'
import Image from 'next/future/image'
import { ReactNode, useRef } from 'react'
import { Button, cx, Dialog, DialogContent, DialogTrigger, Input } from 'ui'

type Token = {
  chainId: number
  address: Address
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type TokenList = {
  name: string
  timestamp: string
  version: {
    major: number
    minor: number
    patch: number
  }
  tags: Object
  logoURI: string
  keywords: string[]
  tokens: Token[]
}

const useTokenList = (tokenListUrl: string) =>
  useQuery<TokenList>([tokenListUrl], () => fetch(tokenListUrl).then((d) => d.json()), {
    staleTime: Infinity,
    cacheTime: Infinity,
  })

const UniswapDefaultTokenList = 'https://gateway.ipfs.io/ipns/tokens.uniswap.org'

const CurrencySelectorItem = ({
  name,
  symbol,
  logoURI,
}: Pick<Token, 'name' | 'symbol' | 'logoURI'>) => (
  <Button variant="secondary" size="sm" fullWidth key="symbol">
    <div className="flex w-full items-center justify-start gap-2">
      <Image
        unoptimized
        src={logoURI}
        alt=""
        width={24}
        height={24}
        className="bg-primary rounded-full border"
      />
      <div className="text-start flex flex-col">
        <span className="text-sm font-bold uppercase">{symbol}</span>
        <span className="text-xs font-medium">{name}</span>
      </div>
    </div>
  </Button>
)

const VirtualList = <ListItemData extends Object>({
  data,
  itemHeight,
  renderItem,
  className,
}: {
  data: ListItemData[]
  itemHeight: number
  renderItem: (item: ListItemData) => ReactNode
  className: string
}) => {
  const listRef = useRef<HTMLDivElement>(null)
  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => itemHeight,
  })

  return (
    <div ref={listRef} className={cx('overflow-auto', className)}>
      <div className="relative w-full" style={{ height: `${virtualizer.getTotalSize()}px` }}>
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.index}
            className="absolute top-0 left-0 w-full"
            style={{
              height: `${virtualItem.size}px`,
              transform: `translateY(${virtualItem.start}px)`,
            }}
          >
            {renderItem(data[virtualItem.index])}
          </div>
        ))}
      </div>
    </div>
  )
}

export const CurrencySelector = ({ tokenList = UniswapDefaultTokenList }) => {
  const { data, isSuccess } = useTokenList(tokenList)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" fullWidth>
          <Image
            src="/tokens/dai.png"
            alt="dai logo"
            width={24}
            height={24}
            className="bg-primary rounded-full border"
          />
          <span className="text-sm font-extrabold">DAI</span>
        </Button>
      </DialogTrigger>
      <DialogContent asChild>
        <div className="bg-secondary flex max-h-[500px] w-[400px] flex-col gap-3 rounded border p-4 shadow">
          <h3 className="text-low text-sm font-semibold">Select a token</h3>
          <Input fullWidth size="md" placeholder="Search name or address" />
          {isSuccess ? (
            <VirtualList
              data={data.tokens}
              renderItem={(token) => <CurrencySelectorItem {...token} />}
              itemHeight={48}
              className="-mx-1 border-t px-1 pt-2"
            />
          ) : (
            <div>loading</div>
          )}
          <Button size="sm" variant="secondary">
            <span className="text-xs">Import token list</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
