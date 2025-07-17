export function About() {
  return (
    <section id="about" className="py-20 bg-[#DFD0B8] dark:bg-[#222831]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#222831] dark:text-[#DFD0B8] mb-4">
            About Me
          </h2>
          <p className="text-lg text-[#393E46] dark:text-[#948979] max-w-2xl mx-auto font-medium">
            Learn more about my background, experience, and passion for development
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-[#222831] dark:text-[#DFD0B8]">
              My Story
            </h3>
            <p className="text-[#393E46] dark:text-[#948979] leading-relaxed text-base font-normal">
              I&apos;m an Information Technology graduate with a strong drive for building clean, efficient, and practical software. What began as curiosity turned into a focused pursuit of solving real-world problems through code.
            </p>
            <p className="text-[#393E46] dark:text-[#948979] leading-relaxed text-base font-normal">
            I work across the full stack, comfortable on both frontend and backend and enjoy turning ideas into usable, reliable applications. I&apos;m drawn to modern tools and new Technologies and frameworks and always on the lookout for projects that sharpen my skills and expand my thinking.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] rounded-full text-sm font-medium">
                Problem Solver
              </span>
              <span className="px-4 py-2 bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] rounded-full text-sm font-medium">
                Team Player
              </span>
              <span className="px-4 py-2 bg-[#948979] dark:bg-[#393E46] text-[#DFD0B8] dark:text-[#DFD0B8] rounded-full text-sm font-medium">
                Continuous Learner
              </span>
            </div>
          </div>
          
          <div className="bg-[#948979] dark:bg-[#393E46] rounded-lg p-8">
            <h3 className="text-xl font-semibold text-[#DFD0B8] dark:text-[#DFD0B8] mb-6">
              Quick Facts
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[#DFD0B8] dark:text-[#948979] font-medium">Location</span>
                <span className="text-[#DFD0B8] dark:text-[#DFD0B8] font-normal">Jeddah, Saudi Arabia</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#DFD0B8] dark:text-[#948979] font-medium">Experience</span>
                <span className="text-[#DFD0B8] dark:text-[#DFD0B8] font-normal">Fresh Graduate</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#DFD0B8] dark:text-[#948979] font-medium">Specialization</span>
                <span className="text-[#DFD0B8] dark:text-[#DFD0B8] font-normal text-right">Full Stack, Data visualization, Cloud Computing</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#DFD0B8] dark:text-[#948979] font-medium">Availability</span>
                <span className="text-green-600 font-semibold">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 