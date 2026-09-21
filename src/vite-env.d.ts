/// <reference types="vite/client" />

declare module "*&as=srcset" {
  const srcSet: string;
  export default srcSet;
}

declare module "*?w=*" {
  const src: string;
  export default src;
}
