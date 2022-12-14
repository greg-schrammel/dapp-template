import { motion } from 'framer-motion'
import { MagicWandIcon, SearchIcon } from 'icons'
import Image from 'next/image'
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  Input,
  TokenIcon,
  VirtualList,
} from 'ui'
import { Token, useTokenList } from './hooks/useTokenList'

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

const Skeleton = () => (
  <div className="bg-colors-background-tertiary h-12 w-full animate-pulse rounded" />
)

const PasteClipboardButton = ({
  onPaste,
  className,
}: {
  onPaste: (clipboardText: string) => void
  className?: string
}) => (
  <div className={className}>
    <Button
      aria-label="paste clipboard"
      variant="secondary"
      size="xs"
      onClick={async () => onPaste(await navigator.clipboard.readText())}
    >
      <MagicWandIcon title="magic wand" />
      Paste
    </Button>
  </div>
)

type CurrencySelectorProps = {
  selected: Address | null
  onSelect: (c: Address) => void
  /**
   * token list url
   * https://tokenlists.org/
   */
  tokenList?: string
}

const searchTokenFilter = (tokens: Token[], search: string) =>
  tokens.filter(
    ({ name, address, symbol }: Token) =>
      !search ||
      address.toLowerCase() === search.toLowerCase() ||
      name.toLowerCase().includes(search.toLowerCase()) ||
      symbol.toLowerCase().includes(search.toLowerCase()),
  )

const SearchInput = ({ setSearch, search }: { setSearch: (s: string) => void; search: string }) => (
  <Input
    fullWidth
    size="md"
    placeholder="Search name or address"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    left={<SearchIcon className="text-low -ml-1 text-xl" />}
    right={<PasteClipboardButton onPaste={setSearch} className="-mr-2" />}
  />
)

export const CurrencySelector = ({
  selected,
  onSelect,
  tokenList = UniswapDefaultTokenList,
}: CurrencySelectorProps) => {
  const { data, isSuccess } = useTokenList(tokenList)

  const [search, setSearch] = useState('')
  const filteredTokens = isSuccess ? searchTokenFilter(data.tokens, search) : []

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" bleed>
          <TokenIcon address={''} symbol="DAI" />
          <span className="font-extrabold">DAI</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-secondary flex max-h-[500px] w-[400px] flex-col gap-3 rounded border p-4 shadow"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-low text-sm font-semibold">Select a token</h3>
            <DialogClose />
          </div>

          <SearchInput {...{ setSearch, search }} />

          <div className="border-primary mx-1 h-0 w-auto border-t" />

          {isSuccess ? (
            <VirtualList
              data={filteredTokens}
              renderItem={(token) => <CurrencySelectorItem {...token} />}
              itemHeight={48}
              className="-mx-1 px-1 pt-2"
            />
          ) : (
            <div className="flex flex-col gap-2 overflow-auto border-t pt-2">
              {Array.from(Array(6)).map((_v, i) => (
                <Skeleton key={i} />
              ))}
            </div>
          )}

          <Button size="sm" variant="secondary">
            <span className="text-xs">Import token list</span>
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
