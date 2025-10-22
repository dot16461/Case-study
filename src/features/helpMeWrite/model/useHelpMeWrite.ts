import { useState } from 'react'
import { generateSuggestion } from '@entities/gpt'
import { toast } from 'react-toastify'

type HelpMeWriteState = {
  loading: boolean
  open: boolean
  userPrompt: string
}

export function useHelpMeWrite() {
  const [state, setState] = useState<HelpMeWriteState>({
    loading: false,
    open: false,
    userPrompt: ''
  })

  const handleClick = () => {
    setState(prev => ({ ...prev, open: true }))
  }

  const handleGenerate = async (onResult: (text: string) => void) => {
    const controller = new AbortController()
    setState(prev => ({ ...prev, loading: true }))
    
    try {
      const text = await generateSuggestion({ topic: state.userPrompt }, controller.signal)
      onResult(text)
    } catch (e) {
      const errorMessage = typeof e === 'object' && e && 'message' in e ? (e as Error).message : 'AI request failed'
      toast.error(errorMessage)
    } finally {
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        open: false, 
        userPrompt: '' 
      }))
    }
  }

  const handleClose = () => {
    setState(prev => ({ ...prev, open: false, userPrompt: '' }))
  }

  const setUserPrompt = (prompt: string) => {
    setState(prev => ({ ...prev, userPrompt: prompt }))
  }

  return {
    ...state,
    handleClick,
    handleGenerate,
    handleClose,
    setUserPrompt
  }
}
