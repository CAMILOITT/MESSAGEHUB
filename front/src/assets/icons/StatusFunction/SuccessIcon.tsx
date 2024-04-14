interface SuccessIconProps {
  width?: string | number
  height?: string | number
}

export default function SuccessIcon({
  width = '1.2em',
  height = '1.2em',
}: SuccessIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke-width="4"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round">
      <path d="M5 12l5 5l10 -10" />
    </svg>
  )
}
