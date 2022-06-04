import React, { SVGProps } from 'react'

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  name: string
}

const BurgerMenuItem = ({ Icon, name }: Props) => {
  return (
    <li className="flex items-center p-2 cursor-pointer hover:bg-neutral-800 pl-4 border-b border-neutral-800">
      <Icon className="icon text-neutral-300" />
      <span className="pl-3 text-neutral-300 font-semibold">{name}</span>
    </li>
  )
}

export default BurgerMenuItem