// src/Tiptap.tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
    content: '<p>Hello World!</p>', // initial content
    editorProps: {
      attributes: {
        class: 'bg-white text-burgundy prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  return (
    <>
        <div className='h-[250px] w-full bg-black'>
            <EditorContent editor={editor} />
            {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
            <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
        </div>
    </>
  )
}

export default Tiptap