import { memo, SyntheticEvent, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import useSettingsMode from '~/context/SettingsContext';
// import { baseURL } from '~/services/axiosClient';
import round_robin_server from '~/utils/proxyBalancer';

interface ImgProps {
    useProxy?: boolean;
    index: number;
    url: string;
    src: string;
    fallbackSrc?: string;
    saveCurrentPage: (currPage: number) => void;
}

function Img({
    useProxy,
    url,
    src,
    fallbackSrc,
    index,
    saveCurrentPage,
}: ImgProps) {
    const ref = useRef<HTMLImageElement | null>(null);
    const entry = useIntersectionObserver(ref, {});
    const settings = useSettingsMode();
    const isVisible = !!entry?.isIntersecting;

    if (isVisible) {
        saveCurrentPage(index);
    }

    const handleErrorImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        if (fallbackSrc) {
            e.currentTarget.src = fallbackSrc;
            e.currentTarget.removeAttribute('alt');
        }

        e.currentTarget.onerror = null; // prevents looping
    };

    if (settings?.readMode === 'horizontal') {
        return (
            <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    data-id={index}
                    ref={ref}
                    alt="chapter-img"
                    className={`comic-img mx-auto h-screen w-auto
                         transition-all duration-300 md:opacity-20
                    `}
                    src={
                        useProxy
                            ? `${round_robin_server()}/proxy?url=${url}&src=${
                                  src ? src : fallbackSrc
                              }`
                            : src
                            ? src
                            : fallbackSrc
                    }
                    onError={handleErrorImg}
                />
            </>
        );
    }

    return (
        <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={ref}
                alt="chapter-img"
                className={`${
                    settings?.imageMode === 'fitH' ? 'h-screen' : 'h-auto'
                } comic-img mx-auto ${
                    settings?.imageMode === 'fitW' ? 'w-full' : 'w-auto'
                }`}
                src={
                    useProxy
                        ? `${round_robin_server()}/proxy?url=${url}&src=${
                              src ? src : fallbackSrc
                          }`
                        : src
                        ? src
                        : fallbackSrc
                }
                onError={handleErrorImg}
            />
        </>
    );
}

export default memo(Img);
