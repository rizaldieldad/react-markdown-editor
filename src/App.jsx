import './App.css'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

function App () {
  const [content, setContent] = useState('')

  // Function to download the file
  const downloadFile = (content, fileName, type) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Save as Markdown
  const saveAsMarkdown = () => {
    if (!content.trim()) {
      alert('Please enter some content before saving.')
      return
    }

    const fileName = `markdown-${new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/:/g, '-')}.md`

    downloadFile(content, fileName, 'text/markdown')
    setShowSaveModal(false)
  }

  return (
    <div className='flex flex-col h-screen text-white'>
      <main className='container mx-auto p-4 md:p-8 flex flex-col flex-1'>
        <h1 className='text-3xl font-bold hover:underline'>Markdown Editor</h1>

        <section className='mt-8 flex-1 flex flex-col'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 flex-1'>
            <div className='col-span-1 flex flex-col'>
              <p className='text-sm rounded-lg inline-block mb-4'>Editor</p>
              <div className='border border-gray-600 rounded-lg flex-1 flex'>
                <textarea
                  className='w-full h-full p-4 bg-transparent resize-none outline-none rounded-lg text-white'
                  placeholder='Start typing your markdown here...'
                  onChange={e => setContent(e.target.value)}
                />
              </div>
            </div>
            <div className='col-span-1 flex flex-col'>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-sm rounded-lg inline-block'>Preview</p>
                <button
                  className='text-sm px-4 py-2 bg-sky-600 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300'
                  onClick={() => saveAsMarkdown()}
                >
                  Save
                </button>
              </div>
              <div className='border border-gray-600 rounded-lg flex-1 p-4 overflow-y-auto'>
                {/* markdown preview content */}
                <div className='max-w-none text-white'>
                  {!content ? (
                    <p className='text-gray-400 italic'>
                      Markdown preview will appear here...
                    </p>
                  ) : (
                    <ReactMarkdown
                      remarkPlugins={[remarkBreaks]}
                      components={{
                        // Headings
                        h1: ({ children }) => (
                          <h1 className='text-3xl font-bold mb-6 mt-8 first:mt-0 border-b border-gray-600 pb-2'>
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className='text-2xl font-bold mb-4 mt-6 first:mt-0 border-b border-gray-700 pb-1'>
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className='text-xl font-bold mb-3 mt-5 first:mt-0'>
                            {children}
                          </h3>
                        ),
                        h4: ({ children }) => (
                          <h4 className='text-lg font-bold mb-2 mt-4 first:mt-0'>
                            {children}
                          </h4>
                        ),
                        h5: ({ children }) => (
                          <h5 className='text-base font-bold mb-2 mt-3 first:mt-0'>
                            {children}
                          </h5>
                        ),
                        h6: ({ children }) => (
                          <h6 className='text-sm font-bold mb-2 mt-3 first:mt-0 text-gray-300'>
                            {children}
                          </h6>
                        ),
                        // Paragraphs
                        p: ({ children }) => (
                          <p className='mb-4 leading-7 text-gray-100'>
                            {children}
                          </p>
                        ),
                        // Lists
                        ul: ({ children }) => (
                          <ul className='list-disc list-inside mb-4 space-y-2 ml-4'>
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className='list-decimal list-inside mb-4 space-y-2 ml-4'>
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className='text-gray-100 leading-6'>
                            {children}
                          </li>
                        ),
                        // Code blocks
                        pre: ({ children }) => (
                          <pre className='bg-gray-800 rounded-lg p-4 mb-4 overflow-x-auto border border-gray-700'>
                            {children}
                          </pre>
                        ),
                        code: ({ children, inline }) =>
                          inline ? (
                            <code className='bg-gray-800 px-2 py-1 rounded text-sm font-mono text-orange-300 border border-gray-700'>
                              {children}
                            </code>
                          ) : (
                            <code className='text-green-300 font-mono text-sm'>
                              {children}
                            </code>
                          ),
                        // Blockquotes
                        blockquote: ({ children }) => (
                          <blockquote className='border-l-4 border-sky-500 pl-4 mb-4 text-gray-300 italic bg-gray-800 py-2 rounded-r'>
                            {children}
                          </blockquote>
                        ),
                        // Links
                        a: ({ children, href }) => (
                          <a
                            href={href}
                            className='text-sky-400 hover:text-sky-300 underline'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {children}
                          </a>
                        ),
                        // Strong and emphasis
                        strong: ({ children }) => (
                          <strong className='font-bold text-white'>
                            {children}
                          </strong>
                        ),
                        em: ({ children }) => (
                          <em className='italic text-gray-200'>{children}</em>
                        ),
                        // Horizontal rule
                        hr: () => <hr className='border-gray-600 my-8' />,
                        // Images
                        img: ({ src, alt }) => (
                          <img
                            src={src}
                            alt={alt}
                            className='max-w-full h-auto rounded-lg mb-4 border border-gray-600'
                          />
                        )
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
