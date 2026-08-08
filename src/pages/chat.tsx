// import { useParams } from "react-router-dom";
// import { Bubble, BubbleContent } from "@/components/ui/bubble"
import {
  MessageScroller,
  MessageScrollerProvider,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
} from "@/components/ui/message-scroller";
import {
  Message,
  MessageContent,
  MessageAvatar,
  MessageFooter,
} from "@/components/ui/message";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSocketConnection } from "@/lib/utils";
import { useAppSelector } from "@/hooks";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { api } from "@/lib/api";

type ChatMessage = {
  id: string;
  fromUserId: string;
  firstName: string;
  text: string;
  createdAt: string;
};

type ChatLocationState = {
  chatPartnerName?: string;
};

function formatMessageTime(createdAt: string) {
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function Chat() {
  // id of the connection this conversation is with
  const { toUserId } = useParams<{ toUserId: string }>();
  const location = useLocation();
  const user = useAppSelector((state) => state.user);
  const connection = useAppSelector((state) =>
    state.connections.find((item) => item.id === toUserId),
  );
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const socketRef = useRef<any>(null);
  const routeName = (location.state as ChatLocationState | null)
    ?.chatPartnerName;
  const connectionName = connection
    ? `${connection.firstName} ${connection.lastName}`.trim()
    : "";
  const chatPartnerName = routeName || connectionName || "Connection";

  const fetchChat = async () => {
    const response = await api.get("/chat/" + toUserId);
    console.log("Fetched chat messages:", response.data.chat.messages);
    const chatMessages: ChatMessage[] = response.data.chat.messages.map(
      (msg: any) => {
        return {
          id: msg._id,
          fromUserId: msg.senderId._id,
          firstName: msg.senderId.firstName,
          text: msg.text,
          createdAt: msg.createdAt,
        };
      },
    );
    setMessages(chatMessages);
  };

  useEffect(() => {
    if (!toUserId) return;
    fetchChat();
  }, [toUserId]);

  useEffect(() => {
    if (!toUserId || !user.id) return;
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.connect();

    socket.on("connect", () => {
      socket.emit("joinChat", {
        firstName: user.firstName,
        fromUserId: user.id,
        toUserId,
      });
    });

    socket.on("newMessage", (message: ChatMessage) => {
      console.log("Received new message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [user.id, toUserId]);

  function handleSend() {
    const text = newMessage.trim();
    if (!text) return;

    // No optimistic append: the server broadcasts to the whole room, sender
    // included, so appending here too would render every sent message twice.
    socketRef.current?.emit("sendMessage", {
      firstName: user.firstName,
      fromUserId: user.id,
      toUserId,
      text,
    });
    setNewMessage("");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl min-h-0 flex-1 flex-col bg-linear-to-b from-transparent via-[color-mix(in_oklch,var(--muted),var(--foreground)_10%)] to-transparent">
      <section className="shrink-0 border-b border-border p-4 text-center text-xl font-light">
        <h1>Chat with {chatPartnerName}</h1>
      </section>
      <section className="flex min-h-0 w-full flex-1 flex-col">
        <MessageScrollerProvider autoScroll>
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport className="p-4">
              <MessageScrollerContent>
                {messages.map((m, idx) => {
                  // Relative to whoever is viewing: my own messages are "user",
                  // the other party's are "sender".
                  const role = m.fromUserId === user.id ? "user" : "sender";
                  return (
                    <MessageScrollerItem key={m.id + idx}>
                      <Message align={role === "user" ? "end" : "start"}>
                        {role === "sender" && (
                          <MessageAvatar className="size-8 text-xs">
                            {m.firstName?.charAt(0).toUpperCase() ?? "?"}
                          </MessageAvatar>
                        )}
                        <MessageContent>
                          <Bubble
                            variant={role === "sender" ? "tinted" : "default"}
                          >
                            <BubbleContent>{m.text}</BubbleContent>
                          </Bubble>
                          <MessageFooter>
                            {formatMessageTime(m.createdAt)}
                          </MessageFooter>
                        </MessageContent>
                      </Message>
                    </MessageScrollerItem>
                  );
                })}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
          </MessageScroller>
        </MessageScrollerProvider>

        <div className="flex shrink-0 items-center gap-2 border-t p-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1"
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </section>
    </div>
  );
}
export default Chat;
