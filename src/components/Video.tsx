'use client';

export default function Video() {
    return (
        <video controls className="pt-10 px-5" poster="poster.JPG">
            <source src="tabor1.webm" type="video/mp4" />
        </video>
    );
}
