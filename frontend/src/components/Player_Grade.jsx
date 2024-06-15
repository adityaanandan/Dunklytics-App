export default function Component() {
    return (
      <div className="bg-gray-900 text-white rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <div className="text-4xl font-bold">
            <span className="text-[#00b894]">Superstar</span>
          </div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="w-8 h-8 text-[#00b894]" />
            <span className="text-lg font-medium">Grade</span>
          </div>
        </div>
        <p className="mt-4 text-gray-400 text-sm">
          The player's performance metrics have earned them the prestigious "Superstar" grade, indicating their
          exceptional skills and contributions to the team.
        </p>
      </div>
    )
  }
  
  function TrophyIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    )
  }