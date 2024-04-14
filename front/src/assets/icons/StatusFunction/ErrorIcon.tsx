interface ErrorIconProps {
  width?: string | number
  height?: string | number
}

export default function ErrorIcon({
  width = '1.2em',
  height = '1.2em',
}: ErrorIconProps) {
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
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 9v4" />
      <path d="M12 16v.01" />
    </svg>
  )
}
