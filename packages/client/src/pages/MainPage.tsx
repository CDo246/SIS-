import { trpc } from "../utils/trpc";
import '../index.css';

export function MainPage() {
<<<<<<< HEAD
  const hello = trpc.greeting.useQuery();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank"></a>
        <a href="https://react.dev" target="_blank"></a>
      </div>
      <body>
        <div id="footer">
          <button>Publish</button>
          <textarea
            name="Enter Topic"
            placeholder="Enter Topic Here...."
          ></textarea>
        </div>
      </body>

      <p>{hello.data}</p>
    </>
=======
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');

  const handleSend = () => {
    if (message.trim() !== '') {
        setMessages([...messages, message]);
        setMessage('');
    }
};
  const [count, setCount] = useState(0);

  const hello = trpc.greeting.useQuery();

  return (
    <div className="container mx-auto p-4">
            <div className="border rounded-lg p-4 shadow-md chat-container">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2">{msg}</div>
                ))}
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    className="w-full p-2 rounded-lg border"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
>>>>>>> a526d85 (added initial chat display)
  );
}
