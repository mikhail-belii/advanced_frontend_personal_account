import { useState, useEffect } from 'react'
import { useLanguage } from '../../context/LanguageContext';
import ChevronLeft from "../../assets/icons/Chevron_Left.svg"
import ChevronRight from "../../assets/icons/Chevron_Right.svg"
import './AlphabetSelector.css'
import { ENGLISH_ALPHABET, RUSSIAN_ALPHABET } from '../../constants';

export type AlphabetSelectorProps = {
    onLetterSelect: (letter: string) => void,
    selectedLetter?: string
}

const AlphabetSelector = ({onLetterSelect, selectedLetter}: AlphabetSelectorProps) => {
    const { language } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    const alphabet = language === 'ru' ? RUSSIAN_ALPHABET : ENGLISH_ALPHABET
    
    useEffect(() => {
        if (selectedLetter) {
            const index = alphabet.indexOf(selectedLetter.toUpperCase())
            if (index !== -1) {
                setCurrentIndex(index)
            }
        }
    }, [selectedLetter, alphabet])

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? alphabet.length - 1 : prev - 1))
        onLetterSelect(alphabet[currentIndex === 0 ? alphabet.length - 1 : currentIndex - 1])
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === alphabet.length - 1 ? 0 : prev + 1))
        onLetterSelect(alphabet[currentIndex === alphabet.length - 1 ? 0 : currentIndex + 1])
    }

    const handleLetterClick = (letter: string) => {
        onLetterSelect(letter)
        setCurrentIndex(alphabet.indexOf(letter))
    }

    return (
        <div className={`alphabet-selector ${isOpen ? 'open' : ''}`}>
            <img src={ChevronLeft} className="arrow" onClick={handlePrev}/>
            
            <div className="alphabet-container" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                    <div className="alphabet-full">
                        {alphabet.split('').map((letter, index) => (
                            <span
                                key={letter}
                                className={`letter ${letter === alphabet[currentIndex] ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleLetterClick(letter);
                                }}>
                                {letter}
                            </span>
                        ))}
                    </div>
                ) : (
                    <div className="alphabet-collapsed">
                        <span>{alphabet[currentIndex]}</span>
                        <span>—</span>
                        <span>{alphabet[alphabet.length - 1]}</span>
                    </div>
                )}
            </div>

            <img src={ChevronRight} className="arrow" onClick={handleNext}/>
        </div>
    )
}

export default AlphabetSelector