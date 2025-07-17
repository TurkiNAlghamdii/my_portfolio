export function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 70 },
        { name: "Next.js", level: 70 },
        { name: "TypeScript", level: 80 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML/CSS", level: 95 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 85 },
        { name: "Python", level: 50 },
        { name: "Supabase", level: 80 },
        { name: "PostgreSQL", level: 70 },
        { name: "REST APIs", level: 85 },
      ]
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 40 },
        { name: "Figma", level: 75 },
        { name: "AWS", level: 65 },
        { name: "Testing", level: 80 },
      ]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-[#948979] dark:bg-[#393E46]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#DFD0B8] dark:text-[#DFD0B8] mb-4">
            Skills & Technologies
          </h2>
          <p className="text-lg text-[#DFD0B8] dark:text-[#948979] max-w-2xl mx-auto">
            Here are the technologies and tools I work with
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-[#DFD0B8] dark:bg-[#222831] rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-[#222831] dark:text-[#DFD0B8] mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-[#393E46] dark:text-[#948979]">
                        {skill.name}
                      </span>
                      <span className="text-sm text-[#393E46] dark:text-[#948979]">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-[#948979]/30 dark:bg-[#393E46] rounded-full h-2">
                      <div
                        className="bg-[#393E46] dark:bg-[#948979] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 