import { paperSceneClass, vistoXGustoClass } from '../shared/formStyles'

export default function AnnaShell({ children, desktopCardClass = '' }) {
  return (
    <main className="min-h-dvh overflow-x-hidden bg-anna-bg font-sans text-anna-cream">
      <div className="lg:hidden">
        <div className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-[clamp(0.75rem,4vw,1.25rem)] pb-[clamp(1.5rem,6vw,2.5rem)] pt-[clamp(1rem,5vw,1.5rem)]">
          <header className="mb-[clamp(1rem,5vw,1.5rem)] shrink-0 text-center">
            <img
              className="mx-auto w-full max-w-[min(280px,72vw)]"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
          </header>

          <div className="relative overflow-hidden rounded-2xl border border-anna-burgundy-border bg-anna-burgundy shadow-[0_16px_48px_rgba(0,0,0,0.4)] p-[clamp(1rem,4vw,1.5rem)]">
            <div
              className="pointer-events-none absolute inset-0 bg-anna-burgundy-texture opacity-35"
              aria-hidden="true"
            />
            <div className="relative z-10">{children.mobile}</div>
          </div>

          <p className={vistoXGustoClass.mobile}>Visto x gusto</p>
        </div>
      </div>

      <div className="relative hidden min-h-dvh overflow-hidden lg:block">
        <aside className="absolute top-[calc(50%-clamp(1.5rem,4.5vh,3.25rem))] left-[clamp(3.5rem,9vw,10rem)] z-10 w-[min(28vw,380px)] -translate-y-1/2">
          <div className="w-full">
            <img
              className="block w-full"
              src="/assets/anna-marketplace.png"
              alt="ANNA marketplace"
              width={484}
              height={98}
            />
          </div>
        </aside>

        <section className="flex min-h-dvh items-center justify-center overflow-hidden pb-2 pt-0 pl-[clamp(11rem,26vw,22rem)] pr-3 [@media(max-height:850px)]:pl-[clamp(9.5rem,22vw,18rem)] [@media(max-height:850px)]:pb-1">
          <div className="@container relative aspect-[1724/2153] h-auto w-[min(calc(100vw-clamp(11rem,26vw,22rem)-1.5rem),calc((100dvh-1rem)*1724/2153))] max-h-[min(94dvh,1080px)] shrink-0 origin-center -translate-y-[clamp(1rem,4.5vh,5.5rem)] [@media(max-height:850px)]:-translate-y-[clamp(0.25rem,1.5vh,1.5rem)] drop-shadow-[0_32px_64px_rgba(0,0,0,0.45)]">
            <div className={`${paperSceneClass} z-0`} aria-hidden="true">
              <img
                className="absolute inset-0 h-full w-full rounded-[1.2cqw] object-fill"
                src="/assets/background.png"
                alt=""
              />
              <img
                className="absolute top-[23.5%] left-[27.5%] z-20 w-[14%] -rotate-[11deg] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.28)]"
                src="/assets/hero-image.png"
                alt=""
              />
              <img
                className="absolute top-[22%] left-[29%] z-30 w-[4.5%]"
                src="/assets/object-left-59747c.png"
                alt=""
              />
              <p className={vistoXGustoClass.desktop}>Visto x gusto</p>
            </div>

            <section
              className={`absolute left-[18.2%] z-40 w-[67%] min-h-0 rounded-[1.1cqw] border border-anna-burgundy-border bg-anna-burgundy px-[4.4cqw] shadow-[0_0.9cqw_1.7cqw_rgba(0,0,0,0.25)] top-[42%] bottom-[3%] [@media(max-height:900px)]:bottom-[5%] [@media(max-height:750px)]:bottom-[7%] grid gap-[clamp(0.55rem,1.7cqw,1.5rem)] overflow-y-auto overscroll-contain py-[clamp(1rem,3cqw,3.25rem)] [scrollbar-width:thin] ${desktopCardClass}`}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-anna-burgundy-texture opacity-35"
                aria-hidden="true"
              />
              <div className="relative z-10">{children.desktop}</div>
            </section>

            <div className={`${paperSceneClass} z-50`} aria-hidden="true">
              <img
                className="absolute top-[45.8%] left-[69.7%] w-[13%]"
                src="/assets/object-right-76481c.png"
                alt=""
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
