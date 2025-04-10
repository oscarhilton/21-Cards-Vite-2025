const GameButton: React.FC<Props> = ({ onClick, buttonText }) => (
    <button
        onClick={onClick}
        className="relative bg-blue-500 border-0 px-16 py-5 rounded-lg shadow-md transform transition-transform duration-200 ease-in-out hover:shadow-none hover:translate-y-2 focus:outline-none"
    >
        {buttonText}
    </button>
)


export default GameButton;

  interface Props {
    onClick: () => void,
    buttonText: string
  }