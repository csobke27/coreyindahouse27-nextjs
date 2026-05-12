import MainContent from "./MainContent"
import ShortFormContent from "./ShortFormContent"

type YoutubeChannelResponse = {
    items?: Array<{
        statistics?: {
            subscriberCount?: string
        }
    }>
}

type YoutubeLatestVideoResponse = {
    items?: Array<{
        id: {
            videoId?: string
        },
        snippet: {
            title: string
        }
    }>
}

export default async function ContentPage() {


    const channelId = process.env.YOUTUBE_CHANNEL_ID
    const apiKey = process.env.YOUTUBE_API_KEY
    const cacheDuration = 60 * 15 // 15 minutes in seconds
    let youtubeSubscribers: string | null = null
    let latestVideoId: string = "https://www.youtube.com/watch?v="
    let latestVideoTitle: string = "Latest Video"

    if (channelId && apiKey) {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${apiKey}`,
            {next: {revalidate: cacheDuration}},
        )

        if (response.ok) {
            const data = (await response.json()) as YoutubeChannelResponse
            let result = data.items?.[0]?.statistics?.subscriberCount ?? null
            if(parseInt(result ?? "0") > 1000){
                result = (parseInt(result ?? "0") / 1000).toFixed(2) + "K"
            }
            youtubeSubscribers = result;
            
        }

        const latestVid = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1&type=video`,
            {next: {revalidate: cacheDuration}},
        )

        if (latestVid.ok) {
            const latestVidData = (await latestVid.json()) as YoutubeLatestVideoResponse
            latestVideoId = latestVidData.items?.[0]?.id?.videoId ?? ""
            latestVideoTitle = latestVidData.items?.[0]?.snippet?.title ?? "Latest Video"
        }
    }

    return (
        <>
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold ">Main Content</h1>
                <p className="mt-4 text-md">These are the primary platforms where I share my content.</p>
                <div className="my-8">
                    <MainContent youtubeSubscribers={youtubeSubscribers} videoId={latestVideoId} videoTitle={latestVideoTitle} />
                </div>
            </div>
        </div>

        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h1 className="text-4xl font-bold ">Socials/Short-Form Content</h1>
                <p className="mt-4 text-md">Follow me on my social media platforms for the latest updates and short-form content!</p>
                <div className="my-8">
                    <ShortFormContent />
                </div>
            </div>
        </div>
        </>
    )
}