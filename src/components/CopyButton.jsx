import { useState } from 'react'

export default function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied!', className = 'btn small copy-btn' }){
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e) => {
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${className} ${copied ? 'is-copied' : ''}`}
      aria-label={copied ? copiedLabel : label}
      title={copied ? copiedLabel : label}
    >
      <span className="copy-icon" aria-hidden="true">
        {copied ? '✓' : '⧉'}
      </span>
      <span>{copied ? copiedLabel : label}</span>
    </button>
  )
}
