import React, { useState } from "react";
import { Icon } from "@iconify/react";
// @ts-ignore
import { Avatar } from "@web3uikit/core";

export default function PostInput({
  onPost,
}: {
  onPost: (content: string) => void;
}) {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = () => {
    setInputText("");
    onPost(inputText);
  };

  return (
    <div className="mx-auto bg-white rounded-lg my-6">
      <div className="flex items-start space-x-4">
        <Avatar isRounded size={48} theme="image" />

        <div className="flex-grow">
          <textarea
            className="w-full p-2 text-gray-700 border-b border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
            rows={2}
            placeholder="What Is Happening ?"
            value={inputText}
            onChange={handleInputChange}
          />
          <div className="flex justify-between items-center mt-2">
            <div className="flex space-x-4">
              <button className="text-gray-500 hover:text-blue-500">
                <Icon icon="mdi:image" className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                <Icon icon="mdi:gif" className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                <Icon icon="mdi:format-list-bulleted" className="w-6 h-6" />
              </button>
              <button className="text-gray-500 hover:text-blue-500">
                <Icon icon="mdi:emoticon-outline" className="w-6 h-6" />
              </button>
            </div>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={handleSubmit}
            >
              + Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
