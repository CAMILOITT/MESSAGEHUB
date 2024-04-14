import { useLayoutEffect, useState } from 'react'

interface ImgUserProps {
  nick: string
}

const listColors = [
  '#ff7889',
  '#8a5082',
  '#758e87',
  '#a5cad2',
  '#438bd3',
  '#ff9dda',
  '#5e72eb',
  '#ff9190',
  '#fec195',
]

export default function ImgUser({ nick }: ImgUserProps) {
  const [color, setColor] = useState<string>()

  useLayoutEffect(() => {
    setColor(listColors[Math.floor(Math.random() * listColors.length)])
  }, [])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34.4 34.4"
      width="30px">
      <defs>
        <style>{`.cls-1{letter-spacing:0em; fill:white;}.cls-2{fill:${color};stroke-miterlimit:10;}.cls-4{font-family:Inter, 'Myriad Pro';font-size:18px;font-weight:bold;}`}</style>
      </defs>
      <g>
        <circle className="cls-2" cx="17.2" cy="17.2" r="16.7" />
        <text className="cls-4" transform="translate(6.32 23.28)">
          <tspan className="cls-1" x="0" y="0">
            {nick[0]}
          </tspan>
          <tspan className="cls-1" x="10.51" y="0">
            {nick[1]}
          </tspan>
        </text>
      </g>
    </svg>
  )
}
