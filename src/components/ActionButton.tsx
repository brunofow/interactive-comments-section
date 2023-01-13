import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'red'
  children: ReactNode
}

export function ActionButton({
  color = 'blue',
  children,
  ...rest
}: ActionButtonProps) {
  const classObject = {
    blue: 'text-blue-500 fill-blue-500 hover:text-blue-50 hover:fill-blue-50',
    red: 'text-red-500 fill-red-500 hover:text-red-50 hover:fill-red-50'
  }

  return (
    <button
      {...rest}
      className={`flex gap-2 items-center ${classObject[color]}`}
    >
      {children}
    </button>
  )
}
