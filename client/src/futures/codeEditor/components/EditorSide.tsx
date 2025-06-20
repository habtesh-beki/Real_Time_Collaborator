import { Resizable } from "re-resizable";
import { Send } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import axios from "axios";
import { useState } from "react";

export default function EditorSideBar() {
  const [isTyping, setIsTyping] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsTyping(value.trim().length > 0);
  };

  const sendMessage = async () => {
    console.log(input);
    const res = await axios.post("http://127.0.0.1:3000/api/chat", {
      message: input,
    });
    const replay = res.data.response.candidates[0].content.parts[0].text;
    console.log(replay);
    setMessages((prev) => [...prev, `You: ${input}`, `AI: ${replay}`]);
    setInput("");
  };

  return (
    <Resizable
      className="bg-[#151715] h-screen text-white"
      defaultSize={{
        width: 320,
      }}
    >
      <div className="w-full h-full pt-3 px-2 ">
        <div className="border rounded p-2 mb-4 h-96 overflow-auto">
          {messages.map((msg, i) => (
            <p key={i} className="mb-2">
              {msg}
            </p>
          ))}
        </div>
        <div className="w-full h-fit relative">
          <Textarea
            className="border text-whtie bg-[#303030]"
            placeholder="Ask Anything..."
            value={input}
            onChange={handleInputChange}
          />
          <div
            className={`w-fit h-fit absolute top-5 right-1 bg-[#545452] p-2 rounded-3xl cursor-pointer`}
            onClick={sendMessage}
          >
            <Send color={isTyping ? "#faf5e6" : "#212121"} />
          </div>
        </div>
      </div>
    </Resizable>
  );
}
