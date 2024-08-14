// const mockRSSFeed = '<?xml version="1.0" encoding="UTF-8"?> \
//     <rss version="2.0"> \
//         <channel> \
//             <title>Mock RSS Feed</title> \
//             <link>http://localhost:3000/api/mock-rss</link> \
//             <description>This is a mock RSS feed.</description> \
//             <lastBuildDate>Sun, 21 Jul 2024 04:22:10 +0000</lastBuildDate> \
//             <item> \
//                 <title>Mock Article 1</title> \
//                 <link>http://localhost/rss/mock-article-1</link> \
//                 <description>This is the description of Mock Article 1.</description> \
//                 <pubDate>Sat, 20 Jul 2024 02:38:06 +0000</pubDate> \
//             </item> \
//             <item> \
//                 <title>Mock Article 2</title> \
//                 <link>http://localhost/rss/mock-article-2</link> \
//                 <description>This is the description of Mock Article 2.</description> \
//                 <pubDate>Sun, 21 Jul 2024 04:22:10 +0000</pubDate> \
//             </item> \
//         </channel> \
//     </rss>';

const mockRSSFeed = '<?xml version="1.0" encoding="UTF-8"?> \
    <rss version="2.0"> \
        <channel> \
            <title>Mock RSS Feed</title> \
            <link>http://localhost:3000/api/mock-rss</link> \
            <description>This is a mock RSS feed.</description> \
            <lastBuildDate>Mon, 22 Jul 2024 05:00:00 +0000</lastBuildDate> \
            <item> \
                <title>Mock Article 1</title> \
                <link>http://localhost/rss/mock-article-1</link> \
                <description>This is the description of Mock Article 1.</description> \
                <pubDate>Sat, 20 Jul 2024 02:38:06 +0000</pubDate> \
            </item> \
            <item> \
                <title>Mock Article 2</title> \
                <link>http://localhost/rss/mock-article-2</link> \
                <description>This is the description of Mock Article 2.</description> \
                <pubDate>Sun, 21 Jul 2024 04:22:10 +0000</pubDate> \
            </item> \
            <item> \
                <title>Mock Article 3</title> \
                <link>http://localhost/rss/mock-article-3</link> \
                <description>This is the description of Mock Article 3.</description> \
                <pubDate>Mon, 22 Jul 2024 05:00:00 +0000</pubDate> \
            </item> \
        </channel> \
    </rss>';

export async function GET(req, res) {
    return new Response(mockRSSFeed, {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}