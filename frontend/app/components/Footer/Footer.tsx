import styles from './Footer.module.css'

const socialLinkClass =
  'text-white text-base block rounded-lg transition-opacity duration-300 w-full px-2 py-2 hover:opacity-70'

export default function Footer() {
  return (
    <footer className="bg-[#f1a630] py-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h4 className="text-black font-semibold mb-3">Contact Info</h4>
            <ul className="list-none p-0 space-y-1">
              <li>Email: coreyindahouse27@gmail.com</li>
            </ul>
          </div>

          {/* <div>
            <h4 className="text-black font-semibold mb-3">Explore</h4>
            <ul className="list-none p-0 space-y-1">
              <li><a href="#" className="text-[#666] hover:underline">About</a></li>
              <li><a href="#" className="text-[#666] hover:underline">Blog</a></li>
              <li><a href="#" className="text-[#666] hover:underline">Merch</a></li>
            </ul>
          </div> */}

          <div>
            <h4 className="text-black font-semibold mb-3">Content Platforms</h4>
            <ul className="list-none p-0 space-y-2 text-center">
              <li>
                <a href="https://twitch.tv/CoreyInDaHouse27" target="_blank" className={`${styles['social-color-twitch']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-twitch mr-2"></i>Twitch
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@CoreyInDaHouse27?sub_confirmation=1" target="_blank" className={`${styles['social-color-youtube']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-youtube mr-2"></i>YouTube
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@coreyindahouse27" target="_blank" className={`${styles['social-color-tiktok']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-tiktok mr-2"></i>TikTok
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-semibold mb-3">Social Links</h4>
            <ul className="list-none p-0 space-y-2 text-center">
              <li>
                <a href="https://x.com/dahouse27" target="_blank" className={`${styles['social-color-twitter']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-x-twitter mr-2"></i>Twitter
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/CoreyInDaHouse27" target="_blank" className={`${styles['social-color-facebook']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-square-facebook mr-2"></i>Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/coreyindahouse27" target="_blank" className={`${styles['social-color-instagram']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-instagram mr-2"></i>Instagram
                </a>
              </li>
              <li>
                <a href="https://discord.gg/HrgKaxGfxP" target="_blank" className={`${styles['social-color-discord']} ${socialLinkClass}`}>
                  <i className="fa-brands fa-discord mr-2"></i>Discord
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  )
}
