import clsx from 'clsx'
import { SVGProps } from 'react'
interface SVGRProps {
  title?: string
  titleId?: string
}
export const MarketsIcon = ({ title, titleId, ...props }: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    {...props}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={clsx('h-[1em] w-[1em]', props.className)}
    aria-labelledby={titleId}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <rect x={3} y={3} width={42} height={42} rx={9} stroke="currentColor" strokeWidth={6} />
    <line
      x1={15.5}
      y1={34.5}
      x2={15.5}
      y2={27.5}
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <line
      x1={24.5}
      y1={34.5}
      x2={24.5}
      y2={13.5}
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
    />
    <line
      x1={33.5}
      y1={34.5}
      x2={33.5}
      y2={22.5}
      stroke="currentColor"
      strokeWidth={5}
      strokeLinecap="round"
    />
  </svg>
)
