import * as React from "react";

type PebbleLogoProps = React.SVGProps<SVGSVGElement>;

const PebbleLogo: React.FC<PebbleLogoProps> = (props) => (
  <svg
    width="29"
    height="29"
    viewBox="0 0 29 29"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      id="Vector 45"
      d="M24.441 27.1214C17.1545 32.2996 -0.196061 23.4427 0.435746 14.6037C0.971134 7.11362 8.3577 -2.06937 20.2601 0.744269C29.2571 2.87109 31.278 22.2626 24.441 27.1214Z"
      fill="#F2EFE9"
    />
  </svg>
);

export default PebbleLogo;