/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PORTFOLIO_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
