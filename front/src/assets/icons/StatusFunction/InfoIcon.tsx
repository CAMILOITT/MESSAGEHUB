interface InfoIconProps {
  width?: string | number
  height?: string | number
}

export default function InfoIcon({
  width = '1.2em',
  height = '1.2em',
}: InfoIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke-width="3"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </svg>
  )
}
