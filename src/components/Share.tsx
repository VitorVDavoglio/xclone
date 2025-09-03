"use client"

import React, { useState } from 'react';
import ImageComp from './Image';
import Image from 'next/image';
import NextImage from "next/image";
import { shareAction } from '@/actions';
import ImageEditor from './ImageEditor';

const Share = () => {

    const [media, setMedia] = useState<File | null>(null);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [settings, setSettings] = useState<{
        type: "original" | "wide" | "square";
        sensitive: boolean;
    }>({
        type: "original",
        sensitive:false,
    });

    const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>)=> {
        if(e.target.files && e.target.files[0]){
            setMedia(e.target.files[0]);
        }
    }

    const previewURL = media ? URL.createObjectURL(media) : null;

    return (
    <form className='p-4 flex gap-4' action={shareAction}>
        
        <div className='relative w-10 h-10 rounded-full overflow-hidden'>
            <ImageComp src='xclone/general/avatar.png' alt='' w={100} h={100} tr={true}/>
        </div>

        <div className='flex flex-1 flex-col gap-4'>
            <input 
                type='text' 
                name="desc"
                placeholder='what is happening?' 
                className='bg-transparent outline-none placeholder:text-textGray text-xl'
            />
            { previewURL && 
                <div className='relative rounded-xl overflow-hidden'>
                    <NextImage src={previewURL} alt='' width={400} height={600} />
                    <div className='absolute top-2 left-2 bg-black text-white py-1 px-5 rounded-full font-bold text-sm cursor-pointer' onClick={() => setIsEditorOpen(true)}> Edit </div>
                </div>
            }
            { isEditorOpen && previewURL && (
                <ImageEditor 
                    onClose={() => setIsEditorOpen(false)}
                    previewURL={previewURL}
                    settings={settings}
                    setSettings={setSettings}
                />
            )}
            <div className='flex items-center justify-between gap-4 flex-wrap'>
                <div className='flex gap-4 flex-wrap'>
                    <input 
                        type='file' 
                        name="file"
                        onChange={handleMediaChange} 
                        className='hidden'
                        id="file"
                    />
                    <label htmlFor='file'>
                        <Image src='icons/image.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                    </label>
                    <Image src='icons/gif.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                    <Image src='icons/poll.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                    <Image src='icons/emoji.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                    <Image src='icons/schedule.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                    <Image src='icons/location.svg' alt='' width={20} height={20} className='cursor-pointer'/>
                </div>
                <button className='bg-white text-black font-bold rounded-full py-2 px-4 cursor-pointer'>Post</button>
            </div>
        </div>
    </form>
    )
}

export default Share
