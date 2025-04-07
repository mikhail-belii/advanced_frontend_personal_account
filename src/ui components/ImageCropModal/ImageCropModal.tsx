import ReactModal from "react-modal"
import { useLanguage } from "../../context/LanguageContext"
import { useCallback, useRef, useState } from "react"
import api from "../../api/api"
import { API_URL } from "../../constants"
import Cropper from "react-easy-crop"
import "./ImageCropModal.css"
import BasicButton from "../BasicButton/BasicButton"

const getCroppedImage = (imageSrc: string, pixelCrop: any): Promise<Blob> =>  {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = imageSrc
        image.onload = () => {
            const canvas = document.createElement("canvas")
            const ctx = canvas.getContext("2d")
            canvas.width = pixelCrop.width
            canvas.height = pixelCrop.height
            ctx?.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, 
                pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)
            canvas.toBlob(blob => {
                if (blob) {
                    resolve(blob)
                }
                else {
                    reject(new Error("Error while creating blob"))
                }
            }, "image/png", 1)
        }
        image.onerror = () => reject(new Error("Failed while loading an image"))
    })
}

ReactModal.setAppElement("#root")

type ImageCropModalProps = {
    isOpen: boolean,
    onClose: () => void,
    onUploadSuccess: (fileId: string) => void
}

const ImageCropModal = ({isOpen, onClose, onUploadSuccess}: ImageCropModalProps) => {
    const {translate} = useLanguage()
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setImageSrc(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
        setCroppedAreaPixels(croppedAreaPixels)
      }, [])

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) {
            return
        }

        setIsUploading(true)
        try {
            const croppedImage = await getCroppedImage(imageSrc, croppedAreaPixels)
            const formData = new FormData()
            formData.append("file", croppedImage, "photo.png")
            const uploadResponse = await api.post(`${API_URL}/files`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (uploadResponse.status === 200) {
                const fileId = uploadResponse.data.id
                onUploadSuccess(fileId)
                onClose()
            }
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setIsUploading(false)
            setImageSrc(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleClose = () => {
      setImageSrc(null)
      setCrop({x: 0, y: 0})
      setZoom(1)
      setCroppedAreaPixels(null)
      if (fileInputRef.current) {
          fileInputRef.current.value = ""
      }
      onClose()
    }

    const handleSelectClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click()
      }
    }

    return (
        <ReactModal
          isOpen={isOpen}
          onRequestClose={handleClose}
          style={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                bottom: "auto",
                transform: "translate(-50%, -50%)",
                width: "500px",
                padding: "20px",
                borderRadius: "4px",
                maxHeight: "90vh",
                overflowY: "auto"
            }
          }}>
          <span className="select-file-modal-header">{translate("uploadingProfilePhoto")}</span>
          <div className="image-crop-modal-content">
            {!imageSrc ? (
              <div className="image-crop-modal-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  disabled={isUploading}
                  style={{display: "none"}}/>
                <BasicButton onClick={handleSelectClick} innerText={translate("selectFileText")}/>
              </div>) : (
              <>
                <div className="crop-container">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}/>
                </div>
                <div className="crop-controls">
                  <label>
                    {translate("zoom")}
                    <input
                      type="range"
                      min={1}
                      max={3}
                      step={0.1}
                      value={zoom}
                      onChange={(event) => setZoom(parseFloat(event.target.value))}
                      disabled={isUploading}/>
                  </label>
                </div>
              </>
            )}
            <div className="modal-buttons">
              {imageSrc && (
                <BasicButton onClick={handleUpload} isDisabled={isUploading} innerText={isUploading ? translate("uploading") : translate("upload")}/>
              )}
              <BasicButton onClick={handleClose} isDisabled={isUploading} innerText={translate("cancel")}/>
            </div>
          </div>
        </ReactModal>
      )
}

export default ImageCropModal