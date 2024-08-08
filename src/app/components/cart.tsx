import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";

import Image from "next/image";

import Handbag from '../../../public/handbag.svg'
import X from '../../../public/x.svg'

export default function Cart() {
    return (
        <Dialog.Root>
            <Dialog.Trigger className="bg-[#202024] rounded-md m-auto">
                <Image src={Handbag} alt="" className="text-slate-50 m-3" />
            </Dialog.Trigger>

            <Dialog.Content className="z-10 absolute right-0 top-0 bg-[#202024] h-screen shadow-2xl drop-shadow-2xl shadow-black flex flex-col justify-start">
                <div className="flex items-center justify-between w-96">
                    <div></div>
                    <Dialog.Close>
                        <Image src={X} alt="" className="text-slate-50 m-3" />
                    </Dialog.Close>
                </div>

                <div className="flex flex-col justify-between p-12 h-full">
                    <div className="flex flex-col gap-5">
                        <Dialog.Title className="text-xl font-bold">Sacola de compras</Dialog.Title>

                        <div className="flex gap-5">
                            <Image src={Handbag} alt="" className="text-slate-50 m-3" />
                            <div className="flex flex-col items-start gap-2">
                                <h2 className="text-lg">Camiseta Beyond the Limits</h2>
                                <span className="font-bold text-lg">R$ 79,90</span>
                                <button className="text-green-500 font-bold hover:text-green-300">Remover</button>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <Image src={Handbag} alt="" className="text-slate-50 m-3" />
                            <div className="flex flex-col items-start gap-2">
                                <h2 className="text-lg">Camiseta Beyond the Limits</h2>
                                <span className="font-bold text-lg">R$ 79,90</span>
                                <button className="text-green-500 font-bold hover:text-green-300">Remover</button>
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <Image src={Handbag} alt="" className="text-slate-50 m-3" />
                            <div className="flex flex-col items-start gap-2">
                                <h2 className="text-lg">Camiseta Beyond the Limits</h2>
                                <span className="font-bold text-lg">R$ 79,90</span>
                                <button className="text-green-500 font-bold hover:text-green-300">Remover</button>
                            </div>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p>Quantidade</p>
                            <span>3 itens</span>
                        </div>
                        <div className="flex items-center justify-between font-bold">
                            <p>Valor total</p>
                            <span>R$ 270,00</span>
                        </div>

                        <button className="mt-12 bg-green-500 text-white border-0 rounded-lg cursor-pointer p-5 font-bold text-base hover:bg-green-300 disabled:opacity-5 disabled:cursor-not-allowed">Finalizar compra</button>
                    </div>
                </div>
            </Dialog.Content>
        </Dialog.Root>
    )
}
