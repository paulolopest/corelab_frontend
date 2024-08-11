import { useCallback, useEffect } from 'react'

const useUtils = () => {
    const FreezeScreen = (state) => {
        useEffect(() => {
            if (state) {
                document.body.classList.add('loading')
            } else {
                document.body.classList.remove('loading')
            }

            return () => {
                document.body.classList.remove('loading')
            }
        }, [state])
    }

    const CloseModal = useCallback((event, state, setState) => {
        if (state) {
            if (event.target === event.currentTarget) {
                setState(false)
            }
        }
    }, [])

    const CloseEsc = (setState) => {
        const handleEscPress = (event) => {
            if (event.keyCode === 27) {
                setState(false)
            }
        }

        useEffect(() => {
            window.addEventListener('keydown', handleEscPress)

            return () => {
                window.removeEventListener('keyDown', handleEscPress)
            }
        }, [])
    }

    return { FreezeScreen, CloseModal, CloseEsc }
}

export default useUtils
