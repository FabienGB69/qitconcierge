/// <reference types="vite/client" />

declare module "*&as=srcset" {
  const srcSet: string;
  export default srcSet;
}

declare module "*?w=768&format=jpg&quality=78" {
  const src: string;
  export default src;
}
