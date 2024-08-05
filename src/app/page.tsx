"use client"

import Head from 'next/head';

import Image from "next/image";
import Link from "next/link";

import { useKeenSlider } from 'keen-slider/react';

import 'keen-slider/keen-slider.min.css';
import { useEffect, useState } from "react";
import { ProductProps } from "./api/getProducts/route";

export default function Home() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/getProducts')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Erro ao buscar dados dos produtos:", error)
      }
    }

    fetchProducts();
    const intervalId = setInterval(fetchProducts, 10000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
        <meta name="description" content="Bem-vindo à Ignite Shop, seu destino preferido para produtos incríveis!" />
        <meta name="keywords" content="shop, produtos, ignite" />
        <meta name="author" content="Ignite Shop" />
      </Head>

      <main ref={sliderRef} className="keen-slider font-normal flex w-full ml-auto mb-16 min-h-[656px] carrossel-container">
        {products.map(product => (
          <Link key={product.id} href={`/product/${product.id}`} prefetch className="keen-slider__slide background-product rounded-lg p-1 relative flex items-center justify-center">
            <Image src={product.imageUrl} width={520} height={480} alt={""} className="object-cover" />
            <footer className="absolute bottom-1 left-1 right-1 rounded-md p-8 flex items-center justify-between bg-[rgba(0,_0,_0,_0.6)]">
              <strong className="text-lg">{product.name}</strong>
              <span className="text-xl font-bold text-[#00B37E]">{product.price}</span>
            </footer>
          </Link>
        ))}
      </main>
    </>
  );
}
