import React, { useEffect, useRef } from 'react'
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Paragraph from '@editorjs/paragraph'
import CannedReplyTool from './CannedReplyTool'

const Editor: React.FC = () => {
  const editorRef = useRef<EditorJS | null>(null)

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: 'editorjs',
        tools: {
          header: Header,
          list: List,
          paragraph: Paragraph,
          cannedReply: CannedReplyTool,
        },
        data: {
          blocks: [
            {
              type: 'paragraph',
              data: {
                text: 'Start typing your response here...'
              }
            }
          ]
        },
        placeholder: 'Let\'s write an awesome response!'
      })
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy()
      }
    }
  }, [])

  return <div id="editorjs" className="bg-white shadow-sm rounded-lg p-4 min-h-[300px]"></div>
}

export default Editor