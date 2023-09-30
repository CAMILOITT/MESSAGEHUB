interface loadingIconProps {
  width?: string | number
  height?: string | number
}

export default function LoadingIcon({
  width = '1.2em',
  height = '1.2em',
}: loadingIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon-loading"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      stroke-width="4"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <defs>
        <style>
          {
            '.icon-loading {animation: rotate 1s infinite steps(7);}.icon :nth-child(2) { opacity: .3;}.icon :nth-child(3) { opacity: .5;}.icon :nth-child(1) {opacity: 1;} @keyframes rotate { from { rotate: 0deg; }  to { rotate: 360deg; }}'
          }
        </style>
      </defs>
      <path d="M12 6l0 -3"></path>
      <path d="M6 12l-3 0"></path>
      <path d="M7.75 7.75l-2.15 -2.15"></path>
    </svg>
  )
}
