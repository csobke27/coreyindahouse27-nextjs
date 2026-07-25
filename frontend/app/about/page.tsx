import Image from "next/image";

export default function AboutPage() {
    return (
        <>
            <>
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 text-left">
                    <h1 className="text-4xl font-bold text-center">About Corey</h1>
                    <Image 
                        className="mt-4 mx-auto rounded-lg"
                        src="/images/CoreyInDaHouse27.png"
                        alt="About CoreyInDaHouse27"
                        width={600}
                        height={400}
                    />
                    {/* <img
                        className="mt-4 mx-auto rounded-lg"
                        src="https://placehold.co/600x400"
                        alt="About CoreyInDaHouse27"
                        width={600}
                        height={400}
                    /> */}
                    <p className="mt-4 text-md">
                        {`By day, I'm a Web Developer dedicated to building fast, scalable, and highly optimized digital experiences. 
                        By night (and weekends), I'm CoreyInDaHouse27, a content creator and live streamer diving into the worlds of Fortnite, 
                        Dead by Daylight, indie horror, and community-driven gaming.`}
                    </p>
                    <p className="mt-4 text-md">
                        {`As a developer, I specialize in building high-performance, 
                        responsive web applications using modern frameworks like React and Angular. I live for optimization, clean architecture, 
                        and making things load incredibly fast. I also have experience in backend development, database management, and content management systems,
                        which allows me to create full-stack solutions that are both efficient and user-friendly.`}
                    </p>
                    <p className="mt-4 text-md">
                        {`As a streamer, I create gaming content centered around indie horror, battle royales, and building a welcoming, high-energy community. 
                        My main goal is to entertain and leave a positive impact on my viewers through my comedic gameplay or insane clutch moments. 
                        I also enjoy collaborating with other content creators and engaging with my audience through live chat, social media, and community events. 
                        Whether I'm optimizing a web app's critical rendering path or live-streaming a close match, I'm always looking for ways to create, connect, and innovate.`}
                    </p>
                </div>
            </div>
            </>
        </>
    );
}