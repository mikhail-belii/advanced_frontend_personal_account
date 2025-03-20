import { useState } from "react"

export const useNotification = (initState: boolean = true) => {
    const [showNotification, setShowNotification] = useState(initState)

    const handleClose = () => {
        setShowNotification(false)
    }

    return {showNotification, setShowNotification, handleClose}
}