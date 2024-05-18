import Image from "next/image";

export default function Home() {
  return (
    
      <div className="flex flex-col items-center justify-center">
        <Image src="/logo.svg" width={64} height={64} alt="Logo" />
        <h1 className="text-3xl font-bold text-white">Welcome to NFT Marketplace</h1>
      </div>

  );
}
