import { cx as _cx, CxOptions } from 'class-variance-authority'

/**
 * allows `false` so we can do stuff like `cx('p-2', isOpen && 'bg-red')`
 * instead of `cx('p-2', isOpen ? 'bg-red' : null)`
 */
type ExtendedCxOptions = Array<CxOptions[number] | false>
export const cx = <T extends ExtendedCxOptions>(...classes: T) => _cx(classes as CxOptions)
export default cx
