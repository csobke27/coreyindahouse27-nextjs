import {ReactNode} from 'react'

type ContentSlideProps = {
  isActive: boolean
  onClick: () => void
  bgClass: string
  iconClass: string
  label: string
  position?: 'top' | 'center'
  children?: ReactNode
}

export default function ContentSlide({
  isActive,
  onClick,
  bgClass,
  iconClass,
  label,
  position,
  children,
}: ContentSlideProps) {
  return (
    <div
      onClick={onClick}
      className={`slide w-full md:mx-2 relative md:flex-1 min-h-[500px] h-auto max-h-[500px] overflow-hidden transition-[max-height,flex-basis,transform] duration-[1000ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)] bg-center bg-no-repeat bg-cover rounded-[100px] ${
        isActive ? 'active' : ''
      } [&.active]:max-h-[1100px] md:[&.active]:basis-[40%] [&.active]:bg-cover [&.active_div]:opacity-100 [&.active_div]:duration-[2000ms] [&.active_div]:transition-opacity [&.active_div]:scale-[1] [&.active_.platform-badge]:top-6 [&.active_.platform-badge]:-translate-y-0 [&.active_.platform-badge]:transition-all [&.active_.platform-badge]:duration-700 ease-in-out ${bgClass}`}
    >
      <div className="platform-badge absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center text-white text-2xl font-bold transition-all duration-700 ease-in-out">
        <i className={`${iconClass} text-6xl`}></i>
        <span>{label}</span>
      </div>
      <div className={`slide__text ${position == 'top' ? 'pt-30' : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'} text-white opacity-0 scale-0 transition-all duration-0 group-active:opacity-1`}>
        {children}
      </div>
    </div>
  )
}
