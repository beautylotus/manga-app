import Image from 'next/image';
import Link from 'next/link';
import { MangaDetails } from '~/types';
import { memo } from 'react';

import { BookmarkIcon, BookOpenIcon } from '@heroicons/react/outline';
import { LightningBoltIcon } from '@heroicons/react/solid';

interface DetailsInfoProps {
    manga: MangaDetails;
}

function DetailsInfo({ manga }: DetailsInfoProps) {
    return (
        <div className="flex h-full w-full flex-col items-center overflow-x-hidden md:flex-row md:items-start">
            {/* manga thumbnail  */}
            <div className="mt-4 w-[50%] md:w-[250px] md:min-w-[250px]">
                <figure className="aspect-w-3 aspect-h-5 relative rounded-2xl">
                    <Image
                        className="absolute inset-0 rounded-2xl object-cover object-center"
                        layout="fill"
                        alt="manga-thumbnail"
                        src={manga.thumbnail}
                    />
                </figure>
            </div>
            {/* manga desc*/}
            <div className="flex h-full w-full flex-col justify-center p-4  text-white md:min-h-[430px] lg:ml-4">
                <div className="w-full space-y-4 text-center md:ml-2 md:text-left lg:w-[80%]">
                    <h1
                        className={`font-secondary  font-bold leading-none ${
                            manga.title.length < 40
                                ? 'text-[6.5vw] md:text-[5.5vw] lg:text-[3.5vw]'
                                : 'text-[5.5vw] md:text-[3.5vw] lg:text-[2.5vw]'
                        }`}
                    >
                        {manga.title}
                    </h1>
                    <h2 className="text-[3vw] md:min-h-[28px] md:text-[2vw] lg:text-[1.2vw]">
                        {manga.otherName !== 'undefined' ? manga.otherName : ''}
                    </h2>
                    <h3 className="text-center text-[3vw] md:text-left md:text-[2vw] lg:text-[1.1vw]">
                        {manga.author !== 'undefined' ? manga.author : ''}
                    </h3>
                    <h4 className="flex items-center justify-center gap-4 md:justify-start">
                        <span
                            className={`block h-3 w-3 rounded-full ${
                                manga.status === 'Đang tiến hành'
                                    ? 'bg-green-500'
                                    : 'bg-cyan-500'
                            } `}
                        ></span>
                        {manga.status}
                    </h4>
                </div>
                <div className="mt-4 flex flex-col-reverse gap-2 md:flex-col">
                    <ul className="my-4 flex flex-wrap items-center gap-4">
                        <h3 className="px-2 py-2">Thể loại:</h3>
                        {manga.genres.length &&
                            manga.genres.map((genre, idx) => {
                                return (
                                    <li
                                        key={genre.slug || idx}
                                        className="rounded-xl bg-hight-light px-4 py-2"
                                    >
                                        <Link
                                            href={{
                                                pathname: `browse/${genre.slug}`,
                                            }}
                                        >
                                            <a>{genre.genreTitle}</a>
                                        </Link>
                                    </li>
                                );
                            })}
                    </ul>
                    {/* manga interrace  */}
                    <div className="flex h-[150px] w-full flex-col items-center gap-6   md:flex-row md:items-start">
                        <button className="pulse-effect-primary absolute-center h-[50px] w-[150px] gap-3 rounded-2xl bg-primary transition-all hover:scale-[110%]">
                            <BookOpenIcon className="h-8 w-8" /> Đọc ngay
                        </button>
                        <button className="pulse-effect-secondary absolute-center h-[50px] w-[150px] gap-3 rounded-2xl bg-white text-gray-800 transition-all hover:scale-[110%]">
                            <LightningBoltIcon className="h-8 w-8 text-primary" />{' '}
                            Chap mới nhất
                        </button>
                        <button className="shine-effect absolute-center h-[50px] w-[50px] rounded-xl bg-hight-light transition-all hover:text-primary">
                            <BookmarkIcon className=" h-8 w-8" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(DetailsInfo);
