import QRCodeLink from "qrcode";
import React, { useState } from "react";
import QRCode from "react-qr-code";
import { ReturnHomeButton } from "../../components/ReturnHomeButton";
import { HiDownload } from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export function QrCode() {
    const [link, setLink] = useState("");
    const [qrcodeLink, setQrcodeLink] = useState("")

    function handleQrcode(e: React.ChangeEvent<HTMLInputElement>) {
        setLink(e.target.value);
        handleGenerate(e.target.value);
    }

    function handleGenerate(linkUrl: string) {
        QRCodeLink.toDataURL(linkUrl, {
            width: 600,
            margin: 3,
        }, function (_err, url) {
            setQrcodeLink(url);
        })
    }

    const verifyStateButton = link ? "bg-darkblue hover:bg-darkblue/80 text-slate-100 border-darkblue" : "bg-zinc-500 text-zinc-300  border-zinc-500"

    return (
        <main className="flex-1">
            <ReturnHomeButton />
            <main className="h-5/6 flex justify-center items-center gap-36 md:hidden">

                <div className="flex flex-col justify-center gap-5">
                    <input
                        type="text"
                        placeholder="Digite seu link..."
                        value={link}
                        className="rounded-lg py-2 px-2 bg-neutral-100 border border-gray-400 text-gray-600 placeholder:text-gray-500 focus:outline-none w-20v"
                        onChange={(e) => handleQrcode(e)}
                    />

                    <a
                        href={qrcodeLink}
                        download={"mq_qrcode.png"}
                        className="flex justify-center"
                    >
                        <button
                            disabled={!link}
                            className={twMerge("flex justify-center items-center gap-1 text-nowrap text-base rounded-md shadow-sm font-medium border py-2 px-5 mt-2 transition", verifyStateButton)}

                        >
                            <HiDownload className="text-lg" />
                            <p>Baixar imagem</p>
                        </button>
                    </a>
                </div>

                <div
                    className="bg-white p-5 rounded-lg border-2 border-gray-200"
                >
                    <QRCode
                        value={link}
                        className="h-52 w-52"
                    />
                </div>
            </main>
            <main className="h-5/6 hidden flex-col justify-center items-center gap-8 md:flex">
                <div
                    className="bg-white p-5 rounded-lg border-2 border-gray-200"
                >
                    <QRCode
                        value={link}
                        className="h-80 w-80 sm:h-52 sm:w-52 "
                    />
                </div>

                <div className="flex flex-col items-center justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Digite seu link..."
                        value={link}
                        className="rounded-lg py-2 px-2 bg-neutral-100 border border-gray-400 text-gray-600 placeholder:text-gray-500 focus:outline-none w-40v sm:w-50v"
                        onChange={(e) => handleQrcode(e)}
                    />

                    <a
                        href={qrcodeLink}
                        download={"mq_qrcode.png"}
                        className="flex justify-center"
                    >
                        <button
                            disabled={!link}
                            className={twMerge("flex justify-center items-center gap-1 text-nowrap text-base rounded-md shadow-sm font-medium border py-2 px-5 transition", verifyStateButton)}

                        >
                            <HiDownload className="text-lg" />
                            <p>Baixar imagem</p>
                        </button>
                    </a>
                </div>
            </main>
        </main>
    );
}