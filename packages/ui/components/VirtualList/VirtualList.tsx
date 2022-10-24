import { useVirtualizer } from '@tanstack/react-virtual'
import { ReactNode, useRef } from 'react'
import { cx } from '../..'

export type VirtualListProps<ListItemData> = {
  data: ListItemData[]
  itemHeight: number
  renderItem: (item: ListItemData) => ReactNode
  className: string
}

export const VirtualList = <DataType extends Object>({
  data,
  itemHeight,
  renderItem,
  className,
}: VirtualListProps<DataType>) => {
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
