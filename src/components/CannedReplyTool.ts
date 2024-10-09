import { API, BlockTool, BlockToolData } from '@editorjs/editorjs'

export interface CannedReplyData extends BlockToolData {
  replyId: string
}

export default class CannedReplyTool implements BlockTool {
  private api: API
  private data: CannedReplyData
  private wrapper: HTMLElement

  static get toolbox() {
    return {
      title: 'Canned Reply',
      icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>'
    }
  }

  constructor({ data, api }: { data: CannedReplyData; api: API }) {
    this.api = api
    this.data = {
      replyId: data.replyId || ''
    }
    this.wrapper = document.createElement('div')
  }

  render() {
    this.wrapper.classList.add('canned-reply-tool')
    this.wrapper.contentEditable = 'false'
    this.renderReplyContent()
    return this.wrapper
  }

  save(blockContent: HTMLElement) {
    return {
      replyId: this.data.replyId
    }
  }

  validate(savedData: CannedReplyData) {
    return savedData.replyId.trim() !== ''
  }

  private async renderReplyContent() {
    const cannedReplies = await this.getCannedReplies()
    const reply = cannedReplies.find(r => r.id === this.data.replyId)

    if (reply) {
      const randomReply = reply.replies[Math.floor(Math.random() * reply.replies.length)]
      this.wrapper.innerHTML = `
        <div class="canned-reply-content p-2 bg-gray-100 rounded">
          <strong>${reply.name}:</strong> ${randomReply}
        </div>
      `
    } else {
      this.wrapper.innerHTML = '<p class="text-red-500">Canned reply not found</p>'
    }
  }

  private async getCannedReplies() {
    return new Promise<any[]>((resolve) => {
      chrome.storage.sync.get('cannedReplies', (result) => {
        resolve(result.cannedReplies || [])
      })
    })
  }
}