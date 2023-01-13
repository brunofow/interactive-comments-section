import { SVGAttributes } from 'react'

interface SvgProps extends SVGAttributes<HTMLOrSVGElement> {}

function SvgComponent(props: SvgProps) {
  return (
    <svg width={11} height={11} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149a.484.484 0 00.148-.354V5.272a.483.483 0 00-.148-.354.483.483 0 00-.354-.149H6.833V1.4a.483.483 0 00-.149-.354.483.483 0 00-.354-.149H4.915a.483.483 0 00-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 00-.354.15.48.48 0 00-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33z" />
    </svg>
  )
}

export default SvgComponent
